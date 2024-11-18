import { Dispatch, SetStateAction, useState } from 'react';

import Cascader, { CascaderProps } from 'rc-cascader';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { TransformCategoriesToOptions } from '@/apis/types/category';
import * as S from '@/components/CommonInput/CommonInput.css';

import './CategoryTree.css';

interface CategoryTreeProps {
  setPickCategory: Dispatch<SetStateAction<number | null | undefined>>;
}

function CategoryTree({ setPickCategory }: CategoryTreeProps) {
  const { data } = useGetCategory({ categoryType: 'create' });

  const [inputValue, setInputValue] = useState('');

  const onChange: CascaderProps<TransformCategoriesToOptions>['onChange'] = (
    value,
    selectedOptions,
  ) => {
    setPickCategory(Number(selectedOptions[selectedOptions.length - 1].value));
    setInputValue(selectedOptions.map(o => o.label).join('> '));
  };

  return (
    <div>
      <div
        style={{
          boxSizing: 'border-box',
          maxWidth: '368px',
        }}
      >
        {/* <Controller> */}
        <Cascader
          expandTrigger="hover"
          options={data as TransformCategoriesToOptions[]}
          onChange={onChange}
        >
          <div className={S.inputWrapper}>
            <input
              placeholder="카테고리를 선택해주세요."
              value={inputValue}
              readOnly
              className={S.input}
            />
          </div>
        </Cascader>
        {/* </Controller> */}
      </div>
    </div>
  );
}

export default CategoryTree;
