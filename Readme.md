# 🚀 SETUP BACKEND

[![version](https://img.shields.io/npm/v/init-backend.svg)](https://www.npmjs.com/package/init-backend)

Quickly set up a clean backend project using JavaScript or TypeScript.

---

## 📦 Installation

Run directly with `npx`:

```bash
npx init-backend
```

Or install globally:

```bash
npm install -g inti-backend
```

---

## ⚙️ Features

✅ JavaScript or TypeScript support  
✅ Express or HTTP server  
✅ MongoDB or PostgreSQL integration  
✅ Optional JWT-based authentication  
✅ Prettier + ESLint setup  
✅ Clean project structure with auto dependency install  
✅ Useful scripts like dev, start, lint, and format

---

## 📂 Folder Structure

```bash
your-project/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json / server.js / index.ts
```

---

## 🛠️ Usage

Just run:

```bash
npx init-backend
```

Answer a few questions (project name, language, DB, auth), and it sets up everything.

---

## 📜 Scripts (in the generated project)

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

_Scripts will adapt automatically if you're using TypeScript._

---

## 📸 Demo

![structure](https://github.com/sidd2512/init-backend/blob/main/demo.png)

## 🤝 Contributing

Love the idea? Help it grow:

- Fork the repository
- Make your changes
- Submit a pull request

GitHub: [https://github.com/sidd2512/init-backend](https://github.com/sidd2512/init-backend)

---

## 🧑‍💻 Author

Made with ❤️ by Siddharth

---
