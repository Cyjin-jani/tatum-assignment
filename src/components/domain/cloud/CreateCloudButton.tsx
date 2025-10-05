'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';

export function CreateCloudButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    console.log('Create cloud button clicked');
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleCreate}>Create Cloud</Button>
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Create Cloud"
      >
        <div className="p-6">
          <p>모달 내용이 여기에 들어갑니다.</p>
          <p>이 부분에 폼 필드들이 추가될 예정입니다.</p>
        </div>
      </Modal>
    </>
  );
}
