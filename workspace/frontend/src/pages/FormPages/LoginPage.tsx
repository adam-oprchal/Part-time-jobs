import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmail } from 'validator';
import { Box, Button, FormGroup, Paper, TextField, Typography } from '@mui/material';

const loginSchema = z.object({

  email: z.string().min(1, 'E-mail address is required!').refine(isEmail, 'E-mail address is invalid!'),
  password: z.string().min(1, 'Password is required!'),
});

type LoginData = z.infer<typeof loginSchema>;

export const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit: SubmitHandler<LoginData> = (values) => {
    console.log('Submitted: ', values);
  };

  return (

    <Paper style={{minHeight: 300, minWidth: 300, maxWidth: '20vw',  overflow: 'hidden'}} sx={{backgroundColor: 'light.main', margin: 'auto' }} elevation={2} >
      <Typography color="secondary.main" component="p" variant="h4" fontWeight='bold' mt={2} textAlign={'center'}>
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
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
            label='email'
            {...register('email')}
            error={typeof errors.email !== 'undefined'}
            helperText={errors.email?.message}
          />
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
            label='password'
            {...register('password')}
            error={typeof errors.password !== 'undefined'}
            helperText={errors.password?.message}
          />
        </Box>
      </Box>
      <Box margin={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth type='submit' onClick={handleSubmit(onSubmit)}>Login</Button>
      </Box>
    </Paper>
  );
};
