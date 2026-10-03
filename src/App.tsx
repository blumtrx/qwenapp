import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ScraperStatus from './components/ScraperStatus';
import Terminal from './components/Terminal';
import JobCard from './components/JobCard';
import FilterBar from './components/FilterBar';
import CodePreview from './components/CodePreview';
import Stats from './components/Stats';
import { jobListings } from './data/jobData';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [activeView, setActiveView] = useState<'jobs' | 'code' | 'logs'>('jobs');

  const filteredJobs = useMemo(() => {
    return jobListings.filter(job => {
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSource = selectedSource === '' || job.source === selectedSource;
      const matchesType = selectedType === '' || job.type === selectedType;
      
      return matchesSearch && matchesSource && matchesType;
    });
  }, [searchQuery, selectedSource, selectedType]);

  const remoteJobs = jobListings.filter(job => 
    job.location.toLowerCase().includes('remote')
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalJobs={jobListings.length} lastScraped="Today, 10:23 AM" />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <Stats 
          totalJobs={jobListings.length}
          totalSources={5}
          avgSalary="$118K"
          remoteJobs={remoteJobs}
        />

        {/* View Tabs */}
        <div className="flex items-center space-x-1 bg-white rounded-lg shadow-sm border border-gray-100 p-1 mb-6 w-fit">
          <button
            onClick={() => setActiveView('jobs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'jobs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            📋 Job Listings
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            💻 Source Code
          </button>
          <button
            onClick={() => setActiveView('logs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'logs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            📟 Scraper Logs
          </button>
        </div>

        {/* Jobs View */}
        {activeView === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <ScraperStatus />
              
              {/* Architecture Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Tech Stack
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Python 3.11', icon: '🐍' },
                    { name: 'Flask 3.0', icon: '🌶️' },
                    { name: 'BeautifulSoup4', icon: '🍲' },
                    { name: 'SQLite', icon: '🗄️' },
                    { name: 'Requests', icon: '🌐' },
                    { name: 'Schedule', icon: '⏰' },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{tech.icon}</span>
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                totalResults={filteredJobs.length}
              />

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Code View */}
        {activeView === 'code' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ScraperStatus />
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">🐍 Python Source Code</h3>
                <p className="text-sm text-gray-500">
                  The actual Flask + BeautifulSoup code that powers this scraper. Click the tabs to view different modules.
                </p>
              </div>
              <CodePreview />
            </div>
          </div>
        )}

        {/* Logs View */}
        {activeView === 'logs' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ScraperStatus />
            </div>
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-800 mb-2">📟 Scraper Execution Log</h3>
                <p className="text-sm text-gray-500">
                  Real-time output from the BeautifulSoup web scraping process. Each line shows the parsing and extraction steps.
                </p>
              </div>
              <Terminal />
              
              {/* Additional info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h4 className="font-semibold text-gray-800 mb-3">Scraping Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-xl font-bold text-blue-700">12.3s</p>
                    <p className="text-xs text-blue-600">Total Time</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-xl font-bold text-green-700">12</p>
                    <p className="text-xs text-green-600">Jobs Found</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-xl font-bold text-purple-700">5</p>
                    <p className="text-xs text-purple-600">Sources</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <p className="text-xl font-bold text-amber-700">0</p>
                    <p className="text-xs text-amber-600">Errors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="text-lg">🕷️</span>
              <span>Built with <strong className="text-indigo-600">Flask</strong> + <strong className="text-purple-600">BeautifulSoup</strong> + Python</span>
            </div>
            <div className="flex items-center space-x-4 mt-3 md:mt-0">
              <span className="text-xs text-gray-400">Scrapes data from job boards and displays it in a clean dashboard</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
