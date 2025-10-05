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
      <FormLabel>Set Scan Frequency</FormLabel>
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
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="HOUR">Hourly</SelectItem>
                <SelectItem value="DAY">Daily</SelectItem>
                <SelectItem value="WEEK">Weekly</SelectItem>
                <SelectItem value="MONTH">Monthly</SelectItem>
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
                Date
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
                  {Array.from({ length: 28 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
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
                Day of Week
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
                  <SelectItem value="MON">Monday</SelectItem>
                  <SelectItem value="TUE">Tuesday</SelectItem>
                  <SelectItem value="WED">Wednesday</SelectItem>
                  <SelectItem value="THU">Thursday</SelectItem>
                  <SelectItem value="FRI">Friday</SelectItem>
                  <SelectItem value="SAT">Saturday</SelectItem>
                  <SelectItem value="SUN">Sunday</SelectItem>
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
                Hour
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
                    <SelectValue placeholder="Select hour" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i === 0
                        ? '12 AM'
                        : i < 12
                          ? `${i} AM`
                          : i === 12
                            ? '12 PM'
                            : `${i - 12} PM`}
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
              <FormLabel className="w-32 text-right">Minute</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select minute" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem
                      key={i * 5}
                      value={(i * 5).toString().padStart(2, '0')}
                    >
                      {(i * 5).toString().padStart(2, '0')}
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
