import { MongoClient } from 'mongodb';

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;


import { MONGODB } from '../app/config/config';
// const MONGODB_URI = process.env.MONGODB_URI!;
const dbConfigure = `${MONGODB.DB_USERNAME}${MONGODB.DB_PASSWORD}`;
const uri = `${MONGODB.DB_CONNECTION}://${dbConfigure}${MONGODB.DB_HOST}${MONGODB.DB_PORT}/${MONGODB.DB_DATABASE}?retryWrites=true&w=majority&readPreference=nearest`;
console.log('uri....',uri);

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
