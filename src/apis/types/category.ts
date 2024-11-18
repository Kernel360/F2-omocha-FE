export interface Category {
  category_id: number;
  name: string;
  parent_id: number | null;
  sub_categories: Category[];
  isOpen?: boolean;
}
export interface TransformCategoriesToOptions {
  value: string;
  label: string;
  children?: TransformCategoriesToOptions[];
}
