import './navbar.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/create">
        <Button label="Create a job offer"></Button>
      </Link>

      <Link to="/account">
        <Button label="My account"></Button>
      </Link>
    </div>
  );
};
