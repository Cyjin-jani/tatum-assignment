'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import { CloudForm } from '@/components/shared/cloud-form/CloudForm';
import { CloudFormData, cloudFormSchema } from '@/lib/cloud-form-schema';
import { Cloud } from '@/types';

interface EditCloudButtonProps {
  cloudData: Cloud;
  onEdit?: (updatedData: Cloud) => void;
}

export function EditCloudButton({ cloudData, onEdit }: EditCloudButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Edit용 useForm - 기존 데이터로 초기화
  const form = useForm<CloudFormData>({
    resolver: zodResolver(cloudFormSchema),
    defaultValues: {
      name: cloudData.name,
      provider: cloudData.provider,
      cloudGroupName: cloudData.cloudGroupName || [],
      scheduleScanEnabled: cloudData.scheduleScanEnabled,
      scheduleScanSetting: cloudData.scheduleScanSetting,
      eventProcessEnabled: cloudData.eventProcessEnabled,
      userActivityEnabled: cloudData.userActivityEnabled,
      credentials: cloudData.credentials,
      credentialType: cloudData.credentialType,
      eventSource: cloudData.eventSource,
      regionList: cloudData.regionList,
      proxyUrl: cloudData.proxyUrl,
    },
  });

  const handleEdit = () => {
    console.log('Edit cloud button clicked');
    setIsModalOpen(true);
  };

  const handleSubmit = (data: CloudFormData) => {
    console.log('Form submitted:', data);
    // TODO: API 호출로 클라우드 업데이트
    onEdit?.(data as Cloud);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleEdit}
        size="sm"
        variant="outline"
        className="cursor-pointer border-blue-200 bg-blue-100 text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
      >
        Edit
      </Button>
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Edit Cloud"
      >
        <CloudForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
}
