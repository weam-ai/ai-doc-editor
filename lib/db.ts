import mongoose from 'mongoose';
import { MONGODB } from '../app/config/config';
// const MONGODB_URI = process.env.MONGODB_URI!;
const dbConfigure = `${MONGODB.DB_USERNAME}${MONGODB.DB_PASSWORD}`;
const MONGODB_URI = `${MONGODB.DB_CONNECTION}://${dbConfigure}${MONGODB.DB_HOST}${MONGODB.DB_PORT}/${MONGODB.DB_DATABASE}?retryWrites=true&w=majority&readPreference=nearest`;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} | null = null;

async function dbConnect() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached = {
      conn: null,
      promise: mongoose.connect(MONGODB_URI, opts)
    };
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
