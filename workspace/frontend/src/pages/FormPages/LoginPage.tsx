import './form-page.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/TextInput/TextInput';

export const LoginPage = () => {
  return (
    <div className="form-page">
      <div className="form-page__box">
        <h1 className="form-page__header">Log in</h1>

        <TextInput placeholder="email"></TextInput>
        <TextInput placeholder="password"></TextInput>

        <Button label="Enter"></Button>

        <Link to="/">
          <Button label="Go back"></Button>
        </Link>
      </div>
    </div>
  );
};
