import mongoose from 'mongoose';
import { getMongoDBUri, validateMongoDBUri } from './mongoUri';

// Only validate MongoDB URI at runtime, not during build time
let MONGODB_URI: string | null = null;

function getMongoDBUriSafe(): string {
  if (!MONGODB_URI) {
    MONGODB_URI = getMongoDBUri();
    
    // Skip validation during build time
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      return MONGODB_URI;
    }
    
    if (!MONGODB_URI || !validateMongoDBUri(MONGODB_URI)) {
      throw new Error('Invalid MongoDB URI. Please check your MongoDB configuration.');
    }
  }
  
  return MONGODB_URI;
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
      promise: mongoose.connect(getMongoDBUriSafe(), opts)
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