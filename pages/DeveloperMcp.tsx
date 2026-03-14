import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Cable,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  KeyRound,
  Layers,
  Link2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from 'lucide-react';
import Button from '../components/Button';
import { MCP_DEVELOPER_PATH, WEB_APP_URL } from '../constants/links';

const COMMON_ENDPOINTS = [
  'https://api.coral-network.com/mcp',
  'https://api.coral-network.com/.well-known/oauth-protected-resource',
  'https://api.coral-network.com/.well-known/oauth-authorization-server',
  'https://api.coral-network.com/.well-known/openid-configuration',
];

const primaryClients = [
  {
    name: 'ChatGPT',
    badge: 'Web / OAuth / Remote only',
    summary:
      'OpenAI Help の 2026-03-14 時点の案内では、custom MCP app は remote server を前提にし、local MCP server は使いません。',
    steps: [
      'ChatGPT web で developer mode を有効にする。',
      'Apps または MCP app の作成画面で server URL に https://api.coral-network.com/mcp を入れる。',
      'Authentication は OAuth を選び、client ID / secret はまず空欄で試す。',
      'ブラウザの OAuth sign-in を完了し、読み取り系ツールで接続確認する。',
    ],
    notes: [
      'write/modify を含む full MCP は Business / Enterprise / Edu での beta rollout 前提。',
      'Pro は developer mode で read/fetch を中心に案内されているため、write 系の検証前に current availability を確認する。',
      '2026-03-02 より前に作った app で Token exchange failed が出る場合は、いったん削除して作り直す。',
    ],
    sourceLabel: 'OpenAI Help',
    sourceHref:
      'https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta',
  },
  {
    name: 'Claude Code',
    badge: 'CLI / HTTP transport',
    summary:
      'Anthropic docs の current guide では remote HTTP transport が推奨で、OAuth が必要な server は追加後に /mcp から認証します。',
    command: 'claude mcp add --transport http nexloom https://api.coral-network.com/mcp',
    steps: [
      'ターミナルで remote HTTP server として Nexloom を追加する。',
      'Claude Code 内で /mcp を開き、認証状態を確認する。',
      '必要なら browser-based OAuth sign-in を完了する。',
      'claude mcp list や list_projects 相当で到達確認する。',
    ],
    notes: [
      'HTTP transport が推奨。SSE は deprecated 扱い。',
      '認証のやり直しや状態確認は /mcp が最短。',
      'team 共有が必要なら --scope project で .mcp.json 側へ寄せられる。',
    ],
    sourceLabel: 'Claude Code Docs',
    sourceHref: 'https://code.claude.com/docs/en/mcp',
  },
];

const secondaryClients = [
  {
    name: 'Claude Desktop / Claude',
    body: 'remote connector の追加画面から same URL + OAuth を使う。詳細は正本ガイドを参照。',
  },
  {
    name: 'Gemini CLI',
    body: '.gemini/settings.json に remote MCP server を追加し、必要なら /mcp auth nexloom を使う。',
  },
  {
    name: 'Codex',
    body: 'codex mcp add nexloom --url https://api.coral-network.com/mcp で remote server として追加する。',
  },
];

const sourceLinks = [
  {
    label: 'Remote MCP Client Setup Guide',
    href: 'https://github.com/t012093/ai-note-meet/blob/main/docs/guides/REMOTE_MCP_CLIENT_SETUP_GUIDE.md',
    description: 'クライアント別の正本手順。site 側はこの短縮版に寄せる。',
  },
  {
    label: 'MCP Reference',
    href: 'https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md',
    description: 'Nexloom MCP の endpoint、OAuth metadata、tool contract の正本。',
  },
  {
    label: 'OpenAI Help',
    href: 'https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta',
    description: 'ChatGPT developer mode と MCP app availability の一次情報。',
  },
  {
    label: 'Claude Code Docs',
    href: 'https://code.claude.com/docs/en/mcp',
    description: 'Claude Code の HTTP transport、/mcp、scope 管理の一次情報。',
  },
];

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.9)]">
    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-rose-400" />
      <span className="h-3 w-3 rounded-full bg-amber-300" />
      <span className="h-3 w-3 rounded-full bg-emerald-400" />
      <span className="ml-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">command</span>
    </div>
    <pre className="overflow-x-auto px-5 py-4 text-sm leading-7 text-slate-100">
      <code>{children}</code>
    </pre>
  </div>
);

const DeveloperMcpPage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_26%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#eff6ff_100%)] pt-28 pb-24">
      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[36rem] max-w-6xl rounded-full bg-sky-200/30 blur-[140px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm backdrop-blur">
                <Cable size={16} />
                <span>Remote MCP Setup</span>
                <span className="text-slate-400">ChatGPT / Claude Code</span>
              </div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
                Nexloom を、
                <br />
                <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                  MCP client からそのまま使う。
                </span>
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-600 md:text-2xl">
                このページは、Nexloom の remote MCP server を ChatGPT や Claude Code へ接続するための公開ガイドです。
                詳細仕様は正本ドキュメントへ逃がしつつ、実際に入力する URL と最短の接続手順だけをここにまとめています。
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-500">
                <span className="rounded-full border border-slate-200 bg-white/85 px-4 py-2">Streamable HTTP</span>
                <span className="rounded-full border border-slate-200 bg-white/85 px-4 py-2">OAuth</span>
                <span className="rounded-full border border-slate-200 bg-white/85 px-4 py-2">Remote server only</span>
                <span className="rounded-full border border-slate-200 bg-white/85 px-4 py-2">確認日 2026-03-14</span>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/docs" className="w-full sm:w-auto">
                  <Button size="lg" className="h-14 w-full rounded-2xl px-8 shadow-[0_24px_60px_-28px_rgba(14,165,233,0.72)]" icon={<ArrowRight size={16} />}>
                    Docs に戻る
                  </Button>
                </Link>
                <a
                  href="https://github.com/t012093/ai-note-meet/blob/main/docs/guides/REMOTE_MCP_CLIENT_SETUP_GUIDE.md"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="secondary" size="lg" className="h-14 w-full rounded-2xl px-8" icon={<ExternalLink size={16} />}>
                    正本ガイドを開く
                  </Button>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_35px_90px_-45px_rgba(15,23,42,0.35)] backdrop-blur">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Link2 size={22} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-sky-700">Connection Contract</div>
                  <div className="text-lg font-black text-slate-900">Common settings</div>
                </div>
              </div>
              <div className="space-y-3">
                {COMMON_ENDPOINTS.map((endpoint) => (
                  <div key={endpoint} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">endpoint</div>
                    <div className="mt-1 break-all font-mono text-sm text-slate-800">{endpoint}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
                client ID / secret はまず空欄で試します。固定 client が必要な特殊運用だけ、サーバー管理者の指示に従ってください。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.24em] text-sky-700">Primary Clients</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                最初に整えるなら、ChatGPT と Claude Code。
              </h2>
            </div>
            <Link to={MCP_DEVELOPER_PATH} className="hidden text-sm font-bold text-sky-700 lg:inline-flex lg:items-center lg:gap-2">
              current page
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {primaryClients.map((client) => (
              <article
                key={client.name}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-46px_rgba(15,23,42,0.4)]"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    {client.name === 'ChatGPT' ? <Sparkles size={21} /> : <TerminalSquare size={21} />}
                  </div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    {client.badge}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-950">{client.name}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{client.summary}</p>

                {'command' in client && client.command ? (
                  <div className="mt-6">
                    <CodeBlock>{client.command}</CodeBlock>
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                      /mcp
                    </div>
                  </div>
                ) : null}

                <div className="mt-7">
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Quick steps</div>
                  <ol className="space-y-3">
                    {client.steps.map((step) => (
                      <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-black text-sky-700">
                          <CheckCircle2 size={14} />
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    <ShieldCheck size={14} />
                    Platform notes
                  </div>
                  <ul className="space-y-2 text-sm leading-6 text-slate-700">
                    {client.notes.map((note) => (
                      <li key={note}>- {note}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={client.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-700"
                >
                  {client.sourceLabel}
                  <ExternalLink size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#082f49_0%,#0f172a_100%)] p-8 text-white shadow-[0_32px_90px_-52px_rgba(8,47,73,0.95)]">
              <div className="mb-4 flex items-center gap-3 text-sky-200">
                <KeyRound size={18} />
                <span className="text-xs font-black uppercase tracking-[0.22em]">Operational Notes</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">接続で詰まりやすいポイント</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
                <li>- `Token exchange failed` は古い app / connector の残骸で起きやすい。削除して作り直す。</li>
                <li>- refresh token を使う OAuth provider では discovery metadata に refresh/offline access が出ているか確認する。</li>
                <li>- local MCP server は ChatGPT の current beta では使えない。Nexloom は remote endpoint 前提でつなぐ。</li>
                <li>- secret を shared docs や repo に直書きしない。必要なら server admin 管理に寄せる。</li>
              </ul>
              <div className="mt-8">
                <a href={WEB_APP_URL} className="inline-flex" aria-label="Nexloom Webアプリを開く">
                  <Button variant="secondary" className="rounded-2xl bg-white text-slate-950 hover:bg-sky-50" icon={<ArrowRight size={16} />}>
                    Webアプリを開く
                  </Button>
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-46px_rgba(15,23,42,0.35)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <Bot size={21} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Also supported</div>
                    <div className="text-lg font-black text-slate-950">Other clients</div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {secondaryClients.map((client) => (
                    <div key={client.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="text-sm font-black text-slate-900">{client.name}</div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{client.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-46px_rgba(15,23,42,0.35)]">
                <div className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Canonical References</div>
                <div className="grid gap-4 md:grid-cols-2">
                  {sourceLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-base font-black text-slate-900">{item.label}</div>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                        </div>
                        <ExternalLink className="mt-1 flex-shrink-0 text-slate-400 transition group-hover:text-sky-700" size={16} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperMcpPage;
