/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import ErrorIcon from '@/assets/svg/error.svg';
import CheckIcon from '@/assets/svg/check.svg';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useState } from 'react';
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

  const emailValue = watch('emailRequired');
  const passwordValue = watch('passwordRequired');

  const [emailCheck, setEmailCheck] = useState(false);

  const checkEmail = () => {
    if (emailValue === '') {
      return;
    }

    const emailExists = false; // 실제 API를 통해 중복 여부 확인

    if (emailExists) {
      setError('emailRequired', { type: 'manual', message: '중복된 이메일이 있습니다.' });
    } else {
      setEmailCheck(true);
      clearErrors('emailRequired');
    }
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (!emailCheck) {
      setError('emailRequired', { type: 'manual', message: '이메일 중복 확인이 필요합니다.' });
      return;
    }

    console.log(data); // 임시 console
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
                type="email"
                {...register('emailRequired', {
                  required: true,
                  onChange: () => setEmailCheck(false),
                })}
              />
              <button
                type="button"
                disabled={emailCheck}
                className={emailCheck ? S.checkButton.confirm : S.checkButton.default}
                onClick={() => checkEmail()}
              >
                {emailCheck ? '확인완료' : ' 중복확인'}
              </button>
            </div>
            {errors.emailRequired && (
              <span className={`${S.inputValidation} ${S.error}`}>
                <ErrorIcon />
                {errors.emailRequired.type === 'required'
                  ? '이메일을 입력하세요.'
                  : errors.emailRequired.message}
              </span>
            )}
            {emailCheck && (
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
                {errors.passwordRequired.type === 'required'
                  ? '비밀번호를 입력하세요.'
                  : errors.passwordRequired.message}
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
