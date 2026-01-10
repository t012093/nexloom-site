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
      title: 'サポート',
      items: [
        { id: 'faq', label: 'よくある質問', icon: HelpCircle },
        { id: 'troubleshooting', label: 'トラブルシューティング', icon: AlertTriangle },
      ]
    }
  ];

  const docsContent: Record<string, string> = {
    intro: `# Nexloomへようこそ

Nexloom（ネクスルーム）は、チームのコラボレーション、ドキュメント作成、プロジェクト管理を一つの場所に集約した統合プラットフォームです。

## 🚀 私たちのビジョン

現代のチーム開発において、情報は常に「分断」されています。
チャットアプリでの決定事項は流れ去り、ドキュメントツールは更新が滞り、プロジェクト管理ツールは実態と乖離していきます。

Nexloomはその壁を取り払い、**「会話からナレッジを即座に生成し、共有する」**ことを可能にします。

> **Note**: Nexloomは現在パブリックベータ版です。フィードバックを積極的に募集しています。

### Nexloomの3つの柱

1. **Unification (統合)**
   すべての仕事道具を1つのウィンドウに。アプリの切り替えによるコンテキストスイッチを最小限に抑えます。

2. **AI-Native (AIネイティブ)**
   Google Gemini APIを中核に据え、議事録作成や要約、ナレッジの抽出をAIが自動化します。

3. **Privacy-First (プライバシー重視)**
   データはローカルと、あなたが管理する暗号化されたクラウドに。プライバシーを最優先に設計されています。`,

    concept: `# コンセプトと仕組み

Nexloomのアーキテクチャとデータの流れについて解説します。

## アーキテクチャ概要

Nexloomは「ローカルファースト」かつ「AIネイティブ」な設計を採用しています。

\`\`\`mermaid
graph TD
    User[ユーザー] --> Client[Nexloom Client]
    Client --> Backend[Backend Server]
    
    subgraph "Data Layer"
        Backend --> DB[Supabase DB]
        Backend --> Vector[Vector DB]
    end
    
    subgraph "AI Core"
        Backend --> Gemini[Google Gemini 2.0]
        Backend --> Agents[AI Agents]
    end
    
    subgraph "Realtime & Media"
        Client --> LiveKit[LiveKit Server]
        LiveKit --> Backend
    end
\`\`\`

### 主なコンポーネント

- **Client**: React + Viteで構築されたモダンなフロントエンド。デスクトップアプリとして動作します。
- **Backend**: FastAPIによるPythonバックエンド。ビジネスロジックとAI処理を担当します。
- **Supabase**: データベース、認証、ストレージを提供するBaaS基盤。
- **LiveKit**: 低遅延のビデオ会議とリアルタイム音声処理を実現するインフラ。

## データの流れ

1. **チャット/ドキュメント**: WebSocketを通じてリアルタイムに同期されます。
2. **AI処理**: 会議の録音データやタスクの指令はバックエンドに送られ、Geminiモデルによって処理された後、結果がデータベースに保存されます。`,

    start: `# クイックスタート

Nexloomを使い始めるためのステップを解説します。

## 1. アカウントのセットアップ
アプリを起動すると、ログイン画面が表示されます。
初回起動時は「Sign Up」を選択し、メールアドレスとパスワードでアカウントを作成してください。

![新規登録画面](/screenshots/signup.png)

その後、オンボーディング画面で以下の設定を行います：
- **表示名**: チームメンバーに表示される名前
- **ロール**: エンジニア、デザイナーなどの役割

![基本情報の設定](/screenshots/onboarding_basic.png)

- **MBTI/性格**: AIエージェントがあなたとのコミュニケーションを最適化するために使用します

![働き方の設定](/screenshots/onboarding_style.png)

## 2. 次のステップ
アカウントの準備ができたら、まずはプロジェクトを作成しましょう。
詳しくは [プロジェクトの作成](#projects) をご覧ください。`,

    install: `# 利用方法とインストール

Nexloomは、Webブラウザでそのまま利用するか、専用のデスクトップアプリをインストールして利用できます。

## 🌐 Web版 (推奨)
インストール不要で、最新の機能をすぐに利用できます。
[Webアプリを起動](/app)

## 🖥 デスクトップアプリ版
OSネイティブの通知や、より高度なショートカット機能を利用したい場合は、デスクトップ版のインストールを推奨します。

### macOS

> **⚠️ 重要: 初回起動時の注意**
> 現在、デスクトップアプリ版はAppleの公証（Notarization）プロセス中のため、通常のダブルクリックでは「開発元を検証できないため開けません」というセキュリティ警告が表示されます。
> 以下の手順で起動してください。

1. [ダウンロードページ](/download)から \`.dmg\` ファイルをダウンロードし、インストール（アプリケーションフォルダへドラッグ）します。
2. アプリケーションフォルダ内のNexloomアイコンを **右クリック（または Controlキー + クリック）** します。
3. 表示されるメニューから **「開く」** を選択します。
4. 警告ダイアログが表示されますが、そのまま **「開く」** をクリックしてください。

※ 一度この手順で許可すると、次回以降は通常通り起動できるようになります。

### Windows
1. [ダウンロードページ](/download)から \`.exe\` インストーラーをダウンロードします。
2. インストーラーを実行し、画面の指示に従ってください。
   - *Windows SmartScreenの警告が表示される場合は、「詳細情報」をクリックし、「実行」を選択してください。*

### Linux
Linux版は \`.AppImage\` 形式で提供されています。
\`\`\`bash
chmod +x Nexloom-x.x.x.AppImage
./Nexloom-x.x.x.AppImage
\`\`\`
`,

    ui_tour: `# 画面の見方

Nexloomのインターフェースは、情報のアクセスしやすさを重視して設計されています。

## サイドバー (左側)
アプリケーションの主要なナビゲーションエリアです。

![ナビゲーション](/screenshots/tour_nav.png)

- **Global Navigation**: ホーム、チャット、タスク、カレンダーなどのビュー切り替え。
- **Projects**: 参加しているプロジェクトの一覧。

![プロジェクト一覧](/screenshots/ui_projects_list.png)

- **Channels**: 現在のコンテキスト（プロジェクト等）に関連するチャットチャンネル。

![チャンネル一覧](/screenshots/ui_channels_list.png)

- **Pages**: ドキュメントの階層ツリー。

## ヘッダー / その他
- **Search**: ワークスペース全体から情報を検索します。

![検索機能](/screenshots/tour_search.png)

- **Notifications**: 自分へのメンションや返信を確認できます。

![通知機能](/screenshots/tour_notify.png)

## アクティビティバー (右側)
補助的な情報やツールを表示します（設定でトグル可能）。
- **Members**: オンラインメンバーの一覧。
- **Thread**: チャットのスレッド表示。
- **AI Chat**: AIアシスタントとの対話画面。`,

    profiles: `# プロフィール設定

チームメンバーに自分の状態を知らせるためのプロフィール設定について。

## ステータスの変更
サイドバー下部の自分のアイコンをクリックすると、ステータスを変更できます。

![ステータスとプロフィール](/screenshots/tour_profile.png)

- **🟢 Online**: オンライン・作業中
- **🔴 Busy**: 取り込み中（通知がミュートされます）
- **🟡 Away**: 離席中
- **⚪ Offline**: オフライン

## プロフィール編集
「Settings」>「Profile」から以下の情報を編集できます。
- **アバター画像**: 画像のアップロード
- **表示名**: 名前
- **役職/ロール**: チーム内での役割
- **性格特性**: AIとの対話調整用パラメータ`,

    channels: `# チャンネルとチャット

リアルタイムなコミュニケーション機能について解説します。

## チャンネルの種類
- **# General**: プロジェクト作成時に自動生成される全体チャンネル。
- **🔒 Private**: 招待されたメンバーのみが閲覧できるチャンネル。
- **📢 Announcements**: 管理者のみが投稿できる周知用チャンネル。

![チャンネル一覧](/screenshots/ui_channels_list.png)

## メッセージ機能
### スレッド (Thread)
メッセージに対して「返信」アイコンをクリックすると、スレッドが開始されます。メインのタイムラインを汚さずに詳細な議論を行えます。

### メンション
- \`@username\`: 特定のユーザーに通知を送ります。
- \`@channel\`: チャンネル参加者全員に通知を送ります。

### リアクション
メッセージにカーソルを合わせ、絵文字アイコンをクリックすることで、リアクションを追加できます。`,

    meetings: `# 会議とAI議事録

Nexloomの最も強力な機能の一つである、統合された会議システムについて解説します。

## 会議のフロー

\`\`\`mermaid
sequenceDiagram
    participant User
    participant LiveKit
    participant Backend
    participant Gemini
    
    User->>LiveKit: 会議開始
    User->>LiveKit: 録画開始
    LiveKit-->>Backend: ストリーム送信
    User->>LiveKit: 会議終了
    LiveKit->>Backend: 録画ファイル転送
    Backend->>Gemini: 音声データを送信
    Gemini-->>Backend: 文字起こし & 要約生成
    Backend->>User: 議事録ページを作成・通知
\`\`\`

## 手順
1. **会議を開始**: チャンネル右上のビデオアイコン、または \`/meet start\` コマンドで開始します。
2. **画面共有**: 必要に応じて画面を共有します。
3. **AI記録**: 画面上の「Start Recording」ボタンを押すと、AIによる記録が始まります。
4. **自動生成**: 会議終了後、数分以内に「議事録」フォルダに新しいページが生成されます。これには以下が含まれます：
    - 全文の文字起こし
    - 議論の要約
    - 決定事項リスト
    - ネクストアクション`,

    projects: `# プロジェクトの作成

ワークスペース内での活動単位である「プロジェクト」について。

## プロジェクトとは
Nexloomにおけるプロジェクトは、特定の目的（例：製品開発、マーケティングキャンペーン）のために集まったメンバー、タスク、ドキュメント、チャットの集合体です。

![プロジェクト管理](/screenshots/tour_projects.png)

## 作成手順
1. サイドバーの **Projects +** をクリック。
2. 基本情報を入力し、初期メンバーを招待します。
3. プロジェクトが作成されると、専用のダッシュボードが表示されます。

## プロジェクト設定
プロジェクト名の横の「...」メニューから設定にアクセスできます。
- **メンバー管理**: メンバーの追加・削除、権限変更。
- **アーカイブ**: プロジェクトを読み取り専用にして保存します。`,

    tasks: `# タスクとボード

プロジェクトの進捗を管理するためのカンバンボード機能です。

## ステータス定義
Nexloomのタスクボードは、以下の厳密なステータスフローに基づいています。

\`\`\`mermaid
stateDiagram-v2
    [*] --> Idea
    Idea --> Planning
    Planning --> InProgress
    InProgress --> Review
    Review --> Done
    Done --> [*]
\`\`\`

- **Idea**: アイディア段階。まだ着手は未定。
- **Planning**: 計画中。仕様詰めやアサイン待ち。
- **InProgress**: 実行中。
- **Review**: レビュー待ち。
- **Done**: 完了。

## タスクの操作
- **作成**: カラム下部の「+」またはショートカット \`c\`。
- **移動**: ドラッグ＆ドロップでステータスを変更。
- **詳細**: カードをクリックして詳細ビューを開き、チェックリストや期限を設定。`,

    task_agents: `# AIエージェント

タスクを自律的に実行するAIエージェント機能です。

## エージェントの種類
- **Researcher**: 情報収集や調査タスクが得意。
- **Coder**: コードスニペットの生成やレビュー（現状はテキストベース）。
- **Writer**: ドキュメントの下書きや推敲。

## 依頼方法
1. タスクを作成し、詳細画面を開きます。
2. 「Assignee」フィールドで、人間のメンバーではなく「AI Agent」を選択します。
3. コメント欄で具体的な指示（プロンプト）を入力します。
4. エージェントが作業を開始し、進捗や成果物をコメントとして投稿します。`,

    pages: `# ページと階層構造

Notionライクなドキュメント管理機能です。

## 構造
ページは無限にネスト（入れ子）させることができます。
- **親ページ**: プロジェクトのルートやフォルダ。
- **子ページ**: 特定のトピックに関する詳細ドキュメント。

## アイコンとカバー
各ページにはアイコン（絵文字）を設定でき、サイドバーでの視認性を高めます。

## 共有設定
デフォルトではプロジェクトメンバー全員が閲覧可能です。
右上の「Share」ボタンから、以下の設定が可能です。
- **Public Share**: 外部公開用のURLを発行します（読み取り専用）。
- **Private**: 特定のメンバーのみにアクセスを制限します。`,

    editor: `# ブロックエディタ

直感的なブロックベースのエディタの使い方。

## 基本操作
- **テキスト入力**: そのままタイプしてテキストを入力。
- **ブロックメニュー**: 行頭で \`/\` を入力するとメニューが開きます。

## 利用可能なブロック
### Basic
- 見出し (H1, H2, H3)
- リスト (箇条書き, 番号付き)
- チェックリスト
- 引用

### Media & Advanced
- **Code Block**: シンタックスハイライト対応。言語を選択可能。
- **Mermaid**: フローチャートやシーケンス図を描画。
- **Image**: 画像のアップロードまたは貼り付け。
- **File**: ファイルの添付。

### AI Meeting Block
会議の録画と連携する特殊ブロックです。
- **Upload**: 音声ファイルを手動アップロードして解析。
- **Summary**: AIが生成した要約を表示エリア。`,

    databases: `# データベース

ページ内に構造化されたデータを埋め込む機能です。
（※現在ベータ版機能として提供中）

## テーブルビュー
タスクや顧客リストなどを表形式で管理できます。
列のプロパティとして以下をサポートしています：
- テキスト
- 数値
- セレクト（タグ）
- 日付
- ユーザー`,

    ai_assistant: `# AIコンパニオン

常駐型のAIアシスタント機能について。

## APIキーの設定
NexloomのAI機能を利用するには、Google Gemini APIキーが必要です。
「Settings」>「連携設定」からAPIキーを入力し、保存してください。

![Gemini API設定](/screenshots/settings_gemini.png)

## サイドバーチャット
画面右側のアクティビティバーから、いつでもAIと会話できます。
現在のページの内容をコンテキストとして認識しているため、「このページを要約して」や「ここにあるコードのバグを見つけて」といった指示が可能です。

## インラインAI
エディタ上でテキストを選択し、「Ask AI」をクリックすると、その部分に対して以下の操作を行えます。
- **Improve writing**: 文章の推敲
- **Fix grammar**: 文法修正
- **Translate**: 翻訳
- **Summarize**: 要約`,

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
詳細な設定手順は [GitHubリポジトリ](https://github.com/t012093/nexusworkspace) を参照してください。`,

    lineworks: `# LINE WORKS連携

LINE WORKSとの連携により、企業間のコミュニケーションをスムーズにします。

## 機能
- **メッセージ同期**: LINE WORKSのトークルームとNexloomのチャンネルを双方向に同期します。
- **通知転送**: メンションやタスクの割り当てをLINE WORKSに通知します。

## 設定手順
1. Nexloomの「Settings」>「Integrations」を開きます。
2. LINE WORKSのAPI情報を入力します（Client ID, Client Secret, Service Accountなど）。
3. 「Link User」ボタンから、NexloomユーザーとLINE WORKSアカウントを紐付けます。`,

    admin_console: `# 管理コンソール

組織の管理者が利用できる機能です。

## ユーザー管理
- **ユーザー一覧**: 登録済みユーザーの確認、検索。
- **ロール変更**: MemberからAdminへの昇格、またはその逆。
- **アカウント停止**: 退職者などのアカウントを無効化。

## 統計情報 (Stats)
システム全体の利用状況を可視化します。
- アクティブユーザー数
- 作成されたページ数
- 蓄積されたメッセージ数
- AIトークン使用量`,

    security: `# セキュリティ

Nexloomのセキュリティアーキテクチャについて。

## RLS (Row Level Security)
データベース層（PostgreSQL）でRow Level Securityを徹底しています。
APIサーバーが侵害された場合でも、データベースレベルで「自分が所属していないプロジェクトのデータ」にはアクセスできない仕組みになっています。

## 通信の暗号化
- 全てのHTTP通信はTLS 1.2/1.3で暗号化されています。
- WebSocket通信もWSS (WebSocket Secure) を使用しています。
- LiveKitのメディアストリームはDTLS/SRTPでエンドツーエンド暗号化されます。`,

    faq: `# よくある質問 (FAQ)

## 全般
### Q: Nexloomは無料で使えますか？
A: はい、現在はβ版として基本機能を無料で提供しています。AI機能の一部には制限がかかる場合があります。

### Q: オフラインでも使えますか？
A: はい。閲覧と編集はオフラインでも可能です。再接続時に変更が同期されます。

## AI・機能
### Q: AIの要約が生成されません。
A: 会議時間が短すぎる（1分未満）場合や、音声品質が著しく低い場合はスキップされることがあります。

### Q: 外部の方をゲストとして招待できますか？
A: はい。プロジェクト単位で「Guest」ロールとして招待することで、そのプロジェクトのみ閲覧可能な状態で参加してもらえます。`,

    troubleshooting: `# トラブルシューティング

## 接続エラーが発生する場合
「Connecting...」のまま進まない場合：
1. インターネット接続を確認してください。
2. 社内ネットワーク等のファイアウォールで、WebSocket (Port 443) がブロックされていないか確認してください。

## 音声・ビデオの問題
1. ブラウザまたはOSの設定で、Nexloomに対するマイク・カメラの使用許可がオンになっているか確認してください。
2. 「Settings」>「Audio & Video」で正しいデバイスが選択されているかテストしてください。

## ログの取得
問題が解決しない場合、開発者ツール（\`Ctrl+Shift+I\` / \`Cmd+Option+I\`）を開き、Consoleタブのログをサポートチームに送信してください。`
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