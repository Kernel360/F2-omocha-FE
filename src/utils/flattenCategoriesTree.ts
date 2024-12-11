import { Category } from '@/apis/types/category';

export default function flattenCategoriesTree(categories: Category[]): Category[] {
  const flatList: Category[] = [];

  function traverse(category: Category) {
    flatList.push(category);
    if (category.sub_categories.length > 0) {
      category.sub_categories.forEach(sub => traverse(sub));
    }
  }

  categories.forEach(traverse);
  return flatList;
}
