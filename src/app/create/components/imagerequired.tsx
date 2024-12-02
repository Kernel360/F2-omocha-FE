/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { TriangleAlertIcon } from 'lucide-react';

import ImageItem from '@/app/create/components/imageitem';
import { AuctionInputs } from '@/app/create/types/InputTypes';
import { imageValidation } from '@/app/create/utils/createValidation';
import { useToast } from '@/provider/toastProvider';
import colors from '@/styles/color';

import * as S from '../Basicauction.css';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

function ImageRequired() {
  const {
    formState: { errors },
    control,
  } = useFormContext<AuctionInputs>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'imagesRequired',
    keyName: 'imageRequiredId',
    rules: imageValidation,
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { showToast } = useToast();

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFiles = Array.from(e.target.files);

      const validFiles = uploadFiles.filter(file => {
        if (file.size > MAX_IMAGE_SIZE) {
          showToast('error', '1MB 이하의 이미지만 업로드 가능합니다.');
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        const newFiles = validFiles.map(file => ({ file }));
        const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));

        append(newFiles);
        setPreviewImages(prevUrls => [...prevUrls, ...newPreviewUrls]);
      }
    }
  };

  const deleteImage = (index: number) => {
    remove(index);
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || source.index === destination.index) return;

    const updatedFields = [...fields];
    const [removed] = updatedFields.splice(source.index, 1);
    updatedFields.splice(destination.index, 0, removed);
    move(source.index, destination.index);

    const updatedPreviewImages = [...previewImages];
    const [movedPreview] = updatedPreviewImages.splice(source.index, 1);
    updatedPreviewImages.splice(destination.index, 0, movedPreview);

    setPreviewImages(updatedPreviewImages);
  };

  return (
    <div className={S.auctionLabel}>
      <h2 className={S.title}>사진</h2>
      <div className={S.flexWrapper}>
        <div className={S.description}>
          첫 번째 이미지가 대표 이미지로 설정됩니다.
          <br />
          png, jpg, jpeg, gif 파일만 업로드 가능합니다.
        </div>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="imageList" direction="horizontal">
            {droppableProvided => (
              <ul
                className={S.imageList}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {previewImages.map((previewImage, index) => (
                  <ImageItem
                    key={fields[index].imageRequiredId}
                    imageRequiredId={fields[index].imageRequiredId}
                    previewImage={previewImage}
                    index={index}
                    deleteImage={deleteImage}
                  />
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
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
