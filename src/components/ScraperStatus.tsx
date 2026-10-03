import React, { useState, useEffect } from 'react';
import { scraperSources } from '../data/jobData';

const ScraperStatus: React.FC = () => {
  const [animatedSources, setAnimatedSources] = useState(
    scraperSources.map(s => ({ ...s, status: 'pending' as string }))
  );

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    scraperSources.forEach((source, index) => {
      const timer = setTimeout(() => {
        setAnimatedSources(prev => 
          prev.map((s, i) => i === index ? { ...s, status: 'scraping' } : s)
        );
      }, index * 600);
      timers.push(timer);

      const completeTimer = setTimeout(() => {
        setAnimatedSources(prev => 
          prev.map((s, i) => i === index ? { ...s, status: 'completed' } : s)
        );
      }, index * 600 + 500);
      timers.push(completeTimer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Scraping Sources
          </h3>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">5 sources</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {animatedSources.map((source, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-2.5 h-2.5 rounded-full ${
                source.status === 'completed' ? 'bg-green-500' : 
                source.status === 'scraping' ? 'bg-yellow-500 animate-pulse' : 
                'bg-gray-300'
              }`}></div>
              <div>
                <p className="text-sm font-medium text-gray-800">{source.name}</p>
                <p className="text-xs text-gray-500">{source.url}</p>
              </div>
            </div>
            <div className="text-right">
              {source.status === 'completed' && (
                <>
                  <p className="text-sm font-medium text-green-600">{source.jobs} jobs</p>
                  <p className="text-xs text-gray-400">{source.time}</p>
                </>
              )}
              {source.status === 'scraping' && (
                <p className="text-xs text-yellow-600 font-medium animate-pulse">Scraping...</p>
              )}
              {source.status === 'pending' && (
                <p className="text-xs text-gray-400">Waiting...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScraperStatus;
