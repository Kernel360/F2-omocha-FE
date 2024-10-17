/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import ErrorIcon from '@/assets/svg/error.svg';
import useUserStore from '@/store/useUserStore';

import * as S from './Profile.css';

type Inputs = {
  currentPasswordRequired: string;
  newPasswordRequired: string;
  newPasswordCheckRequired: string;
};

function Home() {
  const user = useUserStore(state => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const newPasswordValue = watch('newPasswordRequired');

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
  };

  return (
    <div className={S.profile}>
      <h2>회원 정보 수정</h2>
      <section className={S.section}>
        <h3>계정</h3>
        <label htmlFor="id" className={S.label}>
          <span>아이디</span>
          <input className={S.input.disabled} id="id" type="text" value={user?.email} disabled />
        </label>
      </section>
      <section className={S.section}>
        <h3>비밀번호 변경</h3>
        <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="currentPw" className={S.label}>
            <span>현재 비밀번호</span>
            <input
              className={S.input.default}
              id="currentPw"
              type="password"
              {...register('currentPasswordRequired', {
                required: '현재 비밀번호를 입력해 주세요.',
              })}
            />
          </label>
          {errors.currentPasswordRequired && (
            <span className={S.inputError}>
              <ErrorIcon />
              {errors.currentPasswordRequired.message}
            </span>
          )}
          <label htmlFor="newPw" className={S.label}>
            <span>새 비밀번호</span>
            <input
              className={S.input.default}
              id="newPw"
              type="password"
              {...register('newPasswordRequired', {
                required: '새 비밀번호를 입력해 주세요.',
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
          </label>
          {errors.newPasswordRequired && (
            <span className={S.inputError}>
              <ErrorIcon />
              {errors.newPasswordRequired.message}
            </span>
          )}
          <label htmlFor="newPwCheck" className={S.label}>
            <span>새 비밀번호 확인</span>
            <input
              className={S.input.default}
              id="newPwCheck"
              type="password"
              {...register('newPasswordCheckRequired', {
                required: '새 비밀번호 확인을 입력해 주세요.',
                validate: value => value === newPasswordValue || '비밀번호가 일치하지 않습니다.',
              })}
            />
          </label>
          {errors.newPasswordCheckRequired && (
            <span className={S.inputError}>
              <ErrorIcon />
              {errors.newPasswordCheckRequired.message}
            </span>
          )}
          <div className={S.buttonContainer}>
            <button className={S.button} type="submit">
              비밀번호 변경
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Home;
