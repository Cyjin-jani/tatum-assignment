import * as React from 'react';
import { X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  ...props
}: ModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={className} {...props}>
      <DialogHeader>
        <div className="flex flex-row items-center justify-between">
          <DialogTitle className="text-left">{title}</DialogTitle>
          <DialogClose className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-sm opacity-70 transition-opacity hover:cursor-pointer hover:opacity-100 focus:outline-none disabled:pointer-events-none">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
        <DialogDescription className={description ? 'text-left' : 'sr-only'}>
          {description || ' '}
        </DialogDescription>
      </DialogHeader>
      <div className="flex-1">{children}</div>
    </DialogContent>
  </Dialog>
);

export { Modal };
