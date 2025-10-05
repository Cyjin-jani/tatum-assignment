/**
 * 날짜/시간 관련 유틸리티 함수
 */

// 날짜 범위 (1-31일)
export const DATE_RANGE = Array.from({ length: 31 }, (_, i) => i + 1);

// 시간 범위 (0-23시)
export const HOUR_RANGE = Array.from({ length: 24 }, (_, i) => i);

// 분 범위 (0-55분, 5분 단위)
export const MINUTE_RANGE = Array.from({ length: 12 }, (_, i) => i * 5);

/**
 * 시간을 12시간 형식으로 포맷팅
 * @param hour - 0-23 사이의 시간
 * @returns "12 AM", "3 PM" 등의 형식
 */
export const formatHourLabel = (hour: number): string => {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
};

/**
 * 분을 2자리 문자열로 포맷팅
 * @param minute - 0-59 사이의 분
 * @returns "00", "05", "10" 등의 형식
 */
export const formatMinuteValue = (minute: number): string => {
  return minute.toString().padStart(2, '0');
};
