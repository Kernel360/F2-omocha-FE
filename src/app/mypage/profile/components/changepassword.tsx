'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { EyeOffIcon, EyeIcon } from 'lucide-react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import usePatchPassword from '@/apis/queryHooks/User/usePatchPassword';
import {
  currentPasswordValidation,
  newPasswordCheckValidation,
  newPasswordValidation,
} from '@/app/mypage/profile/utils/profileValidation';
import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';
import useBooleanState from '@/hooks/useBooleanState';
import colors from '@/styles/color';
import sha256 from '@/utils/sha256';

import * as S from './ChangePassword.css';

type Inputs = {
  currentPasswordRequired: string;
  newPasswordRequired: string;
  newPasswordCheckRequired: string;
};

function ChangePassword() {
  const { data: user } = useGetUser();
  const { value: isBlind, toggle: setIsBlind } = useBooleanState();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const newPasswordValue = watch('newPasswordRequired');

  const { mutate: patchPassword } = usePatchPassword();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const currentPasswordSha = await sha256(data.currentPasswordRequired);
    const newPasswordSha = await sha256(data.newPasswordCheckRequired);
    patchPassword({
      current_password: currentPasswordSha,
      new_password: newPasswordSha,
    });
    setValue('currentPasswordRequired', '');
    setValue('newPasswordRequired', '');
    setValue('newPasswordCheckRequired', '');
  };

  return (
    <section className={S.section}>
      <h3 className={S.sectionTitle}>비밀번호 변경</h3>
      {user?.login_type !== 'general' && (
        <span className={S.description}>소셜 로그인 사용자는 비밀번호 변경이 불가능합니다.</span>
      )}
      <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={S.commonInputContainer}>
          <CommonInput
            id="currentPasswordRequired"
            label="현재 비밀번호"
            type={isBlind ? 'text' : 'password'}
            register={register}
            validation={currentPasswordValidation}
            error={errors.currentPasswordRequired}
            disabled={user?.login_type !== 'general'}
          />
          <button className={S.blind} type="button" onClick={setIsBlind}>
            {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
          </button>
        </div>
        <div className={S.commonInputContainer}>
          <CommonInput
            id="newPasswordRequired"
            label="새 비밀번호"
            type={isBlind ? 'text' : 'password'}
            register={register}
            validation={newPasswordValidation}
            error={errors.newPasswordRequired}
            disabled={user?.login_type !== 'general'}
          />
          <button className={S.blind} type="button" onClick={setIsBlind}>
            {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
          </button>
        </div>
        <div className={S.commonInputContainer}>
          <CommonInput
            id="newPasswordCheckRequired"
            label="새 비밀번호 확인"
            type={isBlind ? 'text' : 'password'}
            register={register}
            validation={newPasswordCheckValidation(newPasswordValue)}
            error={errors.newPasswordCheckRequired}
            disabled={user?.login_type !== 'general'}
          />
          <button className={S.blind} type="button" onClick={setIsBlind}>
            {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
          </button>
        </div>
        <div className={S.buttonContainer}>
          <CommonButton disabled={!isValid} content=" 비밀번호 변경" type="submit" size="lg" />
        </div>
      </form>
    </section>
  );
}

export default ChangePassword;
