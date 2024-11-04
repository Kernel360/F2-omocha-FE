/* eslint-disable react/button-has-type */
import * as S from './CommonButton.css';

interface CommonButtonProps {
  content: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function CommonButton({
  content,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}: CommonButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} ${S.button}`}
      onClick={onClick}
    >
      <span>{content}</span>
    </button>
  );
}

export default CommonButton;
