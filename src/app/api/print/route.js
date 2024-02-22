// app/api/print/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  await axios.get(process.env.DOMAIN + '/api/dishes').then((res) => {
    data = res.data;
  });

  return NextResponse.json(output, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
