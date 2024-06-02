import './form-page.css';
import { Box, Button, FormGroup, Paper, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

const createPostSchema = z.object({
  jobName: z.string().trim().min(1, { message: 'Cannot be empty' }),
  description: z.string().trim().min(1, { message: 'Cannot be empty' }),
  salary: z.coerce.number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  workTime: z.coerce.number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  location: z.string().trim().min(1, { message: 'Cannot be empty' }),
});

type CreatePostData = z.infer<typeof createPostSchema>;

export const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit: SubmitHandler<CreatePostData> = (values) => {
    console.log('Submitted: ', values);
  };

  return (
    <Paper className='form-page__header' style={{minHeight: 300, minWidth: 300, overflow: 'hidden'}} sx={{backgroundColor: 'light.main'}} elevation={2} >
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
            InputProps={{ style: { fontWeight: 'bold' } }}
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
            InputProps={{ style: { fontWeight: 'bold' } }}
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
            InputProps={{ style: { fontWeight: 'bold' } }}
            label='Salary per hour'
            {...register('salary')}
            error={typeof errors.salary !== 'undefined'}
            helperText={errors.salary?.message}
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
            label='Hours per week'
            {...register('workTime')}
            error={typeof errors.workTime !== 'undefined'}
            helperText={errors.workTime?.message}
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
            label='Location'
            {...register('location')}
            error={typeof errors.location !== 'undefined'}
            helperText={errors.location?.message}
          />
        </Box>
      </Box>
      <Box ml={2} mr={2}>
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem' }} fullWidth onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Box>
    </Paper>
  )
}
