//Side Bar
'use client';
import { Card, Grid, ListItemButton, ListItem, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu, Insights, Settings, CalendarMonth, Home, Person } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

import styles from './navigation.module.css';

/*
New box in the sub global on click fly out card with 3 sub links
*/
export default function Navigation() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const router = useRouter();
  const pathname = usePathname();

  const [hi, setRoute] = useState('/');

  function handleChange(path) {
    router.push(path);
    setRoute(path);
  }

  return (
    <Card
      className={styles.menu}
      sx={{
        backgroundColor: primary,
        minHeight: 500,
        maxHeight: 800,
        borderRadius: 10,
        marginLeft: '15%',
        marginTop: '35%',
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ minHeight: 500 }}
      >
        <ListItemButton divider sx={{ width: '100%' }} onClick={() => router.push('/')}>
          <Grid container justifyContent="center">
            <Menu fontSize="large"></Menu>
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              align="center"
              onClick={() => router.push('/admin/')}
            >
              Back
            </Typography>
          </Grid>
        </ListItemButton>

        <ListItem divider sx={{ minHeight: 100 }}></ListItem>

        <ListItemButton divider sx={{ width: '100%' }} onClick={() => router.push('/admin/')}>
          <Home fontSize="large"></Home>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
            Home
          </Typography>
        </ListItemButton>

        <ListItemButton
          divider
          onClick={() => router.push('/admin/analytics')}
          sx={{ width: '100%' }}
        >
          <Insights fontSize="large"></Insights>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
            Analytics
          </Typography>
        </ListItemButton>

        <ListItemButton
          divider
          onClick={() => router.push('/admin/calendar')}
          sx={{ width: '100%' }}
        >
          <CalendarMonth fontSize="large"></CalendarMonth>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
            Calendar
          </Typography>
        </ListItemButton>

        <ListItemButton divider onClick={() => router.push('/admin/staff')} sx={{ width: '100%' }}>
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
    </Card>
  );
}
