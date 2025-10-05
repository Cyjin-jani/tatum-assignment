'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import { CloudForm } from '@/components/shared/cloud-form/CloudForm';
import { CloudFormData, cloudFormSchema } from '@/lib/cloud-form-schema';

export function CreateCloudButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // CreateCloudButton에서 useForm 관리
  const form = useForm<CloudFormData>({
    resolver: zodResolver(cloudFormSchema),
    defaultValues: {
      name: '',
      provider: 'AWS',
      cloudGroupName: [],
      scheduleScanEnabled: false,
      scheduleScanSetting: undefined,
      eventProcessEnabled: false,
      userActivityEnabled: false,
      credentials: {
        accessKeyId: '',
        secretAccessKey: '',
      },
      credentialType: 'ACCESS_KEY',
      eventSource: undefined,
      regionList: [],
      proxyUrl: '',
    },
  });

  const handleCreate = () => {
    console.log('Create cloud button clicked');
    setIsModalOpen(true);
  };

  const handleSubmit = (data: CloudFormData) => {
    console.log('Form submitted:', data);
    // TODO: API 호출로 클라우드 생성
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        onOpenChange={setIsModalOpen}
        title="Create Cloud"
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
