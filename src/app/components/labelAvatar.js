//Top Bar
'use client';
import { Avatar, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function LabelAvatar({ title }) {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h3" sx={{ mt: '-2%', mb: '2%' }}>
        {title}
      </Typography>
    </>
  );
}
