import './text-area.css';
import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from 'react-hook-form';

interface TextAreaProps<T extends FieldValues> {
  placeholder?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  error?: FieldError;
}

export const TextArea = <T extends FieldValues>({
  placeholder,
  register,
  registerName,
  error,
}: TextAreaProps<T>) => {
  const errorClass = error === undefined ? '' : 'text-area__error';

  return (
    <>
      <textarea
        className={`text-area ${errorClass}`}
        placeholder={placeholder}
        {...register(registerName)}
      ></textarea>
      {error && <p className="text-area__message">{error.message}</p>}
    </>
  );
};
