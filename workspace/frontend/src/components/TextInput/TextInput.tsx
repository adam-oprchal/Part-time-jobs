import './text-input.css';
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';

interface TextInputProps<T extends FieldValues> {
  placeholder?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  error?: FieldError;
}

export const TextInput = <T extends FieldValues>({
  placeholder,
  register,
  registerName,
  error,
}: TextInputProps<T>) => {
  const errorClass = error === undefined ? '' : 'text-input__error';

  return (
    <>
      <input
        className={`text-input ${errorClass}`}
        type="text"
        placeholder={placeholder}
        {...register(registerName)}
      />
      {error && <p className="text-input__message">{error.message}</p>}
    </>
  );
};
