import { useCallback, useState } from 'react';

import { ImageOffIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

import SkeletonCard from '@/components/Skeleton/components/SkeletonCard';

import * as S from './CommonImage.css';

interface CommonImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  fillWidth?: number;
  fillHeight?: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

function CommonImage({
  src,
  alt,
  width,
  height,
  className,
  fill,
  fillWidth,
  fillHeight,
  sizes = '50vw',
  priority,
}: CommonImageProps) {
  const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>('loading');

  const handleLoad = useCallback(() => {
    setStatus('loaded');
  }, [status]);

  const handleError = useCallback(() => {
    setStatus('error');
  }, [status]);

  return (
    <div
      className={S.imageWrapper}
      style={{
        ...(fill
          ? { position: 'relative', width: fillWidth, height: fillHeight }
          : { maxWidth: width, maxHeight: height }),
      }}
    >
      {status === 'loading' && (
        <div className={`${className} ${S.imageLoading}`}>
          <SkeletonCard width={width} height={height} className={className} />
        </div>
      )}

      {status === 'error' ? (
        <ImageOffIcon size={24} color="lightgray" />
      ) : (
        <Image
          src={src}
          alt={alt}
          style={{ objectFit: 'contain' }}
          width={width}
          height={height}
          fill={fill}
          sizes={sizes}
          className={className}
          priority={priority}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}

export default CommonImage;
