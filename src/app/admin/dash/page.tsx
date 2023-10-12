'use client';
import {
  Avatar,
  Grid,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './analytics/page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  return (
    //Split page into two, top part is label and little avatar
    //Basically bottwo 2/3's will contain the smaller versions of big page counterparts
    <Container className={styles.topBar} sx={{ backgroundColor: '', width: '100vw' }}>
      <Grid container direction="row" justifyContent="space-between">
        <Typography
          variant="h3"
          style={{ color: 'white', marginTop: '', marginLeft: '2%' }}
          align="left"
        >
          Home
        </Typography>
      </Grid>
    </Container>
  );
}
