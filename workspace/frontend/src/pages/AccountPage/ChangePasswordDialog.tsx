import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AccountApi } from '../../api/accountApi';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(5, { message: 'Needs at least 5 characters' }),
    newPasswordConfirm: z
      .string()
      .min(5, { message: 'Needs at least 5 characters' }),
  })
  .refine(
    (values) => {
      return values.newPassword === values.newPasswordConfirm;
    },
    {
      message: "Passwords don't match",
      path: ['newPasswordConfirm'],
    }
  );

type changePasswordData = z.infer<typeof changePasswordSchema>;

export const PasswordDialog: FC<PasswordDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (values: changePasswordData) => {
    console.log(`ChangePwd`);
    try {
      const result = await AccountApi.changePassword(
        values.oldPassword,
        values.newPassword,
        values.newPasswordConfirm
      );
      console.log(`ChangePwd: ${result}`);
      setLoginError('');
    } catch (error) {
      console.log(`ChangePwd: ${error}`);
      setLoginError('The old password is incorrect!');
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { backgroundColor: 'light.main', boxShadow: 'none' } }}
    >
      <DialogContent>
        <Typography
          color="secondary.main"
          component="p"
          variant="h5"
          fontWeight="bold"
          mt={2}
          textAlign={'center'}
          sx={{ backgroundColor: 'light.main', margin: 'auto' }}
        >
          Change password
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Box component={FormGroup} mt={1} paddingTop={1} paddingBottom={1}>
            <TextField
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              label="Old password"
              type="password"
              defaultValue=""
              {...register('oldPassword')}
              error={typeof errors.oldPassword !== 'undefined'}
              helperText={errors.oldPassword?.message}
            />
          </Box>
          <Box component={FormGroup} paddingTop={1} paddingBottom={1}>
            <TextField
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              label="New Password"
              type="password"
              defaultValue=""
              {...register('newPassword')}
              error={typeof errors.newPassword !== 'undefined'}
              helperText={errors.newPassword?.message}
            />
          </Box>
          <Box component={FormGroup} paddingTop={1} paddingBottom={1}>
            <TextField
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'secondary.contrastText',
                  '& fieldset': {
                    borderRadius: '4px',
                  },
                },
              }}
              label="New password confirmation"
              type="password"
              defaultValue=""
              {...register('newPasswordConfirm')}
              error={typeof errors.newPasswordConfirm !== 'undefined'}
              helperText={errors.newPasswordConfirm?.message}
            />
          </Box>
        </Box>
        <DialogActions>
          <Box display="flex" justifyContent={'space-between'}>
            <Button
              variant="contained"
              style={{ marginLeft: '2rem', marginRight: '2rem', width: 'auto' }}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: '2rem', marginRight: '2rem', width: 'auto' }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
        {loginError !== '' && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{loginError}</Alert>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};
