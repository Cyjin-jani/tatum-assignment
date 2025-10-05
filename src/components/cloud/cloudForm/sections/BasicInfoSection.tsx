import { Control } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  PROVIDER_OPTIONS,
  PLACEHOLDER_TEXT,
  LABEL_TEXT,
} from '@/components/cloud/constants';

interface BasicInfoSectionProps {
  control: Control<CloudFormData>;
}

export function BasicInfoSection({ control }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      {/* Cloud Name */}
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {LABEL_TEXT.CLOUD_NAME} <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder={PLACEHOLDER_TEXT.CLOUD_NAME} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Provider */}
      <FormField
        control={control}
        name="provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{LABEL_TEXT.PROVIDER}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={PLACEHOLDER_TEXT.PROVIDER} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PROVIDER_OPTIONS.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
