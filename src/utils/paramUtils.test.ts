import { convertQueryParamsObjectToString, filteredParams } from './paramUtils'; // 경로를 실제 파일 위치에 맞게 수정

describe('convertQueryParamsObjectToString', () => {
  it('객체를 쿼리 문자열로 변환해야 합니다', () => {
    const params = {
      name: 'John Doe Haha',
      age: 30,
      hobbies: ['reading', 'coding'],
      emptyField: '',
      nullField: null,
      undefinedField: undefined,
    };

    const result = convertQueryParamsObjectToString(params);

    expect(result).toBe('name=John%20Doe%20Haha&age=30&hobbies=reading&hobbies=coding');
  });

  it('모든 값이 비어 있는 경우 빈 문자열을 반환해야 합니다', () => {
    const params = {
      emptyField: '',
      nullField: null,
      undefinedField: undefined,
    };

    const result = convertQueryParamsObjectToString(params);
    expect(result).toBe('');
  });

  it('단일 항목이 있는 객체를 처리할 수 있어야 합니다', () => {
    const params = {
      name: 'Alice',
    };

    const result = convertQueryParamsObjectToString(params);
    expect(result).toBe('name=Alice');
  });
});

describe('filteredParams', () => {
  it('null, undefined, 빈 문자열 값을 가진 키를 제거해야 합니다', () => {
    const params = {
      name: 'John',
      age: null,
      city: '',
      country: 'USA',
      profession: undefined,
    };

    const result = filteredParams(params);
    expect(result).toEqual({ name: 'John', country: 'USA' });
  });

  it('모든 값이 제거될 경우 빈 객체를 반환해야 합니다', () => {
    const params = {
      field1: '',
      field2: null,
      field3: undefined,
    };

    const result = filteredParams(params);
    expect(result).toEqual({});
  });

  it('모든 값이 유효한 경우 원래 객체를 반환해야 합니다', () => {
    const params = {
      name: 'Alice',
      age: 25,
      city: 'New York',
    };

    const result = filteredParams(params);
    expect(result).toEqual(params);
  });
});
