/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import Image from 'next/image';

import * as S from './CommonImage.css';

interface CommonImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  fillWidth?: string;
  fillHeight?: string;
  sizes?: string;
}

function CommonImage({
  src,
  alt,
  width,
  height,
  className,
  fill,
  sizes = '50vw',
  fillWidth,
  fillHeight,
}: CommonImageProps) {
  const [isImageError, setIsImageError] = useState(false);

  const imageSize = () => {
    if (isImageError) {
      return { width: 24, height: 24 };
    }
    if (fill) {
      return { fill, sizes };
    }
    return { width, height };
  };

  return (
    <div
      className={S.imageBase}
      style={{
        ...(fill
          ? { position: 'relative', width: fillWidth, height: fillHeight }
          : { width, height }),
      }}
    >
      {isImageError ? (
        <Image
          src="/image-off.png"
          alt="error-image"
          {...imageSize()}
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          style={{ objectFit: 'contain' }}
          {...imageSize()}
          className={className}
          onError={() => setIsImageError(true)}
        />
      )}
    </div>
  );
}

export default CommonImage;
