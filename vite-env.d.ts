/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IOS_DOWNLOAD_URL?: string;
  readonly VITE_IOS_DOWNLOAD_LABEL?: string;
  readonly VITE_ANDROID_DOWNLOAD_URL?: string;
  readonly VITE_ANDROID_DOWNLOAD_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
