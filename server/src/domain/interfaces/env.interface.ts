interface IEnv {
  mongo: {
    uri: string;
  };
  jwtSecret: string;
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
}

export default IEnv;
