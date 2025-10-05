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

export function RegionSection({ control }: RegionSectionProps) {
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
            {/* TODO: 서버 API 스펙은 regionList(배열)이지만, 정확한 요구사항을 알 수 없어
                임시로 단일 선택만 지원하도록 구현했습니다.
                배열의 첫 번째 요소만 사용하며, 선택 시 단일 값을 배열로 감싸서 저장합니다.
                추후 요구사항 확인 후 MultiSelect로 변경하거나 schema 수정이 필요할 수 있습니다. */}
            <Select
              onValueChange={value => field.onChange([value])}
              value={field.value?.[0] || ''}
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
