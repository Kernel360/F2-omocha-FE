/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { EyeIcon, EyeOffIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';

import useCheckEmailAuthCode from '@/apis/queryHooks/Auth/useCheckEmailAuthCode';
import usePostEmailAuth from '@/apis/queryHooks/Auth/usePostEmailAuth';
import usePostRegister from '@/apis/queryHooks/Auth/usePostRegister';
import AuthCodeTimer from '@/app/join/components/authcodetimer';
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from '@/app/join/utils/joinValidation';
import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';
import MaxLayout from '@/components/MaxLayout';
import useBooleanState from '@/hooks/useBooleanState';
import colors from '@/styles/color';
import sha256 from '@/utils/sha256';

import * as S from './Join.css';

type JoinInputs = {
  emailRequired: string;
  passwordRequired: string;
  passwordCheckRequired: string;
  authCodeRequired: string;
};

const DB_TIME = 300; // 5분

function Home() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JoinInputs>({
    mode: 'onChange',
  });

  const { value: isBlind, toggle: setIsBlind } = useBooleanState();
  const [isOpenAuthCode, setIsOpenAuthCode] = useState(false);
  const [count, setCount] = useState(DB_TIME);

  const emailRequired = watch('emailRequired');
  const passwordRequired = watch('passwordRequired');
  const authCodeRequired = watch('authCodeRequired');

  const checkEmailError = !!errors.emailRequired; // validation 에러, true면 에러 존재/false면 에러 없음

  const { mutate: postEmailAuth } = usePostEmailAuth(setIsOpenAuthCode);
  const { data: checkAuthCode, mutate: checkEmailAuthCode } =
    useCheckEmailAuthCode(setIsOpenAuthCode);
  const { mutate: join } = usePostRegister();

  const handleEmailAuth = (type: 'first' | 'resend') => {
    if (emailRequired === '') return;

    if (!checkEmailError) {
      if (type === 'first') {
        postEmailAuth(emailRequired);
        setCount(DB_TIME);
        setValue('authCodeRequired', '');
      }

      if (type === 'resend') {
        postEmailAuth(emailRequired);

        if (count === 0) {
          setCount(DB_TIME);
        }
      }
    }
  };

  const handleEmailAuthCode = () => {
    if (authCodeRequired === '') return;
    checkEmailAuthCode({ email: emailRequired, code: authCodeRequired });
  };

  const onSubmit: SubmitHandler<JoinInputs> = async data => {
    const newPassword = await sha256(data.passwordCheckRequired);
    join({ email: emailRequired, password: newPassword });
  };

  const getButtonStyle = (type: 'code' | 'verify') => {
    if (type === 'code') {
      return emailRequired === '' || checkEmailError;
    }

    if (type === 'verify') {
      return !authCodeRequired || emailRequired === '' || checkEmailError;
    }

    return true;
  };

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <span className={S.title}>회원가입하기</span>
          <form onSubmit={handleSubmit(onSubmit)} className={S.inputSection}>
            <div className={S.emailSection}>
              <CommonInput
                id="emailRequired"
                label="이메일"
                type="email"
                placeholder="이메일을 입력하세요."
                register={register}
                disabled={checkAuthCode?.result_data}
                validation={{
                  ...emailValidation,
                  onChange: () => {
                    setIsOpenAuthCode(false);
                  },
                }}
                error={errors.emailRequired}
              />
              <CommonButton
                content={checkAuthCode?.result_data ? '인증완료' : '인증하기'}
                size="lg"
                disabled={getButtonStyle('code') || isOpenAuthCode || checkAuthCode?.result_data}
                onClick={() => handleEmailAuth('first')}
                type="button"
              />
              {isOpenAuthCode && (
                <div className={S.emailSection}>
                  <CommonInput
                    id="authCodeRequired"
                    label="인증코드"
                    type="text"
                    register={register}
                    placeholder="인증코드를 입력하세요."
                  >
                    <div className={S.checkEmailAuthCodeButton}>
                      <CommonButton
                        content="확인"
                        size="sm"
                        type="button"
                        disabled={getButtonStyle('verify') || count === 0}
                        onClick={handleEmailAuthCode}
                      />
                    </div>
                  </CommonInput>
                  {count === 0 && (
                    <span className={S.error}>
                      <TriangleAlertIcon size={16} />
                      {`인증 시간이 초과되었습니다. '이메일 재전송하기'를 눌러주세요.`}
                    </span>
                  )}
                  <div className={S.emailDescription}>
                    <InfoIcon size={13} />
                    <span>이메일을 받지 못하셨나요?</span>
                    <button
                      type="button"
                      onClick={() => handleEmailAuth('resend')}
                      className={S.emailSendButton}
                    >
                      이메일 재전송하기
                    </button>
                    <AuthCodeTimer count={count} setCount={setCount} />
                  </div>
                </div>
              )}
            </div>
            <div className={S.commonInputContainer}>
              <CommonInput
                id="passwordRequired"
                label="비밀번호"
                type={isBlind ? 'text' : 'password'}
                register={register}
                validation={passwordValidation}
                error={errors.passwordRequired}
              />
              <button className={S.blind} type="button" onClick={setIsBlind}>
                {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
              </button>
            </div>
            <div className={S.commonInputContainer}>
              <CommonInput
                id="passwordCheckRequired"
                label="비밀번호 확인"
                type={isBlind ? 'text' : 'password'}
                register={register}
                validation={confirmPasswordValidation(passwordRequired)}
                error={errors.passwordCheckRequired}
              />
              <button className={S.blind} type="button" onClick={setIsBlind}>
                {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
              </button>
            </div>

            <div className={S.buttonWrapper}>
              <CommonButton
                content="회원가입"
                type="submit"
                size="lg"
                disabled={!checkAuthCode?.result_data}
              />
            </div>
          </form>
        </div>
      </MaxLayout>
    </div>
  );
}

export default Home;
