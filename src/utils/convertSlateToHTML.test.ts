import { convertSlateToHTML } from './convertSlateToHTML';

describe('convertSlateToHTML', () => {
  it('빈 배열에 대해 빈 문자열을 반환해야 한다', () => {
    const data = '[]';
    expect(convertSlateToHTML(JSON.parse(data))).toBe('');
  });

  it('단순 텍스트 노드를 HTML로 변환해야 한다', () => {
    const data = '[{"type": "paragraph", "children": [{"text": "Hello World"}]}]';
    expect(convertSlateToHTML(JSON.parse(data))).toBe(
      '<p style="text-align: left;">Hello World</p>',
    );
  });

  it('중첩된 요소들의 내용을 HTML로 변환해야 한다', () => {
    const data =
      '[{"type": "paragraph", "children": [{"text": "Hello"}]}, {"type": "paragraph", "children": [{"text": "World"}]}]';
    expect(convertSlateToHTML(JSON.parse(data))).toBe(
      '<p style="text-align: left;">Hello</p><p style="text-align: left;">World</p>',
    );
  });

  it('빈 텍스트 노드는 HTML로 변환하지 않아야 한다', () => {
    const data = '[{"type": "paragraph", "children": [{"text": ""}]}]';
    expect(convertSlateToHTML(JSON.parse(data))).toBe('<p style="text-align: left;"></p>');
  });
});
