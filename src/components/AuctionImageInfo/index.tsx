/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import Image from 'next/image';

import * as S from './AuctionImageInfo.css';

interface AuctionImageInfoProps {
  imageList: string[];
  thumbnail: string;
}

function AuctionImageInfo({ imageList, thumbnail }: AuctionImageInfoProps) {
  const images = [thumbnail, ...imageList];
  const [focusImage, setFocusImage] = useState<string>(images[0]);

  const checkFocusImage = (image: string) => {
    if (focusImage === image) {
      return true;
    }
    return false;
  };

  return (
    <div className={S.imageSection}>
      <div className={S.subImageWrapper}>
        {images.map(image => (
          <button
            type="button"
            key={image}
            className={
              checkFocusImage(image)
                ? S.subImageWrapperButton.active
                : S.subImageWrapperButton.nonActive
            }
            onClick={() => setFocusImage(image)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL}${image}`}
              width={60}
              height={60}
              alt="Auction Image"
              className={S.subImage}
            />
          </button>
        ))}
      </div>
      <div className={S.mainImageWrapper}>
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}${focusImage}`}
          width={440}
          height={440}
          alt="Auction Image"
          className={S.mainImage}
        />
      </div>
    </div>
  );
}

export default AuctionImageInfo;
