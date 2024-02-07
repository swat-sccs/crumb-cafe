//Side Bar
'use client';

import * as React from 'react';

import {
  Box,
  Grid,
  ListItem,
  Divider,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Container,
  IconButton,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import {
  Menu,
  Insights,
  Settings,
  CalendarMonth,
  Home,
  PointOfSale,
  RestaurantMenu,
  ArrowBackIos,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

import styles from './navigation.module.css';

/*
New box in the sub global on click fly out card with 3 sub links
*/

export default function Navigation() {
  const router = useRouter();

  const [state, setState] = React.useState({
    open: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Container>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer('open', true)}
      >
        <Menu />
      </IconButton>

      <Drawer
        open={state['open']}
        onClose={toggleDrawer('open', false)}
        onClick={toggleDrawer('open', false)}
      >
        <Box sx={{ width: 200 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/');
                }}
              >
                <ListItemIcon>
                  <ArrowBackIos></ArrowBackIos>
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
            <Divider></Divider>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/point_of_sale');
                }}
              >
                <ListItemIcon>
                  <PointOfSale></PointOfSale>
                </ListItemIcon>
                <ListItemText primary={'POS'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/admin/menu');
                }}
              >
                <ListItemIcon>
                  <RestaurantMenu></RestaurantMenu>
                </ListItemIcon>
                <ListItemText primary={'Menu'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/admin/analytics');
                }}
              >
                <ListItemIcon>
                  <Insights></Insights>
                </ListItemIcon>
                <ListItemText primary={'Analytics'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/admin/calendar');
                }}
              >
                <ListItemIcon>
                  <CalendarMonth></CalendarMonth>
                </ListItemIcon>
                <ListItemText primary={'Calendar'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Container>
  );
}

//unused addresses
/*
/admin
  - staff
  - /
  - settings


*/
