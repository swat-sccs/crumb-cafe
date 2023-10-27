// Admin Analytics
import { Typography, CardContent, Card, CardActions } from '@mui/material';
import styles from './page.module.css';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function BasicCard({ title, data, up }) {
  const theme = useTheme();

  if (up) {
    return (
      <Card
        className={styles.info}
        sx={{ borderRadius: 4, width: 240 }}
        style={{ backgroundColor: theme.palette.primary.dark }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom align="center">
            {title}
          </Typography>

          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} align="center">
            {data}
          </Typography>
          <Typography sx={{ marginTop: 1 }} variant="body2" align="center">
            <TrendingDown sx={{ color: 'red' }} if={up == true}></TrendingDown> vs Last Month
          </Typography>
        </CardContent>

        <CardActions>{/* <Button size="small">Learn More</Button>  */}</CardActions>
      </Card>
    );
  } else {
    return (
      <Card
        className={styles.info}
        sx={{ borderRadius: 4, width: 240 }}
        style={{ backgroundColor: theme.palette.primary.dark }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom align="center">
            {title}
          </Typography>

          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} align="center">
            {data}
          </Typography>
          <Typography sx={{ marginTop: 1 }} variant="body2" align="center">
            <TrendingUp sx={{ color: 'green' }} if={up == true}></TrendingUp>
            vs Last Month
          </Typography>
        </CardContent>

        <CardActions>{/* <Button size="small">Learn More</Button>  */}</CardActions>
      </Card>
    );
  }
}
