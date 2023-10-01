// Admin Analytics
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './page.module.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';




  export default function BasicCard({title, data, up}) {
    return (
        
            <Card className={styles.info} sx={{borderRadius: 4, width:240,}}    >
            <CardContent>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                  {title}
              </Typography>
              
              <Typography sx={{fontSize: 25, fontWeight: 'bold'}} >
                {data}
                 
              </Typography>
              <Typography sx={{marginTop: 1, }} variant="body2">
                
                
                    <TrendingUpIcon  sx={{color: "green",}}></TrendingUpIcon>

               
                
                vs Last Month 
                 
              </Typography>
            </CardContent>
           
            <CardActions>
             {/* <Button size="small">Learn More</Button>  */}
            </CardActions>
        </Card>
      
    );
  }