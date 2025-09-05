import { MONGODB } from '../app/config/config';

/**
 * Get MongoDB URI - supports both direct URI from environment or constructed from individual config parts
 * @param directUri - Optional direct MongoDB URI (e.g., from MONGODB_URI env variable)
 * @returns MongoDB connection URI string
 */
export function getMongoDBUri(directUri?: string): string {
  // If direct URI is provided and is valid, use it
  if (directUri && directUri.trim()) {
    return directUri.trim();
  }

  // Check if MONGODB_URI environment variable exists and use it
  if (process.env.MONOGODB_URI && process.env.MONOGODB_URI.trim()) {
    return process.env.MONOGODB_URI.trim();
  }

  // Construct URI from individual environment variables via config
  const { DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = MONGODB;

  // Validate required fields
  if (!DB_CONNECTION || !DB_HOST || !DB_DATABASE) {
    throw new Error(
      'MonogoDB configuration is incomplete. Either provide MONOGODB_URI or ensure DB_CONNECTION, DB_HOST, and DB_DATABASE are set.'
    );
  }

  // Construct the authentication part if username/password are provided
  const authPart = `${DB_USERNAME || ''}${DB_PASSWORD || ''}`;
  
  // Construct the full URI
  const uri = `${DB_CONNECTION}://${authPart}${DB_HOST}${DB_PORT || ''}/${DB_DATABASE}?retryWrites=true&w=majority&readPreference=nearest`;

  return uri;
}

/**
 * Validate MongoDB URI format
 * @param uri - MongoDB URI to validate
 * @returns boolean indicating if URI is valid
 */
export function validateMongoDBUri(uri: string): boolean {
  try {
    // Basic validation - check if it starts with mongodb:// or mongodb+srv://
    const mongoProtocolRegex = /^mongodb(\+srv)?:\/\/.+/;
    return mongoProtocolRegex.test(uri);
  } catch {
    return false;
  }
}

// CommonJS compatibility for Node.js scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getMongoDBUri,
    validateMongoDBUri
  };
}