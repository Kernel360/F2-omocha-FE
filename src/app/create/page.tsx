/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import usePostBasicAuction from '@/apis/queryHooks/basicAuction/usePostBasicAuction';
import ContentRequired from '@/app/create/components/contentrequired';
import EndDateRequired from '@/app/create/components/enddaterequired';
import ImageRequired from '@/app/create/components/imagerequired';
import NameRequiredProps from '@/app/create/components/namerequired';
import TypePriceRequired from '@/app/create/components/typepricerequired';
import { AuctionInputs } from '@/app/create/types/InputTypes';
import CommonButton from '@/components/CommonButton';
import MaxLayout from '@/components/MaxLayout';
import useDebounce from '@/hooks/useDebounce';
import formatDate from '@/utils/formatDate';

import * as S from './Basicauction.css';

export default function Home() {
  const methods = useForm<AuctionInputs>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors },
  } = methods;

  const { mutate: postBasicAuction } = usePostBasicAuction();

  const onSubmit: SubmitHandler<AuctionInputs> = useDebounce(data => {
    const instantBuyPriceValue = getValues('instantBuyPrice');
    const formData = new FormData();

    const auctionRequest = {
      title: data.nameRequired,
      content: data.contentRequired,
      start_price: data.startPriceRequired,
      bid_unit: data.bidUnitRequired,
      start_date: formatDate(new Date().toString()),
      end_date: formatDate(data.endDateRequired),
      instant_buy_price: instantBuyPriceValue ? data.instantBuyPrice : null,
      category_ids: data.categoryIdsRequired,
    };

    formData.append('auctionRequest', JSON.stringify(auctionRequest));

    data.imagesRequired.forEach(image => formData.append('images', image.file));

    formData.append('thumbnailPath', data.imagesRequired[0].file);

    postBasicAuction(formData);
  }, 500);

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <h1>경매 등록</h1>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={S.formSection}>
              <NameRequiredProps register={register} errors={errors} />
              <TypePriceRequired
                watch={watch}
                setValue={setValue}
                register={register}
                errors={errors}
              />
              <ImageRequired />
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
