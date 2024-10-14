import { useState } from 'react';

import Image from 'next/image';

import * as S from './AuctionImageInfo.css';

interface AuctionImageInfoProps {
  imageList: string[];
}

function AuctionImageInfo({ imageList }: AuctionImageInfoProps) {
  console.log(imageList);
  const [focusImage, setFocusImage] = useState<string>(imageList[0]);

  console.log(focusImage, setFocusImage);
  return (
    <div className={S.imageSection}>
      <div className={S.subImageWrapper}>
        {imageList.map(image => (
          <button
            type="button"
            key={image}
            className={S.subImageButton}
            onClick={() => setFocusImage(image)}
          >
            <Image
              src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${image}`}
              alt="Auction Image"
              width={100}
              height={100}
              // className={S.cardImage}
            />
          </button>
        ))}
      </div>
      <div className={S.mainImageWrapper}>
        <Image
          src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${focusImage}`}
          alt="Auction Image"
          width={462}
          height={462}
          // className={S.cardImage}
        />{' '}
      </div>
    </div>
  );
}

export default AuctionImageInfo;
