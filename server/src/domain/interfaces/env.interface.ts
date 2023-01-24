interface IEnv {
  mongo: {
    uri: string;
  };
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
}

export default IEnv;
