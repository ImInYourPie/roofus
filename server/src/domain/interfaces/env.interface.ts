interface IEnv {
  mongo: {
    uri: string;
  };
  port: string;
  jwtSecret: string;
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
}

export default IEnv;
