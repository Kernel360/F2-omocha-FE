import { useState } from 'react';

import Cascader, { CascaderProps } from 'rc-cascader';

import * as S from '@/components/CommonInput/CommonInput.css';

import './CategoryTree.css';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const addressOptions = [
  {
    label: '1',
    value: 'fj',
    children: [
      {
        label: '1-1',
        value: 'fuzhou',
        children: [
          {
            label: '1-1-1',
            value: 'mawei',
            children: [
              {
                label: '1-1-1-1',
                value: 'mawei',
              },
            ],
          },
        ],
      },
      {
        label: '1-2',
        value: 'quanzhou',
      },
    ],
  },
  {
    label: '2',
    value: 'zj',
    children: [
      {
        label: '2-1',
        value: 'hangzhou',
        children: [
          {
            label: '2-1-1',
            value: 'yuhang',
          },
        ],
      },
    ],
  },
  {
    label: '3',
    value: 'bj',
    children: [
      {
        label: '3-1',
        value: 'chaoyang',
      },
      {
        label: '3-2',
        value: 'haidian',
      },
    ],
  },
  {
    label: '4',
    value: 'tw',
    children: [
      {
        label: '4-1',
        value: 'taipei',
        children: [
          {
            label: '4-1-1',
            value: 'zhongzheng',
          },
        ],
      },
    ],
  },
];

function CategoryTree() {
  // const { data } = useGetCategory({});
  // console.log(data);

  const [inputValue, setInputValue] = useState('');

  const onChange: CascaderProps<Option>['onChange'] = (value, selectedOptions) => {
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
        <Cascader expandTrigger="hover" options={addressOptions} onChange={onChange}>
          <div className={S.inputWrapper}>
            <input
              placeholder="카테고리를 선택해주세요."
              value={inputValue}
              readOnly
              className={S.input}
            />
          </div>
        </Cascader>
      </div>
    </div>
  );
}

export default CategoryTree;
