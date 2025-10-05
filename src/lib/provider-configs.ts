type Provider = 'AWS' | 'AZURE' | 'GCP';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'password';
  required: boolean;
  placeholder?: string;
}

export interface ProviderConfig {
  credentialFields: FieldConfig[];
  eventSourceFields: FieldConfig[];
}

export const providerConfigs: Record<Provider, ProviderConfig> = {
  AWS: {
    credentialFields: [
      {
        name: 'accessKeyId',
        label: 'Access Key',
        type: 'text',
        required: true,
        placeholder: 'Please enter the access key',
      },
      {
        name: 'secretAccessKey',
        label: 'Secret Key',
        type: 'password',
        required: true,
        placeholder: 'Please enter the secret key',
      },
    ],
    eventSourceFields: [
      {
        name: 'cloudTrailName',
        label: 'CloudTrail Name',
        type: 'text',
        required: false,
        placeholder: 'Please enter the cloud trail name',
      },
    ],
  },
  AZURE: {
    credentialFields: [
      {
        name: 'tenantId',
        label: 'Tenant ID',
        type: 'text',
        required: true,
        placeholder: 'Please enter the tenant ID',
      },
      {
        name: 'subscriptionId',
        label: 'Subscription ID',
        type: 'text',
        required: true,
        placeholder: 'Please enter the subscription ID',
      },
      {
        name: 'applicationId',
        label: 'Application ID',
        type: 'text',
        required: true,
        placeholder: 'Please enter the application ID',
      },
      {
        name: 'secretKey',
        label: 'Secret Key',
        type: 'password',
        required: true,
        placeholder: 'Please enter the secret key',
      },
    ],
    eventSourceFields: [
      {
        name: 'storageAccountName',
        label: 'Storage Account Name',
        type: 'text',
        required: false,
        placeholder: 'Please enter the storage account name',
      },
    ],
  },
  GCP: {
    credentialFields: [
      {
        name: 'projectId',
        label: 'Project ID',
        type: 'text',
        required: false,
        placeholder: 'Please enter the project ID',
      },
      {
        name: 'jsonText',
        label: 'JSON Text',
        type: 'text',
        required: true,
        placeholder: 'Please enter the JSON text',
      },
    ],
    eventSourceFields: [
      {
        name: 'storageAccountName',
        label: 'Storage Account Name',
        type: 'text',
        required: false,
        placeholder: 'Please enter the storage account name',
      },
    ],
  },
};
