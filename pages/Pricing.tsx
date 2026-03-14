import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Crown, Download, ShieldCheck, Sparkles, Users, Zap } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { WEB_APP_URL } from '../constants/links';

const plans = [
  {
    name: 'Free',
    price: '¥0',
    period: '/月',
    description: '個人利用や小さなチームの立ち上がりに向いた入口プラン。',
    accent: 'from-slate-100 via-white to-slate-50',
    icon: Sparkles,
    features: [
      '基本チャットとページ作成',
      'タスク運用の基本機能',
      'AI 要約のライト利用',
      'Web からすぐ利用開始',
    ],
    note: '最初の検証や個人利用に向いています。',
    cta: '無料で始める',
    ctaLink: WEB_APP_URL,
    recommended: false,
  },
  {
    name: 'Pro',
    price: '¥1,200',
    period: '/ユーザー/月',
    description: '会議、連携、チーム運用を日常的に回す標準プラン。',
    accent: 'from-indigo-950 via-indigo-800 to-indigo-600',
    icon: Zap,
    features: [
      '無制限の AI 会議録音と要約',
      'チームチャンネルとスレッド',
      'GitHub / Slack 連携',
      '優先サポート',
    ],
    note: '日々の業務導線をまとめるならここが基準です。',
    cta: 'Pro を試す',
    ctaLink: WEB_APP_URL,
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact',
    period: '',
    description: '権限、監査、運用統制を前提にした大規模組織向け。',
    accent: 'from-slate-900 via-slate-800 to-slate-700',
    icon: Crown,
    features: [
      'SAML SSO / SCIM',
      '監査ログと権限管理',
      '専任サポートと導入支援',
      '運用条件に応じた提供形態',
    ],
    note: '導入要件と運用フローを合わせて設計します。',
    cta: '相談する',
    ctaLink: '/docs',
    recommended: false,
  },
];

const PricingPage: React.FC = () => {
  const upgradeSignals = [
    {
      title: 'Free から Pro へ',
      body: '会議の記録、AI 要約、チーム内の会話が日常業務の中心になってきたら、Pro が基準です。',
    },
    {
      title: 'Pro のまま伸ばす',
      body: 'Desktop や Mobile は、必要なメンバーにだけ足しながら、同じ workspace のまま運用できます。',
    },
    {
      title: 'Enterprise を検討する時',
      body: '権限統制、監査、組織横断運用を要件として持ち始めた時点が切り替えの目安です。',
    },
  ];

  const faqItems = [
    'どこから始めるべきか: まずは Web から入り、チームの会話と記録の置き場を一つにします。',
    'Desktop はいつ追加するか: 通知やショートカットを日常導線に入れたいメンバーから順に追加します。',
    'Enterprise の相談先: セキュリティ要件や運用条件を含めて個別に整理します。',
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,_rgba(67,56,202,0.16),_transparent_56%),radial-gradient(circle_at_24%_16%,_rgba(56,189,248,0.12),_transparent_24%)]" />
      <div className="absolute right-[-120px] top-16 h-80 w-80 rounded-full bg-indigo-200/35 blur-3xl" />
      <div className="absolute left-[-120px] top-80 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/90 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
              <Users size={16} />
              Pricing And Rollout
            </div>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
              チームの密度に合わせて、
              <br />
              運用を広げる。
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
              Nexloom は、Web から導入し、会議、AI、Desktop、ガバナンスを必要な順序で足していく設計です。
              料金もその運用段階に合わせて選びやすくしています。
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

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Start</div>
                <div className="mt-3 text-xl font-black text-slate-950">Web First</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">導入の正規入口は Web です。最初の運用を URL だけで始められます。</div>
              </div>
              <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Standard</div>
                <div className="mt-3 text-xl font-black text-slate-950">Pro</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">会議、AI、連携を日常的に回すチームの基準プランです。</div>
              </div>
              <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Governance</div>
                <div className="mt-3 text-xl font-black text-slate-950">Enterprise</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">監査、権限、組織運用が必要になったら上位構成へ拡張します。</div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-[linear-gradient(150deg,#0f172a_0%,#1e1b4b_55%,#4338ca_100%)] p-8 text-white shadow-[0_40px_90px_-46px_rgba(15,23,42,0.72)]">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Rollout Principle</div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              入口は軽く、
              <br />
              運用は段階的に深く。
            </h2>
            <div className="mt-6 space-y-4">
              {[
                '最初は Web で workspace を揃える',
                '会議や連携が日常化したら Pro を基準にする',
                '統制や監査が必要になった時点で Enterprise を検討する',
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/10 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">Workspace Surfaces</div>
              <div className="mt-4 space-y-3">
                {[
                  { label: 'Web', body: '最初の導入と日常利用の基準入口。' },
                  { label: 'Desktop', body: '通知やショートカットを重視する人向けの導線。' },
                  { label: 'Mobile', body: '外出先での確認と返信を補完する導線。' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <div className="text-sm font-black text-white">{item.label}</div>
                    <div className="mt-1 text-sm leading-6 text-indigo-100/80">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index }}
              className={`relative overflow-hidden rounded-[2.4rem] border p-8 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.28)] ${
                plan.recommended
                  ? 'border-indigo-300 bg-[linear-gradient(155deg,#0f172a_0%,#312e81_55%,#4338ca_100%)] text-white'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${plan.accent} ${
                  plan.recommended ? 'opacity-25' : 'opacity-100'
                }`}
              />
              {plan.recommended ? (
                <div className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
                  Standard
                </div>
              ) : null}

              <div className="relative z-10">
                <div className={`inline-flex rounded-2xl p-4 ${plan.recommended ? 'bg-white/10 text-white' : 'bg-slate-950 text-white'}`}>
                  <plan.icon size={22} />
                </div>
                <div className="mt-6 text-xl font-black">{plan.name}</div>
                <div className="mt-4 flex items-end gap-2">
                  <div className="text-5xl font-black tracking-tight">{plan.price}</div>
                  <div className={`pb-1 text-sm font-semibold ${plan.recommended ? 'text-indigo-100/80' : 'text-slate-500'}`}>{plan.period}</div>
                </div>
                <div className={`mt-4 text-base leading-7 ${plan.recommended ? 'text-indigo-100/88' : 'text-slate-600'}`}>
                  {plan.description}
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className={`mt-0.5 h-5 w-5 flex-shrink-0 ${plan.recommended ? 'text-cyan-300' : 'text-emerald-500'}`} />
                      <span className={`text-sm leading-6 ${plan.recommended ? 'text-white/92' : 'text-slate-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`mt-8 rounded-2xl px-4 py-4 text-sm leading-6 ${plan.recommended ? 'bg-white/10 text-indigo-100/85' : 'bg-slate-50 text-slate-600'}`}>
                  {plan.note}
                </div>

                {plan.ctaLink.startsWith('http') ? (
                  <a href={plan.ctaLink} className="mt-8 block w-full" aria-label={`${plan.name}のWeb版を開く`}>
                    <Button
                      variant={plan.recommended ? 'secondary' : 'outline'}
                      size="lg"
                      className={`h-14 w-full justify-center rounded-2xl ${plan.recommended ? 'border-white bg-white text-slate-950 hover:bg-slate-100' : ''}`}
                    >
                      {plan.cta}
                    </Button>
                  </a>
                ) : (
                  <Link to={plan.ctaLink} className="mt-8 block w-full">
                    <Button
                      variant={plan.recommended ? 'secondary' : 'outline'}
                      size="lg"
                      className={`h-14 w-full justify-center rounded-2xl ${plan.recommended ? 'border-white bg-white text-slate-950 hover:bg-slate-100' : ''}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.4rem] border border-slate-200 bg-white p-8 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.28)]">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Upgrade Signals</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
              プランを見直すタイミングを、
              <br />
              曖昧にしない。
            </h2>
            <div className="mt-8 space-y-4">
              {upgradeSignals.map((signal) => (
                <div key={signal.title} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
                  <div className="text-sm font-black text-slate-950">{signal.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{signal.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#eef2ff_100%)] p-8 shadow-[0_28px_70px_-44px_rgba(67,56,202,0.28)]">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">FAQ</div>
            <div className="mt-6 space-y-4">
              {faqItems.map((item) => (
                <div key={item} className="rounded-2xl border border-white bg-white/90 p-5 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a href={WEB_APP_URL}>
                <Button size="lg" className="h-14 w-full justify-center rounded-2xl" icon={<ArrowRight size={18} />}>
                  Webアプリを開く
                </Button>
              </a>
              <Link to="/docs">
                <Button variant="secondary" size="lg" className="h-14 w-full justify-center rounded-2xl" icon={<ShieldCheck size={18} />}>
                  導入ドキュメントを見る
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;
