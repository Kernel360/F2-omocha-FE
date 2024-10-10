import { SubCategory } from '@/static/category';

import * as S from '../Header.css';

interface HeaderItemActionProps {
  headerItem: SubCategory;
  onClickEvent: () => void;
}

function HeaderActionItem({ headerItem, onClickEvent }: HeaderItemActionProps) {
  return (
    <button className={S.SideNavButton} type="button" onClick={onClickEvent}>
      {headerItem.name}
    </button>
  );
}

export default HeaderActionItem;
