/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useRef } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { CircleXIcon, TriangleAlertIcon } from 'lucide-react';
import Image from 'next/image';

import usePostBasicAuction from '@/apis/queryHooks/basicAuction/usePostBasicAuction';
import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';
import MaxLayout from '@/components/MaxLayout';
import useDebounce from '@/hooks/useDebounce';
import colors from '@/styles/color';
import formatDate from '@/utils/formatDate';

import * as S from './Basicauction.css';
import ContentRequired from './components/contentrequired';
import { AuctionInputs } from './types/InputTypes';

export default function Home() {
  const methods = useForm<AuctionInputs>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imagesRequired',
    keyName: 'imageRequiredId',
    rules: {
      required: '이미지를 업로드해 주세요.',
      validate: value => {
        if (value.length > 10) {
          return '이미지는 최대 10장 까지 업로드 가능합니다.';
        }
        return true;
      },
    },
  });

  const { mutate: postBasicAuction } = usePostBasicAuction();

  const inputFile = useRef(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = Array.from(e.target.files);
      const files = uploadFile.map(file => ({ file }));
      append(files);
    }
  };

  const onSubmit: SubmitHandler<AuctionInputs> = useDebounce(data => {
    const formData = new FormData();

    const auctionRequest = {
      title: data.nameRequired,
      content: data.contentRequired,
      start_price: data.startPriceRequired,
      bid_unit: data.bidUnitRequired,
      start_date: formatDate(new Date().toString()),
      end_date: formatDate(data.endDateRequired),
      category_ids: [37], // V2로 바꾸는 과정에서 쓰이는 임시값. post 클라쪽 수정 후 실제 값으로 변경 예정
      thumbnailPath: 'auction/upload/images/6481087e-6883-4da3-9f70-2397fd7dea04.PNG', // V2로 바꾸는 과정에서 쓰이는 임시값. post 클라쪽 수정 후 실제 값으로 변경 예정
    };

    formData.append('auctionRequest', JSON.stringify(auctionRequest));
    data.imagesRequired.forEach(image => formData.append('images', image.file));

    postBasicAuction(formData);
  }, 500);

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <h2>기본 경매 상품 등록</h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={S.formSection}>
              <div className={S.inputWrapper}>
                <CommonInput
                  id="nameRequired"
                  label="상품명"
                  type="text"
                  placeholder="상품명"
                  register={register}
                  validation={{ required: '상품명을 입력해 주세요.' }}
                  error={errors.nameRequired}
                />
              </div>
              <div className={S.price}>
                <div className={S.inputWrapper}>
                  <CommonInput
                    id="startPriceRequired"
                    label="시작가"
                    type="number"
                    placeholder="원"
                    register={register}
                    validation={{
                      required: '시작가를 입력해 주세요.',
                      pattern: {
                        value: /^(0|[1-9]\d*)$/,
                        message: '올바른 금액이 아닙니다.',
                      },
                    }}
                    error={errors.startPriceRequired}
                  />
                </div>
                <div className={S.inputWrapper}>
                  <CommonInput
                    id="bidUnitRequired"
                    label="입찰 단위"
                    type="number"
                    placeholder="원"
                    register={register}
                    validation={{
                      required: '입찰 단위를 입력해 주세요.',
                      pattern: {
                        value: /^(0|[1-9]\d*)$/,
                        message: '올바른 금액이 아닙니다.',
                      },
                    }}
                    error={errors.bidUnitRequired}
                  />
                </div>
              </div>
              <div className={S.auctionLabel}>
                <div className={S.title}>사진</div>
                <div className={S.count}>{fields.length}/10</div>
                <div className={S.imageBoard}>
                  <label htmlFor="image" className={S.imageUpload}>
                    +
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
                          <Image
                            className={S.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            src={URL.createObjectURL(file)}
                            alt={URL.createObjectURL(file)}
                          />
                          <button
                            type="button"
                            className={S.deleteButton}
                            onClick={() => remove(fields.length - index - 1)}
                          >
                            <CircleXIcon stroke={colors.gray10} />
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
                {errors.imagesRequired && (
                  <span className={S.error}>
                    <TriangleAlertIcon size={16} stroke={colors.primary10} />
                    {errors.imagesRequired.root?.message}
                  </span>
                )}
              </div>
              <ContentRequired />
              <div className={S.auctionLabel}>
                <div className={S.title}>경매 기간</div>
                <span className={S.description}>
                  경매 상품을 올리는 순간부터 경매가 시작됩니다. 종료 시간만을 입력해 주세요.
                </span>
              </div>

              <div className={S.inputWrapper}>
                <CommonInput
                  id="endDateRequired"
                  label="종료 시간"
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  register={register}
                  validation={{
                    required: '종료 시각을 입력해 주세요.',
                    validate: value => {
                      return (
                        formatDate(value as string) > formatDate(new Date().toString()) ||
                        '현재 시각보다 이전 시간은 선택할 수 없습니다.'
                      );
                    },
                  }}
                  error={errors.endDateRequired}
                />
              </div>

              <div className={S.buttonContainer}>
                <CommonButton content="경매 올리기" type="submit" size="lg" />
              </div>
            </form>
          </FormProvider>
        </div>
      </MaxLayout>
    </div>
  );
}
