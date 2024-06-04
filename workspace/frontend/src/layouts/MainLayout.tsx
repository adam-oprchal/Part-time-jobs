import Navbar from "../components/base/Navbar"
import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
      <Box minWidth='50vw' minHeight='50vh'>
        <Navbar />
        <Container maxWidth={false}>
          <Box component="main" py={3}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    )
  }
  