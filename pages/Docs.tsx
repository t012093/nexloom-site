import React, { useState, useEffect, useId } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Book, 
  Search, 
  MessageSquare, 
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
  Info
} from 'lucide-react';

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
        { id: 'meetings', label: '会議とAI議事録', icon: Video },
      ]
    },
    {
      title: 'プロジェクト管理',
      items: [
        { id: 'projects', label: 'プロジェクトの作成', icon: Briefcase },
        { id: 'tasks', label: 'タスクとボード', icon: CheckSquare },
        { id: 'task_agents', label: 'AIエージェント', icon: Bot },
      ]
    },
    {
      title: 'ナレッジベース',
      items: [
        { id: 'pages', label: 'ページと階層構造', icon: FileText },
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

- 目的: 初期利用時に必要な導線を短く示し、実装同期した手順へ接続する。
- 結論: 起動手順は README、運用前提は組織/権限仕様を正本にする。
- 次アクション: 環境準備 -> 組織コンテキスト確認 -> 最初のプロジェクト作成の順で進める。

## 実行ステップ

1. 利用環境を決める（Web / Desktop / Mobile）。
2. 起動手順を [README](https://github.com/t012093/ai-note-meet/blob/main/README.md) または [apps/mobile/README.md](https://github.com/t012093/ai-note-meet/blob/main/apps/mobile/README.md) で確認する。
3. 初回ログイン後、組織とロールの前提を [Multi-tenant Organization Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MULTI_TENANT_ORGANIZATION_SPEC.md) と [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md) で確認する。
4. 最初の運用単位としてプロジェクトを作成し、タスク運用は [Project Ops Board Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_OPS_BOARD_SPEC.md) を参照する。

## 参照先

- [Docs Index](https://github.com/t012093/ai-note-meet/blob/main/docs/README.md)
- [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Mobile Release Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/MOBILE_RELEASE_RUNBOOK.md)`,

    install: `# 利用方法とインストール

## 目的 / 結論 / 次アクション

- 目的: 利用開始の導線を最短で示す。
- 結論: 最新配布物と起動手順は GitHub Releases と本体 README を正本として参照する。
- 次アクション: 利用環境（Web / Desktop / Mobile）に合わせて以下リンクから手順を選ぶ。

## Web版

- すぐに試す: [Webアプリを開く](https://ai-note-meet.vercel.app/)

## Desktop版

- 配布物: [GitHub Releases](https://github.com/t012093/ai-note-meet/releases)
- 起動と開発者向けセットアップ: [README](https://github.com/t012093/ai-note-meet/blob/main/README.md)

## Mobile版（iOS/Android）

- 概要とセットアップ: [apps/mobile/README.md](https://github.com/t012093/ai-note-meet/blob/main/apps/mobile/README.md)
- 運用Runbook: [MOBILE_RELEASE_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/MOBILE_RELEASE_RUNBOOK.md)

## 注意

- このページは入口です。配布形式や審査要件の最新状態は、上記の正本ドキュメントを参照してください。
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

## 目的 / 結論 / 次アクション

- 目的: プロフィールロールと組織/プロジェクトロールの境界を明確にする。
- 結論: プロフィール表示項目と権限判定ロールは分けて管理する。
- 次アクション: 変更時は UI 操作と API 制約の両方を確認する。

## 運用ポイント

- プロフィールロール（Member/Operator/Manager/Admin/Guest）は表示・運用上の役割分類。
- 組織ロール（owner/admin/member）とプロジェクトロールは、アクセス制御に直結する。
- 最後のowner制約など、変更不可条件は API spec 側のルールを優先する。

## 正本ドキュメント

- [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md)
- [Role Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md)
- [Membership Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MEMBERSHIP_MANAGEMENT_API_SPEC.md)`,

    channels: `# チャンネルとチャット

## 目的 / 結論 / 次アクション

- 目的: チャンネルとチャットの仕様参照先を明確にする。
- 結論: 実際の挙動は API 仕様と通知アーキテクチャを正本として確認する。
- 次アクション: チャット関連の変更時は、API仕様と通知テスト手順を同時更新する。

## 概要

- チャンネル、メッセージ、未読管理、通知は組織コンテキストで運用されます。
- UIの表示名や導線は改善されることがあるため、実装依存の細部は正本資料を参照してください。

## 正本ドキュメント

- [API Overview (Channels / Messages / Notifications)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Notifications Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/ARCHITECTURE_NOTIFICATIONS.md)
- [Notifications Test Procedure](https://github.com/t012093/ai-note-meet/blob/main/docs/tests/TEST_PROCEDURE_NOTIFICATIONS.md)`,

    meetings: `# 会議とAI議事録

## 目的 / 結論 / 次アクション

- 目的: 会議機能とAI議事録の実装参照先を統一する。
- 結論: 会議基盤は LiveKit 系アーキテクチャ、議事録処理は Meeting AI の仕様を正本とする。
- 次アクション: 会議体験や要約ロジック変更時は、関連specとrunbookの更新をセットで行う。

## 概要

- 会議、録画、要約生成は複数コンポーネントで連携するため、UI説明だけでは仕様を固定できません。
- 運用判断や障害対応は、下記の正本ドキュメントを優先してください。

## 正本ドキュメント

- [LiveKit Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/LIVEKIT_ARCHITECTURE.md)
- [Meeting AI Unified Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MEETING_AI_AGENDA_ASSISTANT_MINUTES_UNIFIED_SPEC.md)
- [OpenClaw Mobile Gateway Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/OPENCLAW_MOBILE_GATEWAY_RUNBOOK.md)`,

    projects: `# プロジェクトの作成

## 目的 / 結論 / 次アクション

- 目的: プロジェクト運用の基本単位と仕様参照先を明確にする。
- 結論: プロジェクト作成/権限/運用ルールは API + spec を正本として確認する。
- 次アクション: 作成前に対象組織、メンバー権限、関連タスク運用の責任者を決める。

## 概要

- プロジェクトは、メンバー、チャンネル、ページ、タスクを束ねる運用単位です。
- 詳細なUI手順や項目名は変更される可能性があるため、固定文ではなく一次資料を優先します。

## 実行プロセス

1. API上の動作を [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md) で確認する。
2. ボード運用方針を [Project Ops Board Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_OPS_BOARD_SPEC.md) で確認する。
3. 組織境界と権限は [Multi-tenant Organization Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MULTI_TENANT_ORGANIZATION_SPEC.md) を参照する。
4. 役割運用は [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md) を参照する。`,

    tasks: `# タスクとボード

## 目的 / 結論 / 次アクション

- 目的: タスク管理仕様とAI補助仕様の参照先を明確にする。
- 結論: ステータス遷移・ボード運用・AI提案は spec を正本として扱う。
- 次アクション: タスク運用ルール変更時は API + spec + UI文言の3点を同時更新する。

## 概要

- タスクはプロジェクト運用の中心で、ステータス遷移・担当割当・AI提案が連携します。
- 表示名や補助機能は改善されるため、固定文よりも正本参照を優先してください。

## 正本ドキュメント

- [API Overview (Tasks)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Project Ops Board Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_OPS_BOARD_SPEC.md)
- [AI Task Suggestion Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AI_TASK_SUGGESTION_SPEC.md)`,

    task_agents: `# AIエージェント

## 目的 / 結論 / 次アクション

- 目的: タスク実行系AIの仕様参照先を統一する。
- 結論: 実行フロー、状態遷移、API契約は task/automation spec を正本にする。
- 次アクション: エージェント挙動変更時は API spec と実行アーキテクチャを同時更新する。

## 概要

- タスクエージェントは、タスク詳細からの実行、AIログ記録、状態遷移を組み合わせて運用される。
- 自動化実行は backend runtime と認証プロファイル運用の影響を受ける。

## 正本ドキュメント

- [Task Agent Execution Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/TASK_AGENT_EXECUTION_ARCHITECTURE.md)
- [Automation API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AUTOMATION_API_SPEC.md)
- [Automation Scheduler User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/AUTOMATION_SCHEDULER_USER_GUIDE.md)
- [Automation Scheduler Developer Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/AUTOMATION_SCHEDULER_DEVELOPER_GUIDE.md)`,

    pages: `# ページと階層構造

## 目的 / 結論 / 次アクション

- 目的: ページ運用（読取/検索/公開）の参照先を明確にする。
- 結論: ページ運用は project-document 系specと API を正本にする。
- 次アクション: 公開運用や検索精度の変更時は page spec と runbook を同時に確認する。

## 概要

- ページはプロジェクトとの関連、公開URL、権限制御、RAG索引の影響を受ける。
- 表示項目やエディタ操作は変わり得るため、挙動確認は一次仕様を優先する。

## 正本ドキュメント

- [API Overview (Pages)](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [Project Document Operability Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_DOCUMENT_OPERABILITY_PHASE2_SPEC.md)
- [Page Body RAG Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PAGE_BODY_RAG_PHASE2_SPEC.md)
- [MCP Docs Operation Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_DOCS_OPERATION_SPEC.md)`,

    editor: `# ブロックエディタ

## 目的 / 結論 / 次アクション

- 目的: エディタ操作とデータ保存仕様の参照先を統一する。
- 結論: ブロック編集、添付ファイル、抽出処理は API/spec 側を正本にする。
- 次アクション: 仕様変更時は保存形式・抽出ジョブ・検索経路への影響を確認する。

## 概要

- エディタはページ本文管理とアセット連携（画像/ファイル）を含む。
- 本文は検索・要約機能とも接続されるため、保存仕様の変更は横断影響がある。

## 正本ドキュメント

- [Project Document Operability Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PROJECT_DOCUMENT_OPERABILITY_PHASE2_SPEC.md)
- [Asset Storage and Extraction Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ASSET_STORAGE_AND_EXTRACTION_SPEC.md)
- [Page Body RAG Phase2 Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/PAGE_BODY_RAG_PHASE2_SPEC.md)`,

    databases: `# データベース

## 目的 / 結論 / 次アクション

- 目的: 構造化データ運用の参照先を明確にし、実装との差分を減らす。
- 結論: データモデル・RLS・抽出/検索の仕様は SQL/spec 文書を正本とする。
- 次アクション: スキーマ変更時は SQL docs と API/spec の整合性を先に確認する。

## 概要

- 構造化データは API、SQL、RLS、検索基盤が連動して成立する。
- UI上の見え方は変わるため、データ定義や制約は一次資料で確認する。

## 正本ドキュメント

- [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md)
- [SQL Docs Index](https://github.com/t012093/ai-note-meet/blob/main/docs/sql/README.md)
- [Asset Storage and Extraction Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ASSET_STORAGE_AND_EXTRACTION_SPEC.md)
- [RAG Project Intelligence Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/RAG_PROJECT_INTELLIGENCE_SPEC.md)`,

    ai_assistant: `# AIコンパニオン

## 目的 / 結論 / 次アクション

- 目的: AIチャット/自動化機能の参照先を統一し、運用時の切り分けを容易にする。
- 結論: AIコンパニオンの挙動は automation API と runtime architecture を正本にする。
- 次アクション: 反応遅延や失敗時は API と runtime runbook をセットで確認する。

## 概要

- AIコンパニオンは会話系API、文脈組み立て、実行ランタイムの連携で成立する。
- 提供モデルやfallback経路は運用環境で変わるため、固定文で断定しない。

## 正本ドキュメント

- [Automation API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/AUTOMATION_API_SPEC.md)
- [LLM Automation Architecture](https://github.com/t012093/ai-note-meet/blob/main/docs/architecture/LLM_AUTOMATION_ARCHITECTURE.md)
- [OpenClaw AI Chat and Meeting Chat Brushup Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/OPENCLAW_AI_CHAT_AND_MEETING_CHAT_BRUSHUP_SPEC.md)
- [Auth Runtime Runbook](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/AUTH_RUNTIME_RUNBOOK.md)`,

    mcp: `# MCP連携

Nexloomは **Model Context Protocol (MCP)** に対応しており、外部のAIモデルやエージェントからNexloomの操作が可能です。

## MCPとは
Anthropic社などが提唱する、AIモデルとアプリケーションを接続するための標準プロトコルです。

## 提供しているツール
Nexloom MCP Serverは以下のツールを公開しています：

| ツール名 | 説明 |
| --- | --- |
| \`list_tasks\` | プロジェクトのタスク一覧を取得 |
| \`create_task\` | 新しいタスクを作成 |
| \`read_page\` | ページの内容をMarkdownとして取得 |
| \`send_message\` | 指定チャンネルにメッセージを投稿 |

## 設定方法
\`claude_desktop_config.json\` 等にNexloomのMCPエンドポイントを設定することで、Claudeデスクトップアプリ等からNexloomを操作できるようになります。
詳細な設定手順は [MCP Reference（ai-note-meet）](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md) を参照してください。`,

    lineworks: `# LINE WORKS連携

## 目的 / 結論 / 次アクション

- 目的: LINE WORKS連携の設定/運用の正本導線を明確にする。
- 結論: 連携仕様は integration guide・API overview・SQL定義を正本にする。
- 次アクション: 有効化前に webhook URL、リンク対象、DBテーブル適用状況を確認する。

## 概要

- LINE WORKS連携は webhook受信、チャンネル/プロジェクト/ユーザーリンク、送信ログ管理で構成される。
- 環境ごとに設定値（URL/認証情報）が異なるため、必ず環境別に手順を確認する。

## 正本ドキュメント

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
- 次アクション: MCPツール追加時は契約ドキュメントを同時更新する。

## 実行プロセス

1. [MCP Reference](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md) を確認する。
2. ツール契約は [MCP Tools Contract](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_TOOLS_CONTRACT.md) を確認する。
3. Docs操作系MCPは [MCP Docs Operation Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_DOCS_OPERATION_SPEC.md) を確認する。

## 実績/根拠

- MCPガイド: [docs/GUIDE_MCP_AND_TASKS.md](https://github.com/t012093/ai-note-meet/blob/main/docs/GUIDE_MCP_AND_TASKS.md)
- MCP実装仕様: [docs/spec/MCP_OPERATION_EXPANSION_SPEC.md](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/MCP_OPERATION_EXPANSION_SPEC.md)`,

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

## 目的 / 結論 / 次アクション

- 目的: 変更されやすい質問を正本ドキュメントへ誘導し、誤情報を減らす。
- 結論: 料金・権限・配布方式など運用依存の項目は固定文で断定しない。
- 次アクション: 以下のFAQ導線から最新の一次情報を確認する。

## よくある確認先

### Q: API仕様やエンドポイント一覧はどこですか？
A: [API Overview](https://github.com/t012093/ai-note-meet/blob/main/docs/API_OVERVIEW.md) を参照してください。

### Q: MCP連携の仕様はどこですか？
A: [MCP Reference](https://github.com/t012093/ai-note-meet/blob/main/docs/MCP_REFERENCE.md) を参照してください。

### Q: 権限管理（owner/admin/memberやロール変更）の仕様はどこですか？
A: [Role Management API Spec](https://github.com/t012093/ai-note-meet/blob/main/docs/spec/ROLE_MANAGEMENT_API_SPEC.md) と [Role Management User Guide](https://github.com/t012093/ai-note-meet/blob/main/docs/guides/ROLE_MANAGEMENT_USER_GUIDE.md) を参照してください。

### Q: モバイル配布やリリース運用はどこですか？
A: [MOBILE_RELEASE_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/MOBILE_RELEASE_RUNBOOK.md) を参照してください。

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
| モバイル接続/ゲートウェイ経路の問題 | [OPENCLAW_MOBILE_GATEWAY_RUNBOOK.md](https://github.com/t012093/ai-note-meet/blob/main/docs/ops/runbooks/OPENCLAW_MOBILE_GATEWAY_RUNBOOK.md) |

## 初動チェック（共通）

1. Frontendが参照しているAPIベースURLを確認する（ローカル/本番の混在を避ける）。
2. Networkタブで失敗したAPIのHTTPステータスとURLを控える。
3. \`Console\` ログの先頭エラーと発生時刻を記録する。
4. 再現条件（ユーザー、組織、画面、操作順）をまとめる。

## 問い合わせ時に添える情報

- 失敗したURLとHTTPステータス
- 発生時刻（タイムゾーン付き）
- 画面パス（例: \`/o/<slug>/chat\`）
- 再現手順と影響範囲`
  };

  const currentContent = docsContent[activeId] || "# Under Construction\n\nこのセクションのドキュメントは現在準備中です。";

  const flatItems = menu.flatMap(g => g.items);
  const currentIndex = flatItems.findIndex(i => i.id === activeId);
  const prevDoc = flatItems[currentIndex - 1];
  const nextDoc = flatItems[currentIndex + 1];

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
                 placeholder="Search docs..." 
                 className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>

            <nav className="space-y-12 pb-10">
              {menu.map((group) => (
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
