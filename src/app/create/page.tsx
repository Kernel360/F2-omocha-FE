/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import usePostBasicAuction from '@/apis/queryHooks/basicAuction/usePostBasicAuction';
import ContentRequired from '@/app/create/components/contentrequired';
import ImageRequired from '@/app/create/components/imagerequired';
import { AuctionInputs } from '@/app/create/types/InputTypes';
import CommonButton from '@/components/CommonButton';
import MaxLayout from '@/components/MaxLayout';
// import useDebounce from '@/hooks/useDebounce';
import formatDate from '@/utils/formatDate';

import * as S from './Basicauction.css';
import EndDateRequired from './components/enddaterequired';
import NameRequiredProps from './components/namerequired';
import TypePriceRequired from './components/typepricerequired';

export default function Home() {
  const methods = useForm<AuctionInputs>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { mutate: postBasicAuction } = usePostBasicAuction();

  const onSubmit: SubmitHandler<AuctionInputs> = data => {
    const formData = new FormData();

    const auctionRequest = {
      title: data.nameRequired,
      content: data.contentRequired,
      start_price: data.startPriceRequired,
      bid_unit: data.bidUnitRequired,
      start_date: formatDate(new Date().toString()),
      end_date: formatDate(data.endDateRequired),
      category_ids: [37], // V2로 바꾸는 과정에서 쓰이는 임시값. post 클라쪽 수정 후 실제 값으로 변경 예정 // 타이ㅏㅂ 추가해줘야함
    };

    formData.append('auctionRequest', JSON.stringify(auctionRequest));
    data.imagesRequired.forEach(image => formData.append('images', image.file));

    formData.append('thumbnailPath', thumbnail || data.imagesRequired[0].file);

    // useDebounce(() => postBasicAuction(formData), 500);
    // useDebounce로 감싸면 에러가 나서 일단 주석처리함
    postBasicAuction(formData);
  };

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <h2>기본 경매 상품 등록</h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={S.formSection}>
              <NameRequiredProps register={register} errors={errors} />
              {/* 카테고리 추가해야함 */}
              <TypePriceRequired register={register} errors={errors} />
              <ImageRequired thumbnail={thumbnail} setThumbnail={setThumbnail} />
              <ContentRequired />
              <EndDateRequired register={register} errors={errors} />
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
