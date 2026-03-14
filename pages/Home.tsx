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
  const { releaseVersion, publishedAt, macDownloadUrl, error, loading } = useDesktopReleaseManifest();

  const desktopStatus = releaseVersion
    ? `v${releaseVersion}${publishedAt ? ` / ${publishedAt}` : ''}`
    : loading
      ? '最新版を確認中'
      : '公開情報を取得できませんでした';

  return (
    <div className="overflow-hidden bg-slate-50">
      <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_top,_rgba(67,56,202,0.18),_transparent_54%),radial-gradient(circle_at_18%_22%,_rgba(56,189,248,0.12),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.98))]" />
        <div className="absolute left-[-120px] top-24 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="absolute right-[-120px] top-0 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.98fr)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
                <Sparkles size={16} />
                Web first, Desktop ready
              </div>
              <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 md:text-7xl lg:text-[5.4rem] lg:leading-[0.98]">
                会話と実行を、
                <br />
                一つのワークスペースへ。
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Nexloom は、チャット、ドキュメント、AI 議事録、タスクを分断せずに扱うチーム向け workspace です。
                まずは Web で始め、通知や常用導線が必要なタイミングで Desktop を追加できます。
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
                    導入ガイドを見る
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="space-y-5"
            >
              <div className="rounded-[2.5rem] border border-slate-200 bg-white/92 p-7 shadow-[0_34px_90px_-48px_rgba(15,23,42,0.4)] backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Launch Modes</div>
                    <div className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                      チームの入り方を一本化
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#312e81_58%,#4338ca_100%)] p-4 text-white shadow-[0_22px_48px_-26px_rgba(67,56,202,0.7)]">
                    <Layout size={24} />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <a
                    href={WEB_APP_URL}
                    className="block rounded-[1.6rem] border border-slate-200 bg-slate-50 px-5 py-5 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-slate-950 p-3 text-white">
                          <Globe size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-950">Web</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">
                            招待リンクからそのまま入り、最初の運用を最短で始めます。
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-indigo-700">Primary</div>
                    </div>
                  </a>

                  <Link
                    to={DESKTOP_RELEASE_NOTES_PATH}
                    className="block rounded-[1.6rem] border border-indigo-200 bg-[linear-gradient(145deg,#eef2ff_0%,#ffffff_100%)] px-5 py-5 shadow-[0_24px_60px_-42px_rgba(67,56,202,0.32)] transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-indigo-600 p-3 text-white shadow-[0_16px_34px_-18px_rgba(79,70,229,0.75)]">
                          <Download size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-950">Desktop</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">
                            通知、ショートカット、起動時アップデート確認を OS 側の導線に寄せます。
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-indigo-700 ring-1 ring-indigo-100">
                        {releaseVersion ? `v${releaseVersion}` : 'Public'}
                      </div>
                    </div>
                    <div className="mt-4 text-sm font-semibold text-slate-500">{desktopStatus}</div>
                  </Link>

                  <Link
                    to="/mobile"
                    className="block rounded-[1.6rem] border border-slate-200 bg-slate-50 px-5 py-5 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-slate-900 p-3 text-white">
                          <Smartphone size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-950">Mobile</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">
                            iOS を先行導線にして、外出先での確認と返信を引き継ぎます。
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-500">Beta</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(145deg,#0f172a_0%,#1e1b4b_56%,#4338ca_100%)] p-6 text-white shadow-[0_30px_80px_-44px_rgba(15,23,42,0.68)]">
                <div className="text-xs font-black uppercase tracking-[0.22em] text-indigo-200">Current Desktop</div>
                <div className="mt-3 text-3xl font-black tracking-tight">
                  {releaseVersion ? `v${releaseVersion}` : loading ? 'loading…' : 'unavailable'}
                </div>
                <div className="mt-2 text-sm text-indigo-100/80">
                  {publishedAt ? `公開: ${publishedAt}` : error ? 'manifest を取得できませんでした。' : '公開日を確認しています。'}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="h-12 w-full rounded-2xl border-white bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
                    >
                      Desktop 最新版
                    </Button>
                  </Link>
                  {macDownloadUrl ? (
                    <a href={macDownloadUrl} className="w-full sm:w-auto">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                      >
                        macOS 版を取得
                      </Button>
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="entry-points" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Adoption Flow</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              導入の流れを、最初から迷わせない。
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              同じ workspace を起点にして、Web から始め、Desktop や Mobile を必要なタイミングで足していく設計です。
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Web で入る',
                body: 'URL だけでサインインし、最初の会話やページ作成を始めます。',
              },
              {
                step: '02',
                title: 'チームを揃える',
                body: '同じ workspace にメンバーを招待し、会話と記録の場所を合わせます。',
              },
              {
                step: '03',
                title: 'Desktop を追加',
                body: '通知や日常導線が必要な人だけ、最新版ページから Desktop を導入します。',
              },
              {
                step: '04',
                title: '運用を深くする',
                body: '会議、タスク、外部連携を足しながら、同じ文脈で運用密度を上げていきます。',
              },
            ].map((card) => (
              <div
                key={card.step}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.24)]"
              >
                <div className="text-xs font-black uppercase tracking-[0.24em] text-indigo-600">{card.step}</div>
                <div className="mt-5 text-2xl font-black tracking-tight text-slate-950">{card.title}</div>
                <div className="mt-4 text-base leading-7 text-slate-600">{card.body}</div>
              </div>
            ))}
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
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2.6rem] border border-slate-200 bg-[linear-gradient(145deg,#0f172a_0%,#1e1b4b_56%,#312e81_100%)] p-8 text-white shadow-[0_36px_90px_-46px_rgba(15,23,42,0.72)] md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">When Desktop Fits</div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                毎日開く人には、
                <br />
                Desktop が効きます。
              </h2>
              <div className="mt-8 grid gap-3">
                {[
                  '通知をブラウザタブではなく OS の導線で受け取りたい',
                  '起動時に最新版を案内し、そのまま更新まで進めたい',
                  'Web と同じ workspace を、常用クライアントとして持ちたい',
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
                    className="h-14 w-full rounded-2xl border-white bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
                    icon={<Download size={18} />}
                  >
                    導入ガイドを見る
                  </Button>
                </Link>
                <Link to={DESKTOP_RELEASE_NOTES_PATH} className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                    icon={<ArrowRight size={18} />}
                  >
                    Desktop 最新版
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[2.6rem] border border-slate-200 bg-slate-50 p-8 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.28)] md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Connected Stack</div>
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
                  { icon: HardDrive, label: 'Google Drive', body: 'ドキュメント導線をそのまま接続' },
                  { icon: Github, label: 'GitHub', body: '開発の流れと会話を同じ文脈に置く' },
                  { icon: Slack, label: 'Slack', body: '既存のチーム連絡と移行計画を両立' },
                ].map((integration) => (
                  <div key={integration.label} className="rounded-2xl border border-slate-200 bg-white px-5 py-5">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-slate-950 p-3 text-white">
                        <integration.icon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900">{integration.label}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-500">{integration.body}</div>
                      </div>
                    </div>
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
                まずは Web で始めて、
                <br />
                必要な surface だけ足す。
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100/88">
                最初の入口は軽く、運用はあとから深く。Nexloom はその順序を崩さないように設計しています。
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
                    導入ガイドを見る
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
