import 'reflect-metadata';
import 'dotenv/config';

process.env.NODE_ENV = 'test';
process.env.DB_TYPE = 'sqlite';
process.env.DB_SQLITE_PATH = ':memory:';

jest.setTimeout(30000);
