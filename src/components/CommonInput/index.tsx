/* eslint-disable react/jsx-props-no-spreading */
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
  value?: string;
  disabled?: boolean;
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
}: CommonInputProps<T>) {
  return (
    <label htmlFor={String(id)} className={S.label}>
      <div className={S.title}>{label}</div>
      <input
        disabled={disabled}
        value={value}
        className={S.input}
        id={String(id)}
        type={type}
        min={min}
        placeholder={placeholder}
        {...(register ? register(id, validation) : {})}
      />
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
