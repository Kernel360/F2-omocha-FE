'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import Link from 'next/link';

import useLogin from '@/apis/queryHooks/Auth/useLogin';
import GoogleIcon from '@/assets/svg/google.svg';
import NaverIcon from '@/assets/svg/naver.svg';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';
import MaxLayout from '@/components/MaxLayout';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';
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

    mixpanel.track(EVENT_ID.LOGIN_SUBMIT_BUTTON_CLICKED);
    mixpanel.identify(data.emailRequired);
    mixpanel.people.set({
      $email: data.emailRequired,
      login_type: 'general',
    });
  };

  const handleSocialLoginMixpanel = (type: 'naver' | 'google') => {
    if (type === 'google') {
      mixpanel.track(EVENT_ID.LOGIN_WITH_GOOGLE_BUTTON_CLICKED);
      // 사용자 정보 업데이트
      return;
    }

    if (type === 'naver') {
      mixpanel.track(EVENT_ID.LOGIN_WITH_NAVER_BUTTON_CLICKED);
      // 사용자 정보 업데이트
    }
  };

  const handleJoinMixpanel = () => {
    mixpanel.track(EVENT_ID.JOIN_BUTTON_CLICKED);
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
            <Link href="join" rel="stylesheet" scroll={false} onClick={handleJoinMixpanel}>
              <li className={S.option}>회원가입 하기</li>
            </Link>
          </ul>
          <span className={S.snsLoginTitle}>SNS계정으로 간편 로그인 / 회원가입</span>
          <div className={S.snsLoginSection}>
            <Link
              href={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/oauth/authorize/google`}
              onClick={() => handleSocialLoginMixpanel('google')}
            >
              <div className={S.snsLoginButton.goggle}>
                <GoogleIcon />
              </div>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/oauth/authorize/naver`}
              onClick={() => handleSocialLoginMixpanel('naver')}
            >
              <div className={S.snsLoginButton.naver}>
                <NaverIcon />
              </div>
            </Link>
          </div>
        </div>
      </MaxLayout>
      <ClientSidePageRef eventId={EVENT_ID.LOGIN_PAGE_VIEWED} />
    </div>
  );
}

export default Home;
