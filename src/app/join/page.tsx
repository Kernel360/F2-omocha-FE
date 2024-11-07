/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import useGetEmailValidation from '@/apis/queryHooks/Auth/useGetEmailValidation';
import usePostRegister from '@/apis/queryHooks/Auth/usePostRegister';
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from '@/app/join/utils/joinValidation';
import CheckIcon from '@/assets/svg/check.svg';
import CommonButton from '@/components/CommonButton';
import CommonButtonInput from '@/components/CommonButtonInput';
import CommonInput from '@/components/CommonInput';
import MaxLayout from '@/components/MaxLayout';
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
      return true;
    }
    // 유효성 검사 완료 and 중복 검사 완료
    if (emailValidationCheck && canUseEmail) {
      return false;
    }
    return false;
  };

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <span className={S.title}>회원가입하기</span>
          <form onSubmit={handleSubmit(onSubmit)} className={S.inputSection}>
            <CommonButtonInput
              id="emailRequired"
              label="이메일"
              button={
                <div className={S.duplicateCheckButtonWrapper}>
                  <CommonButton
                    content="중복 확인"
                    size="sm"
                    disabled={getButtonStyle()}
                    onClick={handleCheckEmail}
                    type="button"
                  />
                </div>
              }
              type="email"
              placeholder="이메일을 입력하세요."
              register={register}
              validation={{
                ...emailValidation,
                onChange: () => {
                  setEmailValidationCheck(false);
                  clearErrors('emailRequired');
                },
              }}
              error={errors.emailRequired}
              onClick={handleCheckEmail}
            />
            {emailValidationCheck && canUseEmail && (
              <span className={`${S.inputValidation} ${S.correct}`}>
                <CheckIcon />
                사용 가능한 이메일입니다.
              </span>
            )}
            <CommonInput
              id="passwordRequired"
              label="비밀번호"
              type="password"
              register={register}
              validation={passwordValidation}
              error={errors.passwordRequired}
            />
            <CommonInput
              id="passwordCheckRequired"
              label="비밀번호 확인"
              type="password"
              register={register}
              validation={confirmPasswordValidation(passwordRequired)}
              error={errors.passwordCheckRequired}
            />
            <div className={S.buttonWrapper}>
              <CommonButton content="회원가입" type="submit" size="lg" />
            </div>
          </form>
        </div>
      </MaxLayout>
    </div>
  );
}

export default Home;
