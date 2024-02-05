import mongoose from 'mongoose';

declare global {}

const { MONGODB_URI, MONGODB_DB } = process.env;
///const MONGODB_URI = process.env.MONGODB_URI;
//const MONGODB_DB = process.env.MONGODB_DB;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(`${MONGODB_URI}/${MONGODB_DB}`, opts)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
