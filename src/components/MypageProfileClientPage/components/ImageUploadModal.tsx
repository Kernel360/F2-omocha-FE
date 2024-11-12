import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CircleUserRoundIcon, CirclePlusIcon, TriangleAlertIcon } from 'lucide-react';
import Image from 'next/image';

import colors from '@/styles/color';

import * as S from './ImageUploadModal.css';
import useDebounce from '@/hooks/useDebounce';
import usePatchProfileImage from '@/apis/queryHooks/User/usePatchProfileImage';

type Input = {
  imageRequired: File | null;
};

interface ImageUploadModalProps {
  defaultImage: string | null;
  onClose: () => void;
}

function ImageUploadModal({ onClose, defaultImage }: ImageUploadModalProps) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Input>({ mode: 'onChange' });

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const { mutate: patchProfileImage } = usePatchProfileImage();

  const onSubmit: SubmitHandler<Input> = useDebounce(data => {
    const formData = new FormData();
    if (data.imageRequired) {
      console.log('34', data.imageRequired);
      formData.append('profileImage', data.imageRequired);

      patchProfileImage(formData);
    }
    onClose();
  }, 500);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(file);
      setValue('imageRequired', file);
    }
  };

  const imageRender = () => {
    if (previewImage) {
      return (
        <div className={S.imageWrapper}>
          <Image
            className={S.imageProfile}
            src={URL.createObjectURL(previewImage)}
            width={100}
            height={100}
            alt="이미지 프로필"
          />
        </div>
      );
    }

    if (defaultImage) {
      return (
        <div className={S.imageWrapper}>
          <Image
            className={S.imageProfile}
            src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${defaultImage}`}
            width={100}
            height={100}
            alt="프로필 이미지"
          />
        </div>
      );
    }

    return (
      <div className={S.imageWrapper}>
        <CircleUserRoundIcon size={100} strokeWidth={1} stroke={colors.gray5} />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={S.image}>
        {imageRender()}
        <label htmlFor="이미지" className={S.plusIcon}>
          <input
            id="이미지"
            type="file"
            accept="image/*"
            className={S.imageUpload}
            onChange={handleImageChange}
          />
          <CirclePlusIcon size={25} fill={colors.secondary7} stroke={colors.white} />
        </label>
      </div>
      {errors.imageRequired && (
        <span className={S.error}>
          <TriangleAlertIcon size={16} stroke={colors.primary10} />
          {errors.imageRequired.message}
        </span>
      )}

      <button type="submit" className={S.buttonSubmit}>
        이미지 업로드
      </button>
    </form>
  );
}

export default ImageUploadModal;
