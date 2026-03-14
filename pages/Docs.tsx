import React, { useState, useEffect, useId } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  ChevronRight, 
  Bell,
  Book, 
  Search, 
  MessageSquare, 
  Calendar,
  Cpu, 
  Zap, 
  Shield, 
  HelpCircle,
  Hash,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Terminal,
  ExternalLink,
  Layout,
  Users,
  Video,
  Briefcase,
  CheckSquare,
  Bot,
  FileText,
  Database,
  Link,
  Settings,
  AlertTriangle,
  Copy,
  Check,
  Lightbulb,
  Info,
  Download,
  Globe,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { DESKTOP_RELEASE_NOTES_PATH, WEB_APP_URL } from '../constants/links';
import { useDesktopReleaseManifest } from '../hooks/useDesktopReleaseManifest';

// --- Mermaid Configuration ---
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
});

// --- Custom Components for Markdown Rendering ---

const MermaidDiagram = ({ code }: { code: string }) => {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  // Ensure ID is safe for DOM and Mermaid
  const uniqueId = `mermaid-diagram-${id.replace(/[^a-zA-Z0-9]/g, '')}`;

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        // Reset error
        setError(null);
        
        // Check if code is empty
        if (!code.trim()) return;

        // Ensure HTML entities are decoded (sometimes ReactMarkdown encodes them)
        const decodedCode = code
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&');

        // mermaid.render returns an object { svg } in newer versions
        const { svg } = await mermaid.render(uniqueId, decodedCode);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    if (code) {
      renderDiagram();
    }
  }, [code, uniqueId]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-mono">
        <div className="font-bold mb-1">Diagram Error</div>
        <div className="whitespace-pre-wrap">{error}</div>
        <pre className="mt-2 text-xs opacity-75 whitespace-pre-wrap border-t border-red-200 pt-2">{code}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 animate-pulse">
        <span className="text-sm font-medium">Generating diagram...</span>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full overflow-x-auto flex justify-center">
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    </div>
  );
};

const CodeBlock = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace('language-', '');
  const isMermaid = language === 'mermaid';
  const codeContent = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isMermaid) {
    return <MermaidDiagram code={codeContent} />;
  }

  return (
    <div className="my-8 rounded-2xl overflow-hidden bg-[#1e1e2e] shadow-xl ring-1 ring-white/10 group">
      <div className="flex items-center justify-between px-4 py-3 bg-[#27273a] border-b border-white/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center space-x-3">
           {language && (
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{language}</span>
           )}
           <button 
             onClick={handleCopy}
             className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center space-x-1 opacity-0 group-hover:opacity-100"
           >
             {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
             <span>{copied ? 'Copied!' : 'Copy'}</span>
           </button>
        </div>
      </div>
      <div className="p-5 overflow-x-auto">
        <code className={`text-sm font-mono text-[#cdd6f4] leading-relaxed block ${className || ''}`}>
          {codeContent}
        </code>
      </div>
    </div>
  );
};

const CustomBlockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-8 relative overflow-hidden rounded-2xl bg-indigo-50/50 border border-indigo-100 p-6">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Lightbulb size={20} fill="currentColor" className="opacity-20" />
          <Info size={20} className="absolute" />
        </div>
        <div className="flex-1 text-slate-700 leading-relaxed font-medium">
          {children}
        </div>
      </div>
    </div>
  );
};

const CustomTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-10 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          {children}
        </table>
      </div>
    </div>
  );
};

const DocsPage: React.FC = () => {
  const [activeId, setActiveId] = useState('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { releaseVersion, publishedAt } = useDesktopReleaseManifest();

  const menu = [
    {
      title: 'はじめに',
      items: [
        { id: 'intro', label: 'Nexloomとは', icon: Book },
        { id: 'concept', label: 'コンセプトと仕組み', icon: Cpu },
        { id: 'start', label: 'クイックスタート', icon: Zap },
        { id: 'install', label: 'インストール', icon: Terminal },
      ]
    },
    {
      title: '基本インターフェース',
      items: [
        { id: 'ui_tour', label: '画面の見方', icon: Layout },
        { id: 'profiles', label: 'プロフィール設定', icon: Users },
      ]
    },
    {
      title: 'コミュニケーション',
      items: [
        { id: 'channels', label: 'チャンネルとチャット', icon: MessageSquare },
        { id: 'notifications', label: '通知と通知設定', icon: Bell },
        { id: 'meetings', label: '会議とAI議事録', icon: Video },
      ]
    },
    {
      title: 'プロジェクト管理',
      items: [
        { id: 'projects', label: 'プロジェクトの作成', icon: Briefcase },
        { id: 'calendar', label: 'カレンダーと外部購読', icon: Calendar },
        { id: 'tasks', label: 'タスクとボード', icon: CheckSquare },
        { id: 'task_agents', label: 'AIエージェント', icon: Bot },
      ]
    },
    {
      title: 'ナレッジベース',
      items: [
        { id: 'pages', label: 'ページと階層構造', icon: FileText },
        { id: 'sharing', label: '共有と公開リンク', icon: Globe },
        { id: 'editor', label: 'ブロックエディタ', icon: Book },
        { id: 'databases', label: 'データベース', icon: Database },
      ]
    },
    {
      title: 'AIと高度な連携',
      items: [
        { id: 'ai_assistant', label: 'AIコンパニオン', icon: Cpu },
        { id: 'mcp', label: 'MCP連携', icon: Link },
        { id: 'lineworks', label: 'LINE WORKS連携', icon: MessageSquare },
      ]
    },
    {
      title: '管理者ガイド',
      items: [
        { id: 'admin_console', label: '管理コンソール', icon: Settings },
        { id: 'security', label: 'セキュリティ', icon: Shield },
      ]
    },
    {
      title: '開発者と運用',
      items: [
        { id: 'dev_portal', label: '開発者ドキュメント入口', icon: Terminal },
        { id: 'api_reference', label: 'APIリファレンス', icon: Database },
        { id: 'mcp_developer', label: 'MCPとAI連携', icon: Link },
        { id: 'mcp_clients', label: 'MCPクライアント設定', icon: Link },
        { id: 'access_control', label: '権限と監査', icon: Shield },
        { id: 'release_runbook', label: 'リリース運用', icon: Settings },
      ]
    },
    {
      title: 'サポート',
      items: [
        { id: 'faq', label: 'よくある質問', icon: HelpCircle },
        { id: 'troubleshooting', label: 'トラブルシューティング', icon: AlertTriangle },
      ]
    }
  ];

  const docsContent: Record<string, string> = {
    intro: `# Nexloomへようこそ

## 目的 / 結論 / 次アクション

- 目的: Nexloomの全体像を短時間で把握し、正本ドキュメントへ移動できるようにする。
- 結論: このページは「入口」であり、実装依存の仕様は ai-note-meet/docs を正本として扱う。
- 次アクション: 利用目的に合わせて下記のカテゴリから一次情報へ進む。

## Nexloomの対象領域

- チームコミュニケーション（チャンネル/通知）
- 会議と議事録（録画・要約・アクション化）
- プロジェクトとタスク運用
- ページ/ナレッジ管理
- MCP/API連携と運用

## 主要導線（正本）

| 目的 | ドキュメント |
| --- | --- |
| 全体インデックス | [docs/README.md](https://github.com/t012093/ai-note-meet/blob/main/docs/README.md) |
| API全体像 | [docs/API_OVERVIEW.md](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md) |
| 本番構成 | [docs/PRODUCTION_ARCHITECTURE.md](https://github.com/t012093/ai-note-meet/blob/main/docs/PRODUCTION_ARCHITECTURE.md) |
| リリース運用 | [docs/ops/runbooks/](https://github.com/t012093/ai-note-meet/tree/main/docs/ops/runbooks) |
| MCP連携 | [docs/MCP_REFERENCE.md](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md) |

## 注意

- 最新仕様の確認時は、必ずリンク先の更新日と対象ブランチを確認してください。`,

    concept: `# コンセプトと仕組み

## 目的 / 結論 / 次アクション

- 目的: アーキテクチャ説明の参照先を固定し、古い図や断定文の残存を防ぐ。
- 結論: 構成図とデータフローは architecture/spec を正本とし、このページでは入口だけを示す。
- 次アクション: 変更対象（通知・会議・AI・組織境界）に応じて該当資料を選択する。

## 概要

- Nexloomは、Webフロントエンド、APIバックエンド、データ基盤、リアルタイム/会議基盤、AI実行系で構成されます。
- 境界設計（認可・組織分離・通知配信）は運用ドキュメントと合わせて確認します。

## 正本ドキュメント

- [Production Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/PRODUCTION_ARCHITECTURE.md)
- [EC2 Unified OpenClaw Production Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/architecture/EC2_UNIFIED_OPENCLAW_PRODUCTION_ARCHITECTURE.md)
- [Notifications Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/ARCHITECTURE_NOTIFICATIONS.md)
- [Multi-tenant Organization Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MULTI_TENANT_ORGANIZATION_SPEC.md)

## 運用で見る資料

- [Operations Docs Index](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/README.md)
- [Runbooks](https://github.com/t012093/ai-note-meet/tree/main/docs/ops/runbooks)`,

    start: `# クイックスタート

## 目的 / 結論 / 次アクション

- 目的: Web / iOS / Android の利用者が迷わず初回セットアップを完了できるようにする。
- 結論: 最初に端末別手順を実行し、その後に組織と権限の前提を確認すると迷いが少ない。
- 次アクション: あなたの利用端末に対応する手順をそのまま上から実行する。

## 最初に選ぶ入口

| 使い方 | 入口 |
| --- | --- |
| いちばん早く始めたい | [Webアプリ](https://ai-note-meet.vercel.app/) |
| モバイルの状況を確認したい | [モバイル版の案内](#/mobile) |
| PCに入れて使いたい | [デスクトップ版の案内](#/download) |

## 現在の公開状況

- Web版は今すぐ利用開始できる正規入口です。
- モバイル版は段階提供です。iOS は TestFlight、Android は internal build または preview 配布が前提です。
- 公開ストア URL が未整備の期間は、まず Web 版で使い始める案内が基本です。

## どの手順を見ればよいか

| あなたの環境 | 対応する手順 |
| --- | --- |
| ブラウザで使う | Webを利用する場合 |
| iPhone / iPad で使う | iOSを利用する場合 |
| Android で使う | Androidを利用する場合 |
| Mac / Windows でアプリとして使う | Desktop版を利用する場合 |

## Webを利用する場合

1. [Webアプリ](https://ai-note-meet.vercel.app/) を開く。
2. サインインする。
3. 組織（Organization）を選ぶ。
4. 最初のプロジェクトを1つ作成する。
5. チャンネルで1件投稿し、タスクを1件作成して動作確認する。

## iOSを利用する場合

1. まず [モバイル版の案内](#/mobile) で配布状況を確認する。
2. チームから案内された配布方法（TestFlight または内部配布）でアプリをインストールする。
3. アプリを起動してサインインする。
4. 通知を使う場合は、初回起動時に通知許可を有効にする。
5. 組織を選び、最初のプロジェクトを1つ作成する。
6. 動作で詰まったら [apps/mobile/README.md](https://github.com/t012093/ai-note-meet/blob/main/apps/mobile/README.md) の Troubleshooting を確認する。

## Androidを利用する場合

1. まず [モバイル版の案内](#/mobile) で現在の提供状況を確認する。
2. チームから配布されたAndroidビルド（例: internal APK）を取得する。
3. 端末設定で必要な場合は「不明なアプリのインストール」を一時的に許可する。
4. アプリをインストールしてサインインする。
5. 通知を使う場合は通知許可を有効にする。
6. 互換性確認が必要な場合は [android-compatibility-spec.md](https://github.com/t012093/ai-note-meet/blob/main/apps/mobile/docs/android-compatibility-spec.md) を確認する。

## Desktop版を利用する場合

1. [デスクトップ版の案内](#/download) を開く。
2. お使いのOSに合う配布物を選ぶ。
3. [公開リリースノート](#/desktop/release-notes) からインストーラーを取得する。
4. インストール後にサインインし、Web版と同じ組織を選ぶ。
5. まずは通知、チャンネル投稿、タスク作成の3つだけ確認するとスムーズです。

## 補足

- 最初の体験は「Web版」が最も早いです。
- モバイル版は段階的に提供しているため、配布方法は時期によって変わります。
- デスクトップ版はローカル通知や専用ショートカットを重視する人に向いています。

## 参照先

- [Docs Index](https://github.com/t012093/ai-note-meet/blob/main/docs/README.md)
- [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Mobile Release Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/MOBILE_RELEASE_RUNBOOK.md)
- [apps/mobile/README.md](https://github.com/t012093/ai-note-meet/blob/main/apps/mobile/README.md)`,

    install: `# 利用方法とインストール

## 目的 / 結論 / 次アクション

- 目的: 端末別に必要なインストール手順を明確にする。
- 結論: 「Webはすぐ開始」「モバイルは案内された配布経路で導入」「デスクトップは公開リリースノートから取得」が基本である。
- 次アクション: 端末に対応する導線を選び、最後にログイン確認まで行う。

## 端末別の入口

| 使いたい環境 | 入口 | インストール |
| --- | --- | --- |
| Web | [Webアプリ](https://ai-note-meet.vercel.app/) | 不要 |
| モバイル | [モバイル版の案内](#/mobile) | 配布状況に応じて TestFlight / internal build |
| デスクトップ | [デスクトップ版の案内](#/download) | 公開リリースノートから取得 |

## 現在の導入方針

- いますぐ使うなら Web 版
- iPhone / iPad は TestFlight 招待経由
- Android は internal build または preview 配布経由
- モバイルと Web は同じアカウント、同じ組織で使う

## Web版（インストール不要）

1. [Webアプリ](https://ai-note-meet.vercel.app/) を開く。
2. サインインして利用開始する。
3. 最初のチャンネル投稿かタスク作成まで進める。

## iOS版

1. [モバイル版の案内](#/mobile) で現在の提供状況を確認する。
2. チーム指定の配布方法（TestFlight または内部配布）でアプリを入れる。
3. 初回起動でログインする。
4. 必要に応じて通知を有効にする。
5. 詳細は [apps/mobile/README.md](https://github.com/t012093/ai-note-meet/blob/main/apps/mobile/README.md) を確認する。

## Android版

1. [モバイル版の案内](#/mobile) で提供状況を確認する。
2. チーム配布の Android ビルド（internal APK など）を取得する。
3. 端末設定で必要な場合のみ「不明なアプリのインストール」を許可する。
4. インストール後にログインする。
5. 端末差分の確認は [android-compatibility-spec.md](https://github.com/t012093/ai-note-meet/blob/main/apps/mobile/docs/android-compatibility-spec.md) を参照する。

## Desktop版

1. [デスクトップ版の案内](#/download) を開く。
2. 「macOS」または「Windows」の配布物を選ぶ。
3. [公開リリースノート](#/desktop/release-notes) からインストーラーを取得する。
4. インストール後にログインして利用開始する。

## どれを選ぶとよいか

- まず試すなら「Web版」
- 通知やショートカットを重視するなら「Desktop版」
- 外出先で会話や通知の流れを追いたいなら「モバイル版」

## 注意

- 配布形式や審査要件は更新されるため、最終判断は README / Runbook の最新版に従う。
- モバイル版の配布導線は時期によって「TestFlight」「internal build」「preview」に変わることがある。
- 社内やクローズド配布が前提の期間は、公開ストアリンクが未整備でも正常である。
`,

    ui_tour: `# 画面の見方

## 目的 / 結論 / 次アクション

- 目的: 画面構成を迷わず理解し、詳細仕様の正本へ移動できるようにする。
- 結論: UIは継続的に改善されるため、機能仕様は API/spec/runbook を正本にする。
- 次アクション: 操作で迷う場合は画面名ではなく機能カテゴリ（チャット/会議/タスク/ページ）で参照先を選ぶ。

## 主要エリア

- 左サイドバー: ワークスペース、プロジェクト、チャンネル、ページへの移動。
- ヘッダー: 検索、通知、現在のコンテキスト確認。
- 右アクティビティ領域: メンバー、スレッド、補助パネル。

## 機能別の参照先

| 機能カテゴリ | 参照先 |
| --- | --- |
| チャット/通知 | [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md), [Notifications Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/ARCHITECTURE_NOTIFICATIONS.md) |
| 会議/議事録 | [LIVEKIT_ARCHITECTURE.md](https://github.com/t012093/ai-note-meet/blob/main/docs/LIVEKIT_ARCHITECTURE.md), [Meeting AI Unified Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MEETING_AI_AGENDA_ASSISTANT_MINUTES_UNIFIED_SPEC.md) |
| タスク/運用 | [PROJECT_OPS_BOARD_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_OPS_BOARD_SPEC.md), [AI_TASK_SUGGESTION_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AI_TASK_SUGGESTION_SPEC.md) |
| 権限/組織 | [ROLE_MANAGEMENT_API_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md), [MULTI_TENANT_ORGANIZATION_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MULTI_TENANT_ORGANIZATION_SPEC.md) |`,

    profiles: `# プロフィール設定

## このページでわかること

- 自分の表示名や状態をどこで更新するか
- ロール表示と実際の権限の違い
- 管理者に依頼すべき変更

## 3分手順（一般ユーザー）

1. プロフィール設定画面を開く。
2. 表示名、アイコン、状態を更新する。
3. 保存後、チャンネル上の表示が更新されたことを確認する。

## 管理者へ依頼する変更

- 組織ロール（owner / admin / member）
- プロジェクトロール
- 他ユーザーのロール変更

## 補足（混同しやすい点）

- プロフィール上の役割表示は「自己紹介・運用上の分類」。
- 実際のアクセス制御は組織/プロジェクトのロールで判定される。

## 詳細仕様

- [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md)
- [Role Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md)
- [Membership Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MEMBERSHIP_MANAGEMENT_API_SPEC.md)`,

    channels: `# チャンネルとチャット

## このページでわかること

- 最初のチャンネル投稿の流れ
- 返信・メンション・通知の基本
- つまずきやすい確認ポイント

## 5分手順

1. 左サイドバーでチャンネルを選ぶ。
2. メッセージを1件投稿する。
3. 既存メッセージへ返信してスレッドを作る。
4. 必要ならメンションして相手に通知する。
5. 自分宛の通知一覧に反映されることを確認する。

## よくあるつまずき

- 投稿できない: そのチャンネルの閲覧/投稿権限を確認する。
- 通知が来ない: 通知設定とメンション対象を確認する。
- チャンネルが見つからない: 組織/プロジェクトの選択コンテキストを確認する。

## 詳細仕様

- [API Overview (Channels / Messages / Notifications)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Notifications Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/ARCHITECTURE_NOTIFICATIONS.md)
- [Notifications Test Procedure](https://github.com/t012093/ai-note-meet/blob/main/docs/tests/TEST_PROCEDURE_NOTIFICATIONS.md)`,

    notifications: `# 通知と通知設定

## このページでわかること

- 通知ベルと未読管理の基本
- Web / Desktop / Mobile で切り替えられる通知設定
- 通知が来ないときの最短確認ポイント

## 5分手順

1. 右上の通知ベルで未読一覧を開く。
2. メンションやDMを1件受け取り、一覧に反映されることを確認する。
3. 設定画面の「通知設定」を開く。
4. \`OSプッシュ通知\`、\`デスクトップ通知\`、\`（Web）通知音\`、\`未読バッジ\` を必要に応じて切り替える。
5. アプリを非アクティブにした状態でも通知が届くかをテストする。

## 設定できる項目

- \`OSプッシュ通知\`: 登録済みのスマホなどへ通知を送る。
- \`OSプッシュ通知の音\`: プッシュをサイレント送信にするかを切り替える。
- \`デスクトップ通知\`: Web/desktop 利用時にシステム通知を出す。
- \`（Web）通知音\`: 新着通知時のビープ音を切り替える。
- \`未読バッジ\`: 通知ベルの赤い未読インジケータを表示する。
- \`メールダイジェスト\`: 現在は準備中で、設定保存のみ先行している。

## つまずきやすい点

- 通知が来ない: メンション対象、ブラウザ/OS権限、Pushトークン登録を確認する。
- デスクトップ通知が出ない: 通知権限が \`granted\` になっているか確認する。
- モバイル通知が出ない: 端末側の通知許可とログイン中の組織コンテキストを確認する。

## 詳細仕様

- [API Overview (Channels / Messages / Notifications)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Notifications Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/ARCHITECTURE_NOTIFICATIONS.md)
- [Notifications Test Procedure](https://github.com/t012093/ai-note-meet/blob/main/docs/tests/TEST_PROCEDURE_NOTIFICATIONS.md)`,

    meetings: `# 会議とAI議事録

## このページでわかること

- 会議開始から議事録確認までの流れ
- 録画/要約が失敗したときの確認先
- モバイル利用時の注意点

## 5分手順

1. 対象チャンネルで会議を開始する。
2. カメラ/マイク権限を許可する。
3. 必要なら録画を開始する。
4. 会議終了後、議事録ページが生成されるまで待つ。
5. 要約・決定事項・次アクションを確認する。

## うまくいかないとき

- 音声が取れない: OS/ブラウザのマイク権限を再確認する。
- 議事録が出ない: 会議終了処理とネットワーク状態を確認する。
- モバイル経由で不安定: モバイル接続runbookを確認する。

## 詳細仕様

- [LiveKit Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/LIVEKIT_ARCHITECTURE.md)
- [Meeting AI Unified Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MEETING_AI_AGENDA_ASSISTANT_MINUTES_UNIFIED_SPEC.md)
- [OpenClaw Mobile Gateway Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/OPENCLAW_MOBILE_GATEWAY_RUNBOOK.md)`,

    projects: `# プロジェクトの作成

## このページでわかること

- 最初のプロジェクトの作り方
- 作成直後にやるべき初期設定
- メンバー招待と役割分担の基本

## 5分手順

1. プロジェクト作成画面を開く。
2. プロジェクト名と目的を入力して作成する。
3. 初期メンバーを招待する。
4. チャンネル、ページ、タスクを最低1つずつ作る。
5. 担当者と期限を決めて、最初の運用単位を作る。

## 運用のコツ

- 名前だけ作って放置せず、最初のタスク1件まで作る。
- 権限が曖昧なまま開始しない。
- 「誰が決めるか」「誰が実行するか」を先に決める。

## 詳細仕様

- [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Project Ops Board Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_OPS_BOARD_SPEC.md)
- [Multi-tenant Organization Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MULTI_TENANT_ORGANIZATION_SPEC.md)
- [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md)`,

    calendar: `# カレンダーと外部購読

## このページでわかること

- Nexloom 内の予定確認と手動イベント追加の流れ
- タスク・ページ・会議・イベントを同じカレンダーで見る考え方
- Google / Outlook / Apple Calendar へ購読URLを渡す方法

## 5分手順

1. 左サイドバーの \`カレンダー\` を開く。
2. Day / Week / Month を切り替えて、自分の予定と締切を確認する。
3. 必要ならイベントを新規作成し、タイトル・時間・タグ・担当を設定する。
4. プロジェクト、担当者、公開範囲でフィルタして見たい予定だけに絞る。
5. 外部カレンダー連携が必要な場合は管理画面から購読URLを発行する。

## この画面に集約されるもの

- タスクの期限
- ページ系の締切
- 会議予定
- 手動で作成したイベント

## 外部購読の注意

- 外部同期は \`ICS購読\` の片方向同期である。
- Google / Outlook / Apple Calendar に購読URLを登録できる。
- プライベート予定は同期対象に含まれない。
- 購読URLは必要に応じて再発行・失効できる。

## 詳細仕様

- [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Calendar Sales/Marketing UI UX Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/CALENDAR_SALES_MARKETING_UI_UX_SPEC.md)
- [Calendar External Sync Phase1 Plan](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/CALENDAR_EXTERNAL_SYNC_PHASE1_PLAN.md)`,

    tasks: `# タスクとボード

## このページでわかること

- タスクを作って完了まで回す基本手順
- 日次運用で見るべきポイント
- AI提案を安全に使うコツ

## 5分手順

1. タスクを作成する（タイトル、担当、期限を入力）。
2. ステータスを進行に合わせて更新する。
3. 作業メモやチェック項目を追記する。
4. 完了条件を満たしたら完了へ移動する。
5. 週次で未完了タスクを見直す。

## 運用のコツ

- 「担当なし」「期限なし」のタスクを増やさない。
- ステータス更新を日次で行う。
- AI提案はそのまま確定せず、担当者が1回レビューする。

## 詳細仕様

- [API Overview (Tasks)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Project Ops Board Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_OPS_BOARD_SPEC.md)
- [AI Task Suggestion Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AI_TASK_SUGGESTION_SPEC.md)`,

    task_agents: `# AIエージェント

## このページでわかること

- AIエージェントをタスク実行に使う流れ
- 実行結果の確認方法
- 失敗時の再実行ポイント

## 5分手順

1. タスク詳細を開く。
2. 実行指示を入力してAIエージェントを起動する。
3. AIログとステータス遷移を確認する。
4. 提案内容をレビューして採用/修正を決める。
5. 必要なら追加指示で再実行する。

## 注意

- AIの出力は必ず人が最終確認する。
- 実行できない場合は認証状態とランタイム状態を先に確認する。

## 詳細仕様

- [Task Agent Execution Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/TASK_AGENT_EXECUTION_ARCHITECTURE.md)
- [Automation API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AUTOMATION_API_SPEC.md)
- [Automation Scheduler User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/AUTOMATION_SCHEDULER_USER_GUIDE.md)
- [Automation Scheduler Developer Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/AUTOMATION_SCHEDULER_DEVELOPER_GUIDE.md)`,

    pages: `# ページと階層構造

## このページでわかること

- ページを作る・整理する・共有する基本手順
- 公開リンクを使うときの注意点
- 検索性を上げる書き方

## 5分手順

1. プロジェクト内に新規ページを作る。
2. 見出しで構造化して本文を書く。
3. 必要なら子ページを作って階層化する。
4. 共有範囲（内部共有 / 公開リンク）を設定する。
5. 更新後に検索でヒットするか確認する。

## 運用のコツ

- ページ名は「対象 + 目的」で命名する。
- 先頭に結論と次アクションを書く。
- 外部共有時は公開範囲を再確認する。

## 詳細仕様

- [API Overview (Pages)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Project Document Operability Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_DOCUMENT_OPERABILITY_PHASE2_SPEC.md)
- [Page Body RAG Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PAGE_BODY_RAG_PHASE2_SPEC.md)
- [MCP Docs Operation Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_DOCS_OPERATION_SPEC.md)`,

    sharing: `# 共有と公開リンク

## このページでわかること

- ワークスペース共有、プライベート、公開リンクの違い
- ページを外部共有するときの基本手順
- 公開リンク運用で事故を減らす確認ポイント

## 共有モードの考え方

| モード | 用途 | 目安 |
| --- | --- | --- |
| ワークスペース共有 | 同じ組織/チーム内で広く読む | 通常のページ共有 |
| プライベートノート | 所有者中心で一時的に閉じる | 下書き、個人メモ |
| 公開リンク | 外部へ閲覧URLを渡す | read-onlyで共有したいとき |

## 5分手順

1. 対象ページを開き、ページ設定を開く。
2. まず \`ワークスペース共有\` か \`プライベート\` かを決める。
3. 外部共有が必要なときだけ \`Publish to Web\` を有効にする。
4. 発行された公開URLをコピーし、意図した相手だけへ渡す。
5. 不要になったら公開を停止し、リンクを無効化する。

## 実装上の前提

- 公開ページは閲覧用リンクとして配布される。
- URL形式は \`https://ai-note-meet.vercel.app/share/{share_id}\` で扱う。
- 外部公開の前に、ページ内に機密情報や途中メモが残っていないか確認する。
- プライベートノートは公開リンクを前提にしない。

## 運用のコツ

- 公開前にタイトル、先頭要約、更新日時を整える。
- 会議メモや下書きは、要点整理後に公開へ切り替える。
- 共有範囲が曖昧なら、まず内部共有でレビューしてから公開する。

## 詳細仕様

- [API Overview (Pages)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Project Document Operability Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_DOCUMENT_OPERABILITY_PHASE2_SPEC.md)
- [Page Body RAG Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PAGE_BODY_RAG_PHASE2_SPEC.md)`,

    editor: `# ブロックエディタ

## このページでわかること

- エディタの基本操作
- 読みやすいページを作る最低ルール
- 添付ファイル利用時の確認点

## 5分手順

1. 本文を入力し、見出しで段落を分ける。
2. 箇条書きとチェックリストで作業項目を整理する。
3. 画像やファイルが必要なら添付する。
4. 最後に「決定事項」と「次アクション」を追記する。
5. 保存後に他メンバーの画面で表示崩れがないか確認する。

## 書き方のコツ

- 1段落は短く書く。
- 見出しは目的別に分ける。
- 長文より、表や箇条書きを優先する。

## 詳細仕様

- [Project Document Operability Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_DOCUMENT_OPERABILITY_PHASE2_SPEC.md)
- [Asset Storage and Extraction Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ASSET_STORAGE_AND_EXTRACTION_SPEC.md)
- [Page Body RAG Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PAGE_BODY_RAG_PHASE2_SPEC.md)`,

    databases: `# データベース

## このページでわかること

- 構造化データを扱うときの基本
- 変更時に確認すべき影響範囲
- 安全に運用するためのチェックポイント

## 5分手順

1. どの情報を表形式で管理するか決める。
2. 列の意味と入力ルールを先に決める。
3. テストデータを数件入れて使い勝手を確認する。
4. メンバーと運用ルールを共有する。
5. 重要データは権限設定を見直す。

## 注意

- スキーマ変更は他画面やAPIに影響する可能性がある。
- 変更前にバックアップ方針とロール設定を確認する。

## 詳細仕様

- [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [SQL Docs Index](https://github.com/t012093/ai-note-meet/blob/main/docs/sql/README.md)
- [Asset Storage and Extraction Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ASSET_STORAGE_AND_EXTRACTION_SPEC.md)
- [RAG Project Intelligence Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/RAG_PROJECT_INTELLIGENCE_SPEC.md)`,

    ai_assistant: `# AIコンパニオン

## このページでわかること

- AIコンパニオンの基本的な使い方
- 反応が遅い/失敗する場合の確認手順
- 業務で安全に使うためのルール

## 5分手順

1. AIコンパニオン画面を開く。
2. 目的を短く具体的に入力する。
3. 返答をそのまま確定せず、内容を確認する。
4. 必要なら「条件」を追加して再質問する。
5. 決定事項はページやタスクへ反映する。

## 安全に使うためのルール

- 個人情報や機密情報の入力は最小限にする。
- 重要な判断は必ず人が最終確認する。
- 失敗が続く場合はランタイム状態を確認する。

## 詳細仕様

- [Automation API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AUTOMATION_API_SPEC.md)
- [LLM Automation Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/architecture/LLM_AUTOMATION_ARCHITECTURE.md)
- [OpenClaw AI Chat and Meeting Chat Brushup Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/OPENCLAW_AI_CHAT_AND_MEETING_CHAT_BRUSHUP_SPEC.md)
- [Auth Runtime Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/AUTH_RUNTIME_RUNBOOK.md)`,

    mcp: `# MCP連携

## このページでわかること

- MCP連携で何ができるか
- 最初の接続テストまでの流れ
- 開発時に見るべき仕様

## 代表的に使うツール

| ツール名 | できること |
| --- | --- |
| \`list_tasks\` | プロジェクトのタスク一覧を取得 |
| \`create_task\` | 新しいタスクを作成 |
| \`read_page\` | ページの内容をMarkdownとして取得 |
| \`send_message\` | 指定チャンネルにメッセージを投稿 |

## 5分手順（開発者向け）

1. MCPクライアントの設定ファイルを開く。
2. Nexloom MCPの接続設定を追加する。
3. \`list_projects\` などの読み取り系ツールで接続テストする。
4. 問題なければ \`create_task\` などの書き込み系ツールを試す。

## 詳細仕様

- [MCP Reference（ai-note-meet）](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md)
- [MCP Tools Contract](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_TOOLS_CONTRACT.md)
- [MCP Docs Operation Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_DOCS_OPERATION_SPEC.md)`,

    lineworks: `# LINE WORKS連携

## このページでわかること

- LINE WORKS連携の開始手順
- 接続確認の方法
- 問題発生時の確認先

## 5分手順

1. 連携に必要な認証情報を準備する。
2. webhook URL を設定する。
3. チャンネル/プロジェクト/ユーザーのリンク設定を行う。
4. テストメッセージで双方向連携を確認する。
5. 送受信ログが残っていることを確認する。

## つまずきやすい点

- webhook URL の環境違い（本番/検証）が混在している。
- リンク対象ID（room_id など）が一致していない。
- DB側の連携テーブルが未適用。

## 詳細仕様

- [LINE WORKS Integration](https://github.com/t012093/ai-note-meet/blob/main/docs/LINEWORKS_INTEGRATION.md)
- [API Overview (LINE WORKS)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [LINE WORKS SQL Integration](https://github.com/t012093/ai-note-meet/blob/main/docs/sql/integrations/lineworks_integration.sql)
- [README (LINE WORKS section)](https://github.com/t012093/ai-note-meet/blob/main/README.md)`,

    admin_console: `# 管理コンソール

## 目的 / 結論 / 次アクション

- 目的: 管理権限の操作手順と制約条件を、運用時に迷わず参照できるようにする。
- 結論: 権限仕様は API spec を正本にし、UI操作はユーザーガイドを正本にする。
- 次アクション: 権限変更前に「対象ロール」「実行者ロール」「監査対象操作」をセットで確認する。

## 相手の課題

- 管理画面で変更できる範囲と禁止条件（例: 最後のownerの降格/削除不可）が混同されやすい。

## 提供価値

- API契約、画面操作、組織境界の根拠を分離して参照できるため、誤操作と権限事故を減らせる。

## 実行プロセス

1. API仕様を [Role Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md) で確認する。
2. 画面操作は [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md) を確認する。
3. 組織/プロジェクトの境界要件を [Multi-tenant Organization Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MULTI_TENANT_ORGANIZATION_SPEC.md) で確認する。
4. リリース前に [Tenant Isolation Test Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/TENANT_ISOLATION_TEST_RUNBOOK.md) を実施する。

## 実績/根拠

- 役割管理API: [docs/spec/ROLE_MANAGEMENT_API_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md)
- 利用者向け運用手順: [docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md)
- 境界検証Runbook: [docs/ops/runbooks/TENANT_ISOLATION_TEST_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/TENANT_ISOLATION_TEST_RUNBOOK.md)`,

    security: `# セキュリティ

## 目的 / 結論 / 次アクション

- 目的: セキュリティ設計と検証手順を、実装追従可能な一次ドキュメントへ接続する。
- 結論: RLS・テナント分離・通知/WS境界は設計文書とrunbookを組み合わせて確認する。
- 次アクション: 変更時は SQL/RLS・API境界・テストrunbook の3点を同時更新する。

## 相手の課題

- サイト概要だけでは「現在の保証範囲」と「検証方法」が判断しづらい。

## 提供価値

- セキュリティ主張を仕様と検証手順に分離し、レビュー可能な根拠へ接続する。

## 実行プロセス

1. RLS定義を [docs/sql/rls/supabase_rls.sql](https://github.com/t012093/ai-note-meet/blob/main/docs/sql/rls/supabase_rls.sql) と [docs/sql/README.md](https://github.com/t012093/ai-note-meet/blob/main/docs/sql/README.md) で確認する。
2. テナント境界の試験手順を [Tenant Isolation Test Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/TENANT_ISOLATION_TEST_RUNBOOK.md) で確認する。
3. 認可・依存関係・SAST/DASTの運用基準を [Security Test Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/SECURITY_TEST_RUNBOOK.md) で確認する。
4. 通知・WebSocket境界は [Notification Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/ARCHITECTURE_NOTIFICATIONS.md) を参照する。

## 実績/根拠

- セキュリティ検証運用: [docs/ops/runbooks/SECURITY_TEST_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/SECURITY_TEST_RUNBOOK.md)
- テナント分離検証: [docs/ops/runbooks/TENANT_ISOLATION_TEST_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/TENANT_ISOLATION_TEST_RUNBOOK.md)
- RLS SQL群: [docs/sql/rls/](https://github.com/t012093/ai-note-meet/tree/main/docs/sql/rls)`,

    dev_portal: `# 開発者ドキュメント入口

## 目的 / 結論 / 次アクション

- 目的: 実装と同期される一次ドキュメントへ最短で到達する。
- 結論: ai-note-meet/docs を正本とし、サイトDocsは「入口」に役割を絞るのが保守性が高い。
- 次アクション: 以下のカテゴリから担当領域を選び、更新日と対象ブランチを確認して読む。

## 相手の課題

- サイト説明と実装仕様が乖離しやすく、運用時に迷いやすい。

## 提供価値

- 「何を見ればよいか」をカテゴリ別に固定し、更新漏れを減らす。

## 開発者向けの主要導線（正本）

| カテゴリ | ドキュメント |
| --- | --- |
| 全体インデックス | [docs/README.md](https://github.com/t012093/ai-note-meet/blob/main/docs/README.md) |
| API概要 | [docs/API_OVERVIEW.md](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md) |
| MCPリファレンス | [docs/MCP_REFERENCE.md](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md) |
| 役割管理API | [docs/spec/ROLE_MANAGEMENT_API_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md) |
| 運用Runbook | [docs/ops/runbooks/](https://github.com/t012093/ai-note-meet/tree/main/docs/ops/runbooks) |
| リリーステンプレ | [docs/ops/templates/](https://github.com/t012093/ai-note-meet/tree/main/docs/ops/templates) |`,

    api_reference: `# APIリファレンス

## 目的 / 結論 / 次アクション

- 目的: API仕様の参照先を一本化する。
- 結論: 実装追従は docs/API_OVERVIEW.md と docs/spec 配下を正本にする。
- 次アクション: 新規APIは実装PRと同時に対応するspec/runbookリンクを更新する。

## 実行プロセス

1. 全体像を [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md) で確認する。
2. 詳細仕様を docs/spec で確認する。
3. 変更時は docs/ops/runbooks/PRODUCTION_API_SYNC_RUNBOOK.md で反映手順を確認する。

## 実績/根拠

- API概要: [docs/API_OVERVIEW.md](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- メンバーシップAPI: [docs/spec/MEMBERSHIP_MANAGEMENT_API_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MEMBERSHIP_MANAGEMENT_API_SPEC.md)
- 役割API: [docs/spec/ROLE_MANAGEMENT_API_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md)
- 自動化API: [docs/spec/AUTOMATION_API_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AUTOMATION_API_SPEC.md)`,

    mcp_developer: `# MCPとAI連携

## 目的 / 結論 / 次アクション

- 目的: MCP実装と運用仕様の参照先を明確にする。
- 結論: /mcp（Streamable HTTP）とOAuth要件は docs/MCP_REFERENCE.md を正本とする。
- 次アクション: MCPツール追加時は契約ドキュメントを同時更新し、クライアント接続手順はこの Docs の「MCPクライアント設定」で確認する。

## 実行プロセス

1. [MCP Reference](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md) を確認する。
2. ツール契約は [MCP Tools Contract](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_TOOLS_CONTRACT.md) を確認する。
3. Docs操作系MCPは [MCP Docs Operation Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_DOCS_OPERATION_SPEC.md) を確認する。

## 実績/根拠

- MCPガイド: [docs/GUIDE_MCP_AND_TASKS.md](https://github.com/t012093/ai-note-meet/blob/main/docs/GUIDE_MCP_AND_TASKS.md)
- MCP実装仕様: [docs/spec/MCP_OPERATION_EXPANSION_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_OPERATION_EXPANSION_SPEC.md)`,

    mcp_clients: `# MCPクライアント設定

## 目的 / 結論 / 次アクション

- 目的: ChatGPT、Claude Code などのクライアントから、Nexloom の remote MCP server へ最短で接続できるようにする。
- 結論: 接続先は \`https://api.coral-network.com/mcp\`、認証は \`OAuth\` を基本にし、まず browser-based OAuth と dynamic client registration を優先する。
- 次アクション: 利用クライアントを1つ選び、\`list_projects\` または初回の \`tools/list\` 相当まで通す。

## 共通設定

- MCP server URL: \`https://api.coral-network.com/mcp\`
- Auth: \`OAuth\`
- OAuth metadata:
  - \`https://api.coral-network.com/.well-known/oauth-protected-resource\`
  - \`https://api.coral-network.com/.well-known/oauth-authorization-server\`
  - \`https://api.coral-network.com/.well-known/openid-configuration\`
- 2026-03-02 より前に作成した connector / app で \`Token exchange failed\` が出る場合は、一度削除して作り直す。
- static client ID / secret は fallback であり、公開ドキュメントには secret を書かない。

## ChatGPT

- 確認日: 2026-03-14
- OpenAI の一次情報では、custom MCP は remote server のみ対応で、local MCP server は使えない。
- ChatGPT web では developer mode が必要で、full MCP は Business / Enterprise / Edu 向け、Pro は developer mode 上で read/fetch 制限付きで案内されている。
- Nexloom の write 系ツールまで使う前提なら、Business / Enterprise / Edu 側で確認するのが安全である。

### 推奨手順

1. ChatGPT web で developer mode を有効化する。
2. App / MCP app の作成画面を開く。
3. server URL に \`https://api.coral-network.com/mcp\` を入れる。
4. authentication は \`OAuth\` を選び、client ID / secret はまず空欄で試す。
5. ブラウザで OAuth sign-in を完了し、読み取り系ツールで接続確認する。

## Claude Code

- 確認日: 2026-03-14
- Anthropic の一次情報では remote HTTP transport が推奨で、\`claude mcp add --transport http <name> <url>\` で追加する。
- OAuth が必要な remote server は、追加後に \`/mcp\` から認証する。

### 推奨コマンド

    claude mcp add --transport http nexloom https://api.coral-network.com/mcp

### 認証確認

    /mcp

### 補足

- ブラウザが開いたら OAuth sign-in を完了する。
- 認証をやり直すときも \`/mcp\` が最短である。
- callback port や static client が必要な特殊運用だけ、サーバー管理者の指示に合わせて追加設定する。

## ほかのクライアント

- Claude Desktop / Claude: remote connector 追加画面で same URL + OAuth を使う。
- Gemini CLI: \`.gemini/settings.json\` に remote MCP server を追加し、必要なら \`/mcp auth nexloom\` を使う。
- Codex: \`codex mcp add nexloom --url https://api.coral-network.com/mcp\` で追加する。

## 正本と一次情報

- 詳細ガイド: [Remote MCP Client Setup Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/REMOTE_MCP_CLIENT_SETUP_GUIDE.md)
- MCPリファレンス: [MCP Reference](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md)
- OpenAI Help: [Developer mode, and MCP apps in ChatGPT [beta]](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta)
- Anthropic Docs: [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)`,

    access_control: `# 権限と監査

## 目的 / 結論 / 次アクション

- 目的: 管理権限まわりの仕様と運用判断を一本化する。
- 結論: 組織ロール（owner/admin/member）とプロフィールロールは分けて扱う。
- 次アクション: 管理系変更は監査ログ・権限マトリクス・UI表示をセットで更新する。

## 実行プロセス

1. API仕様を [Role Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md) で確認する。
2. ユーザー運用は [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md) を参照する。
3. 組織設計は [Multi-tenant Organization Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MULTI_TENANT_ORGANIZATION_SPEC.md) を参照する。

## 実績/根拠

- 監査/運用系Runbook: [docs/ops/runbooks/](https://github.com/t012093/ai-note-meet/tree/main/docs/ops/runbooks)
- RLS SQL: [docs/sql/rls/supabase_rls.sql](https://github.com/t012093/ai-note-meet/blob/main/docs/sql/rls/supabase_rls.sql)`,

    release_runbook: `# リリース運用

## 目的 / 結論 / 次アクション

- 目的: Web/Backend/Mobileのリリース運用を手順化し、属人化を減らす。
- 結論: 実配布はRunbookとChecklistを必ずセットで運用する。
- 次アクション: 次回リリース前にテンプレをコピーし、Gate判定を記録する。

## 実行プロセス

1. 全体構成: [Production Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/PRODUCTION_ARCHITECTURE.md)
2. API反映: [Production API Sync Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/PRODUCTION_API_SYNC_RUNBOOK.md)
3. Mobile: [Mobile Release Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/MOBILE_RELEASE_RUNBOOK.md)
4. 判定テンプレ: [Release Checklist](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/templates/RELEASE_CHECKLIST.md)

## 実績/根拠

- Mobileチェックリスト雛形: [MOBILE_RELEASE_CHECKLIST_TEMPLATE.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/templates/MOBILE_RELEASE_CHECKLIST_TEMPLATE.md)
- ロールバック雛形: [ROLLBACK_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/templates/ROLLBACK_RUNBOOK.md)`,

    faq: `# よくある質問 (FAQ)

## よくある質問

### Q: API仕様やエンドポイント一覧はどこですか？
A: [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md) を参照してください。

### Q: MCP連携の仕様はどこですか？
A: [MCP Reference](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md) を参照してください。

### Q: 権限管理（owner/admin/memberやロール変更）の仕様はどこですか？
A: [Role Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md) と [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md) を参照してください。

### Q: モバイル配布やリリース運用はどこですか？
A: [MOBILE_RELEASE_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/MOBILE_RELEASE_RUNBOOK.md) を参照してください。

### Q: 通知が届かないときは何を見ればいいですか？
A: まず通知設定で \`OSプッシュ通知\`、\`デスクトップ通知\`、\`（Web）通知音\`、\`未読バッジ\` の状態を確認してください。スマホ通知は端末側の通知許可と Push Token 登録、ブラウザ通知は OS / ブラウザ権限も確認対象です。詳細は [Notifications Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/ARCHITECTURE_NOTIFICATIONS.md) と [Notifications Test Procedure](https://github.com/t012093/ai-note-meet/blob/main/docs/tests/TEST_PROCEDURE_NOTIFICATIONS.md) を参照してください。

### Q: 外部公開したページのリンクを止めたいですか？
A: ページ設定で \`Publish to Web\` を OFF にすると公開リンクを無効化できます。公開前提でないメモは \`プライベート\` かワークスペース共有のまま運用してください。仕様は [Project Document Operability Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_DOCUMENT_OPERABILITY_PHASE2_SPEC.md) を参照してください。

### Q: 外部カレンダー購読URLは再発行できますか？
A: できます。管理画面の \`外部カレンダー同期 (β)\` から購読URLを発行し、必要に応じて再発行または失効できます。仕様は [Calendar External Sync Phase1 Plan](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/CALENDAR_EXTERNAL_SYNC_PHASE1_PLAN.md) を参照してください。

### Q: 現在の文書体系全体はどこで確認できますか？
A: [docs/README.md](https://github.com/t012093/ai-note-meet/blob/main/docs/README.md) を参照してください。`,

    troubleshooting: `# トラブルシューティング

## 目的 / 結論 / 次アクション

- 目的: 障害の初動切り分けを、症状別runbookに最短で接続する。
- 結論: 接続障害・組織コンテキスト障害・自動化/認証障害は別runbookで扱う。
- 次アクション: まず症状を分類し、該当runbookの手順を先頭から実施する。

## 症状別の確認先

| 症状 | 一次確認ドキュメント |
| --- | --- |
| 画面起動が遅い / \`403\`が連続する | [ORG_CONTEXT_403_RECOVERY_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/ORG_CONTEXT_403_RECOVERY_RUNBOOK.md) |
| \`ERR_CONNECTION_TIMED_OUT\` / Backend到達不可 | [PRODUCTION_API_SYNC_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/PRODUCTION_API_SYNC_RUNBOOK.md) |
| AI/自動化の応答失敗 | [AUTH_RUNTIME_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/AUTH_RUNTIME_RUNBOOK.md) |
| 通知が届かない / デスクトップ通知が出ない | [Notifications Test Procedure](https://github.com/t012093/ai-note-meet/blob/main/docs/tests/TEST_PROCEDURE_NOTIFICATIONS.md) |
| 公開リンクを止めたい / 外部共有を見直したい | [Project Document Operability Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_DOCUMENT_OPERABILITY_PHASE2_SPEC.md) |
| 外部カレンダー購読URLを再発行・失効したい | [Calendar External Sync Phase1 Plan](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/CALENDAR_EXTERNAL_SYNC_PHASE1_PLAN.md) |
| モバイル接続/ゲートウェイ経路の問題 | [OPENCLAW_MOBILE_GATEWAY_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/OPENCLAW_MOBILE_GATEWAY_RUNBOOK.md) |

## 初動チェック（共通）

1. Frontendが参照しているAPIベースURLを確認する（ローカル/本番の混在を避ける）。
2. Networkタブで失敗したAPIのHTTPステータスとURLを控える。
3. \`Console\` ログの先頭エラーと発生時刻を記録する。
4. 再現条件（ユーザー、組織、画面、操作順）をまとめる。

## 症状別の短い切り分け

- 通知が届かない: メンション対象、通知設定、OS/ブラウザ通知権限、Push Token 登録を順に確認する。
- 公開リンクを止めたい: ページ設定で \`Publish to Web\` を OFF にし、必要ならページ自体の共有範囲も見直す。
- カレンダー購読URLを差し替えたい: 管理画面で URL を再発行し、旧URLは失効させる。

## 問い合わせ時に添える情報

- 失敗したURLとHTTPステータス
- 発生時刻（タイムゾーン付き）
- 画面パス（例: \`/o/<slug>/chat\`）
- 再現手順と影響範囲`
  };

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredMenu = normalizedSearchQuery
    ? menu
        .map((group) => {
          const groupMatches = group.title.toLowerCase().includes(normalizedSearchQuery);
          const items = group.items.filter((item) => {
            if (groupMatches) return true;
            const labelMatches = item.label.toLowerCase().includes(normalizedSearchQuery);
            const contentMatches = (docsContent[item.id] || '').toLowerCase().includes(normalizedSearchQuery);
            return labelMatches || contentMatches;
          });
          return { ...group, items };
        })
        .filter((group) => group.items.length > 0)
    : menu;

  const firstSearchResultId = filteredMenu[0]?.items[0]?.id || null;
  const currentContent = docsContent[activeId] || "# Under Construction\n\nこのセクションのドキュメントは現在準備中です。";

  const flatItems = menu.flatMap(g => g.items);
  const currentIndex = flatItems.findIndex(i => i.id === activeId);
  const prevDoc = flatItems[currentIndex - 1];
  const nextDoc = flatItems[currentIndex + 1];
  const docsQuickLinks = [
    {
      title: 'Web から始める',
      body: 'いちばん早い正規入口です。まず workspace に入るならここから。',
      href: WEB_APP_URL,
      external: true,
      icon: Globe,
    },
    {
      title: 'Desktop 導線',
      body: releaseVersion
        ? `公開版 v${releaseVersion}${publishedAt ? ` / ${publishedAt}` : ''}`
        : '公開リリースノートと導入手順を確認できます。',
      href: DESKTOP_RELEASE_NOTES_PATH,
      external: false,
      icon: Download,
    },
    {
      title: 'モバイル案内',
      body: 'iOS 先行、Android preview の提供状況を確認します。',
      href: '/mobile',
      external: false,
      icon: Smartphone,
    },
  ];

  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markdownComponents: Components = {
    // Custom Code Block with "Mac Window" style
    code: (props) => {
      const {children, className, ...rest} = props;
      // If it's inline code (no className usually, or not block)
      const match = /language-(\w+)/.exec(className || '');
      // If it is a block code (has language class or is multiline likely)
      // ReactMarkdown often passes `inline` prop but we check logic here.
      // Simply: if it has newlines or a language class, treat as block.
      const isBlock = match || String(children).includes('\n');

      if (isBlock) {
        return <CodeBlock className={className || ''}>{children}</CodeBlock>;
      }
      
      return (
         <code className="px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 font-bold border border-indigo-100/50 text-[0.9em]" {...rest}>
           {children}
         </code>
      );
    },
    pre: ({children}) => <>{children}</>, // Let code component handle the block wrapper
    
    // Custom Blockquote ("Callout" style)
    blockquote: ({children}) => <CustomBlockquote>{children}</CustomBlockquote>,

    // Custom Table
    table: ({children}) => <CustomTable>{children}</CustomTable>,
    thead: ({children}) => <thead className="bg-slate-50 border-b border-slate-100 uppercase tracking-wider text-xs font-bold text-slate-500">{children}</thead>,
    th: ({children}) => <th className="px-6 py-4">{children}</th>,
    td: ({children}) => <td className="px-6 py-4 border-b border-slate-50">{children}</td>,
    tr: ({children}) => <tr className="hover:bg-slate-50/50 transition-colors even:bg-slate-50/30">{children}</tr>,

    // Enhanced Headings
    h1: ({children}) => (
      <h1 className="text-4xl lg:text-5xl font-black mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-900 leading-[1.2] pb-1">
        {children}
      </h1>
    ),
    h2: ({children}) => (
      <h2 className="text-2xl font-black text-slate-800 mt-16 mb-6 pb-4 border-b-2 border-slate-100 flex items-center">
        <span className="bg-indigo-600 w-2 h-6 rounded-full mr-3 inline-block"></span>
        {children}
      </h2>
    ),
    h3: ({children}) => <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4">{children}</h3>,
    
    // Links
    a: ({children, href}) => (
      <a href={href} className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline decoration-2 decoration-indigo-200 underline-offset-4 transition-all">
        {children}
      </a>
    ),
    
    // Lists
    ul: ({children}) => <ul className="list-disc pl-6 space-y-2 text-slate-600 marker:text-indigo-400">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-6 space-y-2 text-slate-600 marker:text-indigo-600 marker:font-bold">{children}</ol>,
    li: ({children}) => <li className="pl-2">{children}</li>,

    // Images with styling
    img: ({src, alt}) => (
      <div className="my-10 group relative flex justify-center">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl inline-block">
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full h-auto block mx-auto"
            />
            {alt && (
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs font-bold text-slate-500 text-center uppercase tracking-widest">
                {alt}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="pt-16 min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px]" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 blur-[100px]" />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row relative z-10">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 lg:static lg:block lg:z-0 lg:bg-transparent lg:border-r-0
          transform transition-transform duration-300 lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto px-6 py-10 custom-scrollbar">
            <div className="lg:hidden flex justify-between items-center mb-8">
               <span className="font-black text-xl text-indigo-900 tracking-tighter">Nexloom Docs</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>

            <div className="mb-10 relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="ドキュメントを検索..." 
                 className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && firstSearchResultId) {
                     handleSelect(firstSearchResultId);
                   }
                   if (e.key === 'Escape') {
                     setSearchQuery('');
                   }
                 }}
               />
            </div>

            <nav className="space-y-12 pb-10">
              {filteredMenu.map((group) => (
                <div key={group.title}>
                  <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSelect(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all group relative overflow-hidden ${ 
                              isActive
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-md hover:shadow-slate-200/50'
                            }`}
                          >
                            <div className="flex items-center relative z-10">
                               <item.icon size={18} className={`mr-3 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                               <span>{item.label}</span>
                            </div>
                            {isActive && (
                              <motion.div 
                                layoutId="sidebar-active"
                                className="absolute inset-0 bg-indigo-600 rounded-xl -z-0"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {normalizedSearchQuery && filteredMenu.length === 0 && (
                <div className="px-4 py-6 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
                  「{searchQuery}」に一致する項目は見つかりませんでした。
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-white/50 lg:bg-transparent">
          {/* Mobile Header Bar */}
          <div className="lg:hidden sticky top-16 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center space-x-2 text-sm font-bold text-indigo-600"
            >
              <Menu size={18} />
              <span>Menu</span>
            </button>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate max-w-[200px]">
              {flatItems.find(i => i.id === activeId)?.label}
            </div>
          </div>

          <div className="max-w-[960px] mx-auto px-6 lg:px-16 py-12 lg:py-20">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 overflow-hidden rounded-[2.6rem] border border-slate-200 bg-[linear-gradient(145deg,#0f172a_0%,#1e1b4b_58%,#4338ca_100%)] p-8 text-white shadow-[0_32px_90px_-52px_rgba(15,23,42,0.72)] lg:p-10"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-100">
                    <Sparkles size={16} />
                    Documentation Gateway
                  </div>
                  <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                    何を見ればよいかを、
                    <br />
                    最初に迷わせない。
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-indigo-100/88 md:text-lg">
                    この Docs は、実装仕様そのものではなく「正本ドキュメントへの入口」です。
                    Web の使い始め、Desktop の公開導線、Mobile の提供状況、運用仕様への接続をここからまとめて辿れます。
                  </p>
                </div>
                <div className="grid gap-3 sm:min-w-[280px]">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">Current Desktop</div>
                    <div className="mt-2 text-2xl font-black">{releaseVersion ? `v${releaseVersion}` : 'Release Ready'}</div>
                    <div className="mt-1 text-sm text-indigo-100/75">
                      {publishedAt ? `公開: ${publishedAt}` : '公開リリースを案内中'}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">Docs Policy</div>
                    <div className="mt-2 text-sm leading-6 text-indigo-100/82">
                      サイト Docs は入口、実装と運用の正本は `ai-note-meet/docs` を見る方針です。
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {docsQuickLinks.map((item) => {
                  const content = (
                    <>
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <item.icon size={22} />
                      </div>
                      <div className="mt-6 text-xl font-black">{item.title}</div>
                      <div className="mt-3 text-sm leading-7 text-indigo-100/82">{item.body}</div>
                      <div className="mt-6 flex items-center text-sm font-bold text-cyan-200">
                        開く
                        <ArrowRight size={16} className="ml-1" />
                      </div>
                    </>
                  );

                  if (item.external) {
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1 hover:bg-white/10"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <RouterLink
                      key={item.title}
                      to={item.href}
                      className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1 hover:bg-white/10"
                    >
                      {content}
                    </RouterLink>
                  );
                })}
              </div>
            </motion.section>
            
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
               <span className="hover:text-slate-600 cursor-pointer transition-colors">Docs</span>
               <ChevronRight size={12} />
               <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {flatItems.find(i => i.id === activeId)?.label || 'Content'}
               </span>
            </nav>

            <AnimatePresence mode="wait">
               <motion.div 
                 key={activeId}
                 initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                 animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                 transition={{ duration: 0.3, ease: "easeOut" }}
               >
                 <article className="min-h-[60vh]">
                   <ReactMarkdown 
                     remarkPlugins={[remarkGfm]}
                     components={markdownComponents}
                   >
                     {currentContent}
                   </ReactMarkdown>
                 </article>

                 {/* Pagination / Next Steps */}
                 <div className="mt-24 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {prevDoc ? (
                      <button 
                        onClick={() => handleSelect(prevDoc.id)}
                        className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group"
                      >
                         <span className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-hover:text-indigo-500 transition-colors">
                            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Previous
                         </span>
                         <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{prevDoc.label}</span>
                      </button>
                    ) : <div />}

                    {nextDoc ? (
                      <button 
                        onClick={() => handleSelect(nextDoc.id)}
                        className="flex flex-col items-end p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 text-right group"
                      >
                         <span className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-hover:text-indigo-500 transition-colors">
                            Next <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                         </span>
                         <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{nextDoc.label}</span>
                      </button>
                    ) : <div />}
                 </div>

                 {/* Helpful / Community Section */}
                 <div className="mt-20 p-10 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-900/20 text-white relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative z-10">
                       <h4 className="text-2xl font-black mb-2">Need more help?</h4>
                       <p className="text-indigo-200 font-medium">Join our community or contact support.</p>
                    </div>
                    <div className="flex gap-4 relative z-10">
                       <a href="https://github.com/t012093/nexloom-site/issues" target="_blank" className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center backdrop-blur-sm">
                          <span className="mr-2">GitHub</span>
                          <ExternalLink size={16} />
                       </a>
                       <button className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/30 flex items-center">
                          <MessageSquare size={18} className="mr-2" /> Discord
                       </button>
                    </div>
                 </div>
               </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Right Sidebar (Table of Contents) - Only on large screens */}
        <aside className="hidden xl:block w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-16 px-8 custom-scrollbar">
           <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
              <Hash size={12} className="mr-2" />
              On this page
           </div>
           <nav className="space-y-4 relative border-l border-slate-200 ml-1">
              {/* Mock TOC - Real implementation would parse markdown AST */}
              <div className="pl-4 border-l-2 border-indigo-600 -ml-[2px] py-1">
                 <a href="#" className="text-sm font-bold text-indigo-600 block">Overview</a>
              </div>
              <div className="pl-4 border-l-2 border-transparent hover:border-slate-300 -ml-[2px] py-1 transition-colors">
                 <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 block transition-colors">Architecture</a>
              </div>
              <div className="pl-4 border-l-2 border-transparent hover:border-slate-300 -ml-[2px] py-1 transition-colors">
                 <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 block transition-colors">Key Features</a>
              </div>
           </nav>
        </aside>

      </div>
    </div>
  );
};

export default DocsPage;
