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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className={S.auctionTypeTitle}>상품 카테고리</div>
        <CategoryTree />
      </div>
    </div>
  );
}

export default NameRequired;
