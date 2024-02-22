// Admin Analytics
'use client';
import { Grid, Container, Typography, Avatar } from '@mui/material';
import styles from './page.module.css';
import { LineChart } from '@mui/x-charts/LineChart';
import BasicCard from './card.js';
import LabelAvatar from '@/app/components/labelAvatar.js';
import { PieChart, pieArcLabelClasses, pieArcClasses } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

let data2 = [
  { label: 'custom', value: 200 },
  { label: 'italian-soda', value: 100 },
  { label: 'Oreo Milk Shake', value: 50 },
  { label: 'Chicken Tendies', value: 100 },
  { label: 'Dino Nuggies', value: 30 },
  { label: 'JUICE', value: 20 },
];

export default function Analytics() {
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });
  const [totalSales, setTotalSales] = React.useState(0);
  const [dailySales, setDailySales] = React.useState(0);
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [dailyOrders, setDailyOrders] = React.useState(0);

  const calcNums = () => {
    if (isLoading == false && !error) {
      let tempTotal = 0;
      let tempDaily = 0;
      let tempDailyOrders = 0;

      for (const order of data.orders) {
        console.log(order);
        if (moment().isSame(order.createdAt, 'day')) {
          tempDaily += order.total;
          tempDailyOrders++;
        }
        tempTotal += order.total;
      }
      setTotalSales(tempTotal);
      setDailySales(tempDaily);
      setTotalOrders(data.orders.length);
      setDailyOrders(tempDailyOrders);
    }
  };

  useEffect(() => {
    calcNums();
  });
  return (
    <Container>
      <Grid sx={{ backgroundColor: '' }} container direction="column" spacing={2}>
        <Grid container item direction="row" justifyContent="space-evenly" alignItems="center">
          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Total Sales" data={'$' + totalSales.toFixed(2)} up={true}></BasicCard>
          </Grid>

          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Total Orders" data={totalOrders} up={true}></BasicCard>
          </Grid>

          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Daily Orders" data={dailyOrders} up={false}></BasicCard>
          </Grid>

          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Daily Sales" data={'$' + dailySales.toFixed(2)} up={true}></BasicCard>
          </Grid>
        </Grid>

        <Grid container item direction="row" justifyContent="flex-start" alignItems="center">
          <PieChart
            series={[
              {
                data: data2,
                paddingAngle: 3,
                arcLabel: (item) => `${item.value}`,
                highlightScope: { faded: 'global', highlighted: 'item' },
                cx: 150,
                cy: 220,
                innerRadius: 100,
                outerRadius: 200,
                cornerRadius: 10,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              },
              [`& .${pieArcClasses.faded}`]: {
                fill: 'gray',
              },
            }}
            height={440}
            width={300}
            legend={{ hidden: true }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
