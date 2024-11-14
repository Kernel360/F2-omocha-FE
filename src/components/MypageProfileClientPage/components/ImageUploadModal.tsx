/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserIcon, CirclePlusIcon } from 'lucide-react';
import Image from 'next/image';

import usePatchProfileImage from '@/apis/queryHooks/User/usePatchProfileImage';
import CommonButton from '@/components/CommonButton';
import useDebounce from '@/hooks/useDebounce';
import colors from '@/styles/color';

import * as S from './ImageUploadModal.css';

type Input = {
  imageRequired: File | null;
};

interface ImageUploadModalProps {
  defaultImage: string | null | undefined;
  onClose: () => void;
}

function ImageUploadModal({ onClose, defaultImage }: ImageUploadModalProps) {
  const { register, handleSubmit, setValue } = useForm<Input>({ mode: 'onChange' });

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const { mutate: patchProfileImage } = usePatchProfileImage();

  const onSubmit: SubmitHandler<Input> = useDebounce(data => {
    if (
      !data.imageRequired ||
      (data.imageRequired instanceof FileList && data.imageRequired.length === 0)
    ) {
      return;
    }

    const formData = new FormData();

    formData.append('profileImage', data.imageRequired);
    patchProfileImage(formData);

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
        <Image
          className={S.imageProfile}
          src={URL.createObjectURL(previewImage)}
          width={100}
          height={100}
          alt="이미지 프로필"
        />
      );
    }

    if (defaultImage) {
      return (
        <Image
          className={S.imageProfile}
          src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${defaultImage}`}
          width={100}
          height={100}
          alt="프로필 이미지"
        />
      );
    }

    return <UserIcon size={100} strokeWidth={1} stroke={colors.gray5} />;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={S.image}>
        <div className={S.imageWrapper}>
          {imageRender()}
          <label htmlFor="이미지" className={S.plusIcon}>
            <input
              id="이미지"
              type="file"
              accept="image/*"
              {...register('imageRequired')}
              className={S.imageUpload}
              onChange={handleImageChange}
            />
            <CirclePlusIcon size={25} fill={colors.secondary7} stroke={colors.white} />
          </label>
        </div>
      </div>
      <CommonButton type="submit" size="md" content="이미지 업로드" />
    </form>
  );
}

export default ImageUploadModal;
