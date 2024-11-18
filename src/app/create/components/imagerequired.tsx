import { useFieldArray, useFormContext } from 'react-hook-form';

import { CircleXIcon, TriangleAlertIcon } from 'lucide-react';
import Image from 'next/image';

import { AuctionInputs } from '@/app/create/types/InputTypes';
import { imageValidation } from '@/app/create/utils/createValidation';
import colors from '@/styles/color';

import * as S from '../Basicauction.css';

interface ImageRequiredProps {
  thumbnail: File | null;
  setThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
}

function ImageRequired({ thumbnail, setThumbnail }: ImageRequiredProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext<AuctionInputs>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imagesRequired',
    keyName: 'imageRequiredId',
    rules: imageValidation,
  });

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = Array.from(e.target.files);
      const files = uploadFile.map(file => ({ file }));
      append(files);
    }
  };

  const isSelected = (imageUrl: File) => {
    if (thumbnail === imageUrl) {
      return true;
    }
    return false;
  };

  return (
    <div className={S.auctionLabel}>
      <h2 className={S.title}>사진</h2>
      <div className={S.flexWrapper}>
        <span className={S.description}>
          대표 이미지 미선택 시 첫 번째 이미지가 대표 이미지로 설정됩니다.
        </span>
        <div className={S.count}>{fields.length}/10</div>
      </div>

      <div className={S.imageBoard}>
        <label htmlFor="image" className={S.imageUpload}>
          +
          <input
            className={S.imageInput}
            id="image"
            type="file"
            accept="image/*"
            multiple
            onChange={addImage}
          />
        </label>
        <ul className={S.imageList}>
          {fields
            .slice()
            .reverse()
            .map(({ imageRequiredId, file }, index) => (
              <li key={imageRequiredId} className={S.imageWrapper}>
                <button type="button" onClick={() => setThumbnail(file)}>
                  <div
                    className={
                      isSelected(file) ? S.thumbnailButton.selected : S.thumbnailButton.default
                    }
                  >
                    대표
                  </div>
                </button>
                <Image
                  className={S.image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={URL.createObjectURL(file)}
                  alt={URL.createObjectURL(file)}
                />
                <button
                  type="button"
                  className={S.deleteButton}
                  onClick={() => remove(fields.length - index - 1)}
                >
                  <CircleXIcon stroke={colors.gray10} />
                </button>
              </li>
            ))}
        </ul>
      </div>
      {errors.imagesRequired && (
        <span className={S.error}>
          <TriangleAlertIcon size={16} stroke={colors.primary10} />
          {errors.imagesRequired.root?.message}
        </span>
      )}
    </div>
  );
}

export default ImageRequired;
