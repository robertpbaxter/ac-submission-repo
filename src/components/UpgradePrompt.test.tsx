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

  it('does not render when account is not upgradeable', () => {
    render(
      <UpgradePrompt 
        usageLevel="warning" 
        percentUsed={85} 
        account={mockAccountNotUpgradeable} 
        metricName="contacts" 
      />
    );
    
    expect(screen.queryByText(/upgrade/i)).not.toBeInTheDocument();
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

  it('shows different messages based on usage level', () => {
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
});