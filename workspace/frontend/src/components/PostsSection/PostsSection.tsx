import { Box, MenuItem, Pagination, Select } from '@mui/material';
import { SinglePost } from '../Post/Post';
import { useAllPosts } from '../../api/usePosts';
import { Post } from 'types'
import { SetStateAction, useState } from 'react';

export const PostsSection = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (_event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const result = useAllPosts();
  if (result.error) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  const posts: Post[] = result.data || [];

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = posts.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Box borderLeft={5} borderRight={5} borderTop={10} borderBottom={10} borderRadius={'0 0 1.5rem 1.5rem'} color={'dark.main'} sx={{backgroundColor: 'dark.main'}}>
        {currentRows.map((post, index) => (
          <SinglePost key={index}
          jobName={post.jobName}
          description={post.description}
          wage={post.wage}
          expectedHours={post.expectedHours}
          location={post.location}
        />
      )) || []}
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <Select
          value={rowsPerPage.toString()}
          onChange={handleRowsPerPageChange}
          displayEmpty
          color='secondary'
          inputProps={{ 'aria-label': 'Rows per page' }}
        >
          {[5, 10, 15, 20].map((rows) => (
            <MenuItem key={rows} value={rows}>
              {rows}
            </MenuItem>
          ))}
        </Select>
        <Pagination
          count={Math.ceil(posts.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color='dark'
        />
      </Box>
    </>
  );
};
