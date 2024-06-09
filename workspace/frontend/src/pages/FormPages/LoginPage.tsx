import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, FormGroup, Link, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountApi } from '../../api/accountApi';
import { LoginCredentials } from 'types';


export const LoginPage = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
  });

  const handleRegister = () => {
    navigate('/register');
  }

  const onSubmit: SubmitHandler<LoginCredentials> = async (values) => {
    const result = await AccountApi.login(values.email, values.password);
    if (!result) {
      return;
    }
    navigate('/jobs');
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
            type='password'
            {...register('password')}
            error={typeof errors.password !== 'undefined'}
            helperText={errors.password?.message}
          />
        </Box>
      </Box>
      <Box component={FormGroup} display='flex' padding={2}>
        <Link component="button" variant="body2" textAlign='right' underline="none" sx={{color: 'blue'}} onClick={handleRegister} >Signup for an account</Link>
      </Box>
      <Box margin={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth type='submit' onClick={handleSubmit(onSubmit)}>Login</Button>
      </Box>
    </Paper>
  );
};
