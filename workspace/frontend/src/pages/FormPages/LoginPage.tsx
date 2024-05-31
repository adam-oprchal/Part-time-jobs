import './form-page.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/TextInput/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<LoginData> = (values) => {
    console.log('Submitted: ', values);
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit(submitHandler)} className="form-page__box">
        <h1 className="form-page__header">Log in</h1>

        <TextInput
          placeholder="email"
          register={register}
          registerName="email"
        ></TextInput>
        <TextInput
          placeholder="password"
          type="password"
          register={register}
          registerName="password"
        ></TextInput>

        <Button label="Enter"></Button>

        <Link to="/">
          <Button label="Go back"></Button>
        </Link>
      </form>
    </div>
  );
};
