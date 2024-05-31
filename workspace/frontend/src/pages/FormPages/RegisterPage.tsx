import './form-page.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/TextInput/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Cannot be empty' }),
    surname: z.string().trim().min(1, { message: 'Cannot be empty' }),
    email: z.string().email(),
    password: z.string().min(5, { message: 'Needs at least 5 characters' }),
    passwordAgain: z.string(),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "Passwords don't match",
    path: ['passwordMatch'],
  });

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler: SubmitHandler<RegisterData> = (values) => {
    console.log('Submitted: ', values);
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit(submitHandler)} className="form-page__box">
        <h1 className="form-page__header">Register</h1>

        <TextInput
          placeholder="name"
          register={register}
          registerName="name"
          error={errors.name}
        ></TextInput>
        <TextInput
          placeholder="surname"
          register={register}
          registerName="surname"
          error={errors.surname}
        ></TextInput>
        <TextInput
          placeholder="email"
          register={register}
          registerName="email"
          error={errors.email}
        ></TextInput>
        <TextInput
          placeholder="password"
          register={register}
          registerName="password"
          error={errors.password}
        ></TextInput>
        <TextInput
          placeholder="password again"
          register={register}
          registerName="passwordAgain"
          // typescript doesn't like this,
          // I haven't found a nice solution yet
          error={errors.passwordMatch}
        ></TextInput>

        <Button label="Enter"></Button>

        <Link to="/">
          <Button label="Go back"></Button>
        </Link>
      </form>
    </div>
  );
};
