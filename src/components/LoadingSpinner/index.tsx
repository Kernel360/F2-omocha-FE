import * as S from './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className={S.spinnerContainer}>
      <div className={S.spinner} />
    </div>
  );
}

export default LoadingSpinner;
