'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import { Breadcrumb } from '@/components/Breadcrumb';

function addIsOpenProperty(
  targetCategoryId: number,
  category: Category,
): Category & { isOpen: boolean } {
  if (category.category_id === targetCategoryId) {
    return { ...category, isOpen: true };
  }

  let isOpen = false;
  const updatedSubCategory = category.sub_categories.map(subCategory => {
    const subAddIsOpen = addIsOpenProperty(targetCategoryId, subCategory);
    if (!isOpen && subAddIsOpen.isOpen) {
      isOpen = true;
    }
    return subAddIsOpen;
  });

  return { ...category, sub_categories: updatedSubCategory, isOpen };
}

function categoryBreadCrumb(categoryData: Category[]) {
  const breadCrumb: Category[] = [];

  const findOpenCategory = (category: Category) => {
    if (category.isOpen) {
      breadCrumb.push(category);
      category.sub_categories.forEach(subCategory => findOpenCategory(subCategory));
    }
  };

  categoryData.forEach(category => findOpenCategory(category));

  return breadCrumb;
}

function BreadcrumbSection() {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data: categoryData } = useGetCategory();

  const newData = useMemo(() => {
    if (categoryData && pickCategory) {
      const addIsOpenPropertyData: Category[] = categoryData.map(category =>
        addIsOpenProperty(pickCategory, category as Category),
      );

      return addIsOpenPropertyData;
    }
    return categoryData;
  }, [categoryData, pickCategory]);

  const categoryBreadCrumbData = categoryBreadCrumb(newData as Category[]);

  return (
    <Breadcrumb>
      {categoryBreadCrumbData.map(category => (
        <Breadcrumb.Item
          key={category.category_id}
          href={`/basicauction?categoryId=${category.category_id}`}
        >
          {category.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbSection;
