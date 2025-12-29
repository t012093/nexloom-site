import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Slack,
  Github,
  HardDrive,
  Layout,
  Zap,
  Bot
} from 'lucide-react';
import Button from '../components/Button';
import { FeatureItem } from '../types';
import { DESKTOP_RELEASE_URL, WEB_APP_URL } from '../constants/links';

const features: FeatureItem[] = [
  {
    title: "Unified Workspace",
    description: "チャット、ドキュメント、タスク管理をシームレスに行き来できます。もうアプリを切り替える必要はありません。",
    icon: Layout,
    colSpan: 2,
  },
  {
    title: "AI Integration",
    description: "Google Gemini APIによる会議の自動録音・要約。AIがあなたの議事録作成を代行します。",
    icon: Bot,
    colSpan: 1
  },
  {
    title: "Real-time Sync",
    description: "全ての編集はリアルタイムで同期。チームの動きを止めることはありません。",
    icon: Zap,
    colSpan: 1
  },
  {
    title: "Privacy First",
    description: "データはローカルとあなたの管理するクラウドに。プライバシーを最優先に設計されています。",
    icon: ShieldCheck,
    colSpan: 2
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span>Web版公開 + デスクトップ版リリース</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
                チームのすべてを、<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                  ひとつの場所で。
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Nexloomは、チャット、ドキュメント、AI議事録を統合した、<br className="hidden md:block" />
                チームのための最も洗練されたワークスペースです。まずはWeb版で体験できます。
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                  <Button size="lg" className="w-full sm:w-auto px-10 h-16 text-lg rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all">
                    Webアプリを開く
                  </Button>
                </a>
                <Link to="/download" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 h-16 text-lg rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all bg-white/50 backdrop-blur-sm">
                    デスクトップ版をダウンロード
                  </Button>
                </Link>
                <Link to="/docs" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto px-8 h-16 text-lg rounded-2xl">
                    ドキュメント
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual - Dynamic App Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="relative mx-auto max-w-6xl mt-10"
          >
            <div className="relative group">
              {/* Main App Mockup */}
              <div className="relative rounded-3xl bg-slate-900 shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] overflow-hidden border-8 border-slate-900 ring-1 ring-white/10 transform transition-transform duration-700 group-hover:scale-[1.01]">
                <div className="bg-slate-800 h-8 flex items-center px-4 space-x-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                   <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="aspect-[16/9] bg-white relative flex">
                   {/* Sidebar Content */}
                   <div className="w-64 bg-slate-50 border-r flex flex-col p-6 space-y-6">
                      <div className="h-10 w-10 bg-indigo-600 rounded-xl" />
                      <div className="space-y-3">
                         <div className="h-2 w-full bg-slate-200 rounded-full" />
                         <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                         <div className="h-2 w-5/6 bg-slate-200 rounded-full" />
                      </div>
                      <div className="pt-6 space-y-3 border-t">
                         <div className="h-2 w-full bg-slate-100 rounded-full" />
                         <div className="h-2 w-2/3 bg-slate-100 rounded-full" />
                      </div>
                   </div>
                   {/* Editor View */}
                   <div className="flex-1 p-12 space-y-8">
                      <div className="space-y-4">
                         <div className="h-10 w-1/2 bg-slate-900 rounded-lg" />
                         <div className="h-4 w-full bg-slate-100 rounded-lg" />
                         <div className="h-4 w-5/6 bg-slate-100 rounded-lg" />
                      </div>
                      {/* Floating AI Block */}
                      <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="p-6 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-500/40 relative overflow-hidden"
                      >
                         <div className="relative z-10 flex items-center space-x-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                               <Bot size={24} />
                            </div>
                            <div>
                               <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Nexloom AI</p>
                               <p className="text-lg font-medium">会議の要約を生成しました</p>
                            </div>
                         </div>
                         <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Bot size={80} />
                         </div>
                      </motion.div>
                   </div>
                </div>
              </div>
              
              {/* Decorative floating UI elements */}
              <motion.div 
                animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute -right-8 -top-8 p-4 bg-white rounded-2xl shadow-2xl border border-slate-100 hidden lg:block"
              >
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                       <Zap size={20} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400">STATUS</p>
                       <p className="text-sm font-bold text-slate-900">Synced</p>
                    </div>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4">Core Capabilities</h2>
            <p className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              仕事に必要なすべてを、<br/>極限までシンプルに。
            </p>
            <p className="text-xl text-slate-500 leading-relaxed">
              Nexloomは単なるツールの集合体ではありません。あなたのチームが最高のパフォーマンスを発揮するための、全く新しいオペレーティングシステムです。
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-10 hover:bg-white hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 ${
                  feature.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-8 group-hover:scale-110 transition-transform duration-500 text-indigo-600">
                      <feature.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">{feature.description}</p>
                  </div>
                  
                  <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform cursor-pointer">
                    <span>Explore functionality</span>
                    <ArrowRight size={20} className="ml-2" />
                  </div>
                </div>
                
                {/* Decorative background icon */}
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 text-slate-900">
                   <feature.icon size={300} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="max-w-md text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-900 mb-4">既存のフローをそのままに。</h3>
                <p className="text-slate-500">お気に入りのツールと統合して、Nexloomをさらに強力なものにしましょう。</p>
             </div>
             <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center space-x-2 font-black text-2xl"><HardDrive size={32} /> <span>Google Drive</span></div>
                <div className="flex items-center space-x-2 font-black text-2xl"><Github size={32} /> <span>GitHub</span></div>
                <div className="flex items-center space-x-2 font-black text-2xl"><Slack size={32} /> <span>Slack</span></div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                     いますぐWebで、<br/>チームのポテンシャルを解放。
                  </h2>
                  <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                     インストール不要。ブラウザからすぐに始められます。デスクトップ版も用意しています。
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                      <Button variant="secondary" size="lg" className="w-full sm:w-auto h-16 px-12 text-lg rounded-2xl bg-white text-indigo-600 hover:bg-indigo-50 border-none">
                        Webアプリを開く
                      </Button>
                    </a>
                    <Link to="/download" className="w-full sm:w-auto">
                      <Button variant="ghost" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl text-white border border-white/40 hover:bg-white/10">
                        デスクトップ版を見る
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-6 text-sm text-indigo-100/80">
                    デスクトップ版リリース: <a href={DESKTOP_RELEASE_URL} className="font-semibold underline underline-offset-4 hover:text-white">v0.1.0</a>
                  </div>
               </div>
               {/* Decorative blobs */}
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
               <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
            </div>
         </div>
      </section>
    </div>
  );
};

export default HomePage;
