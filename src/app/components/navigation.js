//Side Bar
import { Card, Grid, ListItemButton, ListItem, Typography, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu, Insights, Settings, CalendarMonth, Home, Person } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import styles from './navigation.module.css';

export default function Navigation() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const router = useRouter();

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
        <ListItemButton divider onClick={() => router.push('/')} sx={{ width: '100%' }}>
          <Grid container justifyContent="center">
            <Menu fontSize="large"></Menu>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
              Back
            </Typography>
          </Grid>
        </ListItemButton>

        <ListItem divider sx={{ minHeight: 100 }}>
          {'Logo? '}
        </ListItem>

        <ListItemButton divider onClick={() => router.push('/admin/dash')} sx={{ width: '100%' }}>
          <Home fontSize="large"></Home>

          <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
            Home
          </Typography>
        </ListItemButton>

        <ListItemButton
          divider
          onClick={() => router.push('/admin/dash/analytics')}
          sx={{ width: '100%' }}
        >
          <Insights fontSize="large"></Insights>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
            Analytics
          </Typography>
        </ListItemButton>

        <ListItemButton
          divider
          onClick={() => router.push('/admin/dash/calendar')}
          sx={{ width: '100%' }}
        >
          <CalendarMonth fontSize="large"></CalendarMonth>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" align="center">
            Calendar
          </Typography>
        </ListItemButton>

        <ListItemButton
          divider
          onClick={() => router.push('/admin/dash/staff')}
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
    </Card>
  );
}
