import * as S from './SkeletonUI.css';

interface SkeletonCardProps {
  width?: number;
  height?: number;
}

function SkeletonCard({ width, height }: SkeletonCardProps) {
  return <div className={S.skeletonStyle.card} style={{ width, height }} />;
}

export default SkeletonCard;
