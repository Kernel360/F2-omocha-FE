import * as S from '@/components/Footer/Footer.css';

function Footer() {
  return (
    <div className={S.container}>
      <div className={S.topFooter}>
        <h2>LOGO</h2>
        <ul className={S.categoryList}>
          <li className={S.category}>Home</li>
          <li className={S.category}>Normal</li>
          {/* <li className={S.category}>Live</li> */}
          <li className={S.category}>How To</li>
        </ul>
      </div>
      <div className={S.bottomFooter}>Copyright ⓒ Omocha. All Rights Reserved</div>
    </div>
  );
}

export default Footer;
