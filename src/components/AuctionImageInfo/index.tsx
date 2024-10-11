import { useState } from 'react';

interface AuctionImageInfoProps {
  imageList: string[];
}

function AuctionImageInfo({ imageList }: AuctionImageInfoProps) {
  console.log(imageList);
  const [focusImage, setFocusImage] = useState<string>(imageList[0]);

  console.log(focusImage, setFocusImage);
  return (
    <>
      <div>여기는 list 가 나올 영역이에용</div>
      <div>여기는 선택된 요소가 </div>
    </>
  );
}

export default AuctionImageInfo;
