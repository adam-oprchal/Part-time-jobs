import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormGroup, Paper, TextField, Typography } from '@mui/material';
import isEmail from 'validator/lib/isEmail'

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Cannot be empty' }),
    surname: z.string().trim().min(1, { message: 'Cannot be empty' }),

    email: z.string().min(1, 'E-mail address is required.').refine(isEmail, 'E-mail address is invalid.'),
    password: z.string().min(5, { message: 'Needs at least 5 characters' }),

    passwordConfirm: z.string().min(5, { message: 'Needs at least 5 characters' }),
}).refine(
  (values) => {
    return values.password === values.passwordConfirm;
  },
  {
    message: 'Passwords don\'t match',
    path: ['passwordConfirm'],
  }
);

export type RegisterData = z.infer<typeof registerSchema>;

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
    <Paper style={{minHeight: 300, minWidth: 300, maxWidth: '20vw',  overflow: 'hidden'}} sx={{backgroundColor: 'light.main', margin: 'auto' }} elevation={2} >
      <Typography color="secondary.main" component="p" variant="h4" fontWeight='bold' mt={2} textAlign={'center'}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              InputProps={{ style: { fontWeight: 'bold' } }}
              label='Name'
              {...register('name')}
              error={typeof errors.name !== 'undefined'}
              helperText={errors.name?.message}
            ></TextField>
          </Box>
          <Box component={FormGroup} padding={2}>
            <TextField
              variant='outlined'
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              InputProps={{ style: { fontWeight: 'bold' } }}
              label='Surname'
              {...register('surname')}
              error={typeof errors.surname !== 'undefined'}
              helperText={errors.surname?.message}
            ></TextField>
          </Box>
          <Box component={FormGroup} padding={2}>
            <TextField
              variant='outlined'
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              InputProps={{ style: { fontWeight: 'bold' } }}
              label='e-Mail'
              {...register('email')}
              error={typeof errors.email !== 'undefined'}
              helperText={errors.email?.message}
            ></TextField>
          </Box>
          <Box component={FormGroup} padding={2}>
            <TextField
              variant='outlined'
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              InputProps={{ style: { fontWeight: 'bold' } }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              InputProps={{ style: { fontWeight: 'bold' } }}
              label='Password Confirmation'
              type='password'
              {...register('passwordConfirm')}
              error={typeof errors.passwordConfirm !== 'undefined'}
              helperText={errors.passwordConfirm?.message}
            ></TextField>
          </Box>
        </Box>
      <Box margin={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth type='submit' onClick={handleSubmit(onSubmit)}>Register</Button>
      </Box>
    </Paper>
  );
};
