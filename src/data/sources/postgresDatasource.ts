import { DataSource } from 'typeorm';
import config from '../../config';
import { Operation } from '../../operation/operation.entity';
import { Record } from '../../record/record.entity';
import {User} from '../../user/user.entity'

export const PostgresDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: config.dbHost,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  port: 5432,
  migrations: ['src/data/migrations/**/*{.js,.ts}'],
  entities: [User, Record, Operation],
});
