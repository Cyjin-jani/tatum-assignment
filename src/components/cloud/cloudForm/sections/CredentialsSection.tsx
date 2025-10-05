import { Control } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import CredentialsFields from '../CredentialsFields';
import {
  AWS_CREDENTIAL_TYPE_OPTIONS,
  PLACEHOLDER_TEXT,
  LABEL_TEXT,
} from '@/components/cloud/constants';

type Provider = 'AWS' | 'AZURE' | 'GCP';

interface CredentialsSectionProps {
  provider: Provider;
  control: Control<CloudFormData>;
}

export default function CredentialsSection({
  provider,
  control,
}: CredentialsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Key Registration Method */}
      <FormField
        control={control}
        name="credentialType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{LABEL_TEXT.CREDENTIAL_METHOD}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={PLACEHOLDER_TEXT.CREDENTIAL_METHOD}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {AWS_CREDENTIAL_TYPE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="border-t" />

      {/* Credentials Fields */}
      <CredentialsFields provider={provider} control={control} />
    </div>
  );
}
