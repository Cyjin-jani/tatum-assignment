import { useCallback, useMemo, useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Check, ChevronsUpDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select items...',
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    },
    [value, onChange]
  );

  const handleRemove = useCallback(
    (optionValue: string) => {
      const newValue = value.filter(v => v !== optionValue);
      onChange?.(newValue);
    },
    [value, onChange]
  );

  const selectedLabels = useMemo(
    () =>
      options
        .filter(option => value.includes(option.value))
        .map(option => ({ value: option.value, label: option.label })),
    [options, value]
  );

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between font-normal hover:bg-transparent',
            !value.length && 'text-neutral-500',
            className
          )}
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {value.length === 0 ? (
              <span>{placeholder}</span>
            ) : (
              selectedLabels.map(item => (
                <Badge
                  key={item.value}
                  variant="secondary"
                  className="mr-1 gap-1"
                  onClick={e => {
                    e.stopPropagation();
                    handleRemove(item.value);
                  }}
                >
                  {item.label}
                  <X className="h-3 w-3 cursor-pointer hover:text-neutral-900" />
                </Badge>
              ))
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-[var(--radix-popover-trigger-width)] rounded-md border border-neutral-200 bg-white p-0 shadow-md outline-none"
          align="start"
          sideOffset={4}
        >
          <div className="max-h-64 overflow-auto p-1">
            {options.map(option => (
              <div
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100"
                onClick={() => handleSelect(option.value)}
              >
                <Checkbox
                  checked={value.includes(option.value)}
                  onCheckedChange={() => handleSelect(option.value)}
                  onClick={e => e.stopPropagation()}
                />
                <span className="flex-1">{option.label}</span>
                {value.includes(option.value) && (
                  <Check className="h-4 w-4 text-neutral-900" />
                )}
              </div>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
