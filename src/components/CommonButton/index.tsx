/* eslint-disable react/button-has-type */
import * as S from './CommonButton.css';

interface CommonButtonProps {
  content: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function CommonButton({
  content,
  type = 'button',
  onClick,
  disabled = false,
  size = 'md',
}: CommonButtonProps) {
  return (
    <button type={type} disabled={disabled} className={S.buttonVariants[size]} onClick={onClick}>
      <span>{content}</span>
    </button>
  );
}

export default CommonButton;
