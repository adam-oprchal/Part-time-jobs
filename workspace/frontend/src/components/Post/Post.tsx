import { Box, Button, Grid, Paper, Typography } from '@mui/material';

interface PostProps {
  jobName: string;
  description: string;
  wage: number;
  location: string;
  expectedHours: number;
}

export const SinglePost = ({
  jobName,
  description,
  wage,
  location,
  expectedHours
}: PostProps) => {
  
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
            <Button style={{fontSize: '1rem'}} variant="contained">Apply</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </Box>
  );
};
