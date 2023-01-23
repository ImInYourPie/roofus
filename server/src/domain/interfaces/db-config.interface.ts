interface IDBConfig {
  type: string;
  dbName: string;
  user: string;
  password: string;
  entities: Array<any>;
  migrations: Array<any>;
  cli: {
    migrationsDir: string;
  };
}

export default IDBConfig;
