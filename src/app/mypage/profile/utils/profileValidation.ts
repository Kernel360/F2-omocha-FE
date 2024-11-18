export const currentPasswordValidation = {
  required: '현재 비밀번호를 입력해 주세요.',
  validate: {
    minLength: (value: string) => value.length >= 8 || '비밀번호는 최소 8글자 이상이어야 합니다.',
    number: (value: string) => /[0-9]/.test(value) || '비밀번호에는 숫자가 포함되어야 합니다.',
    letter: (value: string) => /[a-zA-Z]/.test(value) || '비밀번호에는 알파벳이 포함되어야 합니다.',
    specialChar: (value: string) =>
      /[\W_]/.test(value) || '비밀번호에는 특수문자가 포함되어야 합니다.',
  },
};

export const newPasswordValidation = {
  required: '새 비밀번호를 입력해 주세요.',
  validate: {
    minLength: (value: string) => value.length >= 8 || '비밀번호는 최소 8글자 이상이어야 합니다.',
    number: (value: string) => /[0-9]/.test(value) || '비밀번호에는 숫자가 포함되어야 합니다.',
    letter: (value: string) => /[a-zA-Z]/.test(value) || '비밀번호에는 알파벳이 포함되어야 합니다.',
    specialChar: (value: string) =>
      /[\W_]/.test(value) || '비밀번호에는 특수문자가 포함되어야 합니다.',
  },
};

export const newPasswordCheckValidation = (newPasswordValue: string) => ({
  required: '비밀번호를 입력하세요.',
  validate: (value: string) => value === newPasswordValue || '비밀번호가 일치하지 않습니다.',
});
