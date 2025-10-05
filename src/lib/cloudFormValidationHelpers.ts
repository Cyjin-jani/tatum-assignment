// 폼 유효성 검사 헬퍼 함수들

interface ScheduleScanData {
  scheduleScanEnabled: boolean;
  scheduleScanSetting?: {
    frequency?: string;
    date?: string;
    weekday?: string;
    hour?: string;
    minute?: string;
  };
}

/**
 * 스캔 스케줄이 활성화된 경우 설정이 존재하는지 검증
 */
export const validateScheduleScanSetting = (
  data: ScheduleScanData
): boolean => {
  if (!data.scheduleScanEnabled) return true;
  return !!data.scheduleScanSetting;
};

/**
 * 스캔 스케줄이 활성화된 경우 frequency가 선택되었는지 검증
 */
export const validateFrequency = (data: ScheduleScanData): boolean => {
  if (!data.scheduleScanEnabled || !data.scheduleScanSetting) return true;
  return !!data.scheduleScanSetting.frequency;
};

/**
 * 스캔 스케줄이 활성화된 경우 minute가 선택되었는지 검증
 */
export const validateMinute = (data: ScheduleScanData): boolean => {
  if (!data.scheduleScanEnabled || !data.scheduleScanSetting) return true;
  return !!data.scheduleScanSetting.minute;
};

/**
 * 스캔 스케줄이 활성화된 경우 hour가 선택되었는지 검증 (HOUR frequency 제외)
 */
export const validateHour = (data: ScheduleScanData): boolean => {
  if (!data.scheduleScanEnabled || !data.scheduleScanSetting) return true;
  const { frequency, hour } = data.scheduleScanSetting;
  return frequency === 'HOUR' || !!hour;
};

/**
 * 스캔 스케줄이 활성화된 경우 date가 선택되었는지 검증 (MONTH frequency만)
 */
export const validateDate = (data: ScheduleScanData): boolean => {
  if (!data.scheduleScanEnabled || !data.scheduleScanSetting) return true;
  const { frequency, date } = data.scheduleScanSetting;
  return frequency !== 'MONTH' || !!date;
};

/**
 * 스캔 스케줄이 활성화된 경우 weekday가 선택되었는지 검증 (WEEK frequency만)
 */
export const validateWeekday = (data: ScheduleScanData): boolean => {
  if (!data.scheduleScanEnabled || !data.scheduleScanSetting) return true;
  const { frequency, weekday } = data.scheduleScanSetting;
  return frequency !== 'WEEK' || !!weekday;
};
