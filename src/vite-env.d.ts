/// <reference types="vite/client" />

// Define your custom environment variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // add other env variables you use here
}

// Augment the ImportMeta interface
// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
