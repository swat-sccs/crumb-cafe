'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CookieIcon from '@mui/icons-material/Cookie';
import BottomNavigation from '@mui/material/BottomNavigation';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Restaurant } from '@mui/icons-material';

const pages = [
  { name: 'POS', link: '/point_of_sale' },
  { name: 'Menu', link: '/admin/menu' },
  { name: 'Analytics', link: '/admin/analytics' },
  { name: 'Calendar', link: '/admin/calendar' },
  { name: 'Orders', link: '/kitchen_display' },
];
const settings: any = [];

function BottomBar(props: any) {
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
      {authenticated && windowSize[0] <= 600 ? (
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, zIndex: 10, width: '100%' }}>
          <BottomNavigation showLabels value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="Home"
              value="recents"
              icon={<HomeIcon />}
              LinkComponent={Link}
              href="/"
            />
            <BottomNavigationAction
              label="POS"
              value="folder"
              LinkComponent={Link}
              href="/point_of_sale"
              icon={<PointOfSaleIcon />}
            />
            <BottomNavigationAction
              label="Analytics"
              value="analytics"
              LinkComponent={Link}
              href="/admin/analytics"
              icon={<BarChartIcon />}
            />
            <BottomNavigationAction
              label="Calendar"
              value="nearby"
              LinkComponent={Link}
              href="/admin/calendar"
              icon={<CalendarMonthIcon />}
            />
            <BottomNavigationAction
              label="Orders"
              value="favorites"
              LinkComponent={Link}
              href="/kitchen_display"
              icon={<ListIcon />}
            />
          </BottomNavigation>
        </Box>
      ) : null}
    </>
  );
}
export default BottomBar;
