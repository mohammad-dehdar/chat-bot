declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      CI: boolean;
      GWT?: string;
      TEST_TOKEN?: string;
      //   any other env variables
    }
  }
}

// Global constants defined by webpack DefinePlugin
declare const GWT: string;
declare const TEST_TOKEN: string;

export {};
