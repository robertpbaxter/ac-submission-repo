import React from 'react';
import styled from 'styled-components';
import { getUsageLevel } from './ContactsWidget';

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
  background-color: ${props => {
    switch (props.level) {
      case 'full':
        return '#e53e3e'; // Red
      case 'critical':
        return '#e53e3e'; // Red
      case 'warning':
        return '#f56500'; // Orange
      case 'normal':
      default:
        return '#38a169'; // Green
    }
  }};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentUsed, className }) => {
  const level = getUsageLevel(percentUsed);
  
  return (
    <ProgressBarContainer className={className}>
      <ProgressBarFill level={level} width={percentUsed} />
    </ProgressBarContainer>
  );
};