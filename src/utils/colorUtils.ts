import { UsageLevel } from '../types';

/**
 * Returns the primary color for a given usage level
 * Used for text, progress bars, and other primary UI elements
 */
export const getUsageLevelColor = (level: UsageLevel): string => {
  switch (level) {
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
};

/**
 * Returns the background color for a given usage level
 * Used for container backgrounds and light color variants
 */
export const getUsageLevelBackgroundColor = (level: UsageLevel): string => {
  switch (level) {
    case 'full':
      return '#fed7d7'; // Light red
    case 'critical':
      return '#fed7d7'; // Light red
    case 'warning':
      return '#feebc8'; // Light orange
    case 'normal':
    default:
      return '#f0fff4'; // Light green
  }
};

/**
 * Returns the border color for a given usage level
 * Used for borders and medium color variants
 */
export const getUsageLevelBorderColor = (level: UsageLevel): string => {
  switch (level) {
    case 'full':
      return '#fc8181'; // Medium red
    case 'critical':
      return '#fc8181'; // Medium red
    case 'warning':
      return '#f6ad55'; // Medium orange
    case 'normal':
    default:
      return '#68d391'; // Medium green
  }
};