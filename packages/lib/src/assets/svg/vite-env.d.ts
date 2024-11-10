/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly OPENAPI_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
