'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import { CloudForm } from '@/components/cloud/cloudForm/CloudForm';
import { CloudFormData, cloudFormSchema } from '@/lib/cloudFormSchema';
import { Cloud } from '@/types';

interface EditCloudButtonProps {
  cloudData: Cloud;
}

export function EditCloudButton({ cloudData }: EditCloudButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<CloudFormData>({
    resolver: zodResolver(cloudFormSchema),
    defaultValues: {
      name: cloudData.name || '',
      provider: cloudData.provider || 'AWS',
      cloudGroupName: cloudData.cloudGroupName || [],
      scheduleScanEnabled: cloudData.scheduleScanEnabled || false,
      scheduleScanSetting: {
        frequency: cloudData.scheduleScanSetting?.frequency || undefined,
        date: cloudData.scheduleScanSetting?.date || undefined,
        weekday: cloudData.scheduleScanSetting?.weekday || undefined,
        hour: cloudData.scheduleScanSetting?.hour
          ? parseInt(cloudData.scheduleScanSetting.hour).toString()
          : undefined,
        minute: cloudData.scheduleScanSetting?.minute || undefined,
      },
      eventProcessEnabled: cloudData.eventProcessEnabled || false,
      userActivityEnabled: cloudData.userActivityEnabled || false,
      credentials: cloudData.credentials || {
        accessKeyId: '',
        secretAccessKey: '',
        roleArn: '',
      },
      credentialType: cloudData.credentialType || 'ACCESS_KEY',
      eventSource: cloudData.eventSource || {
        cloudTrailName: '',
      },
      regionList: cloudData.regionList || [],
      proxyUrl: cloudData.proxyUrl || '',
    },
  });

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (data: CloudFormData) => {
    console.log('Form submitted:', data);
    setIsModalOpen(false);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const handleCancel = () => {
    handleModalChange(false);
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
        onOpenChange={handleModalChange}
        title="Edit Cloud"
        className="max-w-xl"
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
