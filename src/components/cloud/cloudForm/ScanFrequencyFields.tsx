'use client';

import { Control, useWatch } from 'react-hook-form';
import { CloudFormData } from '@/lib/cloud-form-schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  SCAN_FREQUENCY_OPTIONS,
  WEEKDAY_OPTIONS,
  PLACEHOLDER_TEXT,
  LABEL_TEXT,
} from '@/components/cloud/constants';
import {
  DATE_RANGE,
  HOUR_RANGE,
  MINUTE_RANGE,
  formatHourLabel,
  formatMinuteValue,
} from '@/lib/dateTimeUtils';

interface ScanFrequencyFieldsProps {
  control: Control<CloudFormData>;
}

export default function ScanFrequencyFields({
  control,
}: ScanFrequencyFieldsProps) {
  // TODO: Frequency 변경 시 스마트 초기화 구현
  // - Hour, Minute은 유지 (모든 frequency에서 공통 사용)
  // - Date, Weekday는 해당 frequency가 아닐 때 초기화
  // - useEffect로 frequency 변경 감지 후 선택적 리셋

  // Watch all schedule scan setting fields
  const frequency = useWatch({
    control,
    name: 'scheduleScanSetting.frequency',
  });
  const date = useWatch({ control, name: 'scheduleScanSetting.date' });
  const weekday = useWatch({ control, name: 'scheduleScanSetting.weekday' });
  const hour = useWatch({ control, name: 'scheduleScanSetting.hour' });
  const minute = useWatch({ control, name: 'scheduleScanSetting.minute' });

  // 동적 스케줄 텍스트 생성
  const getScanScheduleText = () => {
    if (!frequency) return '-';

    const formatTime = (h?: string, m?: string) => {
      if (!h || !m) return '';
      const hourNum = parseInt(h);
      const minuteStr = m.padStart(2, '0');
      if (hourNum === 0) return `12:${minuteStr} AM`;
      if (hourNum < 12) return `${hourNum}:${minuteStr} AM`;
      if (hourNum === 12) return `12:${minuteStr} PM`;
      return `${hourNum - 12}:${minuteStr} PM`;
    };

    const weekdayMap: Record<string, string> = {
      MON: 'Monday',
      TUE: 'Tuesday',
      WED: 'Wednesday',
      THU: 'Thursday',
      FRI: 'Friday',
      SAT: 'Saturday',
      SUN: 'Sunday',
    };

    switch (frequency) {
      case 'HOUR':
        return minute ? `Hourly at :${minute.padStart(2, '0')}` : 'Hourly';

      case 'DAY':
        return hour && minute ? `Daily ${formatTime(hour, minute)}` : 'Daily';

      case 'WEEK':
        if (weekday && hour && minute) {
          return `Weekly on ${weekdayMap[weekday]} ${formatTime(hour, minute)}`;
        }
        return weekday ? `Weekly on ${weekdayMap[weekday]}` : 'Weekly';

      case 'MONTH':
        if (date && hour && minute) {
          const dateNum = parseInt(date);
          const suffix =
            dateNum === 1 || dateNum === 21
              ? 'st'
              : dateNum === 2 || dateNum === 22
                ? 'nd'
                : dateNum === 3 || dateNum === 23
                  ? 'rd'
                  : 'th';
          return `Monthly on ${dateNum}${suffix} ${formatTime(hour, minute)}`;
        }
        return date ? `Monthly on ${date}` : 'Monthly';

      default:
        return '-';
    }
  };

  return (
    <div className="space-y-4">
      <FormLabel>{LABEL_TEXT.SCAN_FREQUENCY}</FormLabel>
      <div className="text-sm text-gray-600">
        Scan Schedule: {getScanScheduleText()}
      </div>

      {/* Frequency */}
      <FormField
        control={control}
        name="scheduleScanSetting.frequency"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={PLACEHOLDER_TEXT.FREQUENCY} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SCAN_FREQUENCY_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Date */}
      <FormField
        control={control}
        name="scheduleScanSetting.date"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-4">
              <FormLabel
                className={`w-32 text-right ${frequency !== 'MONTH' ? 'text-gray-400' : ''}`}
              >
                {LABEL_TEXT.DATE}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={frequency !== 'MONTH'}
              >
                <FormControl>
                  <SelectTrigger
                    className={`flex-1 ${frequency !== 'MONTH' ? 'cursor-not-allowed bg-gray-100' : ''}`}
                  >
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DATE_RANGE.map(date => (
                    <SelectItem key={date} value={date.toString()}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Day of Week */}
      <FormField
        control={control}
        name="scheduleScanSetting.weekday"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-4">
              <FormLabel
                className={`w-32 text-right ${frequency !== 'WEEK' ? 'text-gray-400' : ''}`}
              >
                {LABEL_TEXT.DAY_OF_WEEK}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={frequency !== 'WEEK'}
              >
                <FormControl>
                  <SelectTrigger
                    className={`flex-1 ${frequency !== 'WEEK' ? 'cursor-not-allowed bg-gray-100' : ''}`}
                  >
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {WEEKDAY_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Hour */}
      <FormField
        control={control}
        name="scheduleScanSetting.hour"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-4">
              <FormLabel
                className={`w-32 text-right ${frequency === 'HOUR' ? 'text-gray-400' : ''}`}
              >
                {LABEL_TEXT.HOUR}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={frequency === 'HOUR'}
              >
                <FormControl>
                  <SelectTrigger
                    className={`flex-1 ${frequency === 'HOUR' ? 'cursor-not-allowed bg-gray-100' : ''}`}
                  >
                    <SelectValue placeholder={PLACEHOLDER_TEXT.HOUR} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {HOUR_RANGE.map(hour => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {formatHourLabel(hour)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Minute */}
      <FormField
        control={control}
        name="scheduleScanSetting.minute"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-4">
              <FormLabel className="w-32 text-right">
                {LABEL_TEXT.MINUTE}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={PLACEHOLDER_TEXT.MINUTE} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MINUTE_RANGE.map(minute => (
                    <SelectItem key={minute} value={formatMinuteValue(minute)}>
                      {formatMinuteValue(minute)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
