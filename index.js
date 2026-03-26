import * as fs from "fs/promises";
import { format } from "date-fns";
import { Command } from "commander";

class Expense {
  id;
  date;
  description;
  amount;

  constructor(desc, amount) {
    this.id = Date.now();
    this.date = format(Date.now(), "yyyy-MM-dd");
    this.description = desc;
    this.amount = amount;
  }
}

const program = new Command();

program
  .command("add")
  .description("Add a new expense entry")
  .option("--description <string>", "Expense description")
  .option("--amount <number>", "Expense amount")
  .action(async (options) => {
    let expense = new Expense(options.description, options.amount);

    let expenses = await readJsonFile();
    expenses.push(expense);
    await writeJsonFile(
      expenses,
      `Expenses added successfully (ID: ${expense.id})`,
    );
  });

program
  .command("list")
  .description("List out all expenses")
  .action(() => {
    console.table([1, "2024-0806", "Lunch", "20"]);
  });

program.parse();

async function readJsonFile() {
  let expenses = [];

  try {
    const data = await fs.readFile("expenses.json", "utf-8");
    expenses = data ? JSON.parse(data) : [];
    return expenses;
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile("expenses.json", JSON.stringify(expenses, null, 2));
      console.log("Missing expenses.json file, creating new file");
      return expenses;
    }
    throw error;
  }
}

async function writeJsonFile(expenses, msg) {
  try {
    await fs.writeFile("expenses.json", JSON.stringify(expenses, null, 2));
    console.log(msg);
    console.table(expenses);
  } catch (error) {
    console.error("Error writing file: ", error);
  }
}
