import chalk from "chalk";
import mongoose from "mongoose";

import box from "../utils/boxStyling";

export const connectDB = async () => {
  try {
    if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
      throw new Error("DATABASE and DATABASE_PASSWORD must be set in .env");
    }

    const DB = process.env.DATABASE.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);

    console.log(box("MongoDB connected", chalk.green));
  } catch (error) {
    console.log(box("❌ MongoDB failed to connect ❌", chalk.red));
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
};
