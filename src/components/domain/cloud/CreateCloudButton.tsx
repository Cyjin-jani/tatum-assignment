'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CreateCloudButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    // TODO: 모달 열기 로직 구현 예정
    console.log('Create cloud button clicked');
    setIsModalOpen(true);
  };

  return <Button onClick={handleCreate}>Create Cloud</Button>;
}
