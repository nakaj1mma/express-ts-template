import { Server } from "http";
import box from "./boxStyling";
import chalk from "chalk";

let serverRef: Server;

export const setServer = (srv: Server): void => {
  serverRef = srv;
};

export const shuttingDownServer = (message: string, err: Error): void => {
  console.log(box(message, chalk.red));
  console.error(err.name, err.message);

  console.log(box("The process is shutting down...", chalk.yellow));

  if (serverRef) {
    serverRef.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
