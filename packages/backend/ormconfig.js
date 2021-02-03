const prefix = (path) => {
  let prefix = null;
  switch (process.env.NODE_ENV) {
    case 'test':
      prefix = 'src';
      break;
    case 'development':
    default:
      prefix = 'dist/src';
      break;
  }

  return `${prefix}/${path}`;
};

const config = {
  type: 'mysql',
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  synchronize: false,
  logging: false,
  entities: [prefix('{entities,domain,projection}/**/*.*')],
  migrations: [prefix('migration/**/*.*')],
  subscribers: [prefix('{subscriber,domain,projection}/**/*.*')],
  cli: {
    entitiesDir: prefix('{entities,domain,projection}'),
    migrationsDir: prefix('migration'),
    subscribersDir: prefix('{subscriber,domain,projection}'),
  },
};
module.exports = config;
