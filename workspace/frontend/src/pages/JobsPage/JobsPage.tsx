import { Box } from '@mui/material';
import { PostsSection } from '../../components/PostsSection/PostsSection';
import Page from '../../components/base/Page';

export const JobsPage = () => {
  return (
    <Box
      margin={3}
      sx={{ backgroundColor: 'primary.main' }}
      borderRadius={'1.5rem'}
    >
      <Page
        title={['Name', 'Wage', 'Location']}
        color={['light.main', 'light.main', 'light.main']}
      >
        {(sortState) => <PostsSection sortState={sortState} />}
      </Page>
    </Box>
  );
};
