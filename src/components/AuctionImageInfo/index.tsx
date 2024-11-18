/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import * as S from './AuctionImageInfo.css';

interface AuctionImageInfoProps {
  imageList: string[];
}

function AuctionImageInfo({ imageList }: AuctionImageInfoProps) {
  const [focusImage, setFocusImage] = useState<string>(imageList[0]);

  const checkFocusImage = (image: string) => {
    if (focusImage === image) {
      return true;
    }
    return false;
  };

  return (
    <div className={S.imageSection}>
      <div className={S.subImageWrapper}>
        {imageList.map(image => (
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
            <img
              src={`${process.env.NEXT_PUBLIC_S3_URL}${image}`}
              alt="Auction Image"
              className={S.subImage}
            />
          </button>
        ))}
      </div>
      <div className={S.mainImageWrapper}>
        <img
          src={`${process.env.NEXT_PUBLIC_S3_URL}${focusImage}`}
          alt="Auction Image"
          className={S.mainImage}
        />
      </div>
    </div>
  );
}

export default AuctionImageInfo;
