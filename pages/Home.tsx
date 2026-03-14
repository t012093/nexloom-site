import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Download,
  Github,
  Globe,
  HardDrive,
  Layout,
  ShieldCheck,
  Slack,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';
import Button from '../components/Button';
import { FeatureItem } from '../types';
import { DESKTOP_RELEASE_NOTES_PATH, WEB_APP_URL } from '../constants/links';
import { useDesktopReleaseManifest } from '../hooks/useDesktopReleaseManifest';

const features: FeatureItem[] = [
  {
    title: 'Unified Workspace',
    description: '会話、ページ、タスク、会議メモを一つの画面文脈でつなげます。',
    icon: Layout,
    colSpan: 2,
  },
  {
    title: 'AI Meeting Capture',
    description: '会議の記録から要約、次アクションまでを AI が前に進めます。',
    icon: Bot,
    colSpan: 1,
  },
  {
    title: 'Real-time Sync',
    description: 'Web と Desktop をまたいでも、同じワークスペース状態を保ちます。',
    icon: Zap,
    colSpan: 1,
  },
  {
    title: 'Secure By Default',
    description: '組織単位の運用を前提に、記録と権限の境界を崩しません。',
    icon: ShieldCheck,
    colSpan: 2,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const HomePage: React.FC = () => {
  const {
    loading,
    error,
    releaseVersion,
    publishedAt,
    macDownloadUrl,
    noteBullets,
  } = useDesktopReleaseManifest();

  const desktopHighlights = noteBullets.length
    ? noteBullets
    : [
        '起動時にアップデート確認ダイアログを表示',
        '承認後に自動ダウンロードと再起動を実行',
        'production API を使う desktop build に統一',
      ];
  const desktopStatus = releaseVersion
    ? `最新公開 v${releaseVersion}`
    : loading
      ? '最新公開を確認中'
      : '公開情報を取得できませんでした';
  const desktopPublished = publishedAt
    ? `公開: ${publishedAt}`
    : error
      ? 'manifest を読み込めませんでした'
      : '公開日を確認しています';

  return (
    <div className="overflow-hidden bg-slate-50">
      <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_top,_rgba(67,56,202,0.18),_transparent_54%),radial-gradient(circle_at_18%_22%,_rgba(56,189,248,0.12),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.98))]" />
        <div className="absolute left-[-120px] top-24 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="absolute right-[-120px] top-0 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
                <Sparkles size={16} />
                Web からすぐ開始、Desktop は公開導線で導入
              </div>
              <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 md:text-7xl lg:text-[5.5rem] lg:leading-[0.98]">
                会話と実行を、
                <br />
                一つのワークスペースへ。
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Nexloom は、チャット、ドキュメント、AI 議事録、タスクを分断せずに扱うチーム向け workspace です。
                まずは Web で入り、通知や常用導線が必要な人はそのまま Desktop へ移れます。
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                  <Button
                    size="lg"
                    className="h-16 w-full rounded-2xl px-10 text-lg shadow-[0_24px_45px_-24px_rgba(79,70,229,0.75)] sm:w-auto"
                    icon={<ArrowRight size={18} />}
                  >
                    Webアプリを開く
                  </Button>
                </a>
                <Link to="/download" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-16 w-full rounded-2xl border-2 border-slate-200 bg-white/80 px-10 text-lg sm:w-auto"
                    icon={<Download size={18} />}
                  >
                    Desktop 導入を見る
                  </Button>
                </Link>
                <Link to={DESKTOP_RELEASE_NOTES_PATH} className="inline-flex items-center text-sm font-bold text-indigo-700 transition-colors hover:text-indigo-800">
                  公開リリースノート
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Start</div>
                  <div className="mt-3 text-xl font-black text-slate-950">Web First</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">インストール不要。URL だけで workspace に入れます。</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Desktop</div>
                  <div className="mt-3 text-xl font-black text-slate-950">{releaseVersion ? `v${releaseVersion}` : 'Release Ready'}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">通知、ショートカット、起動時アップデート確認まで含めて提供します。</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Mobile</div>
                  <div className="mt-3 text-xl font-black text-slate-950">Beta Track</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">iOS 先行、Android は preview 段階で横展開しています。</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="space-y-6"
            >
              <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(145deg,#0f172a_0%,#1e1b4b_56%,#4338ca_100%)] p-7 text-white shadow-[0_40px_90px_-42px_rgba(15,23,42,0.72)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Desktop Release</div>
                    <div className="mt-3 text-4xl font-black tracking-tight">
                      {releaseVersion ? `v${releaseVersion}` : loading ? 'loading…' : 'latest'}
                    </div>
                    <div className="mt-2 text-sm text-indigo-100/80">{desktopStatus}</div>
                    <div className="mt-1 text-sm text-indigo-100/70">{desktopPublished}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <Download size={28} />
                  </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Release Highlights</div>
                  <div className="mt-4 space-y-3">
                    {desktopHighlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-white/90">
                        <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="h-14 w-full rounded-2xl border-white bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
                      icon={<Download size={18} />}
                    >
                      公開リリースを見る
                    </Button>
                  </Link>
                  {macDownloadUrl ? (
                    <a href={macDownloadUrl} className="w-full sm:w-auto">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                        icon={<ArrowRight size={18} />}
                      >
                        macOS 版を取得
                      </Button>
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_55px_-36px_rgba(15,23,42,0.35)]">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Entry Flow</div>
                  <div className="mt-4 space-y-4">
                    {[
                      '1. まずは Web で workspace に入る',
                      '2. 公開リリースから Desktop を導入',
                      '3. 同じアカウントでサインインして継続',
                    ].map((step) => (
                      <div key={step} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_55px_-36px_rgba(15,23,42,0.35)]">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Why Desktop</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="text-sm font-black text-slate-950">通知導線</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">常駐しながらチームの更新を追えます。</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="text-sm font-black text-slate-950">起動時アップデート</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">新しい版が出れば起動時に案内します。</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4 sm:col-span-2">
                      <div className="text-sm font-black text-slate-950">同じ workspace 文脈</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">Web と Desktop で同じ workspace をそのまま扱えます。</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="entry-points" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Entry Points</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              チームの入り方を、最初から迷わせない。
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Web を正規入口にしつつ、Desktop と Mobile を役割別に並べています。導線を分けず、必要なときに拡張できます。
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr_0.95fr]">
            <a
              href={WEB_APP_URL}
              className="group rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_100%)] p-7 text-white shadow-[0_32px_80px_-46px_rgba(15,23,42,0.8)]"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <Globe size={26} />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Recommended</div>
              </div>
              <div className="mt-8 text-3xl font-black tracking-tight">Web App</div>
              <div className="mt-3 text-base leading-7 text-slate-300">
                インストール不要。チーム招待、workspace 選択、初回導入が最短です。
              </div>
              <div className="mt-8 flex items-center text-sm font-bold text-cyan-200 transition-transform group-hover:translate-x-1">
                今すぐ開始
                <ArrowRight size={16} className="ml-1" />
              </div>
            </a>

            <Link
              to="/download"
              className="group rounded-[2.25rem] border border-indigo-100 bg-[linear-gradient(180deg,#eef2ff_0%,#ffffff_100%)] p-7 shadow-[0_26px_70px_-42px_rgba(67,56,202,0.42)]"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-indigo-600 p-4 text-white shadow-[0_22px_45px_-24px_rgba(79,70,229,0.75)]">
                  <Download size={26} />
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700 ring-1 ring-indigo-100">
                  {releaseVersion ? `v${releaseVersion}` : 'Desktop'}
                </div>
              </div>
              <div className="mt-8 text-3xl font-black tracking-tight text-slate-950">Desktop</div>
              <div className="mt-3 text-base leading-7 text-slate-600">
                通知と日常導線を OS 側に寄せたいチーム向け。公開リリースからそのまま導入できます。
              </div>
              <div className="mt-6 text-sm font-semibold text-slate-500">{desktopPublished}</div>
              <div className="mt-8 flex items-center text-sm font-bold text-indigo-700 transition-transform group-hover:translate-x-1">
                導入ステップを見る
                <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>

            <Link
              to="/mobile"
              className="group rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-7 shadow-[0_26px_70px_-46px_rgba(15,23,42,0.24)]"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-slate-950 p-4 text-white">
                  <Smartphone size={26} />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Beta Track</div>
              </div>
              <div className="mt-8 text-3xl font-black tracking-tight text-slate-950">Mobile</div>
              <div className="mt-3 text-base leading-7 text-slate-600">
                出先で会話と確認を引き継ぐための導線です。iOS 先行、Android は preview 段階です。
              </div>
              <div className="mt-8 flex items-center text-sm font-bold text-slate-700 transition-transform group-hover:translate-x-1">
                現在の提供状況を見る
                <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Core Capabilities</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              会話、知識、次アクションを分断しない。
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Nexloom は単なるメモアプリではなく、会議から実行までの流れを一つの workspace にまとめます。
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className={`group relative overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white p-8 shadow-[0_26px_65px_-46px_rgba(15,23,42,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_34px_85px_-44px_rgba(15,23,42,0.35)] ${
                  feature.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center justify-center rounded-2xl bg-slate-950 p-4 text-white shadow-[0_20px_45px_-25px_rgba(15,23,42,0.75)]">
                      <feature.icon size={26} />
                    </div>
                    <h3 className="mt-7 text-2xl font-black text-slate-950">{feature.title}</h3>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{feature.description}</p>
                  </div>
                  <div className="mt-10 flex items-center text-sm font-bold text-indigo-700 transition-transform group-hover:translate-x-1">
                    workspace の流れを見る
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
                <div className="absolute -bottom-14 -right-12 text-slate-100 transition-colors group-hover:text-slate-200">
                  <feature.icon size={220} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2.75rem] border border-slate-200 bg-[linear-gradient(145deg,#0f172a_0%,#1e1b4b_58%,#312e81_100%)] p-8 text-white shadow-[0_36px_90px_-46px_rgba(15,23,42,0.72)] md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Desktop Path</div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Desktop までの導線を、
                <br />
                迷わず一本に。
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                公開リリースページを hub にして、最新版確認、ダウンロード、更新方式の理解までを一続きで見せます。
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  '最新版の公開情報を Nexloom サイト上で表示',
                  'DMG と updater package を同じページで案内',
                  '起動時アップデート確認の流れまで説明',
                ].map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/download" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-14 w-full rounded-2xl bg-white text-slate-950 border-white sm:w-auto"
                    icon={<Download size={18} />}
                  >
                    Desktop 導入ページへ
                  </Button>
                </Link>
                <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                    icon={<ArrowRight size={18} />}
                  >
                    公開リリースノート
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-slate-200 bg-slate-50 p-8 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.28)] md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Integrations</div>
              <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                既存のフローを壊さずに、
                <br />
                Nexloom へ集約。
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                すでに使っているツールと連携しながら、会話と知識と実行を一か所に寄せます。
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  { icon: HardDrive, label: 'Google Drive' },
                  { icon: Github, label: 'GitHub' },
                  { icon: Slack, label: 'Slack' },
                ].map((integration) => (
                  <div key={integration.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="rounded-xl bg-slate-950 p-3 text-white">
                      <integration.icon size={18} />
                    </div>
                    <div className="text-sm font-black text-slate-900">{integration.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(140deg,#312e81_0%,#4338ca_45%,#0f172a_100%)] px-8 py-12 text-center shadow-[0_36px_90px_-44px_rgba(67,56,202,0.62)] md:px-14 md:py-16">
            <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-300/20 blur-3xl" />
            <div className="relative z-10">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-100">Start Here</div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
                Web で始めて、
                <br />
                必要なら Desktop へ。
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100/88">
                最初の入口は常にシンプルに保ちつつ、通知や常用導線が必要になった時点で Desktop を追加できます。
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-16 w-full rounded-2xl border-white bg-white px-12 text-lg text-indigo-700 hover:bg-indigo-50 sm:w-auto"
                    icon={<Globe size={18} />}
                  >
                    Webアプリを開く
                  </Button>
                </a>
                <Link to="/download" className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-16 w-full rounded-2xl border border-white/35 bg-white/10 px-10 text-lg text-white hover:bg-white/15 sm:w-auto"
                    icon={<Download size={18} />}
                  >
                    Desktop 導入を見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
