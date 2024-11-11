/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import Image from 'next/image';

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
  sizes,
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
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(fill
          ? { position: 'relative', width: fillWidth, height: fillHeight }
          : { width, height }),
      }}
    >
      <Image
        src={isImageError ? '/image-off.png' : src}
        alt={alt}
        style={{ objectFit: 'contain' }}
        className={className}
        onError={() => setIsImageError(true)}
        {...imageSize()}
      />
    </div>
  );
}

export default CommonImage;
