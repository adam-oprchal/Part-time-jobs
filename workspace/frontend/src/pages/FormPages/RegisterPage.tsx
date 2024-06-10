import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormGroup, Link, Paper, TextField, Typography } from '@mui/material';
import isEmail from 'validator/lib/isEmail'
import { useNavigate } from 'react-router-dom';
import { AccountApi } from '../../api/accountApi';

const registerSchema = z
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

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const handleLogin = () => {
    navigate('/login');
  }

  const onSubmit: SubmitHandler<RegisterData> = async (values) => {
    const result = await AccountApi.register({ firstName: values.name, surname: values.surname, email: values.email, password: values.password, passwordConfirm: values.passwordConfirm });
    if (!result) {
      return;
    }
    navigate('/login');
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
              label='Password Confirmation'
              type='password'
              {...register('passwordConfirm')}
              error={typeof errors.passwordConfirm !== 'undefined'}
              helperText={errors.passwordConfirm?.message}
            ></TextField>
          </Box>
        </Box>
      <Box component={FormGroup} display='flex' padding={2}>
        <Link component="button" variant="body2" textAlign='right' underline="none" sx={{color: 'blue'}} onClick={handleLogin} >I already have an account</Link>
      </Box>
      <Box margin={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth type='submit' onClick={handleSubmit(onSubmit)}>Register</Button>
      </Box>
    </Paper>
  );
};
