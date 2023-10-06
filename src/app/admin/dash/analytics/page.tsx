// Admin Analytics
'use client';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import styles from './page.module.css';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import BasicCard from './card.js';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

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
        <Grid
          sx={{ backgroundColor: '' }}
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
        >
          <Grid item>
            <BasicCard title="Total Sales" data="$3.21" up="true"></BasicCard>
          </Grid>

          <Grid item>
            <BasicCard title="Current Sales" data="$500.00" up="false"></BasicCard>
          </Grid>

          <Grid item>
            <BasicCard title="Total Orders" data="500" up="true"></BasicCard>
          </Grid>

          <Grid item>
            <BasicCard title="Daily Sales" data="$53k" up="true"></BasicCard>
          </Grid>
        </Grid>

        <Grid
          sx={{ backgroundColor: '', marginTop: 5 }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={10}
        >
          <Grid item>
            <PieChart
              series={[
                {
                  data: data2,
                  paddingAngle: 3,
                  arcLabel: (item) => `${item.value}`,
                  cx: 210,
                  cy: 220,
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

          <Grid item>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
