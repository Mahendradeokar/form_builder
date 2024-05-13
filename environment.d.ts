import "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_CONNECT_URL: string;
      SECRET_KEY: string;
      SERVER_URL: string;
    }
  }
}
