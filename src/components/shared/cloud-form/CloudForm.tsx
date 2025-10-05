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

import CredentialsFields from './CredentialsFields';
import EventSourceFields from './EventSourceFields';
import ScanFrequencyFields from './ScanFrequencyFields';

interface CloudFormProps {
  form: UseFormReturn<CloudFormData>;
  onSubmit: (data: CloudFormData) => void;
  onCancel: () => void;
}

export const CloudForm = ({ form, onSubmit, onCancel }: CloudFormProps) => {
  const provider = form.watch('provider');
  const scheduleScanEnabled = form.watch('scheduleScanEnabled');

  return (
    <div className="flex h-[80vh] flex-col">
      <div className="flex-1 overflow-y-auto pr-2">
        <Form {...form}>
          <form
            id="cloud-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pb-6"
          >
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
                      <SelectTrigger className="w-full">
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
                      <SelectTrigger className="w-full">
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

            {/* 구분선 */}
            <div className="border-t" />

            {/* Credentials */}
            <CredentialsFields provider={provider} control={form.control} />

            {/* 구분선 */}
            <div className="border-t" />

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
                      <SelectTrigger className="w-full">
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

            {/* 구분선 */}
            <div className="border-t" />

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
              <>
                {/* 구분선 */}
                <div className="border-t" />
                <ScanFrequencyFields control={form.control} />
              </>
            )}

            {/* 구분선 */}
            <div className="border-t" />

            {/* Event Integration */}
            <EventSourceFields provider={provider} control={form.control} />

            {/* 구분선 */}
            <div className="border-t" />

            {/* Event Process Enabled */}
            <FormField
              control={form.control}
              name="eventProcessEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Process</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={value => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="event-enabled" />
                        <Label htmlFor="event-enabled">Enabled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="event-disabled" />
                        <Label htmlFor="event-disabled">Disabled</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User Activity Enabled */}
            <FormField
              control={form.control}
              name="userActivityEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Activity</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={value => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="activity-enabled" />
                        <Label htmlFor="activity-enabled">Enabled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="activity-disabled" />
                        <Label htmlFor="activity-disabled">Disabled</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t" />

            {/* Cloud Group Name */}
            {/* TODO: Multi-select 컴포넌트로 변경 필요 */}
            <FormField
              control={form.control}
              name="cloudGroupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cloud Group Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter the cloud group name"
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
          </form>
        </Form>
      </div>

      {/* 버튼 영역 - 고정 */}
      <div className="flex justify-end space-x-4 border-t bg-white pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" form="cloud-form">
          Review
        </Button>
      </div>
    </div>
  );
};
