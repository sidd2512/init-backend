
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderList = [
  'controllers',
  'routes',
  'middlewares',
  'models',
  'config',
  'utils'
];

const createFile = async (filePath, content = '') => {
  await fs.outputFile(filePath, content);
};

export default async function createStructure(options, targetPath) {
  const isTS = options.language === 'TypeScript';
  const ext = isTS ? 'ts' : 'js';

  folderList.forEach(dir => fs.ensureDirSync(path.join(targetPath, 'src', dir)));
  fs.ensureDirSync(path.join(targetPath, 'src'));

  // Basic .env.example
  await createFile(path.join(targetPath, '.env.example'), 'PORT=5000\nDB_URI=your_db_connection_string');
  await createFile(path.join(targetPath, '.gitignore'), 'node_modules\n.env');

  // Server code
  const serverFile = isTS ? 'server.ts' : 'server.js';
  const serverContent = options.framework === 'Express' ? getExpressTemplate(ext) : getHttpTemplate(ext);
  await createFile(path.join(targetPath, 'src', serverFile), serverContent);

  // DB connection code
  if (options.database !== 'None') {
    const dbCode = options.database === 'MongoDB' ? getMongoTemplate(ext) : getPostgresTemplate(ext);
    await createFile(path.join(targetPath, 'src', 'config', `db.${ext}`), dbCode);
  }
}

function getExpressTemplate(ext) {
  return `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
${ext === 'ts' ? "import type { Request, Response } from 'express';\n" : ''}
import { connectDB } from './config/db.${ext}';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req${ext === 'ts' ? ': Request' : ''}, res${ext === 'ts' ? ': Response' : ''}) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`;
}

function getHttpTemplate(ext) {
  return `import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from HTTP server');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`;
}

function getMongoTemplate(ext) {
  return `import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
`;
}

function getPostgresTemplate(ext) {
  return `import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DB_URI });

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
`;
}
