// app/api/print/route.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import axios from 'axios';

export async function GET(request: NextRequest) {
  await axios.get(process.env.DOMAIN + '/api/dishes').then((res) => {
    return NextResponse.json(res.data, { status: 200 });
  });

  return NextResponse.json('output', { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  // Do whatever you want
  const data = await request.json();
  let output;
  await axios
    .post('http://130.58.111.16:5001', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      output = response.data;
    });
  return NextResponse.json(output, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
