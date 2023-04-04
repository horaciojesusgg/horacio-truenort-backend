import { DataSource } from 'typeorm';
import config from '../../config';

export const PostgresDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: config.dbHost,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  port: 5432,
  migrations: ['src/data/migrations/**/*{.js,.ts}'],
  entities: ['src/**/*.entity{.js,.ts}'],
});
