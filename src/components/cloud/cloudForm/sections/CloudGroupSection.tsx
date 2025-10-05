import { Control } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

import {
  PLACEHOLDER_TEXT,
  LABEL_TEXT,
  CLOUD_GROUP_OPTIONS,
} from '@/components/cloud/constants';

interface CloudGroupSectionProps {
  control: Control<CloudFormData>;
}

export default function CloudGroupSection({ control }: CloudGroupSectionProps) {
  return (
    <div className="space-y-6">
      {/* Cloud Group Name */}
      <FormField
        control={control}
        name="cloudGroupName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{LABEL_TEXT.CLOUD_GROUP_NAME}</FormLabel>
            <FormControl>
              <MultiSelect
                options={CLOUD_GROUP_OPTIONS}
                value={field.value || []}
                onChange={field.onChange}
                placeholder={PLACEHOLDER_TEXT.CLOUD_GROUP_NAME}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
