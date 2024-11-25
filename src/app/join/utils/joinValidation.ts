export const emailValidation = {
  required: '이메일을 입력해 주세요',
  pattern: {
    value: /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
    message: '올바른 이메일 형식이 아니에요',
  },
};

export const passwordValidation = {
  required: '비밀번호를 입력하세요.',
  validate: {
    minLength: (value: string) => value.length >= 8 || '비밀번호는 최소 8글자 이상이어야 합니다.',
    number: (value: string) => /[0-9]/.test(value) || '비밀번호에는 숫자가 포함되어야 합니다.',
    letter: (value: string) => /[a-zA-Z]/.test(value) || '비밀번호에는 알파벳이 포함되어야 합니다.',
    specialChar: (value: string) =>
      /[\W_]/.test(value) || '비밀번호에는 특수문자가 포함되어야 합니다.',
  },
};

export const confirmPasswordValidation = (passwordValue: string) => ({
  required: '비밀번호를 입력하세요.',
  validate: (value: string) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
});
