//Top Bar
'use client';
import { Avatar, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

      <Avatar
        sx={{ bgcolor: theme.palette.primary.light }}
        src="https://assets.stickpng.com/images/61d183263a856e0004c6334a.png"
      ></Avatar>
    </Grid>
  );
}