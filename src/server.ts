import { Server } from "http";
import { config } from "dotenv";
import path from "path";

import { setServer, shuttingDownServer } from "./utils/shutdown";

process.on("uncaughtException", (err) => {
  shuttingDownServer("Uncaught Exception", err);
});

config({
  path: path.resolve(process.cwd(), ".env"),
});

import app from "./app";
import { connectDB } from "./config/db";
import box from "./utils/boxStyling";
import chalk from "chalk";

const port = process.env.PORT || 3000;

let server: Server;

const startServer = async () => {
  await connectDB();

  server = app.listen(port, () => {
    console.log(box(`App running on port ${port}...`, chalk.green));
    setServer(server);
  });
};

startServer();

process.on("unhandledRejection", (err: Error) => {
  shuttingDownServer("⛔ Unhandled Promise Rejection ⛔", err);
});
