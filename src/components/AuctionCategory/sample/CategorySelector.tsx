import { useState } from 'react';

import CategoryItem from './CategoryItem';
import { Category } from './CategoryProvider';
import * as S from '../CategoryUnit.css';

interface CategorySelectorProps {
  category: Category[];
  depth: number;
}

function CategorySelector({ category, depth }: CategorySelectorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const clickItem = (id: number) => () => setSelectedId(id);

  return (
    <div className={S.categorySelectorContainer}>
      <div className={S.categoryItemList}>
        {category.map((itemData: Category) => (
          <CategoryItem
            id={itemData.category_id}
            key={itemData.category_id}
            itemData={itemData}
            isSelected={selectedId === itemData.category_id}
            depth={depth}
            select={clickItem(itemData.category_id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
