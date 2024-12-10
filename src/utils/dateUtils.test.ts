import { calcRemainingTime, calculatedDDay, formatDateToLocal, formatDateToUTC } from './dateUtils';

describe('calculatedDDay', () => {
  beforeEach(() => {
    // 현재 시간을 고정하기 위해 Date를 Mock 처리
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-12-05T00:00:00Z')); // 기준 날짜 설정
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('미래 날짜에 대해 올바른 D-Day를 계산해야 합니다', () => {
    const futureDate = '2024-12-10T00:00:00Z';
    const result = calculatedDDay(futureDate);
    expect(result).toBe(5); // 미래 날짜
  });

  it('같은 날에 대해 0을 반환해야 합니다', () => {
    const sameDay = '2024-12-05T23:59:59Z';
    const result = calculatedDDay(sameDay);
    expect(result).toBe(0); // 같은 날
  });

  it('과거 날짜에 대해 음수 D-Day를 계산해야 합니다', () => {
    const pastDate = '2024-12-01T00:00:00Z';
    const result = calculatedDDay(pastDate);
    expect(result).toBe(-4); // 과거 날짜
  });

  it('잘못된 날짜 형식에 대해 적절히 처리해야 합니다', () => {
    const invalidDate = 'invalid-date';
    expect(() => calculatedDDay(invalidDate)).toThrow();
  });
});

describe('calcRemainingTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-12-05T00:00:00Z')); // 기준 날짜 고정
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('미래 날짜에 대해 남은 시간을 밀리초 단위로 반환해야 합니다', () => {
    const futureDate = new Date('2024-12-05T12:00:00Z'); // 12시간 후
    const result = calcRemainingTime(futureDate);
    expect(result).toBe(12 * 60 * 60 * 1000); // 12시간 -> 밀리초로 변환
  });

  it('주어진 날짜가 과거일 경우 0을 반환해야 합니다', () => {
    const pastDate = new Date('2024-12-04T23:59:59Z'); // 과거 날짜
    const result = calcRemainingTime(pastDate);
    expect(result).toBe(0);
  });

  it('주어진 날짜가 현재 시간과 같을 경우 0을 반환해야 합니다', () => {
    const currentDate = new Date('2024-12-05T00:00:00Z'); // 기준 시간과 동일
    const result = calcRemainingTime(currentDate);
    expect(result).toBe(0);
  });

  it('정확한 밀리초 차이를 처리해야 합니다', () => {
    const futureDate = new Date('2024-12-05T00:00:00.500Z'); // 0.5초 후
    const result = calcRemainingTime(futureDate);
    expect(result).toBe(500); // 0.5초 -> 500밀리초
  });
});

describe('formatDateToUTC', () => {
  it('올바른 날짜 문자열을 정확히 포맷해야 합니다', () => {
    const dateString = '2024-12-05T15:30:45Z';
    const result = formatDateToUTC(dateString);
    expect(result).toBe('2024-12-05 15:30:45');
  });

  it('시간이 없는 날짜를 처리하고 기본값을 00:00:00으로 설정해야 합니다', () => {
    const dateString = '2024-12-05';
    const result = formatDateToUTC(dateString);
    expect(result).toBe('2024-12-05 00:00:00');
  });

  it('잘못된 날짜 형식에 대해 오류를 발생시켜야 합니다', () => {
    const invalidDate = 'invalid-date';
    expect(() => formatDateToUTC(invalidDate)).toThrow();
  });

  it('날짜 객체를 문자열로 전달했을 때 포맷을 해야 합니다', () => {
    const date = new Date('2024-12-05T15:30:45Z').toISOString();
    const result = formatDateToUTC(date);
    expect(result).toBe('2024-12-05 15:30:45');
  });

  it('다양한 시간대를 올바르게 처리해야 합니다', () => {
    const dateString = '2024-12-05T00:00:00Z';
    const result = formatDateToUTC(dateString);
    expect(result).toBe('2024-12-05 00:00:00');
  });
});

describe('formatDateToLocal', () => {
  it('UTC 날짜를 로컬 시간으로 포맷해야 합니다', () => {
    const utcDate = '2024-12-10T15:45:00';
    const localDate = formatDateToLocal(utcDate);

    // 로컬 시간대가 UTC+9 (KST)일 경우
    expect(localDate).toBe('2024-12-11 00:45:00');
  });

  it('날짜가 24시간 형식에서 0으로 돌아가야 하는 경우를 처리해야 합니다', () => {
    const utcDate = '2024-12-01T23:30:00';
    const localDate = formatDateToLocal(utcDate);

    // 로컬 시간대가 UTC+9 (KST)일 경우
    expect(localDate).toBe('2024-12-02 08:30:00');
  });

  it('날짜가 올바른 형식으로 반환되는지 확인합니다', () => {
    const utcDate = '2024-12-31T23:59:59';
    const localDate = formatDateToLocal(utcDate);

    // 로컬 시간대가 UTC+9 (KST)일 경우
    expect(localDate).toBe('2025-01-01 08:59:59');
  });

  it('잘못된 날짜 문자열에 대해 오류를 발생시켜야 합니다', () => {
    expect(() => {
      formatDateToLocal('invalid-date');
    }).toThrow('Invalid date string');
  });

  it('UTC 시간을 그대로 로컬 시간대로 유지해야 합니다 (UTC 0시간대)', () => {
    const utcDate = '2024-12-11T00:00:00';
    const localDate = formatDateToLocal(utcDate);

    // 로컬 시간대가 UTC+9 (KST)일 경우
    expect(localDate).toBe('2024-12-11 09:00:00');
  });

  it('윤년 날짜를 올바르게 처리해야 합니다', () => {
    const utcDate = '2024-02-29T12:00:00';
    const localDate = formatDateToLocal(utcDate);

    // 로컬 시간대가 UTC+9 (KST)일 경우
    expect(localDate).toBe('2024-02-29 21:00:00');
  });
});
