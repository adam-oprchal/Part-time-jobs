import { Box, MenuItem, Pagination, Select } from '@mui/material';
import { SinglePost } from '../Post/Post';
import { useAllPosts } from '../../api/usePosts';
import { Post } from 'types'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostSorting } from '../../api/types';

interface SortState {
  field: string;
  order: 'asc' | 'desc' | undefined;
  sorting: PostSorting;
}

interface PostsSectionProps {
  sortState: SortState;
}

export const PostsSection: React.FC<PostsSectionProps> = ({ sortState }) => {
  const [field, setField] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<string | undefined>(undefined);
  const [sorting, setSorting] = useState<PostSorting>(undefined);

  useEffect(() => {
    setField(sortState.field);
    setOrder(sortState.order);
    setSorting(sortState.sorting)
  }, [field, order, sortState]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  
  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const { data, error } = useAllPosts( sorting );

  useEffect(() => {
    if (error && error.message === 'Request failed with status code 401') {
      navigate('/login');
    }
  }, [error, navigate]);

  const posts: Post[] = data || [];
  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = posts.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <div hidden>{sortState.field}</div>
      <div hidden>{sortState.order}</div>
      <Box borderLeft={5} borderRight={5} borderTop={10} borderBottom={10} borderRadius={'0 0 1.5rem 1.5rem'} color={'dark.main'} sx={{backgroundColor: 'dark.main'}}>
        {currentRows.map((post, index) => (
          <SinglePost key={index}
          id={post.id}
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
