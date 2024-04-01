'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CookieIcon from '@mui/icons-material/Cookie';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const pages = [
  { name: 'POS', link: '/point_of_sale' },
  { name: 'Menu', link: '/admin/menu' },
  { name: 'Analytics', link: '/admin/analytics' },
  { name: 'Calendar', link: '/admin/calendar' },
  { name: 'Orders', link: '/kitchen_display' },
];
const settings: any = [];

function ResponsiveAppBar(props: any) {
  const [windowSize, setWindowSize]: any[] = React.useState([]);

  const { data: session, status } = useSession();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let authenticated: any;
  let loginLink;
  let nameButton;

  if (props.hasOwnProperty('login')) {
    loginLink = null;
    nameButton = null;
  } else {
    if (status === 'authenticated') {
      authenticated = true;
      loginLink = (
        <MenuItem key="logout">
          <Link key="logout" href="/api/auth/signout" passHref style={{ textDecoration: 'none' }}>
            <Button variant="outlined" style={{ backgroundColor: 'transparent' }}>
              <Typography textAlign="center">Log out</Typography>
            </Button>
          </Link>
        </MenuItem>
      );
      nameButton = session.user?.name;
    } else {
      authenticated = false;
      loginLink = <></>;
      nameButton = 'Log In';
    }
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (authenticated) {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseNavMenu = (page: any) => {
    setAnchorElNav(null);
  };
  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  return (
    <>
      <AppBar
        position="static"
        style={{
          background: 'rgba(234, 71, 133, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(6.8px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CookieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CRUMB CAFE
            </Typography>

            <CookieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CRUMB CAFE
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {authenticated ? (
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                      <Link
                        href={page.link}
                        key={page.name}
                        passHref
                        style={{ textDecoration: 'none' }}
                      >
                        {pathname == page.link ? (
                          <Button
                            variant="outlined"
                            color="white"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                          >
                            {page.name}
                          </Button>
                        ) : (
                          <Button
                            variant="text"
                            color="white"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                          >
                            {page.name}
                          </Button>
                        )}
                      </Link>
                    ))}
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Box>

            <Box sx={{ flexGrow: 0, position: 'absolute', right: 0 }}>
              <Link
                href={authenticated ? '' : '/api/auth/signin'}
                onClick={handleOpenUserMenu}
                passHref
                style={{ textDecoration: 'none' }}
                className="text-white transition-colors duration-200 ease-in-out hover:text-accent"
              >
                <Button variant="contained">
                  <Typography variant="body1" color="black">
                    {nameButton}
                  </Typography>
                </Button>
              </Link>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {loginLink}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
