import Link from 'next/link';
import GoggleIcon from '@/assets/svg/goggleIcon.svg';
import * as S from './login.css';

function Home() {
  return (
    <div className={S.container}>
      <span className={S.title}>로그인하기</span>
      <span className={S.welcomeTitle}>
        <span className={S.hightLightTitle}>Omocha</span>에서 다양한 상품을 만나보세요!
      </span>
      <div className={S.inputSection}>
        <input className={S.loginInput} type="text" placeholder="아이디" />
        <input className={S.loginInput} type="password" placeholder="비밀번호" />
      </div>
      <button className={S.submitButton} type="submit">
        로그인
      </button>
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

// hook form 도입하면 바뀔지도 그냥 영역만 보기..
