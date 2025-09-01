import mongoose from 'mongoose';
import { getMongoDBUri, validateMongoDBUri } from './mongoUri';

const MONGODB_URI = getMongoDBUri();

if (!MONGODB_URI || !validateMongoDBUri(MONGODB_URI)) {
  throw new Error('Invalid MongoDB URI. Please check your MongoDB configuration.');
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
