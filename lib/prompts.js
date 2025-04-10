
import inquirer from "inquirer";

export default async function promptUser() {
  return await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-backend-project"
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
      type: "confirm",
      name: "useAuth",
      message: "Include JWT authentication?",
      default: false
    },
    {
      type: "confirm",
      name: "includeLinter",
      message: "Include ESLint and Prettier setup?",
      default: true
    }
  ]);
}
