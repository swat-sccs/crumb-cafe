// Admin Analytics
import { Typography, CardContent, Card, CardActions } from '@mui/material';
import styles from './page.module.css';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function BasicCard({ title, data, up }) {
  const theme = useTheme();

  return (
    <Card
      className={styles.info}
      sx={{ borderRadius: 2 }}
      style={{ backgroundColor: theme.palette.primary.dark }}
    >
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom align="center">
          {title}
        </Typography>
      </CardContent>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} align="center">
        {data}
      </Typography>

      <CardActions>{/* <Button size="small">Learn More</Button>  */}</CardActions>
    </Card>
  );
}

/* OLD



        <Typography sx={{ marginTop: 1 }} variant="body2" align="center">
          {up ? (
            <TrendingDown sx={{ color: 'red' }} if={up == true}></TrendingDown>
          ) : (
            <TrendingUp sx={{ color: 'green' }} if={up == true}></TrendingUp>
          )}
          vs Last Month
        </Typography>
    */
