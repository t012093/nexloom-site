import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Download, Layers, Menu, X } from 'lucide-react';
import { NavItem } from '../types';
import Button from './Button';
import { DESKTOP_RELEASE_NOTES_PATH, WEB_APP_URL } from '../constants/links';

const navItems: NavItem[] = [
  { label: 'ホーム', href: '/' },
  { label: '機能', href: '/#features' },
  { label: '入口', href: '/#entry-points' },
  { label: 'Desktop', href: '/download' },
  { label: '料金プラン', href: '/pricing' },
  { label: 'モバイル', href: '/mobile' },
  { label: 'ドキュメント', href: '/docs' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={`mx-auto max-w-7xl rounded-[1.75rem] border transition-all duration-300 ${
          isScrolled
            ? 'border-slate-200/90 bg-white/88 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] backdrop-blur-xl'
            : 'border-white/60 bg-white/72 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)] backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#312e81_0%,#4338ca_48%,#0f172a_100%)] text-white shadow-[0_20px_45px_-22px_rgba(67,56,202,0.7)]">
              <Layers size={22} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-lg font-black tracking-tight text-slate-950">Nexloom</div>
              <div className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
                web first / desktop ready
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to={DESKTOP_RELEASE_NOTES_PATH} className="hidden md:block">
              <Button variant="secondary" size="sm" className="rounded-xl px-4" icon={<Download size={15} />}>
                Desktop 公開
              </Button>
            </Link>
            <a href={WEB_APP_URL} className="hidden md:block" aria-label="Nexloom Webアプリを開く">
              <Button
                variant="primary"
                size="sm"
                className="rounded-xl px-4 shadow-[0_16px_34px_-18px_rgba(79,70,229,0.7)]"
                icon={<ArrowRight size={15} />}
              >
                Webアプリを開く
              </Button>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mx-auto mt-3 max-w-7xl md:hidden">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 px-4 pb-6 pt-4 shadow-[0_32px_70px_-38px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <div className="mb-4 rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#312e81_58%,#4338ca_100%)] p-4 text-white">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">Nexloom Entry</div>
              <div className="mt-2 text-lg font-black">Web からすぐ開始、Desktop は公開ページから導入</div>
            </div>
            <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary-600"
              >
                {item.label}
              </Link>
            ))}
            </div>
            <div className="pt-5">
              <Link to={DESKTOP_RELEASE_NOTES_PATH} className="block w-full">
                <Button variant="secondary" className="w-full justify-center rounded-2xl" icon={<Download size={16} />}>
                  Desktop 公開ページ
                </Button>
              </Link>
              <a href={WEB_APP_URL} className="block w-full" aria-label="Nexloom Webアプリを開く">
                <Button className="mt-3 w-full justify-center rounded-2xl">
                  Webアプリを開く
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
