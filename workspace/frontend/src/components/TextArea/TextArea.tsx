import './textArea.css';

interface TextAreaProps {
  placeholder?: string;
  className?: string;
}

export const TextArea = ({ placeholder, className }: TextAreaProps) => {
  const cName = className === undefined ? '' : className;

  return (
    <textarea
      className={`textArea ${cName}`}
      placeholder={placeholder}
    ></textarea>
  );
};
