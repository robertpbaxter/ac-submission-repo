import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UpgradePrompt } from './UpgradePrompt';
import { AccountData } from '../types';

// Mock the alert function
global.alert = jest.fn();

describe('UpgradePrompt', () => {
  const mockAccountUpgradeable: AccountData = {
    planName: 'Plus',
    planTier: 'plus',
    upgradeable: true,
    nextTier: { name: 'Professional', contactLimit: 2500, emailSendLimit: 25000 },
  };

  const mockAccountNotUpgradeable: AccountData = {
    planName: 'Enterprise',
    planTier: 'enterprise',
    upgradeable: false,
    nextTier: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when usage is below 80%', () => {
    render(
      <UpgradePrompt 
        usageLevel="normal" 
        percentUsed={75} 
        account={mockAccountUpgradeable} 
        metricName="contacts" 
      />
    );
    
    expect(screen.queryByText(/upgrade/i)).not.toBeInTheDocument();
  });

  it('renders prompt for non-upgradeable account (enterprise) at 85% usage', () => {
    render(
      <UpgradePrompt 
        usageLevel="warning" 
        percentUsed={85} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    
    expect(screen.getByText(/You're approaching your contacts limit. Contact support for more capacity options./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders prompt for enterprise account at 100% usage without upgrade button', () => {
    render(
      <UpgradePrompt 
        usageLevel="full" 
        percentUsed={100} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    
    expect(screen.getByText(/You've reached your contacts limit! Contact support immediately for assistance./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders prompt for enterprise account at 95% usage without upgrade button', () => {
    render(
      <UpgradePrompt 
        usageLevel="critical" 
        percentUsed={95} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    
    expect(screen.getByText(/You're almost at your contacts limit! Contact support for assistance./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders prompt for enterprise account at 90% usage without upgrade button', () => {
    render(
      <UpgradePrompt 
        usageLevel="critical" 
        percentUsed={90} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    
    expect(screen.getByText(/You're running low on contacts. Contact support for more capacity options./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders upgrade prompt when usage is 85% and account is upgradeable', () => {
    render(
      <UpgradePrompt 
        usageLevel="warning" 
        percentUsed={85} 
        account={mockAccountUpgradeable} 
        metricName="contacts" 
      />
    );
    
    expect(screen.getByText(/You're approaching your contacts limit/)).toBeInTheDocument();
    expect(screen.getByText('Upgrade to Professional')).toBeInTheDocument();
  });

  it('shows different messages based on usage level for upgradeable accounts', () => {
    const { rerender } = render(
      <UpgradePrompt 
        usageLevel="critical" 
        percentUsed={96} 
        account={mockAccountUpgradeable} 
        metricName="contacts" 
      />
    );
    
    // Critical level (96%)
    expect(screen.getByText(/You're almost at your contacts limit!/)).toBeInTheDocument();
    expect(screen.getByText(/Upgrade to Professional to avoid service interruption./)).toBeInTheDocument();

    // High level (92%)
    rerender(
      <UpgradePrompt 
        usageLevel="critical" 
        percentUsed={92} 
        account={mockAccountUpgradeable} 
        metricName="contacts" 
      />
    );
    expect(screen.getByText(/You're running low on contacts/)).toBeInTheDocument();
    expect(screen.getByText(/Consider upgrading to Professional for more capacity./)).toBeInTheDocument();

    // Warning level (85%)
    rerender(
      <UpgradePrompt 
        usageLevel="warning" 
        percentUsed={85} 
        account={mockAccountUpgradeable} 
        metricName="contacts" 
      />
    );
    expect(screen.getByText(/You're approaching your contacts limit/)).toBeInTheDocument();
    expect(screen.getByText(/Upgrade to Professional to get more capacity./)).toBeInTheDocument();

    // Full level (100%)
    rerender(
      <UpgradePrompt 
        usageLevel="full" 
        percentUsed={100} 
        account={mockAccountUpgradeable} 
        metricName="contacts" 
      />
    );
    expect(screen.getByText(/You're at your contacts limit!/)).toBeInTheDocument();
    expect(screen.getByText(/Upgrade to Professional to resume services!/)).toBeInTheDocument();
  });

  it('shows different messages based on usage level for non-upgradeable accounts', () => {
    const { rerender } = render(
      <UpgradePrompt 
        usageLevel="critical" 
        percentUsed={96} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    
    // Critical level (96%)
    expect(screen.getByText(/You're almost at your contacts limit! Contact support for assistance./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    // High level (92%)
    rerender(
      <UpgradePrompt 
        usageLevel="critical" 
        percentUsed={92} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    expect(screen.getByText(/You're running low on contacts. Contact support for more capacity options./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    // Warning level (85%)
    rerender(
      <UpgradePrompt 
        usageLevel="warning" 
        percentUsed={85} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    expect(screen.getByText(/You're approaching your contacts limit. Contact support for more capacity options./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    // Full level (100%)
    rerender(
      <UpgradePrompt 
        usageLevel="full" 
        percentUsed={100} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    expect(screen.getByText(/You've reached your contacts limit! Contact support immediately for assistance./)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('triggers alert with next plan name when upgrade button is clicked', () => {
    render(
      <UpgradePrompt 
        usageLevel="warning" 
        percentUsed={85} 
        account={mockAccountUpgradeable} 
        metricName="contacts" 
      />
    );
    
    const upgradeButton = screen.getByText('Upgrade to Professional');
    fireEvent.click(upgradeButton);
    
    expect(global.alert).toHaveBeenCalledWith('Professional');
  });

  it('shows most urgent message at full usage level (100%)', () => {
    render(
      <UpgradePrompt 
        usageLevel="full" 
        percentUsed={100} 
        account={mockAccountUpgradeable} 
        metricName="email sends" 
      />
    );
    
    expect(screen.getByText(/You're at your email sends limit!/)).toBeInTheDocument();
    expect(screen.getByText(/Upgrade to Professional to resume services!/)).toBeInTheDocument();
  });
});