import Page from "../../components/base/Page"
import { Button, Link as MuiLink, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const WelcomePage = () => {
  return (
    <Page title="Welcome">
      <Typography component="p" variant="h5" color="secondary.main">
      <div className="welcome-page__buttons">
          <Button component={Link} to="/login">Log in</Button>
          <Button component={Link} to="/register">Register</Button>
        </div>
      </Typography>
    </Page>
  )
}
