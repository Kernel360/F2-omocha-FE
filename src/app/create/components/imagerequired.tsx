import React, { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { CircleXIcon, TriangleAlertIcon } from 'lucide-react';
import Image from 'next/image';

import { AuctionInputs } from '@/app/create/types/InputTypes';
import { imageValidation } from '@/app/create/utils/createValidation';
import colors from '@/styles/color';

import * as S from '../Basicauction.css';

function ImageRequired() {
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

  const inputFile = useRef(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = Array.from(e.target.files);
      const files = uploadFile.map(file => ({ file }));
      append(files);
    }
  };

  return (
    <div className={S.auctionLabel}>
      <div className={S.title}>사진</div>
      <div className={S.count}>{fields.length}/10</div>
      <div className={S.imageBoard}>
        <label htmlFor="image" className={S.imageUpload}>
          +
          <input
            className={S.imageInput}
            ref={inputFile}
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
              <li key={imageRequiredId} className={S.image}>
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
