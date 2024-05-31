import './form-page.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/TextInput/TextInput';
import { TextArea } from '../../components/TextArea/TextArea';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const postSchema = z.object({
  description: z.string().trim().min(1, { message: 'Cannot be empty' }),
  pay: z.coerce
    .number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  hours: z.coerce
    .number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  location: z.string().trim().min(1, { message: 'Cannot be empty' }),
});

type PostData = z.infer<typeof postSchema>;

export const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
  });

  const submitHandler: SubmitHandler<PostData> = (values) => {
    console.log('Submitted: ', values);
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit(submitHandler)} className="form-page__box">
        <h1 className="form-page__header">Create</h1>
        <h1 className="form-page__header">offer</h1>

        <TextArea
          placeholder="description"
          register={register}
          registerName="description"
          error={errors.description}
        ></TextArea>
        <TextInput
          placeholder="$/hr"
          register={register}
          registerName="pay"
          error={errors.pay}
        ></TextInput>
        <TextInput
          placeholder="hr/week"
          register={register}
          registerName="hours"
          error={errors.hours}
        ></TextInput>
        <TextInput
          placeholder="location"
          register={register}
          registerName="location"
          error={errors.location}
        ></TextInput>

        <Button label="Enter"></Button>

        <Link to="/jobs">
          <Button label="Go back"></Button>
        </Link>
      </form>
    </div>
  );
};
