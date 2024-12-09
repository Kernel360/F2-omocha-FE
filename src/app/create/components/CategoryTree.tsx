'use client';

import { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TriangleAlertIcon } from 'lucide-react';
import Cascader, { CascaderProps } from 'rc-cascader';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category, TransformCategoriesToOptions } from '@/apis/types/category';
import { AuctionInputs } from '@/app/create/types/InputTypes';

import * as S from '../Basicauction.css';

import './CategoryTree.css';

const transformCategoriesToOptions = (categories: Category[]): TransformCategoriesToOptions[] => {
  return categories.map(category => ({
    value: category.category_id.toString(),
    label: category.name,
    children: category.sub_categories.length
      ? transformCategoriesToOptions(category.sub_categories)
      : undefined,
  }));
};

function CategoryTree() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AuctionInputs>();

  const { data } = useGetCategory();

  const newData = useMemo(() => {
    if (data) {
      return { data: transformCategoriesToOptions(data) };
    }
    return data;
  }, [data]);

  const [inputValue, setInputValue] = useState('');

  const onChange: CascaderProps<TransformCategoriesToOptions>['onChange'] = (
    _,
    selectedOptions,
  ) => {
    const lastSelectedValue = Number(selectedOptions[selectedOptions.length - 1]?.value);
    setInputValue(selectedOptions.map(o => o.label).join(' > '));
    return lastSelectedValue;
  };

  return (
    <label htmlFor="info" className={S.auctionLabel}>
      <h2 className={S.auctionTypeTitle}>경매 상품 카테고리</h2>

      <Controller
        name="categoryIdRequired"
        control={control}
        rules={{
          required: '카테고리를 선택해 주세요.',
        }}
        render={({ field }) => (
          <Cascader
            expandTrigger="hover"
            options={newData?.data}
            onChange={(value, selectedOptions) => {
              const lastSelectedValue = onChange(value, selectedOptions);
              field.onChange([lastSelectedValue]);
            }}
          >
            <div className={S.inputWrapperCategory}>
              <input
                placeholder="카테고리를 선택해주세요."
                value={inputValue}
                readOnly
                className={S.inputCategory}
              />
            </div>
          </Cascader>
        )}
      />
      {errors.categoryIdRequired && (
        <span className={S.error}>
          <TriangleAlertIcon width={17} height={17} />
          {errors.categoryIdRequired?.message}
        </span>
      )}
    </label>
  );
}

export default CategoryTree;
