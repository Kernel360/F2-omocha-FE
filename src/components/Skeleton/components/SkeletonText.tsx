/* eslint-disable react/no-array-index-key */
import * as S from './SkeletonUI.css';

interface SkeletonTextProps {
  noOfLines?: number;
  gap?: number;
  height?: number;
}

function SkeletonText({ noOfLines = 1, gap = 4, height = 16 }: SkeletonTextProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {noOfLines &&
        Array.from({ length: noOfLines }).map((_, index) => (
          <div key={index} className={S.skeletonStyle.text} style={{ height }} />
        ))}
    </div>
  );
}

export default SkeletonText;
