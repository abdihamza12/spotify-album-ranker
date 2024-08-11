import * as dotenv from './node_modules/dotenv';

dotenv.config();

export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;

