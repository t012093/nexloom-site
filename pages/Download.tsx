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
      isAvailable: true,
      availabilityLabel: '公開中',
    },
    {
      os: OSType.WINDOWS,
      label: 'Windows',
      sublabel: '10 / 11 (64-bit)',
      icon: Monitor,
      isAvailable: false,
      availabilityLabel: '準備中',
    },
    {
      os: OSType.MAC_INTEL,
      label: 'macOS',
      sublabel: 'Intel Processor',
      icon: Laptop,
      isAvailable: false,
      availabilityLabel: '準備中',
    },
    {
      os: OSType.LINUX,
      label: 'Linux',
      sublabel: '.AppImage / .deb',
      icon: Globe,
      isAvailable: false,
      availabilityLabel: '準備中',
    },
  ];

  const currentOption =
    downloadOptions.find((option) => option.os === os) ||
    downloadOptions.find((option) => option.isAvailable) ||
    null;
  const recommendedOption =
    downloadOptions.find((option) => option.os === os && option.isAvailable) ||
    downloadOptions.find((option) => option.isAvailable) ||
    null;
  const needsCompatibilityNotice =
    currentOption !== null &&
    recommendedOption !== null &&
    currentOption.os !== OSType.UNKNOWN &&
    currentOption.os !== recommendedOption.os;
  const desktopHighlights = noteBullets.length
    ? noteBullets.slice(0, 3)
    : [
        '起動時に新しい版を確認して案内',
        '承認後は自動ダウンロードと再起動',
        '同じ workspace のまま Web と Desktop を行き来',
      ];

  const installSteps = [
    {
      step: '01',
      title: 'まず Web で workspace に入る',
      body: '招待リンクかサインインで workspace に入り、基本の運用をそのまま始めます。',
    },
    {
      step: '02',
      title: '対応 build をインストールする',
      body: '公開中の platform だけを明示しているので、迷わずそのまま導入できます。',
    },
    {
      step: '03',
      title: '以後は起動時アップデートで追う',
      body: 'Desktop 側は新しい版を起動時に確認し、許可後は再起動まで自動で進みます。',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,_rgba(67,56,202,0.16),_transparent_56%),radial-gradient(circle_at_22%_18%,_rgba(56,189,248,0.1),_transparent_24%)]" />
      <div className="absolute right-[-110px] top-24 h-80 w-80 rounded-full bg-indigo-200/35 blur-3xl" />
      <div className="absolute left-[-120px] top-64 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/90 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
              <Sparkles size={16} />
              Installation Guide
            </div>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
              導入とセットアップを、
              <br />
              迷わせない。
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
              Nexloom は Web を正規入口にしつつ、通知や常用導線が必要な人だけ Desktop を追加できます。
              このページでは、初回導入の順序と対応 platform だけに絞って案内します。
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {macDownloadUrl ? (
                <a href={macDownloadUrl} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="h-16 w-full rounded-2xl px-10 text-lg shadow-[0_24px_45px_-24px_rgba(79,70,229,0.75)] sm:w-auto"
                    icon={<Download size={18} />}
                  >
                    推奨 build を取得
                  </Button>
                </a>
              ) : null}
              <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-16 w-full rounded-2xl border-2 border-slate-200 bg-white/80 px-10 text-lg sm:w-auto"
                  icon={<RefreshCw size={18} />}
                >
                  Desktop 最新版を見る
                </Button>
              </Link>
              <a href={WEB_APP_URL} className="inline-flex items-center text-sm font-bold text-indigo-700 transition-colors hover:text-indigo-800">
                まずは Web で始める
                <ArrowRight size={16} className="ml-1" />
              </a>
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
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Recommended Setup</div>
                <div className="mt-3 text-3xl font-black tracking-tight">
                  {recommendedOption?.label || 'Desktop'}
                </div>
                <div className="mt-2 text-sm text-indigo-100/80">
                  {recommendedOption?.sublabel || '公開中の build を確認しています'}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Download size={28} />
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Current Channel</div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950">
                  {releaseVersion ? `v${releaseVersion}` : loading ? 'loading…' : 'public'}
                </div>
                {publishedAt ? (
                  <div className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85">
                    {publishedAt}
                  </div>
                ) : null}
              </div>
              <div className="mt-5 space-y-3">
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
                最新状況は Desktop ページで確認してください。
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-[1.75rem] border border-amber-300/20 bg-amber-400/10 px-5 py-4 text-sm leading-6 text-amber-100">
                最新 build 情報の取得に失敗しました。時間をおいて再度お試しください。
              </div>
            ) : null}
          </motion.div>
        </div>

        <section className="mt-20">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Setup Steps</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              導入手順は、3 ステップで十分です。
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {installSteps.map((card) => (
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
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Which Surface Fits</div>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Web を入口にして、必要な人だけ Desktop を足す。
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
                  初回ログイン、共有リンク、メンバー招待を最短で始める入口です。
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
                  通知、ショートカット、起動時アップデート確認を日常導線に組み込みます。
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
                  Desktop 最新版
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DownloadPage;
