import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";

import { AppError } from "./utils/AppError";

import { globalErrorHandler } from "./middleware/errorHandler";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://myapp.com"],
    credentials: true,
  })
);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
