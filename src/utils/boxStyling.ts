const box = (text: string, color: (msg: string) => string) =>
  color(`
┌${"─".repeat(text.length + 2)}┐
│ ${text} │
└${"─".repeat(text.length + 2)}┘
`);

export default box;
