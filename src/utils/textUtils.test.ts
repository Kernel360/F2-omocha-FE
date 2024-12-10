import { maskEmail } from './textUtils'; // 파일 경로는 실제 파일 위치로 변경

describe('maskEmail', () => {
  it('로컬 부분이 1글자일 경우 빈 문자열을 반환해야 한다', () => {
    expect(maskEmail('a@domain.com')).toBe('');
  });

  it('로컬 부분이 2글자일 경우 두 번째 문자를 마스킹해야 한다', () => {
    expect(maskEmail('ab@domain.com')).toBe('a*@domain.com');
  });

  it('로컬 부분의 첫 2글자와 마지막 1글자를 남기고 중간을 마스킹해야 한다', () => {
    expect(maskEmail('abcde@domain.com')).toBe('ab**e@domain.com');
  });

  it('로컬 부분이 1글자 이하인 경우 마스킹하지 않아야 한다', () => {
    expect(maskEmail('a@domain.com')).toBe('');
    expect(maskEmail('@domain.com')).toBe('');
  });

  it('다양한 길이의 이메일 주소를 적절히 처리해야 한다', () => {
    expect(maskEmail('longemailaddress@domain.com')).toBe('lo*************s@domain.com');
  });
});
