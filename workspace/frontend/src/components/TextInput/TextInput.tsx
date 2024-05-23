import './text-input.css';

interface TextInputProps {
  placeholder?: string;
  className?: string;
}

export const TextInput = ({ placeholder, className }: TextInputProps) => {
  const cName = className === undefined ? '' : className;

  return (
    <input
      className={`text-input ${cName}`}
      type="text"
      placeholder={placeholder}
    />
  );
};
