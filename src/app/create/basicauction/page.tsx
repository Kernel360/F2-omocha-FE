/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as S from '@/app/create/basicauction/Basicauction.css';
import DeleteIcon from '@/assets/svg/delete.svg';
import { useRef } from 'react';

type ImageUpload = {
  file: File;
};

type AuctionInputs = {
  nameRequired: string;
  startPriceRequired: number;
  imageRequired: ImageUpload[];
  infoRequired: string;
  dateRequried: string;
  timeRequried: string;
};

export default function Home() {
  const { register, control, handleSubmit, watch } = useForm<AuctionInputs>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imageRequired',
    keyName: 'imageRequiredId',
  });

  const inputFile = useRef(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = Array.from(e.target.files);
      const files = uploadFile.map(file => ({ file }));
      append(files);
    }
  };

  const onSubmit: SubmitHandler<AuctionInputs> = data => console.log(data);

  return (
    <form className={S.auctionForm} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className={S.auctionLabel}>
        <div className={S.title}>상품명</div>
        <input
          className={S.auctionInput}
          id="name"
          type="text"
          placeholder="상품명"
          {...register('nameRequired', { required: true })}
        />
      </label>
      <label htmlFor="startPrice" className={S.auctionLabel}>
        <div className={S.title}>시작가</div>
        <input
          className={`${S.auctionInput} ${S.priceInput}`}
          id="startPrice"
          type="number"
          placeholder="원"
          {...register('startPriceRequired', {
            required: true,
            pattern: /^(0|[1-9]\d*)$/,
          })}
        />
      </label>
      <div className={S.auctionLabel}>
        <div className={S.title}>사진</div>
        <div className={S.count}>{fields.length}/10</div>
        <div className={S.imageBoard}>
          <ul className={S.imageList}>
            {fields.map(({ imageRequiredId, file }, index) => (
              <li key={imageRequiredId} className={S.image}>
                <img src={URL.createObjectURL(file)} alt={URL.createObjectURL(file)} />
                <button type="button" className={S.deleteButton} onClick={() => remove(index)}>
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
          <div className={S.imageUpload}>
            <label htmlFor="image" className={S.imageInfo}>
              이미지 등록하기
              <input
                className={S.imageInput}
                ref={inputFile}
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={addImage}
              />
            </label>
          </div>
        </div>
      </div>
      <label htmlFor="info" className={S.auctionLabel}>
        <span className={S.title}>상품 정보</span>
        <div className={S.count}>
          {watch('infoRequired') ? watch('infoRequired').length : 0}/500
        </div>
        <textarea
          id="info"
          className={S.info}
          {...register('infoRequired', { required: true, minLength: 10, maxLength: 500 })}
        />
      </label>
      <div className={S.auctionLabel}>
        <div className={S.title}>경매 기간</div>
        <div className={S.period}>
          <label htmlFor="endDate" className={S.subTitle}>
            종료일
            <input
              className={S.endPeriod}
              id="endDate"
              type="date"
              {...register('dateRequried', {
                required: true,
                min: new Date().toISOString().split('T')[0], // 현재 날짜 추출
              })}
            />
          </label>
          <label htmlFor="endTime" className={S.subTitle}>
            종료시간
            <input
              className={S.endPeriod}
              id="endTime"
              type="time"
              {...register('timeRequried', {
                required: true,
                min: new Date().toTimeString().split(' ')[0], // 현재 시간 추출
              })}
            />
          </label>
        </div>
      </div>
      <div className={S.buttonContainer}>
        <button className={S.button} type="submit">
          경매 올리기
        </button>
      </div>
    </form>
  );
}
