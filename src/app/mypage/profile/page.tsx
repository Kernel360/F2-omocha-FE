'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';

import * as S from './Profile.css';

type Inputs = {
  currentPasswordRequired: string;
  newPasswordRequired: string;
  newPasswordCheckRequired: string;
};

function Home() {
  const user = useGetUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const newPasswordValue = watch('newPasswordRequired');

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
  };

  return (
    <div className={S.profile}>
      <h2>회원 정보 수정</h2>
      <section className={S.section}>
        <h3 className={S.sectionTitle}>계정</h3>
        <CommonInput label="아이디" id="email" value={user.data?.email} disabled />
      </section>
      <section className={S.section}>
        <h3 className={S.sectionTitle}>비밀번호 변경</h3>
        <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            id="currentPasswordRequired"
            label="현재 비밀번호"
            type="password"
            register={register}
            validation={{
              required: '현재 비밀번호를 입력해 주세요.',
            }}
            error={errors.currentPasswordRequired}
          />

          <CommonInput
            id="newPasswordRequired"
            label="새 비밀번호"
            type="password"
            register={register}
            validation={{
              required: '새 비밀번호를 입력해 주세요.',
              validate: {
                minLength: value => value.length >= 8 || '비밀번호는 최소 8글자 이상이어야 합니다.',
                number: value => /[0-9]/.test(value) || '비밀번호에는 숫자가 포함되어야 합니다.',
                letter: value =>
                  /[a-zA-Z]/.test(value) || '비밀번호에는 알파벳이 포함되어야 합니다.',
                specialChar: value =>
                  /[\W_]/.test(value) || '비밀번호에는 특수문자가 포함되어야 합니다.',
              },
            }}
            error={errors.newPasswordRequired}
          />
          <CommonInput
            id="newPasswordCheckRequired"
            label="새 비밀번호 확인"
            type="password"
            register={register}
            validation={{
              required: '새 비밀번호 확인을 입력해 주세요.',
              validate: value => value === newPasswordValue || '비밀번호가 일치하지 않습니다.',
            }}
            error={errors.newPasswordCheckRequired}
          />
          <div className={S.buttonContainer}>
            <CommonButton disabled={!isValid} content=" 비밀번호 변경" type="submit" size="lg" />
          </div>
        </form>
      </section>
    </div>
  );
}

export default Home;
