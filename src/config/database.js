import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionConfig = {
    connectionString: process.env.DATABASE_URL
};

if (process.env.NODE_ENV === 'production') connectionConfig.ssl = true;

export const db = new Pool(connectionConfig);