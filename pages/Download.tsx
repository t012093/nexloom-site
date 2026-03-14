import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Apple,
  ArrowRight,
  Download,
  Globe,
  Laptop,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { OSType } from '../types';
import { DESKTOP_RELEASE_NOTES_PATH, WEB_APP_URL } from '../constants/links';
import { useDesktopReleaseManifest } from '../hooks/useDesktopReleaseManifest';

type DownloadOption = {
  os: OSType;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  url: string;
  isAvailable: boolean;
  availabilityLabel: string;
};

const DownloadPage: React.FC = () => {
  const [os, setOs] = useState<OSType>(OSType.UNKNOWN);
  const {
    loading,
    error,
    releaseVersion,
    publishedAt,
    macDownloadUrl,
    updaterUrl,
    noteBullets,
  } = useDesktopReleaseManifest();

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Mac') !== -1) {
      setOs(OSType.MAC_SILICON);
    } else if (userAgent.indexOf('Win') !== -1) {
      setOs(OSType.WINDOWS);
    } else if (userAgent.indexOf('Linux') !== -1) {
      setOs(OSType.LINUX);
    }
  }, []);

  const downloadOptions: DownloadOption[] = [
    {
      os: OSType.MAC_SILICON,
      label: 'macOS',
      sublabel: 'Apple Silicon (M1/M2/M3)',
      icon: Apple,
      url: DESKTOP_RELEASE_NOTES_PATH,
      isAvailable: true,
      availabilityLabel: '公開中',
    },
    {
      os: OSType.WINDOWS,
      label: 'Windows',
      sublabel: '10 / 11 (64-bit)',
      icon: Monitor,
      url: DESKTOP_RELEASE_NOTES_PATH,
      isAvailable: false,
      availabilityLabel: '準備中',
    },
    {
      os: OSType.MAC_INTEL,
      label: 'macOS',
      sublabel: 'Intel Processor',
      icon: Laptop,
      url: DESKTOP_RELEASE_NOTES_PATH,
      isAvailable: false,
      availabilityLabel: '準備中',
    },
    {
      os: OSType.LINUX,
      label: 'Linux',
      sublabel: '.AppImage / .deb',
      icon: Globe,
      url: DESKTOP_RELEASE_NOTES_PATH,
      isAvailable: false,
      availabilityLabel: '準備中',
    },
  ];
  const availableDesktopOption =
    downloadOptions.find((option) => option.os === os && option.isAvailable) ||
    downloadOptions.find((option) => option.isAvailable) ||
    null;
  const needsCompatibilityNotice =
    availableDesktopOption !== null && os !== OSType.UNKNOWN && os !== availableDesktopOption.os;
  const desktopHighlights = noteBullets.length
    ? noteBullets
    : [
        '起動時に新しい版を確認して案内',
        '承認後は自動ダウンロードと再起動',
        'Nexloom.site の公開ページを hub にして配布',
      ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,_rgba(67,56,202,0.16),_transparent_56%),radial-gradient(circle_at_20%_18%,_rgba(56,189,248,0.1),_transparent_24%)]" />
      <div className="absolute right-[-110px] top-24 h-80 w-80 rounded-full bg-indigo-200/35 blur-3xl" />
      <div className="absolute left-[-120px] top-64 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/90 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
              <Sparkles size={16} />
              Desktop 導入フロー
            </div>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
              Desktop を
              <br />
              気持ちよく導入する。
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
              Nexloom は Web を正規入口にしつつ、通知や OS 常駐が必要な人向けに Desktop を公開しています。
              Nexloom.site の Desktop 公開ページを起点に、最新版確認、ダウンロード、更新方式の理解までを一続きで辿れます。
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-16 w-full rounded-2xl px-10 text-lg shadow-[0_24px_45px_-24px_rgba(79,70,229,0.75)] sm:w-auto"
                  icon={<Download size={18} />}
                >
                  Desktop 公開ページ
                </Button>
              </Link>
              {macDownloadUrl ? (
                <a href={macDownloadUrl} className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-16 w-full rounded-2xl border-2 border-slate-200 bg-white/80 px-10 text-lg sm:w-auto"
                    icon={<ArrowRight size={18} />}
                  >
                    macOS 版をダウンロード
                  </Button>
                </a>
              ) : null}
              <a href={WEB_APP_URL} className="inline-flex items-center text-sm font-bold text-indigo-700 transition-colors hover:text-indigo-800">
                まずは Web で始める
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">公開版</div>
                <div className="mt-3 text-xl font-black text-slate-950">{releaseVersion ? `v${releaseVersion}` : 'Desktop'}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{publishedAt ? `公開: ${publishedAt}` : '最新版を確認しています。'}</div>
              </div>
              <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">配布導線</div>
                <div className="mt-3 text-xl font-black text-slate-950">Site Canonical</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">GitHub private を見せず、Nexloom.site 上で導線を完結させます。</div>
              </div>
              <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">アップデート</div>
                <div className="mt-3 text-xl font-black text-slate-950">Startup Prompt</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">起動時に更新確認を出し、承認後に再起動まで進めます。</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="overflow-hidden rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(150deg,#0f172a_0%,#1e1b4b_54%,#4338ca_100%)] p-7 text-white shadow-[0_40px_90px_-46px_rgba(15,23,42,0.72)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Current Public Build</div>
                <div className="mt-3 text-4xl font-black tracking-tight">
                  {releaseVersion ? `v${releaseVersion}` : loading ? 'loading…' : 'latest'}
                </div>
                <div className="mt-2 text-sm text-indigo-100/80">
                  {publishedAt ? `公開: ${publishedAt}` : '公開日を確認しています'}
                </div>
                {error ? (
                  <div className="mt-2 text-sm text-amber-200">manifest の取得に失敗しました</div>
                ) : null}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Apple size={28} />
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Now Available</div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950">
                  {availableDesktopOption?.label || 'macOS'}
                </div>
                <div className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85">
                  {availableDesktopOption?.sublabel || 'Apple Silicon'}
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {desktopHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-white/90">
                    <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {needsCompatibilityNotice ? (
              <div className="mt-6 rounded-[1.75rem] border border-amber-300/20 bg-amber-400/10 px-5 py-4 text-sm leading-6 text-amber-100">
                現在の公開配布は Apple Silicon Mac 向けです。お使いの OS 向け build はまだ公開していないため、
                Desktop 公開ページで最新状況を確認できる形にしています。
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {macDownloadUrl ? (
                <a href={macDownloadUrl} className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-14 w-full rounded-2xl border-white bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
                    icon={<Download size={18} />}
                  >
                    macOS 版を取得
                  </Button>
                </a>
              ) : null}
              <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                  icon={<ArrowRight size={18} />}
                >
                  Desktop 公開ページ
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <section className="mt-20">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Install Flow</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              導入手順を、3ステップで。
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Desktop 公開ページを確認',
                body: '最新版の version、公開日、更新内容を確認してから導入できます。',
              },
              {
                step: '02',
                title: 'インストーラーを取得',
                body: '公開中の platform はそのままダウンロード。未公開 platform は準備中として明示します。',
              },
              {
                step: '03',
                title: '同じ workspace に入る',
                body: 'Web と同じアカウントでサインインし、以後の更新は起動時ダイアログで追えます。',
              },
            ].map((card) => (
              <div
                key={card.step}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.28)]"
              >
                <div className="text-xs font-black uppercase tracking-[0.24em] text-indigo-600">{card.step}</div>
                <div className="mt-5 text-2xl font-black tracking-tight text-slate-950">{card.title}</div>
                <div className="mt-4 text-base leading-7 text-slate-600">{card.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2.4rem] border border-slate-200 bg-white p-8 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.28)]">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              <ShieldCheck size={16} className="text-emerald-500" />
              Platform Availability
            </div>
            <div className="mt-6 space-y-3">
              {downloadOptions.map((option) => (
                <div
                  key={option.os}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${
                    option.isAvailable
                      ? 'border-emerald-200 bg-emerald-50/60'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-3 ${option.isAvailable ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600'}`}>
                      <option.icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-950">{option.label}</div>
                      <div className="text-sm text-slate-500">{option.sublabel}</div>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${
                      option.isAvailable
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {option.availabilityLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#eef2ff_100%)] p-8 shadow-[0_28px_70px_-44px_rgba(67,56,202,0.28)]">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Web And Desktop</div>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              まず Web、必要なら Desktop。
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-950 p-3 text-white">
                    <Globe size={18} />
                  </div>
                  <div className="text-sm font-black text-slate-950">Web</div>
                </div>
                <div className="mt-4 text-sm leading-6 text-slate-600">
                  チーム招待、初回ログイン、共有 URL からの流入に最適です。
                </div>
              </div>
              <div className="rounded-2xl border border-white bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-600 p-3 text-white">
                    <Zap size={18} />
                  </div>
                  <div className="text-sm font-black text-slate-950">Desktop</div>
                </div>
                <div className="mt-4 text-sm leading-6 text-slate-600">
                  通知、ショートカット、起動時更新確認を日常導線に組み込みます。
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={WEB_APP_URL} className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-14 w-full rounded-2xl border-white bg-white sm:w-auto"
                  icon={<Globe size={18} />}
                >
                  Webアプリを開く
                </Button>
              </a>
              <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-14 w-full rounded-2xl sm:w-auto"
                  icon={<RefreshCw size={18} />}
                >
                  Desktop 公開ページ
                </Button>
              </Link>
            </div>
            {updaterUrl ? (
              <div className="mt-5 text-sm text-slate-500">
                updater package も同じ公開ページから取得できます。
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DownloadPage;
