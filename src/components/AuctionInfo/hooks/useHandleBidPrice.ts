import { useEffect, useRef } from 'react';

interface HandleBidPriceProps {
  nowPrice: number | undefined;
  startPrice: number;
  bidUnit: number;
}

export function useHandleBidPrice({ nowPrice, startPrice, bidUnit }: HandleBidPriceProps) {
  const bidInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bidInputRef.current && nowPrice) {
      bidInputRef.current.value = String(nowPrice + bidUnit);
    } else if (bidInputRef.current && startPrice) {
      bidInputRef.current.value = String(startPrice);
    }
  }, [nowPrice, startPrice]);

  const handleBidPriceDown = () => {
    const bidInput = Number(bidInputRef.current?.value);
    let currentBid = bidInput;
    if (nowPrice && bidInput - bidUnit >= nowPrice) {
      currentBid -= bidUnit;
    } else if (bidInput - bidUnit >= startPrice) {
      currentBid -= bidUnit;
    }

    if (currentBid >= nowPrice! + bidUnit && bidInputRef.current) {
      bidInputRef.current.value = String(currentBid);
    }
  };

  return {
    bidInputRef,
    handleBidPriceDown,
  };
}
