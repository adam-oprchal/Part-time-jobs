import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar, Box, Button, FormGroup, IconButton, Menu, MenuItem, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PasswordDialog } from './ChangePasswordDialog';
import { AccountApi } from '../../api/accountApi';
import { AccountWithoutPassword } from 'types';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { documentData}  from './icon'
import { Buffer } from 'buffer';

const accountUpdateSchema = z.object({
    name: z.string().trim().min(1, { message: 'Cannot be empty' }),
    surname: z.string().trim().min(1, { message: 'Cannot be empty' }),

    email: z.string().min(1, 'E-mail address is required.').refine(isEmail, 'E-mail address is invalid.'),
  });

type AccountUpdateData = z.infer<typeof accountUpdateSchema>;

export const AccountPage = () => {
  const [preview, setPreview] = useState<string | null>();
  const [cvPreview, setCvPreview] = useState<string | null>();
  const [account, setAccount] = useState<AccountWithoutPassword | null>();
  const avatarButtonRef = useRef<HTMLInputElement | null>(null);
  const cvButtonRef = useRef<HTMLInputElement | null>(null);
  const [anchorElAvatar, setAnchorElAvatar] = useState<null | HTMLElement>(null);
  const [anchorElCv, setAnchorElCv] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const setResp = async () => {
      const account = await AccountApi.getUserAccount();
      setAccount(account);
      account && setPreview(account.avatar);
    }
    if (!account) {
      setResp();
    }
  }, [account, setPreview]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountUpdateData>({
    resolver: zodResolver(accountUpdateSchema),
  });

  if (!account) {
    return <div>Loading...</div>
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const isAvartarMenuOpen = Boolean(anchorElAvatar);
  const isCvMenuOpen = Boolean(anchorElCv);

  const handleFileMenuAvatarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleFileMenuCvOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCv(event.currentTarget);
  };

  const handleMenuAvatarClose = () => {
    setAnchorElAvatar(null);
  };

  const handleMenuCvClose = () => {
    setAnchorElCv(null);
  };

  const handleAvatarChangeClick = () => {
    handleMenuAvatarClose();
    if (avatarButtonRef.current) {
      avatarButtonRef.current.click();
    }
    handleMenuAvatarClose();
  };

  const handleAvatarDeleteClick = () => {
    handleMenuAvatarClose();
    setPreview('');
  };

  const handleCvChangeClick = () => {
    handleMenuCvClose();
    if (cvButtonRef.current) {
      cvButtonRef.current.click();
    }
    handleMenuCvClose();
  };

  const handleCvDeleteClick = () => {
    handleMenuCvClose();
    setCvPreview('');
  };

  const handleCancelAvatarClick = () => {
    handleMenuAvatarClose();
  };

  const handleCancelCvClick = () => {
    handleMenuCvClose();
  };

  const menuId = 'avatar-menu';
  const renderAvatarMenu = (
    <Menu
      anchorEl={anchorElAvatar}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isAvartarMenuOpen}
      onClose={handleMenuAvatarClose}
    >
      {preview && <MenuItem onClick={handleAvatarChangeClick}>Change</MenuItem>}
      {!preview && <MenuItem onClick={handleAvatarChangeClick}>Insert</MenuItem>}
      {preview && <MenuItem onClick={handleAvatarDeleteClick}>Delete</MenuItem>}
      <MenuItem onClick={handleCancelAvatarClick}>Cancel</MenuItem>
    </Menu>
  );

  const menuCvId = 'cv-menu';
  const renderCvMenu = (
    <Menu
      anchorEl={anchorElCv}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuCvId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isCvMenuOpen}
      onClose={handleMenuCvClose}
    >
      {cvPreview && <MenuItem onClick={handleCvChangeClick}>Change</MenuItem>}
      {!cvPreview && <MenuItem onClick={handleCvChangeClick}>Insert</MenuItem>}
      {cvPreview && <MenuItem onClick={handleCvDeleteClick}>Delete</MenuItem>}
      <MenuItem onClick={handleCancelCvClick}>Cancel</MenuItem>
    </Menu>
  );

  const onSubmit: SubmitHandler<AccountUpdateData> = async (values) => {
    await AccountApi.updateAccount({ firstName: values.name, surname: values.surname, email: values.email, avatar: preview as string });
    navigate('/jobs');
  };

  const onClose = () => {
    navigate('/jobs');
  }

  const handleAvatarFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];

      const compressedBase64 = await compressImage(file);
      setPreview(compressedBase64);
      if (avatarButtonRef.current) {
        avatarButtonRef.current.value = '';
      }
    }
  }

  const handleCvFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];

      loadFile(file)
        .then((fileContent) => {
          console.log(`fileContent: ${JSON.stringify(fileContent, null, 2)}`);
          const buffer = Buffer.from(new Uint8Array(fileContent));
          AccountApi.uploadCv({
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            fileContent: buffer,
          }).then ((result) => {
            console.log(`Cv Update: ${JSON.stringify(result, null, 2)}`);
            setCvPreview(documentData.data);
            if (cvButtonRef.current) {
              cvButtonRef.current.value = '';
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
      }
  }

  const loadFile = async (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("File loaded successfully:", reader.result);
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

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
              defaultValue={account.firstName}
              {...register('name')}
              error={typeof errors.name !== 'undefined'}
              helperText={errors.name?.message}
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
              label='Surname'
              defaultValue={account ? account.surname : ''}
              {...register('surname')}
              error={typeof errors.surname !== 'undefined'}
              helperText={errors.surname?.message}
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
              label='e-Mail'
              defaultValue={account ? account.email : ''}
              {...register('email')}
              error={typeof errors.email !== 'undefined'}
              helperText={errors.email?.message}
            />
          </Box>
          <Box component={FormGroup} padding={2}>
            <Button
              variant='contained'
              style={{width: 'auto'}}
              onClick={handleOpenDialog}
            >Change Password</Button>
          </Box>
          <PasswordDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
        </Box>
      <Box display={'flex'} justifyContent={'center'}>
      <Tooltip title='Avatar'>
        <IconButton
            onClick={handleFileMenuAvatarOpen}>
            <input
              ref={avatarButtonRef}
              id='avatarButton'
              type="file"
              style={{display:'none'}}
              hidden
              accept="image/*"
              onChange={handleAvatarFileChange}
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
        </Tooltip>
        <Tooltip title='CV'>
          <IconButton
            onClick={handleFileMenuCvOpen}>
            <input
              ref={cvButtonRef}
              id='cvButton'
              type="file"
              style={{display:'none'}}
              hidden
              accept="document/*"
              onChange={handleCvFileChange}
            />
            <Avatar
              alt="Preview"
              src={cvPreview || ''}
              style={{
                margin: "10px",
                width: "100px",
                height: "100px",
              }} 
            >
              <AssignmentIcon />
            </Avatar>
           </IconButton>
         </Tooltip>
      </Box>
      <Box margin={2} display={'flex'} justifyContent={'space-between'}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1rem' }} type='submit' onClick={handleSubmit(onSubmit)}>Save</Button>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1rem' }} onClick={onClose}>Cancel</Button>
      </Box>
      <Box>
      </Box>
      {renderAvatarMenu}
      {renderCvMenu}
    </Paper>
  );
};
