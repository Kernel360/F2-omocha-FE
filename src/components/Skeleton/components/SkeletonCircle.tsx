import * as S from './SkeletonUI.css';

interface SkeletonCircleProps {
  size?: number;
}

function SkeletonCircle({ size }: SkeletonCircleProps) {
  return <div className={S.skeletonStyle.circle} style={{ width: size, height: size }} />;
}

export default SkeletonCircle;
