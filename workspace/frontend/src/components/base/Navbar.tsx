import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Avatar, Badge, Box, Button, Container, Grid, IconButton, Menu, MenuItem } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { AccountApi } from '../../api/accountApi';

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMyAccountClick = () => {
    handleMenuClose();
    navigate('/account');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    AccountApi.logout();
    navigate('/login');
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-menu';
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

  const mobileMenuId = 'primary-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="dark">
      <Container disableGutters maxWidth={false}>
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
              <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
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
              <Grid sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
  </Box>
  )
}
