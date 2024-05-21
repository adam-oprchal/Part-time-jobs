import './navbar.css';
import { Button } from '../button/Button';

export const Navbar = () => {
  return (
    <div className="navbar">
      <Button label="Create a job offer"></Button>
      <Button label="Log in"></Button>
    </div>
  );
};
