/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANDROID_DOWNLOAD_URL?: string;
  readonly VITE_ANDROID_DOWNLOAD_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
