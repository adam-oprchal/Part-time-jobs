import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { usePostApply, usePostUnapply } from '../../api/usePosts';
import { useState } from 'react';

interface PostProps {
  id: string,
  jobName: string;
  description: string;
  wage: number;
  location: string;
  expectedHours: number;
}

export const SinglePost = ({
  id,
  jobName,
  description,
  wage,
  location,
  expectedHours
}: PostProps) => {
  const {mutateAsync: applyToPost } = usePostApply(id);
  const {mutateAsync: unapplyToPost } = usePostUnapply(id);
  const [ buttonLabel, setButtonLabel ] = useState<"Apply"|"Unapply">("Apply");

  const onApply = () => {
    if (buttonLabel === "Apply") {
      applyToPost()
        .then(_ => setButtonLabel("Unapply"))
        .catch(_ => console.log("apply failed"))
    } else {
      unapplyToPost()
        .then(_ => setButtonLabel("Apply"))
        .catch(_ => console.log("unapply failed"))
    }
  };
  
  return (
    <Box border={5} color={'dark.main'} sx={{backgroundColor: 'dark.main'}}>
    <Paper
      style={{overflow: 'hidden', margin: '0.5rem 0.8rem 0.5rem 0.8rem', padding: '0.5rem', borderRadius: '1rem' }}
      sx={{backgroundColor: 'custom.main', color: 'dark.contrastText' }}
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
              <Typography component="p" fontSize='1.5rem' margin={1}>
                {jobName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" fontSize='1rem' margin={1}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography component="p" fontSize='1rem' margin={1}>
            <span style={{fontSize: '1.5rem'}}>${wage}</span> per hour
          </Typography>
          <Typography component="p" fontSize='1rem' margin={1}>
            <span style={{fontSize: '1.5rem'}}>{expectedHours}</span> hour(s) per week
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography component="p" fontSize='1.4rem' textAlign={'left'} margin={1}>
            {location}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box display={'flex'} flexDirection={'column'} rowGap={2} alignItems={'center'}>
            <Button style={{fontSize: '1rem'}} variant="contained">Details</Button>
            <Button style={{fontSize: '1rem'}} variant="contained" onClick={onApply} color={buttonLabel === "Apply" ? 'primary' : 'secondary'}>{buttonLabel}</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </Box>
  );
};
