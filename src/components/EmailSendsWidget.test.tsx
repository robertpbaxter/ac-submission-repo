import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmailSendsWidget } from './EmailSendsWidget';
import { EmailSendsUsage, AccountData } from '../types';

describe('EmailSendsWidget', () => {
  const mockUsage: EmailSendsUsage = {
    remaining: 1200,
    limit: 10000,
    resetDate: '2025-10-20T00:00:00Z',
    percentUsed: 88,
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

  it('renders email sends usage information correctly', () => {
    render(<EmailSendsWidget usage={mockUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.getByText('Email Sends')).toBeInTheDocument();
    expect(screen.getByText('1,200')).toBeInTheDocument();
    expect(screen.getByText('/ 10,000 remaining')).toBeInTheDocument();
    expect(screen.getByText('12% remaining')).toBeInTheDocument();
    expect(screen.getByText(/Resets on October \d+, 2025/)).toBeInTheDocument();
  });

  it('shows upgrade prompt when usage is above 80% and account is upgradeable', () => {
    render(<EmailSendsWidget usage={mockUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.getByText(/You're approaching your email sends limit/)).toBeInTheDocument();
    expect(screen.getByText('Upgrade to Professional')).toBeInTheDocument();
  });

  it('does not show upgrade prompt when account is not upgradeable', () => {
    render(<EmailSendsWidget usage={mockUsage} account={mockAccountNotUpgradeable} />);
    
    expect(screen.queryByText(/upgrade/i)).not.toBeInTheDocument();
  });

  it('does not show upgrade prompt when usage is below 80%', () => {
    const lowUsage: EmailSendsUsage = {
      remaining: 6000,
      limit: 10000,
      resetDate: '2025-10-20T00:00:00Z',
      percentUsed: 40,
    };

    render(<EmailSendsWidget usage={lowUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.queryByText(/upgrade/i)).not.toBeInTheDocument();
  });

  it('displays correct percentage color for different usage levels', () => {
    const { rerender } = render(<EmailSendsWidget usage={mockUsage} account={mockAccountUpgradeable} />);
    
    // Warning level (88% used = 12% remaining)
    expect(screen.getByText('12% remaining')).toHaveStyle({ color: '#f56500' });

    // Critical level (95% used = 5% remaining)
    const criticalUsage: EmailSendsUsage = {
      remaining: 500,
      limit: 10000,
      resetDate: '2025-10-20T00:00:00Z',
      percentUsed: 95,
    };

    rerender(<EmailSendsWidget usage={criticalUsage} account={mockAccountUpgradeable} />);
    expect(screen.getByText('5% remaining')).toHaveStyle({ color: '#e53e3e' });

    // Warning level (85% used = 15% remaining)
    const warningUsage: EmailSendsUsage = {
      remaining: 1500,
      limit: 10000,
      resetDate: '2025-10-20T00:00:00Z',
      percentUsed: 85,
    };

    rerender(<EmailSendsWidget usage={warningUsage} account={mockAccountUpgradeable} />);
    expect(screen.getByText('15% remaining')).toHaveStyle({ color: '#f56500' });

    // Full level (100% used = 0% remaining)
    const fullUsage: EmailSendsUsage = {
      remaining: 0,
      limit: 10000,
      resetDate: '2025-10-20T00:00:00Z',
      percentUsed: 100,
    };

    rerender(<EmailSendsWidget usage={fullUsage} account={mockAccountUpgradeable} />);
    expect(screen.getByText('0% remaining')).toHaveStyle({ color: '#e53e3e' });

    // Normal level (50% used = 50% remaining)
    const normalUsage: EmailSendsUsage = {
      remaining: 5000,
      limit: 10000,
      resetDate: '2025-10-20T00:00:00Z',
      percentUsed: 50,
    };

    rerender(<EmailSendsWidget usage={normalUsage} account={mockAccountUpgradeable} />);
    expect(screen.getByText('50% remaining')).toHaveStyle({ color: '#38a169' });
  });

  it('shows urgent upgrade prompt when at full usage level (100%)', () => {
    const fullUsage: EmailSendsUsage = {
      remaining: 0,
      limit: 10000,
      resetDate: '2025-10-20T00:00:00Z',
      percentUsed: 100,
    };

    render(<EmailSendsWidget usage={fullUsage} account={mockAccountUpgradeable} />);
    
    expect(screen.getByText(/You're at your email sends limit!/)).toBeInTheDocument();
    expect(screen.getByText('Upgrade to Professional')).toBeInTheDocument();
  });
});