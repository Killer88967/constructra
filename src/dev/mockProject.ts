import type { FileEntry } from "../types/filesystem";

export const MOCK_PROJECT_PATH = "/mock/constructra-demo";

export const mockDirectories: Record<string, FileEntry[]> = {
  "/mock/constructra-demo": [
    {
      name: ".constructra",
      path: "/mock/constructra-demo/.constructra",
      isDirectory: true,
    },
    {
      name: "public",
      path: "/mock/constructra-demo/public",
      isDirectory: true,
    },
    {
      name: "src",
      path: "/mock/constructra-demo/src",
      isDirectory: true,
    },
    {
      name: ".gitignore",
      path: "/mock/constructra-demo/.gitignore",
      isDirectory: false,
    },
    {
      name: "package.json",
      path: "/mock/constructra-demo/package.json",
      isDirectory: false,
    },
    {
      name: "README.md",
      path: "/mock/constructra-demo/README.md",
      isDirectory: false,
    },
    {
      name: "tsconfig.json",
      path: "/mock/constructra-demo/tsconfig.json",
      isDirectory: false,
    },
  ],

  "/mock/constructra-demo/public": [
    {
      name: "favicon.svg",
      path: "/mock/constructra-demo/public/favicon.svg",
      isDirectory: false,
    },
  ],

  "/mock/constructra-demo/src": [
    {
      name: "components",
      path: "/mock/constructra-demo/src/components",
      isDirectory: true,
    },
    {
      name: "utils",
      path: "/mock/constructra-demo/src/utils",
      isDirectory: true,
    },
    {
      name: "App.css",
      path: "/mock/constructra-demo/src/App.css",
      isDirectory: false,
    },
    {
      name: "App.tsx",
      path: "/mock/constructra-demo/src/App.tsx",
      isDirectory: false,
    },
    {
      name: "main.tsx",
      path: "/mock/constructra-demo/src/main.tsx",
      isDirectory: false,
    },
  ],

  "/mock/constructra-demo/src/components": [
    {
      name: "Button.tsx",
      path: "/mock/constructra-demo/src/components/Button.tsx",
      isDirectory: false,
    },
    {
      name: "Header.tsx",
      path: "/mock/constructra-demo/src/components/Header.tsx",
      isDirectory: false,
    },
  ],

  "/mock/constructra-demo/src/utils": [
    {
      name: "format.ts",
      path: "/mock/constructra-demo/src/utils/format.ts",
      isDirectory: false,
    },
  ],

  "/mock/constructra-demo/.constructra": [
    {
      name: "settings.json",
      path: "/mock/constructra-demo/.constructra/settings.json",
      isDirectory: false,
    },
  ],
};

export const mockFiles: Record<string, string> = {
  "/mock/constructra-demo/package.json": `{
  "name": "constructra-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,

  "/mock/constructra-demo/README.md": `# Constructra Demo

This is a mock project used for testing Constructra in browser development mode.

## Features

- Fake filesystem
- Nested folders
- Monaco testing
- Explorer testing
`,

  "/mock/constructra-demo/.gitignore": `node_modules
dist
.env
`,

  "/mock/constructra-demo/tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "jsx": "react-jsx"
  }
}`,

  "/mock/constructra-demo/src/App.tsx": `import Header from "./components/Header";
import Button from "./components/Button";

function App() {
  return (
    <main>
      <Header title="Constructra Demo" />

      <p>
        This project is running entirely from Constructra's mock filesystem.
      </p>

      <Button>Build something</Button>
    </main>
  );
}

export default App;
`,

  "/mock/constructra-demo/src/main.tsx": `import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./App.css";

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,

  "/mock/constructra-demo/src/App.css": `:root {
  font-family: system-ui, sans-serif;
  background: #111214;
  color: white;
}

body {
  margin: 0;
}
`,

  "/mock/constructra-demo/src/components/Header.tsx": `interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
`,

  "/mock/constructra-demo/src/components/Button.tsx": `import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

function Button({ children }: ButtonProps) {
  return (
    <button type="button">
      {children}
    </button>
  );
}

export default Button;
`,

  "/mock/constructra-demo/src/utils/format.ts": `export function capitalize(value: string) {
  if (value.length === 0) {
    return value;
  }

  return value[0].toUpperCase() + value.slice(1);
}
`,

  "/mock/constructra-demo/public/favicon.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" />
</svg>`,

  "/mock/constructra-demo/.constructra/settings.json": `{
  "$schema": "constructra://schemas/settings",

  "editor": {
    "fontSize": 14,
    "tabSize": 4,
    "wordWrap": "off",
    "minimap": {
      "enabled": true
    }
  }
}`,
};
