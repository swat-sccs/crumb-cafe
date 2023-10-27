//Side Bar
'use client';
import * as React from 'react';

import { Card, Container, ListItemButton, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu, Insights, Settings, CalendarMonth, Home, Person } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MemoryRouter, Route, Routes, Link, matchPath, useLocation } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import styles from './navigation.module.css';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  // Settings Staff Calendar Analytics Home Back
  const routeMatch = useRouteMatch([
    '/dash/admin/settings',
    '/dash/admin/staff',
    '/dash/admin/calendar',
    '/dash/admin/analytics',
    '/dash/admin',
    '/',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab} orientation={'vertical'}>
      <Tab label="Back" value="/" to="/" component={Link} />
      <Tab label="Home" value="/dash/admin" to="/dash/admin" component={Link} />
      <Tab label="Analytics" value="/dash/analytics" to="/dash/admin/analytics" component={Link} />
    </Tabs>
  );
}

function CurrentRoute() {
  const location = useLocation();

  return (
    <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
      Current route: {location.pathname}
    </Typography>
  );
}

export default function Navigation() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const router = useRouter();
  const path = usePathname();
  console.log(path);

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
      <Router>
        <Container sx={{ width: '100%' }}>
          <Routes>
            <Route path="*" element={<CurrentRoute />} />
          </Routes>
          <MyTabs />
        </Container>
      </Router>
    </Card>
  );
}
