import inquirer from "inquirer";
import path from 'path';

export default async function promptUser() {
  const currentDirName = path.basename(process.cwd());
  const defaultProjectName = 'backend';
  return await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: `Project name:`,
      default: defaultProjectName
    },
    {
      type: "list",
      name: "language",
      message: "Choose language:",
      choices: ["JavaScript", "TypeScript"]
    },
    {
      type: "list",
      name: "framework",
      message: "Choose server framework:",
      choices: ["Express", "HTTP"]
    },
    {
      type: "list",
      name: "database",
      message: "Select DB:",
      choices: ["MongoDB", "PostgreSQL", "None"]
    },
    {
      type: "list",
      name: "useAuth",
      message: "Include JWT authentication?(default: No)",
      choices: ["Yes", "No"],
      default: "No"
    },
    {
      type: "list",
      name: "includeLinter",
      message: "Include ESLint and Prettier setup?(default: No)",
      choices: ["Yes", "No"],
      default: "No"
    }
  ]);
}
