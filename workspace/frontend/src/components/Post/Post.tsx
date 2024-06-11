import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { usePostApply, usePostUnapply } from '../../api/usePosts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PostProps {
  id: string;
  jobName: string;
  description: string;
  wage: number;
  location: string;
  expectedHours: number;
  creator: boolean;
  applicant: boolean;
  applicantsCount: number;
}

export const SinglePost = ({
  id,
  jobName,
  description,
  wage,
  location,
  expectedHours,
  creator,
  applicant,
  applicantsCount,
}: PostProps) => {
  const { mutateAsync: applyToPost } = usePostApply(id);
  const { mutateAsync: unapplyToPost } = usePostUnapply(id);
  const [buttonLabel, setButtonLabel] = useState<'Apply' | 'Unapply'>('Apply');
  const navigate = useNavigate();
  
  const onApplicants = () => {
    console.log('Applicants');
  }

  const onDetail = () => {
    navigate(`/edit/${id}/${creator ? 'false' : 'true'}`);
  }

  const onApply = () => {
    if (applicant) {
      applyToPost()
        .then((_) => setButtonLabel('Unapply'))
        .catch((_) => console.log('apply failed'));
    } else {
      unapplyToPost()
        .then((_) => setButtonLabel('Apply'))
        .catch((_) => console.log('unapply failed'));
    }
  };

  return (
    <Box border={5} color={'dark.main'} sx={{ backgroundColor: 'dark.main' }}>
      <Paper
        style={{
          overflow: 'hidden',
          margin: '0.5rem 0.8rem 0.5rem 0.8rem',
          padding: '0.5rem',
          borderRadius: '1rem',
        }}
        sx={{ backgroundColor: 'custom.main', color: 'dark.contrastText' }}
        elevation={2}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          style={{ minHeight: '8rem' }}
          maxHeight={50}
        >
        <Grid item xs={7}>
          <Grid container maxHeight={50}>
            <Grid item xs={12}>
              <Typography component="p" fontSize="1.5rem" margin={1}>
                {jobName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" fontSize="1rem" margin={1}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography component="p" fontSize="1rem" margin={1}>
            <span style={{ fontSize: '1.5rem' }}>${wage}</span> per hour
          </Typography>
          <Typography component="p" fontSize="1rem" margin={1}>
            <span style={{ fontSize: '1.5rem' }}>{expectedHours}</span>{' '}
              hour(s) per week
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            component="p"
            fontSize="1.4rem"
            textAlign={'left'}
            margin={1}
          >
            {location}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            rowGap={2}
            alignItems={'center'}
          >
            {creator && 
              <Button
                style={{ fontSize: '1rem' }}
                variant="contained"
                onClick={onDetail}
              >
                Details
              </Button>}
            {!creator &&
              <Button
                style={{ fontSize: '1rem' }}
                variant="contained"
                onClick={onApply}
                color={applicant ? 'secondary' : 'primary'}
              >
                {buttonLabel}
              </Button>}
              {creator && (applicantsCount > 0) &&
                <Button
                  style={{fontSize: '1rem'}}
                  variant="contained"
                  onClick={onApplicants}
                  color='primary'
                >
                  Applicants ({applicantsCount})
              </Button>}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
