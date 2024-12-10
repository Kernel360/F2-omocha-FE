import { useFormContext } from 'react-hook-form';

import { AuctionInputs } from '@/app/create/types/InputTypes';
import CommonButton from '@/components/CommonButton';

import * as S from '../Basicauction.css';

interface AuctionConfirmModalProps {
  onSubmit: (data: AuctionInputs) => void;
  onCancel: () => void;
}

function AuctionConfirmModal({ onSubmit, onCancel }: AuctionConfirmModalProps) {
  const { getValues } = useFormContext<AuctionInputs>();
  const values = getValues();

  return (
    <div className={S.confirmModal}>
      <div className={S.confirmDescription}>
        <span>정말 경매 상품을 등록하시겠습니까?</span>
        <span>한 번 등록하면 수정할 수 없습니다.</span>
      </div>
      <div className={S.buttonWrapper}>
        <button className={S.submitButton} type="submit" onClick={() => onSubmit(values)}>
          등록하기
        </button>
        <CommonButton content="취소" type="button" size="sm" onClick={onCancel} />
      </div>
    </div>
  );
}

export default AuctionConfirmModal;
