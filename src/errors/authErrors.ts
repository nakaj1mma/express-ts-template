import { AppError } from "../utils/AppError";

// ┌───────────────────────────────┐
// │       Handle JWT errors       │
// └───────────────────────────────┘

export const handleJWTError = (): AppError =>
  new AppError("Invalid token. Please log in again!", 401);

export const handleJWTExpiredError = (): AppError =>
  new AppError("Your token has been expired! Please log in again.", 401);
