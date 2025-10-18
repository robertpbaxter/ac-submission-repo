import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from './ProgressBar';
import { UpgradePrompt } from './UpgradePrompt';
import { getUsageLevelColor } from '../utils/colorUtils';

import type { ContactsUsage, AccountData, UsageLevel } from '../types';

interface ContactsWidgetProps {
  usage: ContactsUsage;
  account: AccountData;
}

const WidgetCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
`;

const UsageStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
`;

const CurrentValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
`;

const LimitValue = styled.span`
  font-size: 0.875rem;
  color: #718096;
`;

const PercentageLabel = styled.span<{ level: UsageLevel }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => getUsageLevelColor(props.level)};
`;

export const getUsageLevel = (percentUsed: number): UsageLevel => {
  if (percentUsed === 100) return 'full';
  if (percentUsed >= 90) return 'critical';
  if (percentUsed >= 70) return 'warning';
  return 'normal';
};

export const ContactsWidget: React.FC<ContactsWidgetProps> = ({ usage, account }) => {
  const usageLevel = getUsageLevel(usage.percentUsed);

  return (
    <WidgetCard>
      <WidgetHeader>
        <WidgetTitle>Contacts</WidgetTitle>
        <PercentageLabel level={usageLevel}>
          {Math.round(usage.percentUsed)}% used
        </PercentageLabel>
      </WidgetHeader>
      
      <UsageStats>
        <div>
          <CurrentValue>{usage.current.toLocaleString()}</CurrentValue>
          <LimitValue> / {usage.limit.toLocaleString()} contacts</LimitValue>
        </div>
      </UsageStats>
      
      <ProgressBar percentUsed={usage.percentUsed} />
      
      <UpgradePrompt
        usageLevel={usageLevel}
        percentUsed={usage.percentUsed}
        account={account}
        metricName="contacts"
      />
    </WidgetCard>
  );
};