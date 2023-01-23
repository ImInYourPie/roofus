interface IEnv {
  db: {
    host: string;
    name: string;
    user: string;
    password: string;
    migrationsDir: string;
    port: string;
  };
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
}

export default IEnv;
