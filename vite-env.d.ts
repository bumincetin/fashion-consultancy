/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly GEMINI_API_KEY?: string;
  readonly API_KEY?: string;
  // Add more env variables as needed
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

