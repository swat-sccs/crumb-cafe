//Top Bar
'use client';
import { Avatar, Grid, ListItemButton, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './navigation.module.css';

export default function LabelAvatar({ title }) {
  const theme = useTheme();

  return (
    <Grid container direction="row" justifyContent="space-between">
      <Typography
        variant="h3"
        style={{ color: 'white', marginTop: '', marginLeft: '2%' }}
        align="left"
      >
        {title}
      </Typography>

      <Avatar sx={{ bgcolor: theme.palette.primary.light }}>A</Avatar>
    </Grid>
  );
}
