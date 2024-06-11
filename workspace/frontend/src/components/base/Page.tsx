import { Box, Grid, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import SortToggle from "./SortToggle";
import { PostSorting } from "../../api/types";

interface SortState {
  field: string;
  order: 'asc' | 'desc' | undefined;
  sorting: PostSorting;
}

export interface PageProps {
  title: string[];
  color: string[];
  children: (sortState: SortState) => ReactNode;
}

export function Page({ title, color, children }: PageProps) {
  const [sortState, setSortState] = useState<SortState>({ field: '', order: undefined, sorting:undefined });

  const handleSortChange = (field: string) => (sortOrder: 'asc' | 'desc' | undefined) => {
    let index = 0;
    switch (field) {
      case 'jobName':
        if (sortOrder === 'asc') {
          index = 1;
        }
        if (sortOrder === 'desc') {
          index = 2;
        }
        break;
      case 'location':
        if (sortOrder === 'asc') {
          index = 3;
        }
        if (sortOrder === 'desc') {
          index = 4;
        }
        break;
      case 'wage':
        if (sortOrder === 'asc') {
          index = 5;
        }
        if (sortOrder === 'desc') {
          index = 6;
        }
        break;
      default: index = 0;
    }
    const postSortingOptions: PostSorting[] = [ undefined, {jobName: 'asc'}, {jobName: 'desc'}, {location: 'asc'}, {location: 'desc'}, {wage: 'asc'}, {wage: 'desc'}]
  

    setSortState( { field, order: sortOrder, sorting: postSortingOptions[index] });
  };

  return (
    <>
      <Typography component="h1" variant="h5" color={color} ml={2} mb={2}>
        <Grid container>
          <Grid item xs={5} mt={1} display={'flex'} justifyContent={'center'}>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} columnGap={1}>
              {title[0]}
              <SortToggle
                onSortChange={handleSortChange('jobName')}
                sortOrder={sortState.field === 'jobName' ? sortState.order : undefined}
              />
            </Box>
          </Grid>
          <Grid item xs={2} mt={1} display={'flex'} justifyContent={'center'}></Grid>
          <Grid item xs={2} mt={1} display={'flex'}>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} columnGap={1}>
              {title[1]}
              <SortToggle
                onSortChange={handleSortChange('wage')}
                sortOrder={sortState.field === 'wage' ? sortState.order : undefined}
              />
            </Box>
          </Grid>
          <Grid item xs={2} mt={1}>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} columnGap={1}>
              {title[2]}
              <SortToggle
                onSortChange={handleSortChange('location')}
                sortOrder={sortState.field === 'location' ? sortState.order : undefined}
              />
            </Box>
          </Grid>
        </Grid>
      </Typography>
      {children(sortState)}
    </>
  );
}

export default Page;