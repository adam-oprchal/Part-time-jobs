import './welcome-page.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-page__box">
        <h1 className="welcome-page__header">Welcome!</h1>

        <div className="welcome-page__buttons">
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
