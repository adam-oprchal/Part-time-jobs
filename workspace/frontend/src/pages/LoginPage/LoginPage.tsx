import './loginPage.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/TextInput/TextInput';

export const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginPage__box">
        <h1 className="loginPage__header">Log in</h1>

        <TextInput placeholder="username"></TextInput>
        <TextInput placeholder="password"></TextInput>

        <Button label="Enter"></Button>

        <Link to="/">
          <Button label="Go back"></Button>
        </Link>
      </div>
    </div>
  );
};
