import { NextFunction, Response, Request } from "express";
import {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
} from "../errors/dbErrors";
import { handleJWTError, handleJWTExpiredError } from "../errors/authErrors";
import { AppError } from "../utils/AppError";

const sendErrorDev = (error: AppError | any, res: Response) => {
  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error: AppError | any, res: Response) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      success: false,
      status: error.status,
      message: error.message,
    });
  } else {
    console.error("❌ERROR❌\n", error);

    res.status(500).json({
      success: false,
      status: "error",
      message:
        "Something went wrong in server side, please try again later or contact technical support",
    });
  }
};

// ┌───────────────────────────────┐
// │      Global Error Handler     │
// └───────────────────────────────┘

export const globalErrorHandler = (
  err: AppError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    // DB errors
    if (error.name === "CastError") error = handleCastErrorDB(err);
    if (error.code === 11000) error = handleDuplicateFieldsDB(err);
    if (error.name === "ValidationError") error = handleValidationErrorDB(err);

    // JWT errors
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  } else {
    res.status(500).json({
      success: false,
      message: "⚠️ NODE_ENV not set!",
    });
  }
};
