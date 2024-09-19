import ItemCard from '../ItemCard';
import * as S from './ListLayout.css';

function ListLayout() {
  return (
    <div className={S.test}>
      <div className={S.ResponsiveLayoutWrapper}>
        <div className={S.tteesstt}>
          <ItemCard />
        </div>
        <div className={S.tteesstt}>
          <ItemCard />
        </div>
        <div className={S.tteesstt}>
          <ItemCard />
        </div>
        <div className={S.tteesstt}>
          <ItemCard />
        </div>
        <div className={S.tteesstt}>
          <ItemCard />
        </div>
      </div>
    </div>
  );
}

export default ListLayout;
