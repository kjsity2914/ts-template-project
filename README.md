# TS Template Project

This project is a TypeScript starter template for building a lightweight backend service with modern Node.js tooling, strong validation and test coverage.
It is structured to support clean API development and reusable utility modules whilst keeping the codebase easy to extend.

## 🚀 Features
 
- TypeScript configuration for a modern Node.js environment
- Express-style service architecture
- Utility modules for parameter validation and data transformation
- Unit tests using Jest
- Linting and formatting support for a consistent development workflow

---

## 📋 Requirements

Before running the project, ensure you have the following installed:

**1. Node.js (v18 or later)**

This project uses modern ESM (module: "NodeNext") and requires a recent Node version with full ESM support.

You can verify your version with:
```bash
node -v
```

**2. Yarn**

The project uses Yarn as the package manager
Install Yarn globally if you don't already have it:
```bash
npm install --global yarn
```

**3. VS Code (recommended)**

The project includes lint‑on‑save functionality using ESLint.
To benefit from auto‑fixing, use VS Code with the ESLint extension installed.

---

## 📦 Installation

```bash
yarn install
```

---

## 🛠 Scripts
| Script | Description |
| --- | --- |
| ``yarn build`` | Compile TypeScript into ``dist/`` |
| ``yarn start`` | Start the compiled app (``dist/index.js``) |
| ``yarn dev`` | Start the app in dev mode using ``nodemon`` |
| ``yarn lint`` | Run ESLint on the project |
| ``yarn lint:fix`` | Fix lint issues automatically |
| ``yarn format`` | Format code using Prettier |
| ``yarn test`` | Run Jest test suite |
| ``yarn test:watch`` | Run Jest in watch mode |

---

## 📁 Project Structure
```
src/
  index.ts # App entrypoint
  lib/
  services/
  utils/
    checkParam/
    FileSystem/
    HttpHelper/
    toParam/
```

---

## 🌐 API
```
GET /hello-world
```

Displays greeting with a name

**Required query parameters**
| Name | Type | Description |
| --- | --- | --- |
| ``name`` | string | A name |

**Optional parameters**
| Name | Type | Description |
| --- | --- | --- |
| ``showDatetime`` | string | Indicates if the current date and time should be displayed |

**Example**
```
GET /hello-world?name=Kevin&showDatetime=true
```

---

## 🧪 Testing
The project includes a full Jest test suite covering:

- File system utilities
- Query parameter parsing
- Error handling

Run tests:
```bash
yarn test
```

Run in watch mode:
```bash
yarn test:watch
```

---

## ▶️ Running the App
**Development**
```bash
yarn dev
```

**Production**
```bash
yarn build
yarn start
```

---

## 🧹 Linting & Auto‑Fix on Save
This project includes a fully configured ESLint setup to ensure code quality and consistency.
To make development smoother, linting is automatically applied every time you save a file in VS Code.

**How it works**
- ESLint is installed and configured for TypeScript.
- VS Code is set to run eslint --fix automatically on file save.
- Common issues (spacing, unused variables, import ordering, etc.) are corrected instantly.
- You get immediate feedback in the editor without needing to run a separate command.

**VS Code Settings**

To enable auto‑fix on save, ensure you have the following in your VS Code settings:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

**Benefits**
- Cleaner code with zero manual effort
- Consistent formatting across the entire project
- Reduced noise in pull requests
- Faster development workflow

---

## 📄 Environment Variables
| Variable | Default | Description |
| --- | --- | --- |
| ``PORT`` | ``3000`` | Port for the Express server |