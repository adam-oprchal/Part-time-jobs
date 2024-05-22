import './textInput.css';

interface TextInputProps {
  placeholder?: string;
  className?: string;
}

export const TextInput = ({ placeholder, className }: TextInputProps) => {
  const cName = className === undefined ? '' : className;

  return (
    <input
      className={`textInput ${cName}`}
      type="text"
      placeholder={placeholder}
    />
  );
};
