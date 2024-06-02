import Page from "../components/base/Page"
import { Outlet } from "react-router-dom"
import { Box, Grid, Paper } from "@mui/material"

export const PageLayout = () => {
  return (
    <Page title='Part-time Jobs'>
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Box component={Paper} elevation={4} p={5}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}
