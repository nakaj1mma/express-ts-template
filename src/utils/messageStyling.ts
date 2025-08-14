import chalk from "chalk";

const box = (text: string, color: (msg: string) => string) =>
  color(`
┌${"─".repeat(text.length + 2)}┐
│ ${text} │
└${"─".repeat(text.length + 2)}┘
`);

export const logInfo = (message: string) => {
  console.log(box(message, chalk.green));
};

export const logError = (message: string, err?: unknown) => {
  console.log(box(message, chalk.red));
  if (err instanceof Error) console.error(err.stack);
  else if (err) console.error(err);
};

export const logWarning = (message: string) => {
  console.log(box(message, chalk.yellow));
};
