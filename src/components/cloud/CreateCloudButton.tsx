'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import { CloudForm } from '@/components/cloud/cloudForm/CloudForm';
import { CloudFormData, cloudFormSchema } from '@/lib/cloud-form-schema';

export function CreateCloudButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<CloudFormData>({
    resolver: zodResolver(cloudFormSchema),
    defaultValues: {
      name: '',
      provider: 'AWS',
      cloudGroupName: [],
      scheduleScanEnabled: false,
      scheduleScanSetting: {
        frequency: undefined,
        date: undefined,
        weekday: undefined,
        hour: undefined,
        minute: undefined,
      },
      eventProcessEnabled: false,
      userActivityEnabled: false,
      credentials: {
        accessKeyId: '',
        secretAccessKey: '',
        roleArn: '',
      },
      credentialType: 'ACCESS_KEY',
      eventSource: {
        cloudTrailName: '',
      },
      regionList: [],
      proxyUrl: '',
    },
  });

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (data: CloudFormData) => {
    console.log('Form submitted:', data);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // 모달 닫힘 애니메이션 후 form 초기화
    setTimeout(() => {
      form.reset();
    }, 200);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <>
      <Button
        onClick={handleCreate}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Create Cloud
      </Button>
      <Modal
        open={isModalOpen}
        onOpenChange={handleModalChange}
        title="Create Cloud"
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
