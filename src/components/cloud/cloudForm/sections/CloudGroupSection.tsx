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

import { PLACEHOLDER_TEXT, LABEL_TEXT } from '@/components/cloud/constants';

interface CloudGroupSectionProps {
  control: Control<CloudFormData>;
}

export default function CloudGroupSection({ control }: CloudGroupSectionProps) {
  return (
    <div className="space-y-6">
      {/* Cloud Group Name */}
      {/* TODO: Multi-select 컴포넌트로 변경 필요 */}
      <FormField
        control={control}
        name="cloudGroupName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{LABEL_TEXT.CLOUD_GROUP_NAME}</FormLabel>
            <FormControl>
              <Input
                placeholder={PLACEHOLDER_TEXT.CLOUD_GROUP_NAME}
                {...field}
                value={field.value?.join(', ') || ''}
                onChange={e =>
                  field.onChange(
                    e.target.value
                      ? e.target.value.split(',').map(s => s.trim())
                      : []
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
