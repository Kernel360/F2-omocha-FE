/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { TriangleAlert as TriangleAlertIcon } from 'lucide-react';

import useGetEmailValidation from '@/apis/queryHooks/Auth/useGetEmailValidation';
import usePostRegister from '@/apis/queryHooks/Auth/usePostRegister';
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from '@/app/join/utils/joinValidation';
import CheckIcon from '@/assets/svg/check.svg';
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
  const passwordRequired = watch('passwordRequired');

  const checkEmailError = !!errors.emailRequired; // validation 에러
  const [emailValidationCheck, setEmailValidationCheck] = useState(false); // validation 확인
  const [emailApiCheck, setEmailApiCheck] = useState(false); // api 중복 검사

  const { mutate } = usePostRegister();
  const { data: canUseEmail, error } = useGetEmailValidation(emailApiCheck ? emailRequired : null);

  const handleCheckEmail = () => {
    if (emailRequired === '') return;

    if (!checkEmailError) {
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
    if (emailRequired === '' || (checkEmailError && !emailValidationCheck)) {
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
                  ...emailValidation,
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
                <TriangleAlertIcon width={17} height={17} />
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
              {...register('passwordRequired', passwordValidation)}
            />
            {errors.passwordRequired && (
              <span className={`${S.inputValidation} ${S.error}`}>
                <TriangleAlertIcon width={17} height={17} />
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
              {...register('passwordCheckRequired', confirmPasswordValidation(passwordRequired))}
            />
            {errors.passwordCheckRequired && (
              <span className={`${S.inputValidation} ${S.error}`}>
                <TriangleAlertIcon width={17} height={17} />
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
