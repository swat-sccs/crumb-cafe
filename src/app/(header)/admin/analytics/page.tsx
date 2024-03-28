// Admin Analytics
'use client';
import { Grid, Container, Box, Fade } from '@mui/material';
import styles from './page.module.css';
import { LineChart } from '@mui/x-charts/LineChart';
import BasicCard from './card.js';
import LabelAvatar from '@/app/components/labelAvatar.js';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import dayjs, { Dayjs } from 'dayjs';

import { PieChart, pieArcLabelClasses, pieArcClasses } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());
let data2: any = [{}];

export default function Analytics() {
  const theme = useTheme();
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });
  const [totalSales, setTotalSales] = React.useState(0);
  const [dailySales, setDailySales] = React.useState(0);
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [dailyOrders, setDailyOrders] = React.useState(0);
  const [currentDaySelected, setCurrentDay] = React.useState<Dayjs | null>(dayjs());

  const [sales, setSales] = React.useState([]);
  //const [data2, setData2] = React.useState<any>([]);

  const calcNums = () => {
    if (isLoading == false && !error) {
      let tempTotal = 0;
      let tempDaily = 0;
      let tempDailyOrders = 0;
      let labels: any = {};
      let values: any = [];

      for (const order of data.orders) {
        //(order);
        if (dayjs(currentDaySelected).isSame(dayjs(order.createdAt), 'day')) {
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

  const pieChart = async () => {
    let labels: any = {};

    if (isLoading == false && !error) {
      data2 = [];
      let filteredOrders = data.orders.filter((a: any) => {
        return dayjs(currentDaySelected).isSame(dayjs(a.createdAt), 'day');
      });

      //console.log(data.orders);
      //console.log(filteredOrders);
      for (const order of filteredOrders) {
        for (const dish of order.dishes) {
          //labels.push(dish.friendlyName);
          labels[dish.friendlyName] = (labels[dish.friendlyName] ?? 0) + 1;
        }
      }
      //console.log(labels);

      for (const thing in labels) {
        data2.push({ label: thing, value: labels[thing] });
        //setData2(temp);
      }
    }
    console.log(data2);
  };

  const chartSetting = {
    xAxis: [
      {
        label: 'Amount (# of items sold)',
      },
    ],
    width: 1000,
    height: 540,
  };
  const valueFormatter = (value: number | null) => `${value}`;

  useEffect(() => {
    calcNums();
    pieChart();
  });

  return (
    <Container>
      <Box sx={{ position: 'absolute', top: 10, right: '30%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            formatDensity="dense"
            label="Controlled picker"
            value={currentDaySelected}
            onChange={(newValue) => setCurrentDay(newValue)}
          />
        </LocalizationProvider>
      </Box>
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

        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={styles.info}
        >
          {data2.length > 0 ? (
            <BarChart
              dataset={data2}
              yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
              series={[{ dataKey: 'value', valueFormatter }]}
              layout="horizontal"
              {...chartSetting}
              colors={[
                '#FFA958',
                '#F48178',
                '#C96D91',
                '#8B6595',
                '#505A7E',
                '#2F4858',
                '#549142',
                '#008151',
                '#006F5F',
                '#532F26',
                '#00D7BD',
              ]}
            />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}
