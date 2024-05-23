import './text-area.css';

interface TextAreaProps {
  placeholder?: string;
  className?: string;
}

export const TextArea = ({ placeholder, className }: TextAreaProps) => {
  const cName = className === undefined ? '' : className;

  return (
    <textarea
      className={`text-area ${cName}`}
      placeholder={placeholder}
    ></textarea>
  );
};
