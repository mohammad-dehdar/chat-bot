declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      CI: boolean;
      //   any other env variables
    }
  }
}

export {};
