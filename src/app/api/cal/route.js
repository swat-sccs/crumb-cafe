// app/api/cal/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

//const icsToJson = require('ics-to-json');

// To handle a GET request to /api

export async function GET(request) {
  console.log(request);
  let data;
  const output = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  /*

  {
              title: 'taco tuesday',
              date: '2020-01-01',
              daysOfWeek: ['4'],
            },*/
  await axios.get(process.env.DOMAIN + '/api/dishes').then((res) => {
    data = res.data;
  });

  for (const thing of data.dishes) {
    const dotw = [];
    if (thing.dotw) {
      for (const dow of thing.dotw) {
        if (days.includes(dow)) {
          dotw.push(days.indexOf(dow));
        }
      }
    }

    const x = Math.floor(Math.random() * 255);
    const y = Math.floor(Math.random() * 255);

    const color = 'rgb(0,' + y + ',' + x + ')';

    output.push({
      title: thing.friendlyName,
      date: '2020-01-01',
      daysOfWeek: dotw,

      borderColor: 'rgba(0,0,0,0)',
    });
  }

  return NextResponse.json(output, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
