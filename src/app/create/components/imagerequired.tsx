/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { TriangleAlertIcon } from 'lucide-react';

import ImageItem from '@/app/create/components/imageitem';
import { AuctionInputs } from '@/app/create/types/InputTypes';
import { imageValidation } from '@/app/create/utils/createValidation';
import colors from '@/styles/color';

import * as S from '../Basicauction.css';

function ImageRequired() {
  const {
    formState: { errors },
    control,
  } = useFormContext<AuctionInputs>();

  const { fields, append, remove, replace } = useFieldArray({
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

  const deleteImage = (index: number) => {
    const fileToRemove = fields[index].file;
    URL.revokeObjectURL(URL.createObjectURL(fileToRemove));
    remove(index);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    // source - 시작 위치, destination - 끝 위치
    if (!destination || source.index === destination.index) return;

    const updatedFields = [...fields];
    const [removed] = updatedFields.splice(source.index, 1);
    updatedFields.splice(destination.index, 0, removed);
    replace(updatedFields);
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
                {fields.map(({ imageRequiredId, file }, index) => (
                  <ImageItem
                    key={imageRequiredId}
                    imageRequiredId={imageRequiredId}
                    file={file}
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
