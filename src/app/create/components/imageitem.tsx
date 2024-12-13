/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { CircleXIcon } from 'lucide-react';

import CommonImage from '@/components/CommonImage';
import colors from '@/styles/color';

import * as S from '../Basicauction.css';

interface ImageItemProps {
  imageRequiredId: string;
  index: number;
  deleteImage: (index: number) => void;
  previewImage: string;
}

function ImageItem({ imageRequiredId, index, deleteImage, previewImage }: ImageItemProps) {
  return (
    <Draggable key={imageRequiredId} draggableId={imageRequiredId} index={index}>
      {draggableProvided => (
        <li
          className={S.imageWrapper}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          {index === 0 && <div className={S.thumbnailButton}>대표</div>}
          <CommonImage
            className={S.image}
            fill
            fillWidth={150}
            fillHeight={127}
            sizes="25vw"
            src={previewImage}
            alt={previewImage}
          />
          <button type="button" className={S.deleteButton} onClick={() => deleteImage(index)}>
            <CircleXIcon stroke={colors.gray10} size={20} />
          </button>
        </li>
      )}
    </Draggable>
  );
}

export default ImageItem;
