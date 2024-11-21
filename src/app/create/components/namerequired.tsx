import { FieldErrors, UseFormRegister } from 'react-hook-form';

import CommonInput from '@/components/CommonInput';

import * as S from '../Basicauction.css';
import { AuctionInputs } from '../types/InputTypes';

import CategoryTree from './CategoryTree';

interface NameRequiredProps {
  register: UseFormRegister<AuctionInputs>;
  errors: FieldErrors<AuctionInputs>;
}

function NameRequired({ register, errors }: NameRequiredProps) {
  return (
    <div>
      <div className={S.title}>상품 정보</div>
      <div className={S.price}>
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
        <CategoryTree />
      </div>
    </div>
  );
}

export default NameRequired;
