import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Book, Search, MessageSquare, Cpu, Zap, Shield, HelpCircle } from 'lucide-react';

const DocsPage: React.FC = () => {
  const [activeId, setActiveId] = useState('intro');
  const [searchQuery, setSearchQuery] = useState('');

  const menu = [
    {
      title: 'はじめての方へ',
      items: [
        { id: 'intro', label: 'Nexloomとは', icon: Book },
        { id: 'start', label: 'クイックスタート', icon: Zap },
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

  const docsContent: Record<string, string> = {
    intro: `# Nexloomへようこそ

Nexloom（ネクスルーム）は、チームのコラボレーション、ドキュメント作成、プロジェクト管理を一つの場所に集約した統合プラットフォームです。

## 🚀 私たちのビジョン

従来のツールでは「チャット」と「ドキュメント」が分断されていました。会話は流れていき、重要な決定事項がどこにあるか分からなくなることがよくあります。

Nexloomはその壁を取り払い、**「会話からナレッジを即座に生成する」**ことを可能にします。

### Nexloomの3つの柱
1. **Unification**: すべての仕事道具を1つのウィンドウに。
2. **AI-Native**: 議事録作成や要約をAIが自動化。
3. **Privacy**: ローカルファーストな設計でデータを守る。`,

    ai: `# AIアシスタントの使い方

Nexloomは Google Gemini API を活用した強力なAI機能を搭載しています。

## 🎙 会議の自動要約
ボイスチャンネルや対面会議の録音を、AIがリアルタイムで文字起こしし、終了後に構造化された要約を生成します。

### 使い方の手順
1. 会議ブロックを作成
2. 「Start Recording」をクリック
3. 会議終了後に「Stop & Summarize」をクリック

## 🤖 チャットアシスタント
作成したドキュメントの内容に基づいて質問に答えたり、新しい文章の構成案を作成したりできます。`,

    editor: `# ブロックエディタ

Nexloomのドキュメント作成は、直感的なブロックベースのエディタで行います。

## ⌨️ スラッシュコマンド
エディタ上で \`/\` (スラッシュ) を入力すると、メニューが表示されます。

- **見出し**: H1, H2, H3
- **リスト**: 箇条書き、番号付きリスト、チェックリスト
- **コード**: シンタックスハイライト付き
- **Mermaid図**: \`graph TD\` などで図を直接描画

## 🔄 リアルタイム同期
編集内容はミリ秒単位でチームメンバーと同期されます。競合を恐れることなく、同時に編集が可能です。`,

    faq: `# よくある質問 (FAQ)

## 全般
### Q: Nexloomは無料で使えますか？
A: はい、現在は全ての機能を無料でお使いいただけます。将来的にチーム向けの高度な管理機能を有料で提供する予定です。

### Q: モバイル版はありますか？
A: 現在開発中です。iOSおよびAndroid版のリリースをロードマップに含めています。

## セキュリティ
### Q: データはどこに保存されますか？
A: 基本的なデータはローカルに保存され、同期のために暗号化された状態でクラウド（Supabase）に保存されます。`
  };

  const currentContent = docsContent[activeId] || "# Under Construction\n\nこのセクションのドキュメントは現在準備中です。";

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto py-10 border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="mb-8 relative px-2">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 type="text" 
                 placeholder="ドキュメントを検索..." 
                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>

            <nav className="space-y-8 px-2">
              {menu.map((group) => (
                <div key={group.title}>
                  <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveId(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeId === item.id
                              ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center">
                             <item.icon size={18} className={`mr-3 ${activeId === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                             <span>{item.label}</span>
                          </div>
                          {activeId === item.id && <motion.div layoutId="activeDoc" className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 py-10 lg:pl-10">
            <div className="max-w-4xl mx-auto">
               <div className="mb-10 flex items-center space-x-2 text-sm text-slate-400 font-medium">
                  <span>Docs</span>
                  <ChevronRight size={14} />
                  <span className="text-indigo-600">
                     {menu.flatMap(g => g.items).find(i => i.id === activeId)?.label || 'Content'}
                  </span>
               </div>

               <AnimatePresence mode="wait">
                  <motion.article 
                    key={activeId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="prose prose-indigo prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-indigo-600 prose-pre:bg-slate-900 prose-pre:rounded-2xl"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {currentContent}
                    </ReactMarkdown>
                  </motion.article>
               </AnimatePresence>

               {/* Footer Navigation within Docs */}
               <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center">
                  <button className="flex flex-col items-start group">
                     <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Previous</span>
                     <span className="text-lg font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">はじめに</span>
                  </button>
                  <button className="flex flex-col items-end group text-right">
                     <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Next</span>
                     <span className="text-lg font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">クイックスタート</span>
                  </button>
               </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default DocsPage;
