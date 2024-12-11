import { MetadataRoute } from 'next';

import { Category } from '@/apis/types/category';
import flattenCategoriesTree from '@/utils/flattenCategoriesTree';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const categoriesList = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/categories`,
    )
      .then(res => res.json())
      .then(jsonRes => jsonRes.result_data);

    const flattenCategoriesList = flattenCategoriesTree(categoriesList);

    return flattenCategoriesList.map((category: Category) => ({
      url: `https://www.omocha-auction.com/categories/${category.category_id}`,
      lastModified: new Date(), // TODO 시간 넣어달ㄹ라 하기
    }));
  } catch (error) {
    console.error('error :', error);
  }
  return [];
}
