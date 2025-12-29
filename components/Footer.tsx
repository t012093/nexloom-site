import React from 'react';
import { Layers, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DESKTOP_RELEASE_URL, WEB_APP_URL } from '../constants/links';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 text-white p-1 rounded-md">
                <Layers size={20} />
              </div>
              <span className="text-lg font-bold text-slate-900">Nexloom</span>
            </Link>
            <p className="text-sm text-slate-500 mb-6">
              チームのコラボレーション、ドキュメント、AI議事録を1つの場所で。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">製品</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/#features" className="hover:text-primary-600">機能一覧</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-600">料金プラン</Link></li>
              <li><a href={WEB_APP_URL} className="hover:text-primary-600">Webアプリ</a></li>
              <li><Link to="/download" className="hover:text-primary-600">デスクトップ版</Link></li>
              <li><a href={DESKTOP_RELEASE_URL} className="hover:text-primary-600">リリースノート</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">リソース</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/docs" className="hover:text-primary-600">ドキュメント</Link></li>
              <li><Link to="/blog" className="hover:text-primary-600">ブログ</Link></li>
              <li><a href="#" className="hover:text-primary-600">API リファレンス</a></li>
              <li><a href="#" className="hover:text-primary-600">コミュニティ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">会社情報</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-primary-600">Nexloomについて</a></li>
              <li><a href="#" className="hover:text-primary-600">利用規約</a></li>
              <li><a href="#" className="hover:text-primary-600">プライバシーポリシー</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nexloom Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
