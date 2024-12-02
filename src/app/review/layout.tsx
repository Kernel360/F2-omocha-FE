import MaxLayout from '@/components/MaxLayout';
import * as S from './Layout.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.page}>{children}</div>
      </MaxLayout>
    </div>
  );
}
