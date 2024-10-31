/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import Link from 'next/link';

import usePostLogin from '@/apis/queryHooks/Auth/usePostLogin';
import GoogleIcon from '@/assets/svg/google.svg';
import NaverIcon from '@/assets/svg/naver.svg';
import ErrorIcon from '@/assets/svg/triangle-alert.svg';
import sha256 from '@/utils/sha256';

import * as S from './Login.css';

type Inputs = {
  emailRequired: string;
  passwordRequired: string;
};

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: login } = usePostLogin();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const newPassword = await sha256(data.passwordRequired);

    login({
      email: data.emailRequired,
      password: newPassword,
    });
  };

  return (
    <div className={S.container}>
      <span className={S.title}>로그인하기</span>
      <span className={S.welcomeTitle}>
        <span className={S.hightLightTitle}>Omocha</span>에서 다양한 상품을 만나보세요!
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={S.inputSection}>
          <label className={S.inputLabel}>
            이메일
            <input
              className={S.loginInput}
              placeholder="아이디"
              type="text"
              {...register('emailRequired', { required: true })}
            />
            {errors.emailRequired && (
              <span className={S.inputError}>
                <ErrorIcon />
                이메일을 입력해 주세요.
              </span>
            )}
          </label>
          <label className={S.inputLabel}>
            비밀번호
            <input
              className={S.loginInput}
              placeholder="비밀번호"
              type="password"
              {...register('passwordRequired', { required: true })}
            />
            {errors.passwordRequired && (
              <span className={S.inputError}>
                <ErrorIcon />
                비밀번호를 입력해 주세요.
              </span>
            )}
          </label>
        </div>
        <input className={S.submitButton} type="submit" value="로그인" />
      </form>
      <ul className={S.optionSection}>
        <li className={S.option}>아이디 찾기</li>
        <hr className={S.division} />
        <li className={S.option}>비밀번호 찾기</li>
        <hr className={S.division} />
        <Link href="join" rel="stylesheet" scroll={false}>
          <li className={S.option}>회원가입 하기</li>
        </Link>
      </ul>
      <span className={S.snsLoginTitle}>SNS계정으로 간편 로그인 / 회원가입</span>
      <div className={S.snsLoginSection}>
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/oauth/authorize/google`}>
          <div className={S.snsLoginButton.goggle}>
            <GoogleIcon />
          </div>
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/oauth/authorize/naver`}>
          <div className={S.snsLoginButton.naver}>
            <NaverIcon />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
