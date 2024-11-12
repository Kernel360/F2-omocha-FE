export interface Category {
  category_id: number;
  name: string;
  parent_id: number | null;
  sub_categories: Category[];
}
