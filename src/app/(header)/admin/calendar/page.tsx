'use client';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Box, Container } from '@mui/material';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

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
    <Box sx={{ mt: '2%' }}>
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
