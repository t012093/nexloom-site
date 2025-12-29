import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Apple, Monitor, Laptop, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import Button from '../components/Button';
import { OSType } from '../types';
import { DESKTOP_RELEASE_URL, WEB_APP_URL } from '../constants/links';

const DownloadPage: React.FC = () => {
  const [os, setOs] = useState<OSType>(OSType.UNKNOWN);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Mac') !== -1) {
      setOs(OSType.MAC_SILICON); 
    } else if (userAgent.indexOf('Win') !== -1) {
      setOs(OSType.WINDOWS);
    } else if (userAgent.indexOf('Linux') !== -1) {
      setOs(OSType.LINUX);
    }
  }, []);

  const downloadOptions = [
    {
      os: OSType.MAC_SILICON,
      label: 'macOS',
      sublabel: 'Apple Silicon (M1/M2/M3)',
      icon: Apple,
      file: 'Nexloom-1.0.0-arm64.dmg',
      url: DESKTOP_RELEASE_URL,
      recommended: os === OSType.MAC_SILICON
    },
    {
      os: OSType.WINDOWS,
      label: 'Windows',
      sublabel: '10 / 11 (64-bit)',
      icon: Monitor,
      file: 'Nexloom-Setup-1.0.0.exe',
      url: DESKTOP_RELEASE_URL,
      recommended: os === OSType.WINDOWS
    },
    {
      os: OSType.MAC_INTEL,
      label: 'macOS',
      sublabel: 'Intel Processor',
      icon: Laptop,
      file: 'Nexloom-1.0.0-x64.dmg',
      url: DESKTOP_RELEASE_URL,
      recommended: false
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/30 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">デスクトップ版をダウンロード</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            NexloomはWeb版が基本です。<br/>
            デスクトップ版は、ローカル通知や専用ショートカットが必要な方におすすめです。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] border border-indigo-100 shadow-[0_30px_60px_-12px_rgba(79,70,229,0.2)] p-8 md:p-10 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200">
                <Globe size={32} />
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Recommended</p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">まずはWeb版で始める</h2>
                <p className="text-slate-600 leading-relaxed">
                  インストール不要・いつでも最新版。チーム招待もすぐに完了します。
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                  <span className="px-3 py-1 rounded-full bg-slate-100">ブラウザですぐ開始</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100">OSを問わず利用可能</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100">アップデート不要</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-2xl shadow-lg shadow-indigo-200">
                  Webアプリを開く
                </Button>
              </a>
              <a href={DESKTOP_RELEASE_URL} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center">
                デスクトップ版のリリースへ <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Primary Download Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Download Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden"
          >
            <div className="p-10 md:p-16">
              {downloadOptions.map((option) => {
                const isMatch = option.recommended || (os === OSType.UNKNOWN && option.os === OSType.MAC_SILICON);
                if (!isMatch) return null;

                return (
                  <div key={option.os}>
                    <div className="flex items-center space-x-4 mb-8">
                       <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200">
                          <option.icon size={40} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Desktop Installer</p>
                          <h2 className="text-3xl font-black text-slate-900">{option.label}</h2>
                       </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{option.sublabel}</h3>
                    <p className="text-slate-500 mb-10 leading-relaxed">
                       お使いのシステムに最適化されたインストーラーです。ダウンロードして、数分でセットアップを完了できます。
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <a href={option.url} className="w-full sm:w-auto" aria-label={`${option.label}版のダウンロードページを開く`}>
                        <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-indigo-200" icon={<Download />}>
                          GitHubでダウンロード
                        </Button>
                      </a>
                      <span className="text-sm font-medium text-slate-400">Version 0.1.0</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-50/80 backdrop-blur-sm p-8 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span>Verified & Secure Installer</span>
               </div>
               <a href={DESKTOP_RELEASE_URL} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center">
                  リリースノート <ArrowRight size={14} className="ml-1" />
               </a>
            </div>
          </motion.div>

          {/* Features / Why Desktop Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
             <div className="bg-indigo-50/50 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100">
                <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center">
                   <Zap size={20} className="text-indigo-600 mr-2" />
                   デスクトップ版のメリット
                </h4>
                <ul className="space-y-6">
                   <li className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-white flex-shrink-0 flex items-center justify-center border border-indigo-100 shadow-sm mt-1">
                         <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      </div>
                      <div>
                         <p className="font-bold text-slate-800 text-sm">ネイティブパフォーマンス</p>
                         <p className="text-slate-500 text-xs mt-1">システムリソースを効率的に活用し、常にスムーズな動作を実現。</p>
                      </div>
                   </li>
                   <li className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-white flex-shrink-0 flex items-center justify-center border border-indigo-100 shadow-sm mt-1">
                         <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      </div>
                      <div>
                         <p className="font-bold text-slate-800 text-sm">システム通知 & ショートカット</p>
                         <p className="text-slate-500 text-xs mt-1">OS標準の通知機能と連携。クイックコマンドで作業を加速。</p>
                      </div>
                   </li>
                   <li className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-white flex-shrink-0 flex items-center justify-center border border-indigo-100 shadow-sm mt-1">
                         <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      </div>
                      <div>
                         <p className="font-bold text-slate-800 text-sm">オフライン機能（開発中）</p>
                         <p className="text-slate-500 text-xs mt-1">インターネットがない環境でも、ドキュメントの閲覧と下書きが可能です。</p>
                      </div>
                   </li>
                </ul>
             </div>

             <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">その他のプラットフォーム</h4>
                <div className="space-y-3">
                   {downloadOptions.map(opt => (
                      <a key={opt.os} href={opt.url} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                         <div className="flex items-center space-x-3">
                            <opt.icon size={20} className="text-slate-600" />
                            <span className="font-bold text-slate-700 text-sm">{opt.label} ({opt.sublabel})</span>
                         </div>
                         <Download size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </a>
                   ))}
                   <a href={DESKTOP_RELEASE_URL} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                      <div className="flex items-center space-x-3">
                         <Globe size={20} className="text-slate-600" />
                         <span className="font-bold text-slate-700 text-sm">Linux (.AppImage / .deb)</span>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                   </a>
                </div>
             </div>
          </motion.div>
        </div>

        {/* System Requirements Table */}
        <div className="mt-32 pt-20 border-t border-slate-200">
           <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">システム要件</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <div>
                       <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter mb-2">Operating System</p>
                       <p className="text-slate-600 font-medium">macOS 11.0 (Big Sur) 以降</p>
                       <p className="text-slate-600 font-medium mt-1">Windows 10 / 11 (64-bit)</p>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter mb-2">Memory (RAM)</p>
                       <p className="text-slate-600 font-medium">8GB 以上 (16GB 推奨)</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter mb-2">Storage</p>
                       <p className="text-slate-600 font-medium">空き容量 500MB 以上</p>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter mb-2">AI Capabilities</p>
                       <p className="text-slate-600 font-medium">機能の利用にはインターネット接続が必要です。</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
