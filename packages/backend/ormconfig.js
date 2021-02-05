const prefix = (path) => {
  let prefix = null;
  switch (process.env.NODE_ENV) {
    case 'test':
      prefix = 'src';
      break;
    case 'development':
    default:
      prefix = 'dist';
      break;
  }

  return `${prefix}/${path}`;
};

const config = {
  type: 'mysql',
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
  username: process.env.DBUSER,
  password: '123456789',
  database: process.env.DBDATABASE,
  synchronize: false,
  logging: true,
  cache: false,
  entities: [prefix('entities/**/*.*')],
  migrations: [prefix('migration/**/*.*')],
  subscribers: [prefix('{subscriber,domain,projection}/**/*.*')],
  cli: {
    entitiesDir: prefix('entities'),
    migrationsDir: prefix('migration'),
    subscribersDir: prefix('{subscriber,domain,projection}'),
  },
};
module.exports = config;
