import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Layers } from 'lucide-react';
import { NavItem } from '../types';
import Button from './Button';
import { WEB_APP_URL } from '../constants/links';

const navItems: NavItem[] = [
  { label: 'ホーム', href: '/' },
  { label: '機能', href: '/#features' },
  { label: '料金プラン', href: '/pricing' },
  { label: 'デスクトップ', href: '/download' },
  { label: 'ドキュメント', href: '/docs' },
  { label: 'ブログ', href: '/blog' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-md border-slate-200 shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
              <Layers size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Nexloom</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <a href={WEB_APP_URL} className="hidden md:block" aria-label="Nexloom Webアプリを開く">
              <Button variant="primary" size="sm">
                Webアプリを開く
              </Button>
            </a>
            <Link to="/download" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">
              デスクトップ版
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <a href={WEB_APP_URL} className="block w-full" aria-label="Nexloom Webアプリを開く">
                <Button className="w-full justify-center">Webアプリを開く</Button>
              </a>
              <Link to="/download" className="block w-full mt-3">
                <Button variant="outline" className="w-full justify-center">デスクトップ版</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
