//Side Bar
'use client';
import * as React from 'react';

import {
  Box,
  Grid,
  ListItem,
  Typography,
  Drawer,
  ListItemButton,
  Card,
  Container,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import {
  Menu,
  Insights,
  Settings,
  CalendarMonth,
  Home,
  Person,
  ArrowBackIos,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

import styles from './navigation.module.css';

/*
New box in the sub global on click fly out card with 3 sub links
*/

export default function Navigation() {
  const theme = useTheme();
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
      <Card
        sx={{
          backgroundColor: theme.palette.primary.main,
          marginTop: '35%',
          borderRadius: '10px',
        }}
      >
        <Grid container alignContent="center" justifyContent="center">
          <Menu sx={{ fontSize: '300%' }} onClick={toggleDrawer('open', true)}></Menu>
        </Grid>
      </Card>

      <Drawer
        open={state['open']}
        onClose={toggleDrawer('open', false)}
        onClick={toggleDrawer('open', false)}
      >
        <Box>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ minHeight: 500 }}
          >
            <ListItemButton
              divider
              sx={{ width: '100%' }}
              onClick={() => {
                router.push('/');
              }}
            >
              <Grid container justifyContent="center">
                <ArrowBackIos fontSize="large"></ArrowBackIos>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
                  Back
                </Typography>
              </Grid>
            </ListItemButton>

            <ListItem divider sx={{ minHeight: 100 }}></ListItem>

            <ListItemButton
              divider
              sx={{ width: '100%' }}
              onClick={() => {
                router.push('/admin');
              }}
            >
              <Home fontSize="large"></Home>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
                Home
              </Typography>
            </ListItemButton>

            <ListItemButton
              divider
              onClick={() => {
                router.push('/admin/menu');
              }}
              sx={{ width: '100%' }}
            >
              <Insights fontSize="large"></Insights>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
                Menu
              </Typography>
            </ListItemButton>

            <ListItemButton
              divider
              onClick={() => {
                router.push('/admin/analytics');
              }}
              sx={{ width: '100%' }}
            >
              <Insights fontSize="large"></Insights>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
                Analytics
              </Typography>
            </ListItemButton>

            <ListItemButton
              divider
              onClick={() => {
                router.push('/admin/calendar');
              }}
              sx={{ width: '100%' }}
            >
              <CalendarMonth fontSize="large"></CalendarMonth>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
                Calendar
              </Typography>
            </ListItemButton>

            <ListItemButton
              divider
              onClick={() => {
                router.push('/admin/staff');
              }}
              sx={{ width: '100%' }}
            >
              <Person fontSize="large"></Person>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
                Staff
              </Typography>
            </ListItemButton>

            <ListItemButton sx={{ width: '100%' }}>
              <Settings fontSize="large"></Settings>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
                Settings
              </Typography>
            </ListItemButton>
          </Grid>
        </Box>
      </Drawer>
    </Container>
  );
}
