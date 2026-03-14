import React from 'react';
import { motion } from 'framer-motion';
import {
  Apple,
  ArrowRight,
  Download,
  FileCode2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import {
  DESKTOP_PUBLIC_RELEASES_BASE_URL,
  DESKTOP_UPDATER_MANIFEST_URL,
  WEB_APP_URL,
} from '../constants/links';
import { useDesktopReleaseManifest } from '../hooks/useDesktopReleaseManifest';

const DesktopReleaseNotesPage: React.FC = () => {
  const {
    loading,
    error,
    releaseVersion,
    releaseTag,
    macDownloadUrl,
    updaterUrl,
    signatureUrl,
    publishedAt,
    notes,
  } = useDesktopReleaseManifest();

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 pt-32 pb-24 relative">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_58%),radial-gradient(circle_at_20%_20%,_rgba(14,165,233,0.12),_transparent_32%)]" />
      <div className="absolute right-[-120px] top-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="absolute left-[-120px] bottom-24 h-80 w-80 rounded-full bg-indigo-200/35 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm">
            <Sparkles size={14} />
            Nexloom.site Official
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
            <div>
              <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
                デスクトップ版の<br />公開ページ
              </h1>
              <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">official public page</span>
                <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">auto-update ready</span>
                <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">manual install available</span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-7 shadow-[0_30px_70px_-24px_rgba(15,23,42,0.28)] backdrop-blur">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Latest</div>
              <div className="mt-3 text-4xl font-black text-slate-950">
                {releaseVersion ? `v${releaseVersion}` : loading ? 'loading…' : 'unavailable'}
              </div>
              <div className="mt-2 text-sm text-slate-500">
                {publishedAt ? `公開: ${publishedAt}` : loading ? '最新版を確認しています。' : '公開情報を読み込めませんでした。'}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={macDownloadUrl || undefined}
                  className={macDownloadUrl ? '' : 'pointer-events-none'}
                  aria-disabled={!macDownloadUrl}
                >
                  <Button
                    size="lg"
                    className="h-14 w-full rounded-2xl"
                    icon={<Download size={18} />}
                    disabled={!macDownloadUrl}
                  >
                    macOS 版をダウンロード
                  </Button>
                </a>
                <a
                  href={updaterUrl || undefined}
                  className={updaterUrl ? '' : 'pointer-events-none'}
                  aria-disabled={!updaterUrl}
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-14 w-full rounded-2xl"
                    icon={<RefreshCw size={18} />}
                    disabled={!updaterUrl}
                  >
                    updater package を取得
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-30px_rgba(15,23,42,0.35)] md:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Update Summary</div>
                <h2 className="mt-2 text-2xl font-black text-slate-950">今回の更新</h2>
              </div>
              {releaseVersion ? (
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  Desktop {releaseVersion}
                </div>
              ) : null}
            </div>

            {loading ? (
              <div className="mt-8 space-y-3">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-[92%] animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-[80%] animate-pulse rounded bg-slate-100" />
              </div>
            ) : error ? (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                最新の公開情報を読み込めませんでした。時間をおいて再度お試しください。
                <div className="mt-2 font-medium text-red-600">{error}</div>
              </div>
            ) : (
              <div className="mt-8 whitespace-pre-wrap rounded-[1.75rem] bg-slate-950 px-6 py-6 text-sm leading-7 text-slate-100 shadow-inner">
                {notes || '今回の更新情報はまだ登録されていません。'}
              </div>
            )}
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_-34px_rgba(15,23,42,0.4)]">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
                <Apple size={20} className="text-slate-700" />
                公開配布物
              </h3>
              <div className="mt-6 space-y-4">
                <a href={macDownloadUrl || undefined} className={macDownloadUrl ? 'block' : 'pointer-events-none block'} aria-disabled={!macDownloadUrl}>
                  <div className="rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/50">
                    <div className="text-sm font-semibold text-slate-900">macOS Apple Silicon</div>
                    <div className="mt-1 text-sm text-slate-500">`.dmg` でそのままインストール</div>
                  </div>
                </a>
                <a href={updaterUrl || undefined} className={updaterUrl ? 'block' : 'pointer-events-none block'} aria-disabled={!updaterUrl}>
                  <div className="rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/50">
                    <div className="text-sm font-semibold text-slate-900">Updater Package</div>
                    <div className="mt-1 text-sm text-slate-500">アプリ内自動更新用の `.tar.gz`</div>
                  </div>
                </a>
                <a href={signatureUrl || undefined} className={signatureUrl ? 'block' : 'pointer-events-none block'} aria-disabled={!signatureUrl}>
                  <div className="rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/50">
                    <div className="text-sm font-semibold text-slate-900">Signature</div>
                    <div className="mt-1 text-sm text-slate-500">updater 署名ファイル `.sig`</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-indigo-50 p-7 shadow-[0_24px_80px_-34px_rgba(14,116,144,0.45)]">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
                <ShieldCheck size={20} className="text-cyan-700" />
                アップデートの流れ
              </h3>
              <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                <li>1. 既存のデスクトップアプリを起動すると最新バージョンを確認します。</li>
                <li>2. 更新ダイアログで内容を確認し、許可するとダウンロードが始まります。</li>
                <li>3. 適用後は自動で再起動し、新しい版で起動します。</li>
              </ol>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/download">
                  <Button variant="secondary" size="lg" className="h-12 w-full rounded-2xl">
                    デスクトップ版の案内へ
                  </Button>
                </Link>
                <a href={WEB_APP_URL}>
                  <Button variant="ghost" size="lg" className="h-12 w-full rounded-2xl">
                    Web アプリを開く
                  </Button>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_-34px_rgba(15,23,42,0.4)]">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
                <FileCode2 size={20} className="text-slate-700" />
                配信 API
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                この公開ページ自体が updater manifest を読んでいるため、GitHub が private のままでも
                Nexloom.site を正本の配布ページとして維持できます。
              </p>
              <a
                href={DESKTOP_UPDATER_MANIFEST_URL}
                className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-700 hover:text-cyan-800"
              >
                `latest.json` を開く
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default DesktopReleaseNotesPage;
