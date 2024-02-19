'use client';
import { Box, Card, Container, Grid } from '@mui/material';
import useSWR from 'swr';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import dayjs, { Dayjs } from 'dayjs';

import moment from 'moment';

import React, { useState, useEffect, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

import LabelAvatar from '@/app/components/labelAvatar';
import { AnyARecord } from 'dns';
export default function Home() {
  const { data, error, isLoading } = useSWR('/api/cal', fetcher, { refreshInterval: 1000 });

  const toolBar = {
    right: 'today prev,next',
    center: 'title',
    left: 'dayGridMonth,dayGridWeek,dayGridDay', // user can switch between the two
  };

  if (!isLoading) {
    console.log(data);
  }

  return (
    <Box>
      <Container sx={{ height: '80vh' }}>
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin, listPlugin]}
          initialView="dayGridWeek"
          contentHeight="80vh"
          fixedWeekCount={false}
          events={data}
          headerToolbar={toolBar}
        />
      </Container>
    </Box>
  );
}

/*

 <FullCalendar
  height="100%"
  plugins={[dayGridPlugin, listPlugin]}
  initialView="dayGridMonth"
  contentHeight="80vh"
  fixedWeekCount={false}
  events={data}
  headerToolbar={toolBar}
/>

*/
