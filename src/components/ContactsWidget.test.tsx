import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContactsWidget } from './ContactsWidget';
import { ContactsUsage, AccountData } from '../types';

describe('ContactsWidget', () => {
  const mockUsage: ContactsUsage = {
    current: 850,
    limit: 1000,
    percentUsed: 85,
  };

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

  it('renders contact usage information correctly', () => {
    render(<ContactsWidget usage={mockUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByText('850')).toBeInTheDocument();
    expect(screen.getByText('/ 1,000 contacts')).toBeInTheDocument();
    expect(screen.getByText('85% used')).toBeInTheDocument();
  });

  it('shows upgrade prompt when usage is above 80% and account is upgradeable', () => {
    render(<ContactsWidget usage={mockUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.getByText(/You're approaching your contacts limit/)).toBeInTheDocument();
    expect(screen.getByText('Upgrade to Professional')).toBeInTheDocument();
  });

  it('does not show upgrade prompt when account is not upgradeable', () => {
    render(<ContactsWidget usage={mockUsage} account={mockAccountNotUpgradeable} />);
    
    expect(screen.queryByText(/upgrade/i)).not.toBeInTheDocument();
  });

  it('does not show upgrade prompt when usage is below 80%', () => {
    const lowUsage: ContactsUsage = {
      current: 500,
      limit: 1000,
      percentUsed: 50,
    };

    render(<ContactsWidget usage={lowUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.queryByText(/upgrade/i)).not.toBeInTheDocument();
  });

  it('displays correct percentage color for different usage levels', () => {
    const { rerender } = render(<ContactsWidget usage={mockUsage} account={mockAccountUpgradeable} />);
    
    // Warning level (85%)
    expect(screen.getByText('85% used')).toHaveStyle({ color: '#f56500' });

    // Critical level (95%)
    const criticalUsage: ContactsUsage = {
      current: 950,
      limit: 1000,
      percentUsed: 95,
    };

    rerender(<ContactsWidget usage={criticalUsage} account={mockAccountUpgradeable} />);
    expect(screen.getByText('95% used')).toHaveStyle({ color: '#e53e3e' });

    // Full level (100%)
    const fullUsage: ContactsUsage = {
      current: 1000,
      limit: 1000,
      percentUsed: 100,
    };

    rerender(<ContactsWidget usage={fullUsage} account={mockAccountUpgradeable} />);
    expect(screen.getByText('100% used')).toHaveStyle({ color: '#e53e3e' });

    // Normal level (50%)
    const normalUsage: ContactsUsage = {
      current: 500,
      limit: 1000,
      percentUsed: 50,
    };

    rerender(<ContactsWidget usage={normalUsage} account={mockAccountUpgradeable} />);
    expect(screen.getByText('50% used')).toHaveStyle({ color: '#38a169' });
  });

  it('shows urgent upgrade prompt when at full usage level (100%)', () => {
    const fullUsage: ContactsUsage = {
      current: 1000,
      limit: 1000,
      percentUsed: 100,
    };

    render(<ContactsWidget usage={fullUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.getByText(/You're at your contacts limit!/)).toBeInTheDocument();
  });
});