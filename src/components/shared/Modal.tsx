import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
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

const Modal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalProps
>(({ open, onOpenChange, title, children, className, ...props }, ref) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent ref={ref} className={className} {...props}>
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-left">{title}</DialogTitle>
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogHeader>
      <div className="flex-1">{children}</div>
    </DialogContent>
  </Dialog>
));
Modal.displayName = 'Modal';

export { Modal };
