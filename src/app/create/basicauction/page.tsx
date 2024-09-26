/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import DeleteIcon from '@/assets/svg/delete.svg';
import ErrorIcon from '@/assets/svg/error.svg';
import { useRef } from 'react';

import * as S from '@/app/create/basicauction/Basicauction.css';

type ImageUpload = {
  file: File;
};

type AuctionInputs = {
  nameRequired: string;
  startPriceRequired: number;
  imageRequired: ImageUpload[];
  infoRequired: string;
  dateRequired: string;
  timeRequired: string;
};

const MAX_CONTENT = 500;

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuctionInputs>();

  const infoRequired = watch('infoRequired');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imageRequired',
    keyName: 'imageRequiredId',
    rules: {
      required: '이미지를 업로드해 주세요.',
    },
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
          {...register('nameRequired', { required: '상품명을 입력해 주세요.' })}
        />
        {errors.nameRequired && (
          <span className={S.error}>
            <ErrorIcon />
            {errors.nameRequired.message}
          </span>
        )}
      </label>
      <label htmlFor="startPrice" className={S.auctionLabel}>
        <div className={S.title}>시작가</div>
        <input
          className={`${S.auctionInput} ${S.priceInput}`}
          id="startPrice"
          type="number"
          placeholder="원"
          {...register('startPriceRequired', {
            required: '시작가를 입력해 주세요.',
            pattern: {
              value: /^(0|[1-9]\d*)$/,
              message: '올바른 금액이 아닙니다.',
            },
          })}
        />
        {errors.startPriceRequired && (
          <span className={S.error}>
            <ErrorIcon />
            {errors.startPriceRequired.message}
          </span>
        )}
      </label>
      <div className={S.auctionLabel}>
        <div className={S.title}>사진</div>
        <div className={S.count}>{fields.length}/10</div>
        <div className={S.imageBoard}>
          <label htmlFor="image" className={S.imageUpload}>
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
          <ul className={S.imageList}>
            {fields
              .slice()
              .reverse()
              .map(({ imageRequiredId, file }, index) => (
                <li key={imageRequiredId} className={S.image}>
                  <img
                    className={S.image}
                    src={URL.createObjectURL(file)}
                    alt={URL.createObjectURL(file)}
                  />
                  <button
                    type="button"
                    className={S.deleteButton}
                    onClick={() => remove(fields.length - index - 1)}
                  >
                    <DeleteIcon />
                  </button>
                </li>
              ))}
          </ul>
        </div>
        {errors.imageRequired && (
          <span className={S.error}>
            <ErrorIcon />
            {errors.imageRequired.root?.message}
          </span>
        )}
      </div>
      <label htmlFor="info" className={S.auctionLabel}>
        <span className={S.title}>상품 정보</span>
        <div className={S.count}>
          {infoRequired ? infoRequired.length : 0}/{MAX_CONTENT}
        </div>
        <textarea
          id="info"
          className={S.info}
          maxLength={MAX_CONTENT - 1}
          {...register('infoRequired', {
            required: '상품 정보를 입력해 주세요.',
            validate: {
              minLength: value => value.length >= 10 || '최소 10글자 이상 작성해야 합니다.',
            },
          })}
        />
        {errors.infoRequired && (
          <span className={S.error}>
            <ErrorIcon />
            {errors.infoRequired?.message}
          </span>
        )}
      </label>
      <div className={S.auctionLabel}>
        <div className={S.title}>경매 기간</div>
        <div className={S.period}>
          <label htmlFor="endDate" className={S.subTitle}>
            종료일
            <input
              id="endDate"
              type="date"
              className={S.auctionInput}
              {...register('dateRequired', {
                required: '종료일을 입력해 주세요.',
                validate: value => {
                  const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 추출
                  return value >= currentDate || '종료일은 현재 현재 날짜 이후여야 합니다.';
                },
              })}
            />
            {errors.dateRequired && (
              <span className={S.error}>
                <ErrorIcon />
                {errors.dateRequired?.message}
              </span>
            )}
          </label>
          <label htmlFor="endTime" className={S.subTitle}>
            종료 시간
            <input
              id="endTime"
              type="time"
              className={S.auctionInput}
              {...register('timeRequired', {
                required: '종료 시간을 입력해 주세요.',
                validate: value => {
                  const currentTime = new Date().toTimeString().split(' ')[0]; // 현재 시간 추출
                  return value > currentTime || '종료 시간은 현재 시간 이후여야 합니다.';
                },
              })}
            />
            {errors.timeRequired && (
              <span className={S.error}>
                <ErrorIcon />
                {errors.timeRequired?.message}
              </span>
            )}
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
