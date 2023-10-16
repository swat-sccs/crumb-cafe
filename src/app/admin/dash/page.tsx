'use client';
import { Grid, Container, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './analytics/page.module.css';
import { useRouter } from 'next/navigation';
import LabelAvatar from '../../components/labelAvatar.js';

export default function Home() {
  const theme = useTheme();

  //const router = useRouter();

  return (
    //Split page into two, top part is label and little avatar
    //Basically bottwo 2/3's will contain the smaller versions of big page counterparts
    <Container className={styles.topBar} sx={{ backgroundColor: '', width: '100vw' }}>
      <LabelAvatar title="Home" />
    </Container>
  );
}
