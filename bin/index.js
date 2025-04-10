#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import  promptUser  from '../lib/prompts.js';
import { createStructure } from '../lib/createStructure.js';
import  setupPackageJson  from '../lib/setupPackageJson.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.greenBright('🚀 Starting backend project setup...'));

try {
  const options = await promptUser();
  const projectDir = path.join(process.cwd(), options.projectName);

  // Step 1: Create folder structure and basic files
  await createStructure(options, projectDir);
  console.log(chalk.cyan('📁 Folder structure created.'));

  // Step 2: Setup package.json and install dependencies
  await setupPackageJson(options, projectDir);
  console.log(chalk.cyan('📦 Dependencies installed.'));

  // Final message
  console.log(chalk.greenBright('✅ Setup complete!'));
  console.log(chalk.yellowBright('👉 Next steps:'));
  console.log(`  cd ${options.projectName}`);
  console.log(`  npm run dev`);
} catch (error) {
  console.error(chalk.red('❌ Setup failed:'), error.message);
  process.exit(1);
}
