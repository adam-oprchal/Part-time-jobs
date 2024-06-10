import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Dialog, DialogActions, DialogContent, FormGroup, TextField, Typography } from '@mui/material';
import { AccountApi } from '../../api/accountApi';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const changePasswordSchema = z.object({
  oldPassword: z.string().min(5, { message: 'Needs at least 5 characters' }),
  newPassword: z.string().min(5, { message: 'Needs at least 5 characters' }),

  newPasswordConfirm: z.string().min(5, { message: 'Needs at least 5 characters' }),
}).refine(
(values) => {
  return values.newPassword === values.newPasswordConfirm;
},
{
  message: 'Passwords don\'t match',
  path: ['passwordConfirm'],
}
);

type changePasswordData = z.infer<typeof changePasswordSchema>;


export const PasswordDialog: FC<PasswordDialogProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (values:changePasswordData) => {
    await AccountApi.changePassword(values.oldPassword, values.newPassword, values.newPasswordConfirm);
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ sx: { backgroundColor: 'light.main', boxShadow: 'none' } }}>
      <DialogContent>
      <Typography color="secondary.main" component="p" variant="h5" fontWeight='bold' mt={2} textAlign={'center'} sx={{backgroundColor: 'light.main', margin: 'auto' }} >
        Change password
      </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Box component={FormGroup} mt={1} paddingTop={1} paddingBottom={1}>
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
              label='Old password'
              type='password'
              {...register('oldPassword')}
              error={typeof errors.oldPassword !== 'undefined'}
              helperText={errors.oldPassword?.message}
            />
          </Box>
          <Box component={FormGroup} paddingTop={1} paddingBottom={1}>
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
              label='New Password'
              type='password'
              {...register('newPassword')}
              error={typeof errors.newPassword !== 'undefined'}
              helperText={errors.newPassword?.message}
            />
          </Box>
          <Box component={FormGroup} paddingTop={1} paddingBottom={1}>
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
              label='New password confirmation'
              type='password'
              {...register('newPasswordConfirm')}
              error={typeof errors.newPasswordConfirm !== 'undefined'}
              helperText={errors.newPasswordConfirm?.message}
            />
          </Box>
        </Box>
        <DialogActions>
        <Box display="flex" justifyContent={'space-between'}>
          <Button variant="contained" style={{marginLeft: '2rem', marginRight: '2rem', width: 'auto'}} onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button variant="contained" style={{marginLeft: '2rem', marginRight: '2rem', width: 'auto'}} onClick={onClose}>Cancel</Button>
        </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
};
