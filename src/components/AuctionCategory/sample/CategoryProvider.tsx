import { createContext, useMemo, useState } from 'react';

import useWrappingContext from './useWrappingContext';

export interface Category {
  category_id: number;
  name: string;
  parent_id: number | null;
  sub_categories: Category[];
}

interface CategorySelectorState {
  title: string;
  list: Category[];
}

interface CategoryState {
  selectorList: CategorySelectorState[];
  pickList: number[];
  addSelectorList: ({ title, list }: CategorySelectorState) => void;
  removeToDepth: (depth: number) => void;
  addPickList: (id: number) => void;
}

export const CategoryStore = createContext<CategoryState | null>(null);
export const useCategoryStore = () => useWrappingContext(CategoryStore);

interface CategoryProviderProps {
  children: React.ReactNode;
}

function CategoryProvider({ children }: CategoryProviderProps) {
  const [selectorList, setSelectorList] = useState<CategorySelectorState[]>([]);
  const [pickList, setPickList] = useState<number[]>([]);

  const value = useMemo(
    () => ({
      selectorList,
      addSelectorList: ({ title, list }: CategorySelectorState) =>
        setSelectorList(p => [...p, { title, list }]),
      removeToDepth: (depth: number) => {
        setSelectorList(p => p.slice(0, depth));
        setPickList(p => p.slice(0, depth));
      },
      pickList,
      addPickList: (id: number) => setPickList(p => [...p, id]),
    }),
    [selectorList, pickList],
  );

  return <CategoryStore.Provider value={value}>{children}</CategoryStore.Provider>;
}

export default CategoryProvider;
