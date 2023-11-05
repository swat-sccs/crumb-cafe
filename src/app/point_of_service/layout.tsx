import { Grid, AppBar, Toolbar, IconButton, Typography, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function sideBar({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Grid container>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Order 021
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: '2%' }}>{children}</Container>
      </Grid>
    </section>
  );
}
