import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import DownloadPage from './pages/Download';
import DesktopReleaseNotesPage from './pages/DesktopReleaseNotes';
import MobilePage from './pages/Mobile';
import DocsPage from './pages/Docs';
import DeveloperMcpPage from './pages/DeveloperMcp';
import PricingPage from './pages/Pricing';
import BlogPage from './pages/Blog';
import TermsPage from './pages/Terms';
import PrivacyPage from './pages/Privacy';

// Scroll to top on route change wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary-100 selection:text-primary-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mobile" element={<MobilePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/desktop/release-notes" element={<DesktopReleaseNotesPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/developers/mcp" element={<DeveloperMcpPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
