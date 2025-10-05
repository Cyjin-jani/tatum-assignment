import { Control } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';
import { AWSRegionList } from '@/types';

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

import { PLACEHOLDER_TEXT, LABEL_TEXT } from '@/components/cloud/constants';

interface RegionSectionProps {
  control: Control<CloudFormData>;
}

export default function RegionSection({ control }: RegionSectionProps) {
  return (
    <div className="space-y-6">
      {/* Region */}
      <FormField
        control={control}
        name="regionList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {LABEL_TEXT.REGION} <span className="text-red-500">*</span>
            </FormLabel>
            <Select
              onValueChange={value => field.onChange([value])}
              value={field.value[0]}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={PLACEHOLDER_TEXT.REGION} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {AWSRegionList.map(region => (
                  <SelectItem key={region} value={region}>
                    {region === 'global' ? 'Global' : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Proxy URL */}
      <FormField
        control={control}
        name="proxyUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{LABEL_TEXT.PROXY_URL}</FormLabel>
            <FormControl>
              <Input placeholder={PLACEHOLDER_TEXT.PROXY_URL} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
