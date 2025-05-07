import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import chalk from 'chalk';

export default async function setupPackageJson(options, targetPath) {
  const isTS = options.language === 'TypeScript';
  const projectPath = path.join(targetPath);

  // Create package.json with metadata
  const pkgJson = {
    name: options.projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    main: `src/server.${isTS ? 'ts' : 'js'}`,
    type: 'module',
    scripts: {
      start: isTS ? 'node dist/server.js' : `node src/server.js`,
      dev: isTS ? 'ts-node-dev src/server.ts' : 'nodemon src/server.js',
      build: isTS ? 'tsc' : undefined,
      lint: 'eslint .',
      format: 'prettier --write .'
    },
    dependencies: {},
    devDependencies: {},
    keywords: [],
    author: '',
    license: 'ISC'
  };

  if (!isTS) delete pkgJson.scripts.build;

  await fs.writeJson(path.join(projectPath, 'package.json'), pkgJson, { spaces: 2 });

  // Install core dependencies
  const baseDeps = ['express', 'cors', 'dotenv'];
  const dbDeps = options.database === 'MongoDB'
    ? ['mongoose']
    : options.database === 'PostgreSQL'
      ? ['pg']
      : [];
  const authDeps = options.useAuth === 'Yes' ? ['bcrypt', 'jsonwebtoken'] : [];

  const installDeps = [...baseDeps, ...dbDeps, ...authDeps];
  installDeps.forEach(dep => console.log(chalk.cyan(`Installing ${dep}...`)));
  execSync(`npm install ${installDeps.join(' ')}`, { stdio: 'inherit', cwd: projectPath });

  // Install dev dependencies
  const devDeps = ['nodemon'];
  if (isTS) devDeps.push('typescript', 'ts-node-dev', '@types/node', '@types/express');
  if (options.includeLinter === 'Yes') devDeps.push('eslint', 'prettier');

  devDeps.forEach(dep => console.log(chalk.cyan(`Installing ${dep}...`)));
  execSync(`npm install -D ${devDeps.join(' ')}`, { stdio: 'inherit', cwd: projectPath });

  // Create tsconfig.json if TS
  if (isTS) {
    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'Node',
        outDir: 'dist',
        rootDir: 'src',
        strict: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true
      },
      include: ['src']
    };
    await fs.writeJson(path.join(projectPath, 'tsconfig.json'), tsConfig, { spaces: 2 });
  }
}
