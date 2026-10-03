import React from 'react';

interface HeaderProps {
  totalJobs: number;
  lastScraped: string;
}

const Header: React.FC<HeaderProps> = ({ totalJobs, lastScraped }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <svg className="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">JobScraper</h1>
              <p className="text-xs text-indigo-200">Flask + BeautifulSoup Web Scraper</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs text-indigo-200">Jobs Scraped</p>
              <p className="text-lg font-bold text-yellow-300">{totalJobs}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-indigo-200">Last Run</p>
              <p className="text-sm font-medium">{lastScraped}</p>
            </div>
            <div className="flex items-center space-x-2 bg-green-500/20 border border-green-400/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-green-300">Scraper Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
