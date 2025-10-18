import React from 'react';
import styled from 'styled-components';
import { getUsageLevel } from './ContactsWidget';
import { getUsageLevelColor } from '../utils/colorUtils';

import type { UsageLevel} from '../types';

interface ProgressBarProps {
  percentUsed: number;
  className?: string;
}

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ level: UsageLevel; width: number }>`
  height: 100%;
  width: ${props => Math.min(props.width, 100)}%;
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: ${props => getUsageLevelColor(props.level)};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentUsed, className }) => {
  const level = getUsageLevel(percentUsed);
  
  return (
    <ProgressBarContainer className={className}>
      <ProgressBarFill level={level} width={percentUsed} />
    </ProgressBarContainer>
  );
};