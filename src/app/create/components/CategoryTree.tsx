import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TriangleAlertIcon } from 'lucide-react';
import Cascader, { CascaderProps } from 'rc-cascader';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { TransformCategoriesToOptions } from '@/apis/types/category';

import * as S from '../Basicauction.css';
import './CategoryTree.css';
import { AuctionInputs } from '../types/InputTypes';

function CategoryTree() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AuctionInputs>();

  const { data } = useGetCategory({ categoryType: 'create' });

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
      <h2 className={S.title}>상품 카테고리</h2>

      <Controller
        name="categoryIdsRequired"
        control={control}
        rules={{
          required: '카테고리를 선택해 주세요.',
        }}
        render={({ field }) => (
          <Cascader
            expandTrigger="hover"
            options={data as TransformCategoriesToOptions[]}
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
      {errors.categoryIdsRequired && (
        <span className={S.error}>
          <TriangleAlertIcon width={17} height={17} />
          {errors.categoryIdsRequired?.message}
        </span>
      )}
    </label>
  );
}

export default CategoryTree;
