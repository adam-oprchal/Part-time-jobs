import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Avatar, Badge, Box, Button, Container, Grid, IconButton, Menu, MenuItem } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccountClick = () => {
    handleMenuClose();
    navigate('/account');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    navigate('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMyAccountClick}>My Account</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ width: '100%' }} color="dark">
      <Container disableGutters>
        <Toolbar>
          <Grid margin={2} container spacing={2} justifyContent={'space-between'} >
            <Grid>
              <Button
                style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.light.main }} 
                key='create'
                component={NavLink}
                to='/create'
                sx={{
                  px: 2,
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                Create a job offer
                </Button>
            </Grid>
            <Grid>
              <Grid container >
                <Grid>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                </Grid>
                <Grid>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={handleProfileMenuOpen}
                  >
                    <Avatar
                      variant='circular'
                      alt="Person"
                      sizes=''
                      sx={{ padding: 3.5, fontWeight: 'bold', fontSize: '1.5rem' }}
                    >
                      {'N/A'}
                    </Avatar>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
    {renderMenu}
  </Box>
  )
}
