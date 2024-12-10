function convertQueryParamsObjectToString<T extends { [K in keyof T]: T[K] }>(params: T) {
  const stringParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '' || value === null) return;
    if (Array.isArray(value)) {
      value.forEach(val => stringParams.append(key, String(val)));
    } else {
      stringParams.append(key, String(value));
    }
  });

  // .append() 메서드는 문자열을 application/x-www-form-urlencoded 형식에 맞게 인코딩 -> 공백은 +로 변환
  // 공백 + 를 %20으로 변환 (URL 인코딩 과정)
  return stringParams.toString().replace(/\+/g, '%20');
}

function filteredParams<T extends object>(params: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  ) as Partial<T>;
}

export { filteredParams, convertQueryParamsObjectToString };
