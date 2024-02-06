// Admin Analytics
'use client';
import { Grid, Container, Typography, Avatar } from '@mui/material';
import styles from './page.module.css';
import { LineChart } from '@mui/x-charts/LineChart';
import BasicCard from './card.js';
import LabelAvatar from '../../components/labelAvatar.js';
import { PieChart, pieArcLabelClasses, pieArcClasses } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect, useRef } from 'react';

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const data2 = [
  { label: 'Quesadilla', value: 200 },
  { label: 'Burger and Fries', value: 100 },
  { label: 'Oreo Milk Shake', value: 50 },
  { label: 'Chicken Tendies', value: 100 },
  { label: 'Dino Nuggies', value: 30 },
  { label: 'JUICE', value: 20 },
];

export default function Analytics() {
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });

  const calcNums = () => {
    if (isLoading == false) {
      console.log(data);
    }
  };
  calcNums();
  useEffect(() => {
    calcNums();
  });
  return (
    <Container>
      <LabelAvatar title="Analytics" />

      <Grid sx={{ backgroundColor: '' }} container>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
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

        <Grid
          container
          item
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ marginTop: '3%' }}
        >
          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Total Sales" data="$3.21" up={true}></BasicCard>
          </Grid>

          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Current " data="$500.00" up={false}></BasicCard>
          </Grid>

          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Total Orders" data="500" up={true}></BasicCard>
          </Grid>

          <Grid item xs={2} lg={2.5}>
            <BasicCard title="Daily Sales" data="$53k" up={true}></BasicCard>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
