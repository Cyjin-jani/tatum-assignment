'use client';

import { UseFormReturn } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';
import { AWSRegionList } from '@/types';

import { Button } from '@/components/ui/button';
import {
  Form,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { ProviderSpecificFields } from './ProviderSpecificFields';

interface CloudFormProps {
  form: UseFormReturn<CloudFormData>;
  onSubmit: (data: CloudFormData) => void;
  onCancel: () => void;
}

export const CloudForm = ({ form, onSubmit, onCancel }: CloudFormProps) => {
  const provider = form.watch('provider');
  const scheduleScanEnabled = form.watch('scheduleScanEnabled');

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 기본 설정 섹션 */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">기본 설정</h3>

            {/* Cloud Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Cloud Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter the cloud name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Provider */}
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="AZURE" disabled>
                        Azure (Coming Soon)
                      </SelectItem>
                      <SelectItem value="GCP" disabled>
                        GCP (Coming Soon)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Key Registration Method */}
            <FormField
              control={form.control}
              name="credentialType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Key Registration Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACCESS_KEY">Access Key</SelectItem>
                      <SelectItem value="ASSUME_ROLE">Assume Role</SelectItem>
                      <SelectItem value="ROLES_ANYWHERE">
                        Roles Anywhere
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Provider-specific fields */}
            <ProviderSpecificFields
              provider={provider}
              control={form.control}
            />

            {/* Region */}
            <FormField
              control={form.control}
              name="regionList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Region <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={value => field.onChange([value])}
                    value={field.value[0]}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
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
              control={form.control}
              name="proxyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proxy URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter the proxy URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 스캔 설정 섹션 */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">스캔 설정</h3>

            {/* Scan Schedule Setting */}
            <FormField
              control={form.control}
              name="scheduleScanEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scan Schedule Setting</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={value => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="enabled" />
                        <Label htmlFor="enabled">Enabled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="disabled" />
                        <Label htmlFor="disabled">Disabled</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Scan Frequency (조건부 렌더링) */}
            {scheduleScanEnabled && (
              <div className="space-y-4">
                <FormLabel>Set Scan Frequency</FormLabel>
                <div className="mb-4 text-sm text-gray-600">
                  Scan Schedule: Daily 12:00 AM
                </div>

                <FormField
                  control={form.control}
                  name="scheduleScanSetting.frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HOUR">Hourly</SelectItem>
                          <SelectItem value="DAY">Daily</SelectItem>
                          <SelectItem value="WEEK">Weekly</SelectItem>
                          <SelectItem value="MONTH">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="scheduleScanSetting.hour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hour</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select hour" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i === 0
                                  ? '12 AM'
                                  : i < 12
                                    ? `${i} AM`
                                    : i === 12
                                      ? '12 PM'
                                      : `${i - 12} PM`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scheduleScanSetting.minute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minute</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select minute" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem
                                key={i * 5}
                                value={(i * 5).toString().padStart(2, '0')}
                              >
                                {(i * 5).toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end space-x-4 border-t pt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
