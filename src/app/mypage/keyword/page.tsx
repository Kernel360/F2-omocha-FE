'use client';

import { useForm } from 'react-hook-form';
import DeleteIcon from '@/assets/svg/delete.svg';

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  return (
    <div className={S.keyword}>
      <h2>키워드</h2>
      <section>
        <form className={S.form}>
          <input
            className={S.input}
            id="currentPw"
            type="password"
            placeholder="알림 받을 키워드를 입력해 주세요."
            {...register('keywordRequired', {
              required: '키워드를 입력해 주세요.',
            })}
          />
          <button className={S.formButton} type="submit">
            등록
          </button>
        </form>
      </section>
      <section>
        <ul className={S.keywordContainer}>
          {KEYWORDS.map(keyword => (
            <li className={S.keywordList} key={keyword.id}>
              {keyword.text}
              <button className={S.deleteButton} type="button">
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
