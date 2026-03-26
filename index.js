import * as fs from "fs/promises";
import { Command } from "commander";

const program = new Command();

program
  .command("add")
  .description("Add a new expense entry")
  .option("--description <string>", "Expense description")
  .option("--amount <number>", "Expense amount")
  .action((options) => {
    console.log("Expense:");
    console.log(`Description: ${options.description}`);
    console.log(`Amount: ${options.amount}`);
  });

program.parse();
