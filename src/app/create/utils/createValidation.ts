import { ImageUpload } from '@/app/create/types/InputTypes';
import formatDate from '@/utils/formatDate';

export const startPriceValidation = {
  required: '시작가를 입력해 주세요.',
  pattern: {
    value: /^(0|[1-9]\d*)$/,
    message: '올바른 금액이 아닙니다.',
  },
};

export const bidUnitValidation = {
  required: '입찰 단위를 입력해 주세요.',
  pattern: {
    value: /^(0|[1-9]\d*)$/,
    message: '올바른 금액이 아닙니다.',
  },
};

export const endDateValidation = {
  required: '종료 시각을 입력해 주세요.',
  validate: (value: string | ImageUpload | ImageUpload[] | File | number[] | number | null) => {
    return (
      formatDate(value as string) > formatDate(new Date().toString()) ||
      '현재 시각보다 이전 시간은 선택할 수 없습니다.'
    );
  },
};

export const imageValidation = {
  required: '이미지를 업로드해 주세요.',
  validate: (value: ImageUpload[]) => {
    if (value.length > 10) {
      return '이미지는 최대 10장 까지 업로드 가능합니다.';
    }
    return true;
  },
};
