import { Box, Button, Grid, Paper, Typography } from '@mui/material';

interface PostProps {
  name: string;
  description: string;
  wage: number;
  location: string;
  hours: number;
}

export const Post = ({
  name,
  description,
  wage,
  location,
  hours
}: PostProps) => {
  
  return (
    <Box border={10} color={'dark.main'}>
    <Paper
      style={{minHeight: 200, minWidth: 200, overflow: 'hidden' }}
      sx={{backgroundColor: 'custom.main', color: 'dark.contrastText'}}
      elevation={2}
    >
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        style={{ minHeight: '200px' }}
      >
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="p" variant="h4" margin={1}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" variant="h6" margin={1}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography component="p" variant="h6" margin={1}>
            <span style={{fontSize: '2rem'}}>${wage}</span> per hour
          </Typography>
          <Typography component="p" variant="h6" margin={1}>
            <span style={{fontSize: '2rem'}}>{hours}</span> hour(s) per week
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography component="p" variant="h4" textAlign={'left'} margin={1}>
            {location}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box display={'flex'} flexDirection={'column'} rowGap={2} alignItems={'center'}>
            <Button style={{fontSize: '1.2rem'}} variant="contained">Details</Button>
            <Button style={{fontSize: '1.2rem'}} variant="contained">Apply</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </Box>
  );
};
