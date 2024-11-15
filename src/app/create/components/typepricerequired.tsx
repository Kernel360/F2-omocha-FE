import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { bidUnitValidation, startPriceValidation } from '@/app/create/utils/createValidation';
import CommonInput from '@/components/CommonInput';

import * as S from '../Basicauction.css';
import { AuctionInputs } from '../types/InputTypes';

const AUCTION_TYPE = [
  {
    label: '일반 경매',
    value: 'BASIC_BID',
    returnComponent: 't',
  },
  {
    label: '즉시 구매',
    value: 'NOW_BID',
    returnComponent: '1',
  },
];

interface TypePriceRequiredProps {
  register: UseFormRegister<AuctionInputs>;
  errors: FieldErrors<AuctionInputs>;
}

function TypePriceRequired({ register, errors }: TypePriceRequiredProps) {
  const [auctionType, setAuctionType] = useState('BASIC_BID');

  return (
    <div>
      <div className={S.auctionTypeTitle}>경매 방식</div>
      <div className={S.auctionTypeButtonWrapper}>
        {AUCTION_TYPE.map(type => (
          <button
            key={type.label}
            type="button"
            onClick={() => setAuctionType(type.value)}
            className={
              auctionType === type.value
                ? S.auctionTypeTitleButton.selected
                : S.auctionTypeTitleButton.default
            }
          >
            {type.label}
          </button>
        ))}
      </div>
      <div className={S.price}>
        <div className={S.inputWrapper}>
          <CommonInput
            id="startPriceRequired"
            label="시작가"
            type="number"
            placeholder="원"
            register={register}
            validation={startPriceValidation}
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
            validation={bidUnitValidation}
            error={errors.bidUnitRequired}
          />
        </div>
      </div>
      {auctionType === 'NOW_BID' && (
        <div className={S.nowBidPrice}>
          <div className={S.inputWrapper}>
            <CommonInput
              id="startPriceRequired"
              label="즉시 구매가"
              type="number"
              placeholder="원"
              register={register}
              validation={startPriceValidation}
              error={errors.startPriceRequired}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TypePriceRequired;
