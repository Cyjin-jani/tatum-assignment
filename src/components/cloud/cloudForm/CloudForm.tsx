'use client';

import { UseFormReturn } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import BasicInfoSection from './sections/BasicInfoSection';
import CredentialsSection from './sections/CredentialsSection';
import RegionSection from './sections/RegionSection';
import ScanScheduleSection from './sections/ScanScheduleSection';
import EventSection from './sections/EventSection';
import CloudGroupSection from './sections/CloudGroupSection';

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
            className="space-y-6 pb-10"
          >
            {/* 기본 정보 */}
            <BasicInfoSection control={form.control} />
            <div className="border-t" />
            {/* 인증 정보 */}
            <CredentialsSection provider={provider} control={form.control} />
            <div className="border-t" />
            {/* 리전 및 프록시 */}
            <RegionSection control={form.control} />
            <div className="border-t" />
            {/* 스캔 스케줄 */}
            <ScanScheduleSection
              scheduleScanEnabled={scheduleScanEnabled}
              control={form.control}
            />
            <div className="border-t" />
            {/* 이벤트 설정 */}
            <EventSection provider={provider} control={form.control} />
            <div className="border-t" />
            {/* 클라우드 그룹 */}
            <CloudGroupSection control={form.control} />
          </form>
        </Form>
      </div>

      {/* 버튼 영역 - 고정 */}
      <div className="flex justify-end space-x-4 border-t bg-white pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="cloud-form"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Review
        </Button>
      </div>
    </div>
  );
};
