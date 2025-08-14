import mongoose from "mongoose";

import { logError, logInfo } from "../utils/messageStyling";

export const connectDB = async () => {
  try {
    if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD)
      throw new Error("DATABASE and DATABASE_PASSWORD must be set in .env");

    const DB = process.env.DATABASE.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);

    logInfo("MongoDB connected");
  } catch (error) {
    logError("MongoDB failed to connect", error);
    process.exit(1);
  }
};
