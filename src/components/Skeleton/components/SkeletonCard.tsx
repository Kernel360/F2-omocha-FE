import * as S from './SkeletonUI.css';

interface SkeletonCardProps {
  width?: number;
  height?: number;
  className?: string;
}

function SkeletonCard({ className, width, height }: SkeletonCardProps) {
  return <div className={`${className} ${S.skeletonStyle.card} `} style={{ width, height }} />;
}

export default SkeletonCard;
