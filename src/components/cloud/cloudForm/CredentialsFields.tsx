import { Control } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';
import { providerConfigs } from '@/lib/provider-configs';
import type { Provider } from '@/types';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface CredentialsFieldsProps {
  provider: Provider;
  control: Control<CloudFormData>;
}

export default function CredentialsFields({
  provider,
  control,
}: CredentialsFieldsProps) {
  const config = providerConfigs[provider];

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Credentials</h4>
      {config.credentialFields.map(field => (
        <FormField
          key={field.name}
          control={control}
          name={`credentials.${field.name}` as any}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>
                {field.label}{' '}
                {field.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...formField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
