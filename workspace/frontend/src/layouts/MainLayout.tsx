import Navbar from "../components/base/Navbar"
import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
      <>
        <Navbar />
        <Container style={{maxWidth: "3840px", maxHeight: "1920px"}}>
          <Box component="main" py={3}>
            <Outlet />
          </Box>
        </Container>
      </>
    )
  }
  