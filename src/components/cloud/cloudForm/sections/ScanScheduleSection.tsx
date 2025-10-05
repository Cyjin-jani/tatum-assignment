import { Control } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { ScanFrequencyFields } from '../ScanFrequencyFields';
import {
  BOOLEAN_RADIO_OPTIONS,
  LABEL_TEXT,
} from '@/components/cloud/constants';

interface ScanScheduleSectionProps {
  scheduleScanEnabled: boolean;
  control: Control<CloudFormData>;
}

export function ScanScheduleSection({
  scheduleScanEnabled,
  control,
}: ScanScheduleSectionProps) {
  return (
    <div className="space-y-6">
      {/* Scan Schedule Setting */}
      <FormField
        control={control}
        name="scheduleScanEnabled"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-2">{LABEL_TEXT.SCAN_SCHEDULE}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={value => field.onChange(value === 'true')}
                value={field.value ? 'true' : 'false'}
                className="flex space-x-6"
              >
                {BOOLEAN_RADIO_OPTIONS.map(option => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`scan-schedule-${option.value}`}
                    />
                    <Label htmlFor={`scan-schedule-${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Scan Frequency (조건부 렌더링) */}
      {scheduleScanEnabled && (
        <>
          <div className="border-t" />
          <ScanFrequencyFields control={control} />
        </>
      )}
    </div>
  );
}
