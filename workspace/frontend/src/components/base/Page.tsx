import { Box, Grid, Typography } from "@mui/material"
import { PropsWithChildren } from "react"
import SortToggle from "./sortToggle";

export interface PageProps extends PropsWithChildren {
  title: string[];
  color: string[];
}

export function Page({ title, color, children } : PageProps) {

  const sortDB = (field: string, sortOrder: string | undefined) => {
    console.log(`Sort order changed to: ${field}:${sortOrder}`);
  }

  const handleSortChangeName = (sortOrder: 'asc' | 'desc' | undefined) => {
    sortDB('Name', sortOrder);
  };

  const handleSortChangeWage = (sortOrder: 'asc' | 'desc' | undefined) => {
    sortDB('Name', sortOrder);
  };

  const handleSortChangeLocation = (sortOrder: 'asc' | 'desc' | undefined) => {
    sortDB('Name', sortOrder);
  };

  return (
      <>
        <Typography
          component="h1"
          variant="h4"
          color={color}
          ml={2}
          mb={2}
        >
          <Grid container>
            <Grid item xs={5} mt={1} display={'flex'} justifyContent={'center'} >
              <Box display={'flex'} alignItems={'center'} flexDirection={'row'} columnGap={1}>
                {title[0]}
                <SortToggle onSortChange={handleSortChangeName} />
              </Box>
            </Grid>
            <Grid item xs={2} mt={1} display={'flex'} justifyContent={'center'} >
            </Grid>
            <Grid item xs={2} mt={1} display={'flex'} >
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} columnGap={1}>
                {title[1]}
                <SortToggle onSortChange={handleSortChangeWage} />
              </Box>
            </Grid>
            <Grid item xs={2} mt={1}>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} columnGap={1}>
                {title[2]}
                <SortToggle onSortChange={handleSortChangeLocation} />
              </Box>
            </Grid>
          </Grid>
        </Typography>
        {children}
      </>
    )
  }
  
export default Page