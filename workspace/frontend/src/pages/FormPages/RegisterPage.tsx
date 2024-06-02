import './form-page.css';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormGroup, Paper, TextField, Typography } from '@mui/material';
import isEmail from 'validator/lib/isEmail'

const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Cannot be empty' }),
    surname: z.string().trim().min(1, { message: 'Cannot be empty' }),

    email: z.string().min(1, 'E-mail address is required.').refine(isEmail, 'E-mail address is invalid.'),
    password: z.string().min(5, { message: 'Needs at least 5 characters' }),

    passwordConfirm: z.string(),
}).refine(
  (values) => {
    return values.password === values.passwordConfirm;
  },
  {
    message: 'Passwords don\'t match',
    path: ['passwordConfirm'],
  }
);

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });


  const onSubmit: SubmitHandler<RegisterData> = (values) => {
    console.log('Submitted: ', values);
  };

  return (

    <Paper className='form-page__header' style={{minHeight: 600, minWidth: 600, overflow: 'hidden'}} elevation={2}>
      <Typography color="secondary.main" component="p" variant="h4" fontWeight='bold' textAlign={'center'}>
        Register
      </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Box component={FormGroup} mt={1} padding={2}>
            <TextField
              variant='outlined'
              style={{background: 'light'}}
              label='Name'
              {...register('name')}
              error={typeof errors.name !== 'undefined'}
              helperText={errors.name?.message}
            ></TextField>
          </Box>
          <Box component={FormGroup} padding={2}>
            <TextField
              variant='outlined'
              style={{background: 'light'}}
              label='Surname'
              {...register('surname')}
              error={typeof errors.surname !== 'undefined'}
              helperText={errors.surname?.message}
            ></TextField>
          </Box>
          <Box component={FormGroup} padding={2}>
            <TextField
              variant='outlined'
              style={{background: 'light'}}
              label='e-Mail'
              {...register('email')}
              error={typeof errors.email !== 'undefined'}
              helperText={errors.email?.message}
            ></TextField>
          </Box>
          <Box component={FormGroup} padding={2}>
            <TextField
              variant='outlined'
              style={{background: 'light'}}
              label='Password'
              type='password'
              {...register('password')}
              error={typeof errors.password !== 'undefined'}
              helperText={errors.password?.message}
            ></TextField>
          </Box>
          <Box component={FormGroup} padding={2}>
            <TextField
              variant='outlined'
              style={{background: 'light'}}
              label='Password Confirmation'
              type='password'
              {...register('passwordConfirm')}
              error={typeof errors.passwordConfirm !== 'undefined'}
              helperText={errors.passwordConfirm?.message}
            ></TextField>
          </Box>
        </Box>
      <Box ml={2} mr={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth type='submit' onClick={handleSubmit(onSubmit)}>Register</Button>
      </Box>
    </Paper>
  );
};
