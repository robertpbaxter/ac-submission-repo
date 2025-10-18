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