import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  ExternalLink
} from 'lucide-react';

const DocsPage: React.FC = () => {
  const [activeId, setActiveId] = useState('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu = [
    {
      title: 'はじめての方へ',
      items: [
        { id: 'intro', label: 'Nexloomとは', icon: Book },
        { id: 'start', label: 'クイックスタート', icon: Zap },
        { id: 'install', label: 'インストール方法', icon: Terminal },
      ]
    },
    {
      title: '基本機能',
      items: [
        { id: 'chat', label: 'チャンネルとチャット', icon: MessageSquare },
        { id: 'editor', label: 'ブロックエディタ', icon: Book },
        { id: 'ai', label: 'AIアシスタント', icon: Cpu },
      ]
    },
    {
      title: '設定・管理',
      items: [
        { id: 'privacy', label: 'プライバシーとセキュリティ', icon: Shield },
        { id: 'faq', label: 'よくある質問', icon: HelpCircle },
      ]
    }
  ];

  // JavaScriptのテンプレートリテラル内では、Markdownのバッククォートを ` でエスケープする必要があります
  const docsContent: Record<string, string> = {
    intro: `# Nexloomへようこそ

Nexloom（ネクスルーム）は、チームのコラボレーション、ドキュメント作成、プロジェクト管理を一つの場所に集約した統合プラットフォームです。

## 🚀 私たちのビジョン

現代のチーム開発において、情報は常に「分断」されています。
チャットアプリでの決定事項は流れ去り、ドキュメントツールは更新が滞り、プロジェクト管理ツールは実態と乖離していきます。

Nexloomはその壁を取り払い、**「会話からナレッジを即座に生成し、共有する」**ことを可能にします。

### Nexloomの3つの柱

1. **Unification (統合)**
   すべての仕事道具を1つのウィンドウに。アプリの切り替えによるコンテキストスイッチを最小限に抑えます。

2. **AI-Native (AIネイティブ)**
   Google Gemini APIを中核に据え、議事録作成や要約、ナレッジの抽出をAIが自動化します。

3. **Privacy-First (プライバシー重視)**
   データはローカルと、あなたが管理する暗号化されたクラウドに。プライバシーを最優先に設計されています。`,

    start: `# クイックスタート

Nexloomを使い始めるための3つのステップを解説します。

## 1. アカウントのセットアップ
アプリを起動し、案内に従ってプロフィールの設定を行ってください。名前とアバターを設定するだけで準備完了です。

## 2. チャンネルの作成
チームメンバーと会話を始めるために、サイドバーの \`+\` アイコンから新しいチャンネルを作成しましょう。
- **Public**: 全員が参加できるオープンなチャンネル
- **Private**: 招待されたメンバーのみが閲覧できるチャンネル

## 3. 最初のドキュメントを作成
「ページ」セクションから、新しいドキュメントを作成できます。
\
` コマンドを入力して、見出しやリスト、コードブロックなどを追加してみてください。

> **Tip**: Gemini APIキーを設定画面から登録することで、AI機能が有効になります。`,

    install: `# インストール方法

Nexloomは主要なデスクトップOSに対応しています。

## macOS
1. [ダウンロードページ](/download)から \
` ファイルをダウンロードします。
2. ダウンロードしたファイルをダブルクリックして開き、Nexloomアイコンを \`Applications\
` フォルダにドラッグします。
3. アプリケーションフォルダからNexloomを起動してください。

## Windows
1. [ダウンロードページ](/download)から \
` インストーラーをダウンロードします。
2. インストーラーを実行し、画面の指示に従ってインストールを完了させてください。

## Linux
Linux版は現在、\
` 形式で提供されています。
実行権限を付与 (\
`chmod +x\
`）してから起動してください。`,

    chat: `# チャンネルとチャット

Nexloomのチャット機能は、単なるメッセージ交換以上の価値を提供します。

## リアルタイム・コミュニケーション
低遅延なメッセージングにより、チームメンバーとストレスのない会話が可能です。

### 主な機能
- **スレッド返信**: 特定のメッセージに返信して、会話を構造化できます。
- **メンション**: \
`@username\
` で特定のメンバーに通知を送ります。
- **リアクション**: 絵文字を使ってクイックに反応を返せます。
- **ファイル共有**: 画像やドキュメントをドラッグ＆ドロップで即座に共有。

## チャンネル管理
プロジェクト、チーム、あるいはトピックごとにチャンネルを作成して、会話を整理しましょう。
アーカイブ機能を使えば、終了したプロジェクトのログを保持したままサイドバーを整理できます。`,

    editor: `# ブロックエディタ

Notionライクな直感的な操作で、美しいドキュメントを素早く作成できます。

## ⌨️ スラッシュコマンド
エディタ上の空の行で \
`/` を入力すると、挿入可能なブロックのメニューが表示されます。

- **テキスト系**: 見出し(H1-H3)、箇条書き、番号付きリスト、チェックリスト、引用
- **高度なブロック**:
  - **Code Block**: シンタックスハイライト対応のコード
  - **Mermaid**: フローチャートやシーケンス図をテキストで記述
  - **AI Meeting**: 会議の録音・要約専用ブロック

## 🔄 リアルタイム同時編集
複数のメンバーと同じページを同時に編集できます。
誰がどこを編集しているかがリアルタイムで表示され、変更は即座に同期されます。`,

    ai: `# AIアシスタント

Nexloomの最大の特徴であるAI連携機能について解説します。

## 🎙 AI会議レコーダー
Nexloomは、会議の音声を記録し、自動で議事録を作成します。

1. **録音開始**: AI Meetingブロックの「Start Recording」をクリック。
2. **リアルタイム文字起こし**: 会話が即座にテキスト化されます。
3. **自動要約**: 録音終了後、AIが議論のポイント、決定事項、ネクストアクションを抽出して要約を生成します。

## 🤖 AIコンパニオン
ドキュメントの作成中に、AIからアドバイスを受けることができます。
「この文章をよりフォーマルにして」「この仕様書の懸念点を挙げて」といった依頼が可能です。

---
*注: AI機能の利用には、Google Gemini APIキーの登録が必要です。設定 > 連携設定 から登録してください。*`,

    privacy: `# プライバシーとセキュリティ

Nexloomは、企業の機密情報を扱うツールとして、最高のセキュリティ基準を目指しています。

## データ保持の仕組み
- **ローカルファースト**: メッセージやドキュメントのマスターデータは、まずあなたのデバイス上に保存されます。
- **エンドツーエンド暗号化**: 同期のためにサーバーを経由するデータは、すべて強力な暗号化が施されています。

## 開発とガバナンス
Nexloomのソースコードは現在プライベートリポジトリで管理されており、信頼できるメンバーのみが開発に携わっています。

## 権限管理
- **管理者ロール**: ユーザーの追加・削除、システム設定の管理。
- **メンバーロール**: チャンネルやページの作成・編集。
- **ゲストロール**: 招待されたチャンネルのみの閲覧。`,

    faq: `# よくある質問 (FAQ)

## 全般
### Q: Nexloomは無料で使えますか？
A: はい、現在はβ版として全ての機能を無料でお使いいただけます。

### Q: モバイル版はありますか？
A: 現在開発中です。iOS/Android版のリリースをロードマップに含めています。

## 技術・トラブル
### Q: AIの要約が生成されません。
A: 設定画面でGemini APIキーが正しく入力されているか確認してください。また、録音時間が極端に短い場合は要約がスキップされることがあります。

### Q: データのバックアップはどうすればいいですか？
A: Nexloomは自動的にクラウドと同期していますが、設定画面からプロジェクト全体のデータをMarkdown形式でエクスポートすることも可能です。`
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

  return (
    <div className="pt-16 min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
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

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 lg:static lg:block lg:z-0
          transform transition-transform duration-300 lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto px-6 py-10">
            <div className="lg:hidden flex justify-between items-center mb-8">
               <span className="font-black text-xl text-indigo-600 tracking-tighter">Nexloom Docs</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>

            <div className="mb-10 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 type="text" 
                 placeholder="ドキュメントを検索..." 
                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>

            <nav className="space-y-10">
              {menu.map((group) => (
                <div key={group.title}>
                  <h3 className="px-3 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleSelect(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-bold rounded-xl transition-all group ${ 
                            activeId === item.id
                              ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center">
                             <item.icon size={18} className={`mr-3 ${activeId === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                             <span>{item.label}</span>
                          </div>
                          {activeId === item.id && (
                            <motion.div layoutId="activeDocIndicator" className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
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

          <div className="max-w-4xl mx-auto px-6 lg:px-16 py-12 lg:py-20">
            
            {/* Breadcrumbs */}
            <div className="mb-12 flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span className="hover:text-slate-600 cursor-pointer">Documentation</span>
               <ChevronRight size={10} />
               <span className="text-indigo-600">
                  {flatItems.find(i => i.id === activeId)?.label || 'Content'}
               </span>
            </div>

            <AnimatePresence mode="wait">
               <motion.div 
                 key={activeId}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2 }}
               >
                 <article className="prose prose-indigo prose-lg max-w-none 
                   prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                   prose-h1:text-4xl lg:prose-h1:text-6xl prose-h1:mb-12 prose-h1:leading-tight
                   prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100
                   prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg
                   prose-strong:text-slate-900 prose-strong:font-bold
                   prose-a:text-indigo-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                   prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/30 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl prose-blockquote:text-indigo-900 prose-blockquote:not-italic prose-blockquote:my-10
                   prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:font-bold
                   prose-pre:bg-slate-900 prose-pre:rounded-3xl prose-pre:shadow-2xl prose-pre:p-8 prose-pre:my-10
                   prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:my-12
                   prose-ul:list-disc prose-li:marker:text-indigo-400 prose-li:text-slate-600
                 ">
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
                     {currentContent}
                   </ReactMarkdown>
                 </article>

                 {/* Pagination / Next Steps */}
                 <div className="mt-32 pt-12 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {prevDoc ? (
                      <button 
                        onClick={() => handleSelect(prevDoc.id)}
                        className="flex flex-col items-start p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all group"
                      >
                         <span className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-400 transition-colors">
                            <ArrowLeft size={14} className="mr-2" /> Previous
                         </span>
                         <span className="text-xl font-black text-slate-700 group-hover:text-indigo-600 transition-colors">{prevDoc.label}</span>
                      </button>
                    ) : <div />}

                    {nextDoc ? (
                      <button 
                        onClick={() => handleSelect(nextDoc.id)}
                        className="flex flex-col items-end p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all text-right group"
                      >
                         <span className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-400 transition-colors">
                            Next <ArrowRight size={14} className="ml-2" />
                         </span>
                         <span className="text-xl font-black text-slate-700 group-hover:text-indigo-600 transition-colors">{nextDoc.label}</span>
                      </button>
                    ) : <div />}
                 </div>

                 {/* Helpful / Community Section */}
                 <div className="mt-20 p-10 bg-slate-50 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
                    <div>
                       <h4 className="text-xl font-black text-slate-900 mb-2">このドキュメントは役に立ちましたか？</h4>
                       <p className="text-slate-500">改善の提案や不足している情報があれば、お気軽にお知らせください。</p>
                    </div>
                    <div className="flex gap-4">
                       <a href="https://github.com/t012093/nexloom-site/issues" target="_blank" className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center shadow-sm">
                          {/* GitHub Icon mock */}
                          <span className="mr-2 font-bold">GitHub</span>
                       </a>
                       <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center">
                          <HelpCircle size={18} className="mr-2" /> サポート
                       </button>
                    </div>
                 </div>
               </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Right Sidebar (Table of Contents) - Only on large screens */}
        <aside className="hidden xl:block w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-20 px-8">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center">
              <Hash size={14} className="mr-2" />
              On this page
           </div>
           <nav className="space-y-5">
              <div className="text-sm font-black text-indigo-600">Overview</div>
              <div className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer pl-4 border-l border-slate-100 hover:border-slate-300">Key Pillars</div>
              <div className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer pl-4 border-l border-slate-100 hover:border-slate-300">Getting Started</div>
           </nav>

           <div className="mt-16 pt-10 border-t border-slate-100">
              <p className="text-xs font-black text-slate-900 mb-4 uppercase tracking-tighter">Resources</p>
              <ul className="space-y-4">
                 <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center">Community Guides <ExternalLink size={14} className="ml-2 opacity-50" /></a></li>
                 <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center">Video Tutorials <ExternalLink size={14} className="ml-2 opacity-50" /></a></li>
                 <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center">API Reference <ExternalLink size={14} className="ml-2 opacity-50" /></a></li>
              </ul>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default DocsPage;