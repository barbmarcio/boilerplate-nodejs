import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CreateUsersTable1695742412613 } from '../infra/typeom/migrations/1695742412613-CreateUsersTable';
import User from '../infra/typeom/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1', // process.env.FF_MYSQL_HOST,
  port: 3306, // Number(process.env.FF_MYSQL_PORT),
  username: 'root', // process.env.FF_MYSQL_USERNAME,
  password: 'Pass@123', // process.env.FF_MYSQL_PASSWORD,
  database: 'ff_replat', // process.env.FF_MY``SQL_DATABASE,
  synchronize: true,
  logging: false, // process.env.FF_TYPEORM_LOGGING ? Boolean(process.env.FF_TYPEORM_LOGGING) : false,
  entities: [User],
  migrations: [CreateUsersTable1695742412613],
  subscribers: [],
  migrationsRun: true, // Boolean(process.env.FF_TYPEORM_MIGRATIONS) || true,
});
