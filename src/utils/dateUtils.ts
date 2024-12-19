function calculateDDay(endTime: string) {
  if (Number.isNaN(new Date(endTime).getTime())) {
    throw new Error('Invalid date format');
  }

  const dDay = Math.floor(
    (new Date(endTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  return dDay;
}

function calcRemainingTime(endTimeInCountRemainingTime: Date) {
  const nowTime = new Date();

  if (endTimeInCountRemainingTime.getTime() < nowTime.getTime()) {
    return 0;
  }

  return endTimeInCountRemainingTime.getTime() - nowTime.getTime();
}

function formatDateToUTC(dateString: string): string {
  const date = new Date(`${dateString}Z`); // 'Z'를 붙여 UTC로 변환

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // UTC 월은 0부터 시작하므로 +1
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDateToLocal(dateString: string): string {
  const date = new Date(`${dateString}`); // 'Z'를 붙여 UTC로 변환

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // 로컬 시간대에서 날짜를 포맷
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24시간 포맷
  });

  const formattedDate = formatter.format(date);

  const cleanedInput = formattedDate.replace(/[.]/g, '').replace(/\s+/g, ' ');
  const [year, month, day, time] = cleanedInput.split(' ');
  // eslint-disable-next-line prefer-const
  let [hour, minute, second] = time.split(':').map(Number);

  if (hour >= 24) {
    hour -= 24;
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate());
    const adjustedDay = String(adjustedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${adjustedDay} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  }

  return `${year}-${month}-${day} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24시간 포맷
  });

  const parts = formatter.formatToParts(date);

  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  const hour = parts.find(part => part.type === 'hour')?.value;
  const minute = parts.find(part => part.type === 'minute')?.value;
  const second = parts.find(part => part.type === 'second')?.value;

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export { calcRemainingTime, calculateDDay, formatDateToUTC, formatDateToLocal, formatDate };
