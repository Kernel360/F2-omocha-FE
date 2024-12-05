'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import Link from 'next/link';

import useLogin from '@/apis/queryHooks/Auth/useLogin';
import GoogleIcon from '@/assets/svg/google.svg';
import NaverIcon from '@/assets/svg/naver.svg';
import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';
import MaxLayout from '@/components/MaxLayout';
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

  const { mutate: login } = useLogin();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    const newPassword = await sha256(data.passwordRequired);

    login({
      email: data.emailRequired,
      password: newPassword,
    });
  };

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <span className={S.title}>로그인하기</span>
          <span className={S.welcomeTitle}>
            <span className={S.hightLightTitle}>Omocha</span>에서 다양한 상품을 만나보세요!
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className={S.inputSection}>
            <CommonInput
              id="emailRequired"
              label="이메일"
              register={register}
              validation={{
                required: '이메일을 입력해 주세요.',
              }}
              error={errors.emailRequired}
            />
            <CommonInput
              id="passwordRequired"
              label="비밀번호"
              type="password"
              register={register}
              validation={{
                required: '비밀번호를 입력해 주세요.',
              }}
              error={errors.passwordRequired}
            />
            <div className={S.buttonWrapper}>
              <CommonButton content="로그인" type="submit" size="lg" />
            </div>
          </form>
          <ul className={S.optionSection}>
            <Link href="join" rel="stylesheet" scroll={false}>
              <li className={S.option}>회원가입 하기</li>
            </Link>
          </ul>
          <span className={S.snsLoginTitle}>SNS계정으로 간편 로그인 / 회원가입</span>
          <div className={S.snsLoginSection}>
            <Link href={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/oauth/authorize/google`}>
              <div className={S.snsLoginButton.goggle}>
                <GoogleIcon />
              </div>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/oauth/authorize/naver`}>
              <div className={S.snsLoginButton.naver}>
                <NaverIcon />
              </div>
            </Link>
          </div>
        </div>
      </MaxLayout>
    </div>
  );
}

export default Home;
