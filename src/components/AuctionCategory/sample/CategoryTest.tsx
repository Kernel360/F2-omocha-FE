import useGetCategory from '@/apis/queryHooks/category/useGetCategory';

import { useCategoryStore } from './CategoryProvider';
import CategorySelector from './CategorySelector';
import * as S from '../CategoryUnit.css';

// addSelectorList, removeToDepth, pickList, addPickList

function CategoryTest() {
  const { selectorList } = useCategoryStore();

  const { data: categoryData } = useGetCategory();

  if (!categoryData) return null;

  return (
    <div className={S.categoryContainer}>
      <CategorySelector depth={0} category={categoryData} />
      {selectorList.map((selector, index) => (
        <CategorySelector
          key={selector.title}
          category={selector.list}
          depth={index + 1}
          // title={selector.title}
          // list={selector.list}
          // removeToDepth={removeToDepth}
        />
      ))}
    </div>
  );
}

export default CategoryTest;
