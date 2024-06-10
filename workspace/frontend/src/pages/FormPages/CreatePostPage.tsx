import { Box, Button, FormGroup, Paper, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostCreate } from '../../api/usePosts';
import { useNavigate } from 'react-router-dom';

const createPostSchema = z.object({
  jobName: z.string().trim().min(1, { message: 'Cannot be empty' }),
  description: z.string().trim().min(1, { message: 'Cannot be empty' }),
  wage: z.coerce.number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  expectedHours: z.coerce.number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  location: z.string().trim().min(1, { message: 'Cannot be empty' }),
});

type CreatePostData = z.infer<typeof createPostSchema>;

export const CreatePostPage = () => {
  const { mutateAsync: createJob } = usePostCreate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit: SubmitHandler<CreatePostData> = async (values) => {
    const result = createJob({ ...values });
    if (!result) {
      console.error('Create joj failed');
    }
    console.log('Submitted: ', values);
    navigate('/jobs');
  };

  return (
    <Paper style={{minHeight: 300, minWidth: 300, maxWidth: '50vw',  overflow: 'hidden'}} sx={{backgroundColor: 'light.main', margin: 'auto' }} elevation={2} >
      <Typography color="secondary.main" component="p" variant="h4" fontWeight='bold' mt={2} textAlign={'center'}>
        Create a new job
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
            label='Job name'
            {...register("jobName")}
            error={typeof errors.jobName !== 'undefined'}
            helperText={errors.jobName?.message}
          />
        </Box>
        <Box component={FormGroup} mt={1} padding={2}>
          <TextField
            multiline
            minRows={3}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                backgroundColor: 'secondary.contrastText',
                '& fieldset': {
                  borderRadius: '4px',
                },
              },
            }}
            variant='outlined'
            label='Job description'
            {...register("description")}
            error={typeof errors.description !== 'undefined'}
            helperText={errors.description?.message}
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
            label='Wage per hour'
            {...register('wage')}
            error={typeof errors.wage !== 'undefined'}
            helperText={errors.wage?.message}
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
            label='Hours per week'
            {...register('expectedHours')}
            error={typeof errors.expectedHours !== 'undefined'}
            helperText={errors.expectedHours?.message}
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
            label='Location'
            {...register('location')}
            error={typeof errors.location !== 'undefined'}
            helperText={errors.location?.message}
          />
        </Box>
      </Box>
      <Box margin={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Box>
    </Paper>
  )
}
