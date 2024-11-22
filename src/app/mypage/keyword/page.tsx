'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { XIcon } from 'lucide-react';

import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';
import colors from '@/styles/color';

import * as S from './Keyword.css';

const KEYWORDS = [
  {
    id: 1,
    text: '피규어',
  },
  {
    id: 2,
    text: '인형',
  },
  {
    id: 3,
    text: '해파리',
  },
  {
    id: 4,
    text: '솜사탕',
  },
  {
    id: 5,
    text: '솜사탕',
  },
  {
    id: 6,
    text: '솜사탕',
  },
];

type Input = {
  keywordRequired: string;
};

function Home() {
  const { register, handleSubmit, watch } = useForm<Input>();

  const keywordRequired = watch('keywordRequired');

  const onSubmit: SubmitHandler<Input> = async data => {
    console.log('onSubmit', data);
  };

  return (
    <div className={S.keyword}>
      <h3>키워드</h3>
      <section className={S.section}>
        <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            id="keywordRequired"
            label="알림 받을 키워드를 입력해 주세요."
            register={register}
            validation={{
              required: '키워드를 입력해 주세요.',
            }}
          >
            <div className={S.keywordAddButtonWrapper}>
              <CommonButton
                disabled={!keywordRequired}
                content="키워드 등록"
                type="submit"
                size="md"
              />
            </div>
          </CommonInput>
        </form>
      </section>
      <section>
        <ul className={S.keywordContainer}>
          {KEYWORDS.map(keyword => (
            <li className={S.keywordList} key={keyword.id}>
              {keyword.text}
              <button className={S.deleteButton} type="button">
                <XIcon size={14} stroke={colors.gray10} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
