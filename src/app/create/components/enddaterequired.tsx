import { FieldErrors, UseFormRegister } from 'react-hook-form';

import CommonInput from '@/components/CommonInput';

import * as S from '../Basicauction.css';
import { AuctionInputs } from '../types/InputTypes';
import { endDateValidation } from '../utils/createValidation';

interface EndDateRequiredProps {
  register: UseFormRegister<AuctionInputs>;
  errors: FieldErrors<AuctionInputs>;
}

function EndDateRequired({ register, errors }: EndDateRequiredProps) {
  return (
    <>
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
          validation={endDateValidation}
          error={errors.endDateRequired}
        />
      </div>{' '}
    </>
  );
}

export default EndDateRequired;
