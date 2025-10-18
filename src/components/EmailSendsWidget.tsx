import React from 'react';
import styled from 'styled-components';
import { getUsageLevel } from './ContactsWidget';
import { ProgressBar } from './ProgressBar';
import { UpgradePrompt } from './UpgradePrompt';
import { getUsageLevelColor } from '../utils/colorUtils';

import type { EmailSendsUsage, AccountData, UsageLevel } from '../types';

interface EmailSendsWidgetProps {
  usage: EmailSendsUsage;
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

const PercentageLabel = styled.span<{ level: UsageLevel}>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => getUsageLevelColor(props.level)};
`;

const ResetDate = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
`;

export const EmailSendsWidget: React.FC<EmailSendsWidgetProps> = ({ usage, account }) => {
  const usageLevel = getUsageLevel(usage.percentUsed);
  
  // Format the reset date
  const resetDate = new Date(usage.resetDate);
  const formattedDate = resetDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <WidgetCard>
      <WidgetHeader>
        <WidgetTitle>Email Sends</WidgetTitle>
        <PercentageLabel level={usageLevel}>
          {Math.round(100 - usage.percentUsed)}% remaining
        </PercentageLabel>
      </WidgetHeader>
      
      <UsageStats>
        <div>
          <CurrentValue>{usage.remaining.toLocaleString()}</CurrentValue>
          <LimitValue> / {usage.limit.toLocaleString()} remaining</LimitValue>
        </div>
      </UsageStats>
      
      <ProgressBar percentUsed={usage.percentUsed} />
      
      <ResetDate>
        Resets on {formattedDate}
      </ResetDate>
      
      <UpgradePrompt
        usageLevel={usageLevel}
        percentUsed={usage.percentUsed}
        account={account}
        metricName="email sends"
      />
    </WidgetCard>
  );
};