/**
 * Cloud Form 관련 상수 정의
 */

import type {
  Provider,
  AWSCredentialType,
  ScanFrequency,
  Weekday,
} from '@/types';

// Provider 옵션
export const PROVIDER_OPTIONS: ReadonlyArray<{
  value: Provider;
  label: string;
  disabled: boolean;
}> = [
  { value: 'AWS', label: 'AWS', disabled: false },
  { value: 'AZURE', label: 'Azure (Coming Soon)', disabled: true },
  { value: 'GCP', label: 'GCP (Coming Soon)', disabled: true },
] as const;

// AWS Credential Type 옵션
export const AWS_CREDENTIAL_TYPE_OPTIONS: ReadonlyArray<{
  value: AWSCredentialType;
  label: string;
}> = [
  { value: 'ACCESS_KEY', label: 'Access Key' },
  { value: 'ASSUME_ROLE', label: 'Assume Role' },
  { value: 'ROLES_ANYWHERE', label: 'Roles Anywhere' },
] as const;

// Scan Frequency 옵션
export const SCAN_FREQUENCY_OPTIONS: ReadonlyArray<{
  value: ScanFrequency;
  label: string;
}> = [
  { value: 'HOUR', label: 'Hourly' },
  { value: 'DAY', label: 'Daily' },
  { value: 'WEEK', label: 'Weekly' },
  { value: 'MONTH', label: 'Monthly' },
] as const;

// 요일 옵션
export const WEEKDAY_OPTIONS: ReadonlyArray<{
  value: Weekday;
  label: string;
}> = [
  { value: 'MON', label: 'Monday' },
  { value: 'TUE', label: 'Tuesday' },
  { value: 'WED', label: 'Wednesday' },
  { value: 'THU', label: 'Thursday' },
  { value: 'FRI', label: 'Friday' },
  { value: 'SAT', label: 'Saturday' },
  { value: 'SUN', label: 'Sunday' },
] as const;

// Boolean Radio 옵션
export const BOOLEAN_RADIO_OPTIONS = [
  { value: 'true', label: 'Enabled' },
  { value: 'false', label: 'Disabled' },
] as const;

// Cloud Group 옵션
export const CLOUD_GROUP_OPTIONS = [
  { value: 'aws-group', label: 'AWS Group' },
  { value: 'azure-group', label: 'Azure Group' },
  { value: 'gcp-group', label: 'GCP Group' },
];

// 플레이스홀더 텍스트
export const PLACEHOLDER_TEXT = {
  CLOUD_NAME: 'Please enter the cloud name',
  PROVIDER: 'Select provider',
  CREDENTIAL_METHOD: 'Select method',
  REGION: 'Select region',
  PROXY_URL: 'Please enter the proxy URL',
  CLOUD_GROUP_NAME: 'Select cloud groups',
  FREQUENCY: 'Select frequency',
  HOUR: '-',
  MINUTE: '-',
} as const;

// 레이블 텍스트
export const LABEL_TEXT = {
  CLOUD_NAME: 'Cloud Name',
  PROVIDER: 'Select Provider',
  CREDENTIAL_METHOD: 'Select Key Registration Method',
  REGION: 'Region',
  PROXY_URL: 'Proxy URL',
  SCAN_SCHEDULE: 'Scan Schedule Setting',
  SCAN_FREQUENCY: 'Set Scan Frequency',
  EVENT_PROCESS: 'Event Process',
  USER_ACTIVITY: 'User Activity',
  CLOUD_GROUP_NAME: 'Cloud Group Name',
  DATE: 'Date',
  DAY_OF_WEEK: 'Day of Week',
  HOUR: 'Hour',
  MINUTE: 'Minute',
} as const;
