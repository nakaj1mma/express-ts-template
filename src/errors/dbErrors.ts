import { AppError } from "../utils/AppError";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";

// ┌───────────────────────────────┐
// │        Handle DB Errors       │
// └───────────────────────────────┘

export const handleCastErrorDB = (
  error: mongoose.Error.CastError
): AppError => {
  const message = `Invalid ${error.path}: ${error.value}.`;
  return new AppError(message, 400);
};

export const handleDuplicateFieldsDB = (error: MongoServerError): AppError => {
  const value = error.keyValue ? Object.values(error.keyValue)[0] : "unknown";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

export const handleValidationErrorDB = (
  error: mongoose.Error.ValidationError
): AppError => {
  const errors = Object.values(error.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
