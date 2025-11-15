declare global {
  interface Window {
    GWT?: string;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      CI?: string | boolean;
    }
  }
}

export {};
