// Admin Analytics
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import styles from './page.module.css';
import BasicCard from './card.js';


 
export default function Analytics() {
    return (
        <Container className={styles.main}>
            
            <Container className={styles.topBar}>
                <Grid  container spacing={2} direction="row" justifyContent="space-between">
                    <Grid item >
                        <BasicCard title="Total Sales" data="3.21"></BasicCard>
                    </Grid>

                    <Grid item >
                        <BasicCard title="Current Sales" data="500.00"></BasicCard>
                    </Grid>

                    <Grid item >
                        <BasicCard title="Total Orders" data="500"></BasicCard>
                    </Grid>

                    <Grid item >
                        <BasicCard title="Daily Sales" data="53k"></BasicCard>
                    </Grid>
                </Grid>
            </Container>
        </Container>
        

      
    );
  }