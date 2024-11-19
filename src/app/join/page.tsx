/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { CheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

import useCheckEmailValidation from '@/apis/queryHooks/Auth/useCheckEmailValidation';
import usePostRegister from '@/apis/queryHooks/Auth/usePostRegister';
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

  const { value: isBlind, toggle: setIsBlind } = useBooleanState();

  const emailRequired = watch('emailRequired');
  const passwordRequired = watch('passwordRequired');

  const checkEmailError = errors.emailRequired; // validation 에러

  const { mutate } = usePostRegister();

  const { mutate: checkEmailNew, canUseEmail, setCanUseEmail, error } = useCheckEmailValidation(); // mutate로

  const handleCheckEmail = () => {
    if (emailRequired === '') return;

    if (!checkEmailError || checkEmailError.message === '이메일 중복을 해야합니다.') {
      // 에러가 존재(이메일 중복 검사를 진행하라)하지만 에러 중에서 중복 확인을 안한 에러에서는 해당 이벤트가 호출될 수 있어야함.
      checkEmailNew(emailRequired);
    }
  };

  useEffect(() => {
    if (canUseEmail) {
      clearErrors('emailRequired');
    }
    if (error) {
      setError('emailRequired', { type: 'manual', message: '중복된 이메일이 있습니다.' });
    }
  }, [canUseEmail, error]);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const newPassword = await sha256(data.passwordCheckRequired);

    if (!canUseEmail) {
      setError('emailRequired', { type: 'manual', message: '이메일 중복을 해야합니다.' });
    }
    if (!checkEmailError && canUseEmail) {
      mutate({ email: data.emailRequired, password: newPassword });
    }
  };

  const getButtonStyle = () => {
    // 이메일이 비어 있음
    if (emailRequired === '') {
      return true; // 꺼진상태
    }
    // 유효성 검사 이상 없음 and 중복 검사 완료
    if (!checkEmailError && canUseEmail) {
      return true; // 꺼진상태
    }
    // 유효성 검사 이상 없음 and 중복 검사 미완료
    if (!checkEmailError && !canUseEmail) {
      return false; // 꺼진상태
    }
    return false; // 켜진상태
  };

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <span className={S.title}>회원가입하기</span>
          <form onSubmit={handleSubmit(onSubmit)} className={S.inputSection}>
            <CommonInput
              id="emailRequired"
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요."
              register={register}
              validation={{
                ...emailValidation,
                onChange: () => {
                  setCanUseEmail(false);
                  clearErrors('emailRequired');
                },
              }}
              error={errors.emailRequired}
            >
              <div className={S.duplicateCheckButtonWrapper}>
                <CommonButton
                  content="중복 확인"
                  size="sm"
                  disabled={getButtonStyle()}
                  onClick={handleCheckEmail}
                  type="button"
                />
              </div>
            </CommonInput>
            {!checkEmailError && canUseEmail && (
              <span className={`${S.inputValidation} ${S.correct}`}>
                <CheckIcon size={16} />
                사용 가능한 이메일입니다.
              </span>
            )}
            <div className={S.commonInputContainer}>
              <CommonInput
                id="passwordRequired"
                label="비밀번호"
                type="password"
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
                type="password"
                register={register}
                validation={confirmPasswordValidation(passwordRequired)}
                error={errors.passwordCheckRequired}
              />
              <button className={S.blind} type="button" onClick={setIsBlind}>
                {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
              </button>
            </div>

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
