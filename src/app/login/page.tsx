/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Link from 'next/link';
import GoggleIcon from '@/assets/svg/goggleIcon.svg';
import ErrorIcon from '@/assets/svg/error.svg';
import { useForm, SubmitHandler } from 'react-hook-form';

import * as S from './Login';

type Inputs = {
  idRequired: string;
  passwordRequired: string;
};

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <div className={S.container}>
      <span className={S.title}>로그인하기</span>
      <span className={S.welcomeTitle}>
        <span className={S.hightLightTitle}>Omocha</span>에서 다양한 상품을 만나보세요!
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={S.inputSection}>
          <label className={S.inputLabel}>
            아이디
            <input
              className={S.loginInput}
              placeholder="아이디"
              type="text"
              {...register('idRequired', { required: true })}
            />
            {errors.idRequired && (
              <span className={S.inputError}>
                <ErrorIcon />
                id field is required
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
                password field is required
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
        <Link href="join" rel="stylesheet">
          <li className={S.option}>회원가입 하기</li>
        </Link>
      </ul>
      <span className={S.snsLoginTitle}>SNS계정으로 간편 로그인 / 회원가입</span>
      <div className={S.snsLoginSection}>
        <Link href="https://www.google.co.kr/" rel="stylesheet">
          <div className={S.snsLoginButton}>
            <GoggleIcon />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
