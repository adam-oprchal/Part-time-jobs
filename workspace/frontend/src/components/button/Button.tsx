import "./button.css"

interface ButtonProps {
  label: string;
  className?: string;
}

export const Button = ({ label, className }: ButtonProps) => {
  const cName = className === undefined ? "" : className;

  return (
    <button className={`button ${cName}`}>
      {label}
    </button>
  );
};

