'use client';

import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloudFormSchema';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { BasicInfoSection } from './sections/BasicInfoSection';
import { CredentialsSection } from './sections/CredentialsSection';
import { RegionSection } from './sections/RegionSection';
import { ScanScheduleSection } from './sections/ScanScheduleSection';
import { EventSection } from './sections/EventSection';
import { CloudGroupSection } from './sections/CloudGroupSection';

interface CloudFormProps {
  form: UseFormReturn<CloudFormData>;
  onSubmit: (data: CloudFormData) => void;
  onCancel: () => void;
}

export const CloudForm = ({ form, onSubmit, onCancel }: CloudFormProps) => {
  const provider = form.watch('provider');
  const scheduleScanEnabled = form.watch('scheduleScanEnabled');
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Note: 폼 유효성 검사 실패 시 첫 번째 에러 필드로 자동 스크롤
  // React Hook Form의 shouldFocusError(기본값 true)가 포커스는 처리하지만,
  // 중첩된 스크롤 컨테이너에서는 에러 필드가 뷰포트 밖에 있을 수 있어
  // 사용자가 에러를 인지하지 못하는 문제를 해결하기 위해 명시적으로 스크롤 처리
  const handleFormError = () => {
    const firstErrorElement = formContainerRef.current?.querySelector(
      '[aria-invalid="true"]'
    );
    firstErrorElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="flex h-[80vh] flex-col">
      <div ref={formContainerRef} className="flex-1 overflow-y-auto px-4">
        <Form {...form}>
          <form
            id="cloud-form"
            onSubmit={form.handleSubmit(onSubmit, handleFormError)}
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
