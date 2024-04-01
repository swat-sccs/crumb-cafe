'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export default function personalPD() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={[
        { title: 'taco tuesday', date: '2023-10-30' },
        { title: 'first event!!', date: '2023-10-30' },
      ]}
    />
  );
}
