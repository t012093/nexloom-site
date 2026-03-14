import { useEffect, useMemo, useState } from 'react';
import {
  DESKTOP_PUBLIC_RELEASES_BASE_URL,
  DESKTOP_UPDATER_MANIFEST_URL,
} from '../constants/links';

export type UpdaterManifest = {
  version?: string;
  pub_date?: string;
  notes?: string;
  platforms?: {
    'darwin-aarch64'?: {
      url?: string;
      signature?: string;
    };
  };
};

const formatPublishedAt = (value: string): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const useDesktopReleaseManifest = () => {
  const [manifest, setManifest] = useState<UpdaterManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadManifest = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(DESKTOP_UPDATER_MANIFEST_URL, {
          headers: {
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const payload = (await response.json()) as UpdaterManifest;
        if (!cancelled) {
          setManifest(payload);
        }
      } catch (nextError) {
        if (!cancelled) {
          const message =
            nextError instanceof Error
              ? nextError.message
              : '最新リリースの取得に失敗しました。';
          setError(message || '最新リリースの取得に失敗しました。');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadManifest();

    return () => {
      cancelled = true;
    };
  }, []);

  const releaseVersion = String(manifest?.version || '').trim();
  const releaseTag = releaseVersion ? `v${releaseVersion}` : '';
  const updaterUrl = String(manifest?.platforms?.['darwin-aarch64']?.url || '').trim();
  const macDownloadUrl = releaseVersion
    ? `${DESKTOP_PUBLIC_RELEASES_BASE_URL}/${releaseTag}/assets/Nexloom_${releaseVersion}_aarch64.dmg`
    : '';
  const signatureUrl = releaseVersion
    ? `${DESKTOP_PUBLIC_RELEASES_BASE_URL}/${releaseTag}/assets/Nexloom.app.tar.gz.sig`
    : '';
  const publishedAt = useMemo(
    () => formatPublishedAt(String(manifest?.pub_date || '').trim()),
    [manifest?.pub_date],
  );
  const notes = String(manifest?.notes || '').trim();
  const noteBullets = useMemo(
    () =>
      notes
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('- '))
        .map((line) => line.replace(/^- /, ''))
        .slice(0, 3),
    [notes],
  );

  return {
    manifest,
    loading,
    error,
    releaseVersion,
    releaseTag,
    updaterUrl,
    macDownloadUrl,
    signatureUrl,
    publishedAt,
    notes,
    noteBullets,
  };
};
