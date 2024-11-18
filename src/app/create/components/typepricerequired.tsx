import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import * as Toggle from '@radix-ui/react-toggle';

import {
  bidUnitValidation,
  instantBuyPriceValidation,
  startPriceValidation,
} from '@/app/create/utils/createValidation';
import CommonInput from '@/components/CommonInput';
import useBooleanState from '@/hooks/useBooleanState';

import * as S from '../Basicauction.css';
import { AuctionInputs } from '../types/InputTypes';

interface TypePriceRequiredProps {
  setValue: UseFormSetValue<AuctionInputs>;
  register: UseFormRegister<AuctionInputs>;
  errors: FieldErrors<AuctionInputs>;
}

function TypePriceRequired({ setValue, register, errors }: TypePriceRequiredProps) {
  const { value: isInstantBuyEnabled, toggle: toggleIsInstantBuyEnabled } = useBooleanState();

  const handleToggleChange = () => {
    toggleIsInstantBuyEnabled();
    if (!isInstantBuyEnabled) {
      setValue('instantBuyPrice', null); // instantBuyPrice 값을 지움
    }
  };

  return (
    <div>
      <h2 className={S.title}>가격</h2>
      <div className={S.auctionTypeButtonWrapper}>
        <Toggle.Root
          pressed={isInstantBuyEnabled}
          onPressedChange={handleToggleChange}
          className={S.auctionTypeTitleButtonBase}
        >
          즉시 구매 허용
        </Toggle.Root>
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
      {isInstantBuyEnabled && (
        <div className={S.nowBidPrice}>
          <div className={S.inputWrapper}>
            <CommonInput
              id="instantBuyPrice"
              label="즉시 구매가"
              type="number"
              placeholder="원"
              register={register}
              validation={instantBuyPriceValidation}
              error={errors.instantBuyPrice}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TypePriceRequired;
