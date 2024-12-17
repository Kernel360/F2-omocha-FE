/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { FormProvider, useForm } from 'react-hook-form';

import usePostBasicAuction from '@/apis/queryHooks/basicAuction/usePostBasicAuction';
import AuctionConfirmModal from '@/app/create/components/auctionconfirmmodal';
import ContentRequired from '@/app/create/components/contentrequired';
import EndDateRequired from '@/app/create/components/enddaterequired';
import ImageRequired from '@/app/create/components/imagerequired';
import NameRequiredProps from '@/app/create/components/namerequired';
import TypePriceRequired from '@/app/create/components/typepricerequired';
import { AuctionInputs } from '@/app/create/types/InputTypes';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import CommonButton from '@/components/CommonButton';
import MaxLayout from '@/components/MaxLayout';
import { Modal } from '@/components/Modal/Modal';
import useBooleanState from '@/hooks/useBooleanState';
import useDebounce from '@/hooks/useDebounce';
import EVENT_ID from '@/static/eventId';
import { formatDate } from '@/utils/dateUtils';

import * as S from './Basicauction.css';

export default function Home() {
  const methods = useForm<AuctionInputs>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  const { mutate: postBasicAuction } = usePostBasicAuction();

  const {
    value: isOpenAuctionConfirmModal,
    toggle: setIsOpenAuctionConfirmModal,
    setTrue: openAuctionConfirmModal,
  } = useBooleanState();

  const validationAndOpenModal = handleSubmit((data: AuctionInputs) => {
    const auctionData = {
      name: data.nameRequired,
      content: data.contentRequired,
      start_price: data.startPriceRequired,
      bid_unit: data.bidUnitRequired,
      start_date: formatDate(new Date().toString()),
      end_date: formatDate(data.endDateRequired),
      instant_buy_price: data.instantBuyPrice,
      category_id: data.categoryIdRequired[0],
    };
    openAuctionConfirmModal();
    return auctionData;
  });

  const onSubmit = useDebounce((data: AuctionInputs) => {
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
      category_id: data.categoryIdRequired[0],
    };

    formData.append('auctionRequest', JSON.stringify(auctionRequest));

    data.imagesRequired.forEach(image => formData.append('images', image.file));

    postBasicAuction(formData);
  }, 1500);

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <h1>경매 등록</h1>
          <FormProvider {...methods}>
            <form className={S.formSection}>
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
                <CommonButton
                  content="경매 등록하기"
                  type="button"
                  size="lg"
                  onClick={validationAndOpenModal}
                />
              </div>
              <Modal isOpen={isOpenAuctionConfirmModal} onOpenChange={setIsOpenAuctionConfirmModal}>
                <AuctionConfirmModal onSubmit={onSubmit} onCancel={setIsOpenAuctionConfirmModal} />
              </Modal>
            </form>
          </FormProvider>
        </div>
      </MaxLayout>
      <ClientSidePageRef eventId={EVENT_ID.AUCTION_CREATE_PAGE_VIEWED} />
    </div>
  );
}
