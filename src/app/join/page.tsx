/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import useGetEmailValidation from '@/apis/queryHooks/Auth/useGetEmailValidation';
import usePostRegister from '@/apis/queryHooks/Auth/usePostRegister';
import CheckIcon from '@/assets/svg/check.svg';
import ErrorIcon from '@/assets/svg/error.svg';
import sha256 from '@/utils/sha256';

import * as S from './Join.css';

type Inputs = {
  emailRequired: string;
  passwordRequired: string;
  passwordCheckRequired: string;
};

function Home() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      emailRequired: '',
      passwordRequired: '',
      passwordCheckRequired: '',
    },
  });

  const emailRequired = watch('emailRequired');
  const passwordValue = watch('passwordRequired');

  const checkEamilError = !!errors.emailRequired; // validation 에러
  const [emailValidationCheck, setEmailValidationCheck] = useState(false); // validation 확인
  const [emailApiCheck, setEmailApiCheck] = useState(false); // api 중복 검사

  const { mutate } = usePostRegister();
  const { data: canUseEmail, error } = useGetEmailValidation(emailApiCheck ? emailRequired : null);

  const handleCheckEmail = () => {
    if (emailRequired === '') return;

    if (!checkEamilError) {
      setEmailValidationCheck(true);
      setEmailApiCheck(true);
    }
  };

  useEffect(() => {
    if (emailApiCheck && canUseEmail) {
      clearErrors('emailRequired');
    }
    if (error) {
      setEmailApiCheck(false);
      setError('emailRequired', { type: 'manual', message: '중복된 이메일이 있습니다.' });
    }
  }, [canUseEmail, clearErrors, emailApiCheck, error, setError]);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const newPassword = await sha256(data.passwordCheckRequired);
    mutate({ email: data.emailRequired, password: newPassword });
  };

  const getButtonStyle = () => {
    // 이메일이 비어 있음 or (이메일에 에러 존재 and 중복 검사가 완료되지 않은 상태)
    if (emailRequired === '' || (checkEamilError && !emailValidationCheck)) {
      return S.checkButton.disabled;
    }
    // 유효성 검사 완료 and 중복 검사 완료
    if (emailValidationCheck && canUseEmail) {
      return S.checkButton.confirm;
    }
    return S.checkButton.default;
  };

  return (
    <div className={S.container}>
      <span className={S.title}>회원가입하기</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={S.inputSection}>
          <label className={S.inputLabel}>
            이메일
            <div className={S.checkInputWrapper}>
              <input
                className={S.joinInput}
                placeholder="이메일을 입력하세요."
                disabled={canUseEmail && emailValidationCheck}
                type="email"
                {...register('emailRequired', {
                  required: '이메일을 입력해 주세요',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: '올바른 이메일 형식이 아니에요',
                  },
                  onChange: () => {
                    setEmailValidationCheck(false);
                    clearErrors('emailRequired');
                  },
                })}
              />
              <button
                type="button"
                disabled={(canUseEmail && emailValidationCheck) || emailRequired === ''}
                className={getButtonStyle()}
                onClick={() => {
                  handleCheckEmail();
                }}
              >
                {emailValidationCheck ? '확인 완료' : '중복 확인'}
              </button>
            </div>
            {errors.emailRequired && (
              <span className={`${S.inputValidation} ${S.error}`}>
                <ErrorIcon />
                {errors.emailRequired.message}
              </span>
            )}
            {emailValidationCheck && canUseEmail && (
              <span className={`${S.inputValidation} ${S.correct}`}>
                <CheckIcon />
                사용 가능한 이메일입니다.
              </span>
            )}
          </label>
          <label className={S.inputLabel}>
            비밀번호
            <input
              className={S.joinInput}
              placeholder="비밀번호를 입력하세요."
              type="password"
              {...register('passwordRequired', {
                required: '비밀번호를 입력하세요.',
                validate: {
                  minLength: value =>
                    value.length >= 8 || '비밀번호는 최소 8글자 이상이어야 합니다.',
                  number: value => /[0-9]/.test(value) || '비밀번호에는 숫자가 포함되어야 합니다.',
                  letter: value =>
                    /[a-zA-Z]/.test(value) || '비밀번호에는 알파벳이 포함되어야 합니다.',
                  specialChar: value =>
                    /[\W_]/.test(value) || '비밀번호에는 특수문자가 포함되어야 합니다.',
                },
              })}
            />
            {errors.passwordRequired && (
              <span className={`${S.inputValidation} ${S.error}`}>
                <ErrorIcon />
                {errors.passwordRequired.message}
              </span>
            )}
          </label>
          <label className={S.inputLabel}>
            비밀번호 확인
            <input
              className={S.joinInput}
              placeholder="비밀번호를 입력하세요."
              type="password"
              {...register('passwordCheckRequired', {
                required: '비밀번호를 입력하세요.',
                validate: value => value === passwordValue || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordCheckRequired && (
              <span className={`${S.inputValidation} ${S.error}`}>
                <ErrorIcon />
                {errors.passwordCheckRequired.message}
              </span>
            )}
          </label>
        </div>
        <input className={S.submitButton} type="submit" value="회원가입" />
      </form>
    </div>
  );
}

export default Home;
