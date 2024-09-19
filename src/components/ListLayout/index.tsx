import * as S from './ListLayout.css';

interface ListLayoutProps {
  children: React.ReactNode;
}

function ListLayout({ children }: ListLayoutProps) {
  return (
    <div className={S.layout}>
      <div className={S.responsiveLayoutWrapper}>{children}</div>
    </div>
  );
}

export default ListLayout;
