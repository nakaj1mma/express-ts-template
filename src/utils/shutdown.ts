import { Server } from "http";
import chalk from "chalk";
import { logError, logWarning } from "./messageStyling";

let serverRef: Server;

export const setServer = (srv: Server): void => {
  serverRef = srv;
};

export const shuttingDownServer = (message: string, err: Error): void => {
  logError(message);
  console.error(err.name, err.message);

  logWarning("The process is shutting down...");

  if (serverRef) {
    serverRef.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
