import './welcomePage.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  return (
    <div className="welcomePage">
      <div className="welcomePage__box">
        <h1 className="welcomePage__header">Welcome!</h1>

        <div className="welcomePage__buttons">
          <Link to="/login">
            <Button label="Log in" />
          </Link>

          <Link to="/register">
            <Button label="Register" />
          </Link>
        </div>
      </div>
    </div>
  );
};
