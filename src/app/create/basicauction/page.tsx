/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useRef } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import usePostBasicAuction from '@/apis/queryHooks/basicAuction/usePostBasicAuction';
import DeleteIcon from '@/assets/svg/delete.svg';
import ErrorIcon from '@/assets/svg/error.svg';
import formatDate from '@/utils/formatDate';

import * as S from './Basicauction.css';

type ImageUpload = {
  file: File;
};

type AuctionInputs = {
  nameRequired: string;
  startPriceRequired: string;
  bidUnitRequired: string;
  imagesRequired: ImageUpload[];
  contentRequired: string;
  startDateRequired: string;
  endDateRequired: string;
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imagesRequired',
    keyName: 'imageRequiredId',
    rules: {
      required: '이미지를 업로드해 주세요.',
    },
  });

  const { mutate: postBasicAuction } = usePostBasicAuction();

  const inputFile = useRef(null);
  const contentRequired = watch('contentRequired');
  const startDate = watch('startDateRequired');

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = Array.from(e.target.files);
      const files = uploadFile.map(file => ({ file }));
      append(files);
    }
  };

  const onSubmit: SubmitHandler<AuctionInputs> = data => {
    const formData = new FormData();

    const auctionRequest = {
      title: data.nameRequired,
      content: data.contentRequired,
      start_price: data.startPriceRequired,
      bid_unit: data.bidUnitRequired,
      auction_type: 'BASIC',
      start_date: formatDate(data.startDateRequired),
      end_date: formatDate(data.endDateRequired),
    };

    formData.append('auctionRequest', JSON.stringify(auctionRequest));
    data.imagesRequired.forEach(image => formData.append('images', image.file));

    postBasicAuction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className={S.period}>
        <label htmlFor="startPrice" className={S.auctionLabel}>
          <div className={S.title}>시작가</div>
          <input
            className={S.auctionInput}
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
        <label htmlFor="bidUnit" className={S.auctionLabel}>
          <div className={S.title}>입찰 단위</div>
          <input
            className={S.auctionInput}
            id="bidUnit"
            type="number"
            placeholder="원"
            {...register('bidUnitRequired', {
              required: '입찰 단위를 입력해 주세요.',
              pattern: {
                value: /^(0|[1-9]\d*)$/,
                message: '올바른 금액이 아닙니다.',
              },
            })}
          />
          {errors.bidUnitRequired && (
            <span className={S.error}>
              <ErrorIcon />
              {errors.bidUnitRequired.message}
            </span>
          )}
        </label>
      </div>
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
        {errors.imagesRequired && (
          <span className={S.error}>
            <ErrorIcon />
            {errors.imagesRequired.root?.message}
          </span>
        )}
      </div>
      <label htmlFor="info" className={S.auctionLabel}>
        <span className={S.title}>상품 정보</span>
        <div className={S.count}>
          {contentRequired ? contentRequired.length : 0}/{MAX_CONTENT}
        </div>
        <textarea
          id="info"
          className={S.info}
          maxLength={MAX_CONTENT - 1}
          {...register('contentRequired', {
            required: '상품 정보를 입력해 주세요.',
            validate: {
              minLength: value => value.length >= 10 || '최소 10글자 이상 작성해야 합니다.',
            },
          })}
        />
        {errors.contentRequired && (
          <span className={S.error}>
            <ErrorIcon />
            {errors.contentRequired?.message}
          </span>
        )}
      </label>
      <div className={S.auctionLabel}>
        <div className={S.title}>경매 기간</div>
        <div className={S.period}>
          <label htmlFor="startDate" className={S.subTitle}>
            시작 시각
            <input
              id="startDate"
              type="datetime-local"
              className={S.auctionInput}
              {...register('startDateRequired', {
                required: '시작 시각을 입력해 주세요.',
                validate: value => {
                  return (
                    formatDate(value) >= formatDate(new Date().toString()) ||
                    '현재 시각보다 이전 시간은 선택할 수 없습니다.'
                  );
                },
              })}
            />
            {errors.startDateRequired && (
              <span className={S.error}>
                <ErrorIcon />
                {errors.startDateRequired?.message}
              </span>
            )}
          </label>
          <label htmlFor="endDate" className={S.subTitle}>
            종료 시각
            <input
              id="endDate"
              type="datetime-local"
              className={S.auctionInput}
              {...register('endDateRequired', {
                required: '종료 시각을 입력해 주세요.',
                validate: value => {
                  return value > startDate || '시작 시각보다 이전 시간은 선택할 수 없습니다.';
                },
              })}
            />
            {errors.endDateRequired && (
              <span className={S.error}>
                <ErrorIcon />
                {errors.endDateRequired?.message}
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
