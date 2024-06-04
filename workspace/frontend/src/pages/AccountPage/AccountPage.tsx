import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterData, registerSchema } from '../FormPages/RegisterPage';
import { z } from 'zod';
import { Avatar, Box, Button, FormGroup, IconButton, Paper, TextField, Typography } from '@mui/material';
import { avatarData}  from './icon'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

const innerSchema = (registerSchema).innerType();
const accountSchema = innerSchema.extend({
  avatar: z.string(),
});

export const AccountPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(avatarData.data);
  const iconButtonRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(accountSchema),
  });

  const onSubmit: SubmitHandler<RegisterData> = (values) => {
    console.log('Submitted: ', values);
  };

  const showButtons = () => {
    const button1 = document.getElementById('changeAvatar');
    if (button1) {
      button1.style.display = 'flex';
    }
    const button2 = document.getElementById('deleteAvatar');
    if (button2) {
      button2.style.display = 'flex';
    }
    const button3 = document.getElementById('cancelAvatar');
    if (button3) {
      button3.style.display = 'flex';
    }
  }

  const handleOnClick = () => {
    if (preview !== '') {
      showButtons();
    } else {
      if (iconButtonRef.current) {
        iconButtonRef.current.click();
      }
    }
  }

  const hideButtons = () => {
    const button1 = document.getElementById('changeAvatar');
    if (button1) {
      button1.style.display = 'none';
    }
    const button2 = document.getElementById('deleteAvatar');
    if (button2) {
      button2.style.display = 'none';
    }
    const button3 = document.getElementById('cancelAvatar');
    if (button3) {
      button3.style.display = 'none';
    }
  }

  const deleteAvatar = () => {
    setPreview('');
    hideButtons();
  }

  const changeAvatar = async () => {
    if (iconButtonRef.current) {
      iconButtonRef.current.click();
    }
    hideButtons();
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFile(file);

      const compressedBase64 = await compressImage(file);
      setPreview(compressedBase64);
    }
  }

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxWidth = 100;
          const maxHeight = 100;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          const quality = 0.7; // Compression quality (0 to 1)
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Paper style={{minHeight: 300, minWidth: 300, maxWidth: '20vw',  overflow: 'hidden'}} sx={{backgroundColor: 'light.main', margin: 'auto' }} elevation={2} >
      <Typography color="secondary.main" component="p" variant="h4" fontWeight='bold' mt={2} textAlign={'center'}>
        Account Info
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
              disabled={true}
              hidden={true}
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
                }
              }}
              InputProps={{ style: { fontWeight: 'bold' } }}
              disabled={true}
              label='Password Confirmation'
              type='password'
              {...register('passwordConfirm')}
              error={typeof errors.passwordConfirm !== 'undefined'}
              helperText={errors.passwordConfirm?.message}
            ></TextField>
          </Box>
        </Box>
      <Box display={'flex'} justifyContent={'center'}>
          <IconButton
            onClick={handleOnClick}>
            <input
              ref={iconButtonRef}
              id='avatarButton'
              type="file"
              style={{display:'none'}}
              hidden
              accept="image/*"
              onChange={handleFileChange}
              />
            <Avatar
          alt="Preview"
          src={preview || ''}
          style={{
            margin: "10px",
            width: "100px",
            height: "100px",
          }} 
          />
          </IconButton>
      </Box>
      <Box margin={2} display={'flex'} justifyContent={'space-between'}>
        <Button id='changeAvatar' variant='contained' style={{fontWeight: 'bold', fontSize: '0.7rem', display: 'none' }} onClick={changeAvatar}>Change Avatar</Button>
        <Button id='deleteAvatar' variant='contained' style={{fontWeight: 'bold', fontSize: '0.7rem', display: 'none' }} onClick={deleteAvatar}>Remove Avatar</Button>
        <Button id='cancelAvatar' variant='contained' style={{fontWeight: 'bold', fontSize: '0.7rem', display: 'none' }} onClick={hideButtons}>Cancel</Button>
      </Box>
      <Box margin={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth type='submit' onClick={handleSubmit(onSubmit)}>Save</Button>
      </Box>
      <Box>
      </Box>
    </Paper>
  );
};
