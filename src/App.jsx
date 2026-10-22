import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { FreeGuideModal } from './components/FreeGuideModal';
import { TransformationModal } from './components/TransformationModal';
import { ArticleModal } from './components/ArticleModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { PackagesPage } from './pages/PackagesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { VideosPage } from './pages/VideosPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { ApplicationPage } from './pages/ApplicationPage';

const MainContent = () => {
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState('home');
  const [selectedPackageForApp, setSelectedPackageForApp] = useState('advanced');

  // Modal states
  const [isFreeGuideOpen, setIsFreeGuideOpen] = useState(false);
  const [selectedTransformation, setSelectedTransformation] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpenApplication = (pkgId) => {
    if (pkgId) setSelectedPackageForApp(pkgId);
    setActiveTab('application');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0C0E12] text-[#F3F4F6]">
      {/* 3-Zone Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenApplication={() => handleOpenApplication()}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenApplication={handleOpenApplication}
            onOpenFreeGuide={() => setIsFreeGuideOpen(true)}
            onSelectTransformation={setSelectedTransformation}
            onSelectArticle={setSelectedArticle}
            onSelectVideo={setSelectedVideo}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onOpenApplication={() => handleOpenApplication()} />
        )}

        {activeTab === 'transformations' && (
          <TransformationsPage
            onSelectTransformation={setSelectedTransformation}
            onOpenApplication={() => handleOpenApplication()}
          />
        )}

        {activeTab === 'packages' && (
          <PackagesPage
            onOpenApplication={handleOpenApplication}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'howItWorks' && (
          <HowItWorksPage onOpenApplication={() => handleOpenApplication()} />
        )}

        {activeTab === 'calculator' && (
          <CalculatorPage onOpenApplication={() => handleOpenApplication()} />
        )}

        {activeTab === 'articles' && (
          <ArticlesPage
            onSelectArticle={setSelectedArticle}
            onOpenApplication={() => handleOpenApplication()}
          />
        )}

        {activeTab === 'videos' && (
          <VideosPage
            onSelectVideo={setSelectedVideo}
            onOpenApplication={() => handleOpenApplication()}
          />
        )}

        {activeTab === 'faq' && <FaqPage />}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'application' && (
          <ApplicationPage
            initialPackage={selectedPackageForApp}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenApplication={() => handleOpenApplication()}
      />

      {/* Floating WhatsApp Action */}
      <WhatsAppButton />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA onOpenApplication={() => handleOpenApplication()} />

      {/* Interactive Modals */}
      <FreeGuideModal
        isOpen={isFreeGuideOpen}
        onClose={() => setIsFreeGuideOpen(false)}
        onOpenApplication={() => {
          setIsFreeGuideOpen(false);
          handleOpenApplication();
        }}
      />

      <TransformationModal
        transformation={selectedTransformation}
        onClose={() => setSelectedTransformation(null)}
        onOpenApplication={() => {
          setSelectedTransformation(null);
          handleOpenApplication();
        }}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenApplication={() => {
          setSelectedArticle(null);
          handleOpenApplication();
        }}
      />

      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
