import React from 'react';
import styled from 'styled-components';
import { AccountData, UsageLevel } from '../types';
import { getUsageLevelBackgroundColor, getUsageLevelBorderColor } from '../utils/colorUtils';

interface UpgradePromptProps {
  usageLevel: UsageLevel;
  percentUsed: number;
  account: AccountData;
  metricName: string;
}

const UpgradeContainer = styled.div<{ level: UsageLevel }>`
  margin-top: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  background-color: ${props => getUsageLevelBackgroundColor(props.level)};
  border: 1px solid ${props => getUsageLevelBorderColor(props.level)};
`;

const UpgradeMessage = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #2d3748;
  line-height: 1.4;
`;

const UpgradeButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2c5aa0;
  }

  &:focus {
    outline: 2px solid #3182ce;
    outline-offset: 2px;
  }
`;

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({ 
  usageLevel, 
  percentUsed, 
  account, 
  metricName 
}) => {
  // Only show upgrade prompts when usage is >= 80% and account is upgradeable
  if (percentUsed < 80 || !account.upgradeable || !account.nextTier) {
    return null;
  }

  const handleUpgrade = () => {
    alert(account.nextTier!.name);
  };

  const getMessage = () => {
    if (percentUsed === 100) {
      return `You're at your ${metricName} limit! Upgrade to ${account.nextTier!.name} to resume services!`;
    } else if (percentUsed >= 95) {
      return `You're almost at your ${metricName} limit! Upgrade to ${account.nextTier!.name} to avoid service interruption.`;
    } else if (percentUsed >= 90) {
      return `You're running low on ${metricName}. Consider upgrading to ${account.nextTier!.name} for more capacity.`;
    } else {
      return `You're approaching your ${metricName} limit. Upgrade to ${account.nextTier!.name} to get more capacity.`;
    }
  };

  return (
    <UpgradeContainer level={usageLevel}>
      <UpgradeMessage>{getMessage()}</UpgradeMessage>
      <UpgradeButton onClick={handleUpgrade}>
        Upgrade to {account.nextTier!.name}
      </UpgradeButton>
    </UpgradeContainer>
  );
};