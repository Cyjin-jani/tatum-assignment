import * as React from 'react';
import { X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({
  open,
  onOpenChange,
  title,
  children,
  className,
  ...props
}: ModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={className} {...props}>
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-left">{title}</DialogTitle>
        <DialogClose className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-sm opacity-70 transition-opacity hover:cursor-pointer hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
        </DialogClose>
      </DialogHeader>
      <div className="flex-1">{children}</div>
    </DialogContent>
  </Dialog>
);

export { Modal };
