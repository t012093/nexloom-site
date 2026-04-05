export const WEB_APP_URL = 'https://ai-note-meet.vercel.app/';
export const DESKTOP_RELEASE_URL =
  'https://github.com/t012093/ai-note-meet/releases/latest';

const normalizeOptionalUrl = (value: string | undefined): string | null => {
  const normalized = String(value ?? '').trim();
  return normalized.length > 0 ? normalized : null;
};

export const ANDROID_DOWNLOAD_URL = normalizeOptionalUrl(
  import.meta.env.VITE_ANDROID_DOWNLOAD_URL
);

export const ANDROID_DOWNLOAD_LABEL =
  String(import.meta.env.VITE_ANDROID_DOWNLOAD_LABEL ?? '').trim() || 'Android preview APK';
