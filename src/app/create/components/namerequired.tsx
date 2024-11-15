import { FieldErrors, UseFormRegister } from 'react-hook-form';

import CommonInput from '@/components/CommonInput';

import * as S from '../Basicauction.css';
import { AuctionInputs } from '../types/InputTypes';

interface NameRequiredProps {
  register: UseFormRegister<AuctionInputs>;
  errors: FieldErrors<AuctionInputs>;
}

function NameRequired({ register, errors }: NameRequiredProps) {
  return (
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
  );
}

export default NameRequired;
