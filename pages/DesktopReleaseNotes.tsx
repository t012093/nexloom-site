import React from 'react';
import { motion } from 'framer-motion';
import {
  Apple,
  Download,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { WEB_APP_URL } from '../constants/links';
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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_58%),radial-gradient(circle_at_20%_20%,_rgba(14,165,233,0.12),_transparent_32%)]" />
      <div className="absolute right-[-120px] top-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="absolute left-[-120px] bottom-24 h-80 w-80 rounded-full bg-indigo-200/35 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-end"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm">
              <Sparkles size={14} />
              Desktop Channel
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
              最新版と更新内容を、
              <br />
              一か所で確認する。
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              このページでは、現在の公開 build、今回の更新内容、手動インストール用の配布物をまとめて案内します。
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">latest public build</span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">release notes</span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">manual install</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-7 shadow-[0_30px_70px_-24px_rgba(15,23,42,0.28)] backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Latest Build</div>
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
              <Link to="/download">
                <Button variant="secondary" size="lg" className="h-14 w-full rounded-2xl">
                  導入ガイドを見る
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-30px_rgba(15,23,42,0.35)] md:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Release Notes</div>
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
                配布物
              </h3>
              <div className="mt-6 space-y-4">
                <a href={macDownloadUrl || undefined} className={macDownloadUrl ? 'block' : 'pointer-events-none block'} aria-disabled={!macDownloadUrl}>
                  <div className="rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/50">
                    <div className="text-sm font-semibold text-slate-900">macOS Apple Silicon</div>
                    <div className="mt-1 text-sm text-slate-500">初回インストール用の `.dmg`</div>
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
                    <div className="mt-1 text-sm text-slate-500">updater 検証用の `.sig`</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-indigo-50 p-7 shadow-[0_24px_80px_-34px_rgba(14,116,144,0.45)]">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
                <RefreshCw size={20} className="text-cyan-700" />
                アップデートの流れ
              </h3>
              <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                <li>1. 既存の Desktop アプリを起動すると最新バージョンを確認します。</li>
                <li>2. 更新ダイアログで内容を確認し、許可するとダウンロードが始まります。</li>
                <li>3. 適用後は自動で再起動し、新しい版で起動します。</li>
              </ol>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_-34px_rgba(15,23,42,0.4)]">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
                <ShieldCheck size={20} className="text-emerald-600" />
                リリース情報
              </h3>
              <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-500">Version</span>
                  <span className="font-black text-slate-950">{releaseVersion || 'Unavailable'}</span>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-500">Tag</span>
                  <span className="font-black text-slate-950">{releaseTag || '-'}</span>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-500">Published</span>
                  <span className="font-black text-slate-950">{publishedAt || '-'}</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/download">
                  <Button variant="secondary" size="lg" className="h-12 w-full rounded-2xl">
                    初回導入の手順へ
                  </Button>
                </Link>
                <a href={WEB_APP_URL}>
                  <Button variant="ghost" size="lg" className="h-12 w-full rounded-2xl">
                    Web アプリを開く
                  </Button>
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default DesktopReleaseNotesPage;
