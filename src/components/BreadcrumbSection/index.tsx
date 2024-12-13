'use client';

import useGetSubCategoryList from '@/apis/queryHooks/category/useGetSubCategoryList';
import { Breadcrumb } from '@/components/Breadcrumb';

interface BreadcrumbSectionProps {
  pickCategoryProps: number | null;
}

function BreadcrumbSection({ pickCategoryProps }: BreadcrumbSectionProps) {
  const { data: categoryData } = useGetSubCategoryList(pickCategoryProps);

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/basicauction?page=1">ALL</Breadcrumb.Item>
      {categoryData?.map(category => (
        <Breadcrumb.Item
          key={category.category_id}
          href={`/basicauction?categoryId=${category.category_id}&page=1`}
        >
          {category.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbSection;
