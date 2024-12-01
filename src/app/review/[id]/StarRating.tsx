'use client';

import { useMemo } from 'react';
import Stars from 'react-stars';

interface StarRatingProps {
  setRating: (rating: number) => void;
}

function StarRating({ setRating }: StarRatingProps) {
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const starsComponent = useMemo(
    () => (
      <Stars
        count={5}
        size={24}
        color2="#ffd700"
        value={0}
        half={false}
        onChange={handleRatingChange}
      />
    ),
    [],
  );

  return starsComponent;
}

export default StarRating;
