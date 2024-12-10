import { maskEmail, countContentText } from '@/utils/textUtils';

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

describe('countContentText', () => {
  it('빈 배열에 대해 0을 반환해야 한다', () => {
    const data = '[]';
    expect(countContentText(JSON.parse(data))).toBe(0);
  });

  it('텍스트 노드의 글자 수를 정확하게 계산해야 한다', () => {
    const data = '[{"type": "paragraph", "children": [{"text": "Hello World"}]}]';
    expect(countContentText(JSON.parse(data))).toBe(11); // "Hello World"의 글자 수
  });

  it('중첩된 요소들의 글자 수를 계산해야 한다', () => {
    const data =
      '[{"type": "paragraph", "children": [{"text": "Hello"}]}, {"type": "paragraph", "children": [{"text": "World"}]}]';
    expect(countContentText(JSON.parse(data))).toBe(10); // "Hello"와 "World"의 글자 수 합
  });

  it('빈 텍스트 노드는 건너뛰어야 한다', () => {
    const data = '[{"type": "paragraph", "children": [{"text": ""}]}]';
    expect(countContentText(JSON.parse(data))).toBe(0); // 빈 텍스트 노드가 포함된 경우
  });

  it('여러 텍스트 노드의 글자 수를 계산해야 한다', () => {
    const data =
      '[{"type": "paragraph", "children": [{"text": "afj;sflkdjfoiwjefwefwefwefw    fwfeewfwfefwe"}]}, {"type": "paragraph", "children": [{"text": ""}]}, {"type": "paragraph", "children": [{"text": "dkfjo  wijieow   jfiwfw", "bold": true}]}, {"type": "paragraph", "children": [{"text": "dfwefe   iieieie", "code": true, "underline": true, "italic": true}]}, {"type": "paragraph", "children": [{"code": true, "underline": true, "italic": true, "text": ""}]}, {"type": "block-quote", "children": [{"code": true, "text": "lkdfjwoi  안녕   ejfoiw", "bold": true}], "align": "center"}]';
    expect(countContentText(JSON.parse(data))).toBe(104);
  });
});
