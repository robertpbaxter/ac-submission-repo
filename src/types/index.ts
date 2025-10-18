export interface ContactsUsage {
  current: number;
  limit: number;
  percentUsed: number;
}

export interface EmailSendsUsage {
  remaining: number;
  limit: number;
  resetDate: string;
  percentUsed: number;
}

export interface UsageData {
  contacts: ContactsUsage;
  emailSends: EmailSendsUsage;
}

export interface NextTier {
  name: string;
  contactLimit: number;
  emailSendLimit: number;
}

export interface AccountData {
  planName: string;
  planTier: 'plus' | 'professional' | 'enterprise';
  upgradeable: boolean;
  nextTier?: NextTier;
}

export interface AppState {
  usage?: UsageData;
  account?: AccountData;
  loading: boolean;
  error?: string;
}

export type UsageLevel = 'normal' | 'warning' | 'critical' | 'full';

export const getUsageLevel = (percentUsed: number): UsageLevel => {
  if (percentUsed == 100) return 'full';
  if (percentUsed >= 90) return 'critical';
  if (percentUsed >= 70) return 'warning';
  return 'normal';
};