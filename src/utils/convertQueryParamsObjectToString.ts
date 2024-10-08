function convertQueryParamsObjectToString<T extends { [K in keyof T]: T[K] }>(params: T) {
  const stringParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(val => stringParams.append(key, String(val)));
    } else {
      stringParams.append(key, String(value));
    }
  });

  return stringParams.toString();
}

export default convertQueryParamsObjectToString;
