import './navbar.css';
import { Button } from '../Button/Button';

export const Navbar = () => {
  return (
    <div className="navbar">
      <Button label="Create a job offer"></Button>
      <Button label="My account"></Button>
    </div>
  );
};
