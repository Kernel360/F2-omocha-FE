function convertQueryParamsObjectToString<T extends { [K in keyof T]: T[K] }>(params: T) {
  const stringParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  );

  const queryString = new URLSearchParams(stringParams).toString();

  return queryString;
}

export default convertQueryParamsObjectToString;
