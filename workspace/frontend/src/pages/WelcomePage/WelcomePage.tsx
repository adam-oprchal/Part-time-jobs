import './welcomePage.css';
import { Button } from '../../components/Button/Button';

export const WelcomePage = () => {
  return (
    <div className="welcomePage">
      <div className="welcomePage__box">
        <h1 className="welcomePage__header">Welcome!</h1>
        <div className="welcomePage__buttons">
          <Button label="Log in" />
          <Button label="Register" />
        </div>
      </div>
    </div>
  );
};
