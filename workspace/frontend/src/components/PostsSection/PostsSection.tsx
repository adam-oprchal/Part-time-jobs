import { Box } from '@mui/material';
import { Post } from '../Post/Post';

export const PostsSection = () => {
  return (
    <Box borderLeft={5} borderRight={5} borderTop={10} borderBottom={10} borderRadius={'0 0 1.5rem 1.5rem'} color={'dark.main'} sx={{backgroundColor: 'dark.main'}}>
      <Post
        name="Java Developer"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
      <Post
        name="React Developer"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
      <Post
        name="Python Developer"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
      <Post
        name="Assistant"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
    </Box>
  );
};
