import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostCreate } from '../../api/usePosts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostApi } from '../../api/postApi';
import { Post } from 'types';

const createPostSchema = z.object({
  jobName: z.string().trim().min(1, { message: 'Cannot be empty' }),
  description: z.string().trim().min(1, { message: 'Cannot be empty' }),
  wage: z.coerce
    .number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  expectedHours: z.coerce
    .number({ message: 'Must be a number' })
    .positive({ message: 'Must be greater than 0' }),
  location: z.string().trim().min(1, { message: 'Cannot be empty' }),
});

type CreatePostData = z.infer<typeof createPostSchema>;

export const CreatePostPage = () => {
  const { postId } = useParams<{ postId?: string }>();
  const { readOnly } = useParams<{ readOnly?: string }>();
  const { mutateAsync: createJob } = usePostCreate();
  const [ postData, setPostData ] = useState<Post>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
  });

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (postId) {
      handleOpen();
      const setResp = async () => {  
        const data = await PostApi.get(postId);
        setPostData(data);
      } 
      if (!postData) {
        setResp();
      }
    }
  }, [postData, postId]);

  if (!postData) {
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }

  const onSubmit: SubmitHandler<CreatePostData> = async (values) => {
    const result = createJob({ ...values });
    if (!result) {
      console.error('Create job failed');
    }
    navigate('/jobs');
  };

  const onCancel = async () => {
    navigate('/jobs');
  }

  return (
    <Paper
      style={{
        minHeight: 300,
        minWidth: 300,
        maxWidth: '50vw',
        overflow: 'hidden',
      }}
      sx={{ backgroundColor: 'light.main', margin: 'auto' }}
      elevation={2}
    >
      <Typography
        color="secondary.main"
        component="p"
        variant="h4"
        fontWeight="bold"
        mt={2}
        textAlign={'center'}
      >
        Create a new job
      </Typography>
      <Box display={'flex'} flexDirection={'row'}>
        <Box width='90%'
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
              defaultValue={postData?.jobName}
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
              defaultValue={postData?.description}
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
              defaultValue={postData?.wage}
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
              defaultValue={postData?.expectedHours}
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
              defaultValue={postData?.location}
              label='Location'
              {...register('location')}
              error={typeof errors.location !== 'undefined'}
              helperText={errors.location?.message}
            />
          </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'end'}}>
          <FormGroup>
          {postData?.deletedAt === null && 
            <FormControlLabel control={<Switch defaultChecked/>} label="Active" />}
          {postData?.deletedAt !== null && 
            <FormControlLabel control={<Switch />} label="Inactive" />}
          </FormGroup>
        </Box>
      </Box>
      <Box margin={2} display={'flex'} justifyContent={'space-between'}>
        {readOnly &&
          <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem', width: '78%' }} onClick={handleSubmit(onSubmit)}>Submit</Button>}
        <Button variant='contained' style={{fontWeight: 'bold', fontSize: '1.5rem', width: '20%' }} onClick={onCancel}>Cancel</Button>
      </Box>
    </Paper>
  );
};
