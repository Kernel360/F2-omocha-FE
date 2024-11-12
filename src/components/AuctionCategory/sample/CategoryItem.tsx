import { useCategoryStore } from './CategoryProvider';
import * as S from '../CategoryUnit.css';
import { Category } from '../CategoryUnit';

interface CategoryItemProps {
  id: number;
  isSelected: boolean;
  depth: number;
  select: VoidFunction;
  itemData: Category;
}

function CategoryItem({ id, isSelected, depth, select, itemData }: CategoryItemProps) {
  const { addSelectorList, removeToDepth } = useCategoryStore();
  console.log('id', id);

  const clickItem = () => {
    if (isSelected) {
      removeToDepth(depth);
    } else {
      addSelectorList({ title: itemData.name, list: itemData.sub_categories });
    }
    select();
  };

  return (
    <div className={S.categoryItemWrapper}>
      <button type="button" className={isSelected ? S.selected : S.item} onClick={clickItem}>
        {itemData.name}
      </button>
    </div>
  );
}

export default CategoryItem;
