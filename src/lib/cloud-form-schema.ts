import { z } from 'zod';
import {
  validateScheduleScanSetting,
  validateFrequency,
  validateMinute,
  validateHour,
  validateDate,
  validateWeekday,
} from './cloudFormValidationHelpers';

// AWS Credential Schema
const awsCredentialSchema = z.object({
  accessKeyId: z.string().min(1, '액세스 키를 입력해주세요'),
  secretAccessKey: z.string().min(1, '비밀 키를 입력해주세요'),
  roleArn: z.string().optional(),
});

// Azure Credential Schema
const azureCredentialSchema = z.object({
  tenantId: z.string().min(1, 'Tenant ID를 입력해주세요'),
  subscriptionId: z.string().min(1, 'Subscription ID를 입력해주세요'),
  applicationId: z.string().min(1, 'Application ID를 입력해주세요'),
  secretKey: z.string().min(1, 'Secret Key를 입력해주세요'),
});

// GCP Credential Schema
const gcpCredentialSchema = z.object({
  projectId: z.string().optional(),
  jsonText: z.string().min(1, 'JSON Text를 입력해주세요'),
});

// Event Source Schemas
const awsEventSourceSchema = z.object({
  cloudTrailName: z.string().optional(),
});

const azureEventSourceSchema = z.object({
  storageAccountName: z.string().optional(),
});

const gcpEventSourceSchema = z.object({
  storageAccountName: z.string().optional(),
});

// Main Cloud Form Schema
export const cloudFormSchema = z
  .object({
    // 기본 정보
    name: z.string().min(1, '클라우드 이름을 입력해주세요'),
    provider: z.enum(['AWS', 'AZURE', 'GCP']),
    cloudGroupName: z.array(z.string()).optional(),

    // 스캔 설정
    scheduleScanEnabled: z.boolean(),
    scheduleScanSetting: z
      .object({
        frequency: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH']).optional(),
        date: z.string().optional(),
        weekday: z
          .enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
          .optional(),
        hour: z.string().optional(),
        minute: z.string().optional(),
      })
      .optional(),

    // 이벤트 설정
    eventProcessEnabled: z.boolean(),
    userActivityEnabled: z.boolean(),

    // Credentials (Provider별 분기)
    credentials: z.union([
      awsCredentialSchema,
      azureCredentialSchema,
      gcpCredentialSchema,
    ]),

    credentialType: z.union([
      z.enum(['ACCESS_KEY', 'ASSUME_ROLE', 'ROLES_ANYWHERE']),
      z.enum(['APPLICATION']),
      z.enum(['JSON_TEXT']),
    ]),

    // Event Source (Provider별 분기)
    eventSource: z
      .union([
        awsEventSourceSchema,
        azureEventSourceSchema,
        gcpEventSourceSchema,
      ])
      .optional(),

    // 공통 설정
    regionList: z.array(z.string()).min(1, '리전을 선택해주세요'),
    proxyUrl: z.string().optional(),
  })
  .refine(validateScheduleScanSetting, {
    message: '스캔 스케줄 설정을 입력해주세요',
    path: ['scheduleScanSetting'],
  })
  .refine(validateFrequency, {
    message: '스캔 주기를 선택해주세요',
    path: ['scheduleScanSetting', 'frequency'],
  })
  .refine(validateMinute, {
    message: '분을 선택해주세요',
    path: ['scheduleScanSetting', 'minute'],
  })
  .refine(validateHour, {
    message: '시간을 선택해주세요',
    path: ['scheduleScanSetting', 'hour'],
  })
  .refine(validateDate, {
    message: '날짜를 선택해주세요',
    path: ['scheduleScanSetting', 'date'],
  })
  .refine(validateWeekday, {
    message: '요일을 선택해주세요',
    path: ['scheduleScanSetting', 'weekday'],
  });

export type CloudFormData = z.infer<typeof cloudFormSchema>;
