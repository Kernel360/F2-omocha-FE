/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import { UseFormRegister, FieldError, RegisterOptions, FieldValues, Path } from 'react-hook-form';

import { TriangleAlertIcon } from 'lucide-react';

import colors from '@/styles/color';

import * as S from './CommonInput.css';

interface CommonInputProps<T extends FieldValues> {
  id: Path<T>; // react-hook-form의 Path 타입을 사용
  label: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'datetime-local';
  placeholder?: string;
  register?: UseFormRegister<T>; // 제네릭 타입으로 register 타입 설정
  error?: FieldError;
  validation?: RegisterOptions<T>; // 유효성 검사 옵션을 제네릭으로 설정
  min?: number | string; // 데이트 피커에 활용
  value?: string | number;
  disabled?: boolean;
  children?: ReactNode;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CommonInput<T extends FieldValues>({
  id,
  label,
  type = 'text',
  placeholder = '',
  register,
  error,
  validation = {},
  min,
  value,
  disabled,
  children,
  onWheel,
  onClick,
  onChange,
}: CommonInputProps<T>) {
  return (
    <label htmlFor={String(id)} className={S.label}>
      <h3 className={disabled ? S.disabledTitle : S.title}>{label}</h3>
      <div className={S.inputWrapper}>
        <input
          disabled={disabled}
          value={value}
          className={S.input}
          id={String(id)}
          type={type}
          min={min}
          placeholder={placeholder}
          {...(register ? register(id, validation) : {})}
          onWheel={onWheel}
          onClick={onClick}
          onChange={onChange}
        />
        {children}
      </div>
      {error && (
        <span className={S.error}>
          <TriangleAlertIcon size={16} stroke={colors.primary10} />
          {error.message}
        </span>
      )}
    </label>
  );
}

export default CommonInput;
