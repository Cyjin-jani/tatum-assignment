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

import EventSourceFields from '../EventSourceFields';
import {
  BOOLEAN_RADIO_OPTIONS,
  LABEL_TEXT,
} from '@/components/cloud/constants';
import type { Provider } from '@/types';

interface EventSectionProps {
  provider: Provider;
  control: Control<CloudFormData>;
}

export default function EventSection({ provider, control }: EventSectionProps) {
  return (
    <div className="space-y-6">
      {/* Event Integration */}
      <EventSourceFields provider={provider} control={control} />

      <div className="border-t" />

      {/* Event Process Enabled */}
      <FormField
        control={control}
        name="eventProcessEnabled"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-1">{LABEL_TEXT.EVENT_PROCESS}</FormLabel>
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
                      id={`event-process-${option.value}`}
                    />
                    <Label htmlFor={`event-process-${option.value}`}>
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

      {/* User Activity Enabled */}
      <FormField
        control={control}
        name="userActivityEnabled"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-1">{LABEL_TEXT.USER_ACTIVITY}</FormLabel>
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
                      id={`user-activity-${option.value}`}
                    />
                    <Label htmlFor={`user-activity-${option.value}`}>
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
    </div>
  );
}
