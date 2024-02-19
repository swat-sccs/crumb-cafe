import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

import {
  Box,
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

import {
  Menu,
  Insights,
  CalendarMonth,
  PointOfSale,
  RestaurantMenu,
  ArrowBackIos,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const pages = { Home: '/', Create: '/create', Help: '/help' };

const Navigation = () => {
  const router = useRouter();

  const [state, setState] = React.useState({
    open: false,
  });
  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
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
        <Box
          sx={{ width: 200, height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }}
          role="presentation"
        >
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
};

export default function ResponsiveAppBar(props: any) {
  return (
    <AppBar position="static">
      <Grid container>
        <Grid item xs={1}>
          <Navigation></Navigation>
        </Grid>
      </Grid>
    </AppBar>
  );
}
