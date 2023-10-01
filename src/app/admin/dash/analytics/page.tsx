// Admin Analytics
"use client";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import styles from './page.module.css';
import BasicCard from './card.js';
import { PieChart,pieArcLabelClasses } from '@mui/x-charts/PieChart';




const data2 = [
    { label: 'Quesadilla', value: 2400 },
    { label: 'Burger and Fries', value: 4567 },
    { label: 'Oreo Milk Shake', value: 1398 },
    { label: 'Chicken Tendies', value: 9800 },
    { label: 'Dino Nuggies', value: 3908 },
    { label: 'JUICE', value: 4800 },
  ];


 
export default function Analytics() {
    return (
        <Container className={styles.main}>
            
            <Container className={styles.topBar}>
                <Grid  sx={{backgroundColor:''}} container spacing={2} direction="row" justifyContent="space-between">
                    <Grid item >
                        <BasicCard title="Total Sales" data="$3.21" up="true" ></BasicCard>
                    </Grid>

                    <Grid item >
                        <BasicCard title="Current Sales" data="$500.00" up="false"></BasicCard>
                    </Grid>

                    <Grid item >
                        <BasicCard title="Total Orders" data="500" up="true"></BasicCard>
                    </Grid>

                    <Grid item >
                        <BasicCard title="Daily Sales" data="$53k" up="true"></BasicCard>
                    </Grid>
                </Grid>

                <Grid  sx={{backgroundColor:'' , marginTop:5}} container direction="row"  justifyContent="center" spacing={0} >
                
                <PieChart
                    series={[
                        {
                        data: data2,
                        paddingAngle: 3,
                        arcLabel: (item) => `${item.value}`,
                        cx: 200,
                        cy: 200,
                        innerRadius: 150,
                        outerRadius: 200,
                        cornerRadius: 10,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                          

                        },
                      }}

                        height={450}
                        width={560}
                    />
               
                </Grid>
                
            </Container>
        </Container>
        

      
    );
  }