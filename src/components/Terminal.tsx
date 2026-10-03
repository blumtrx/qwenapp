import React, { useState, useEffect } from 'react';
import { scraperLogs } from '../data/jobData';

const Terminal: React.FC = () => {
  const [visibleLogs, setVisibleLogs] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs(prev => {
        if (prev >= scraperLogs.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-400';
      case 'SUCCESS': return 'text-green-400';
      case 'ERROR': return 'text-red-400';
      case 'WARNING': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-gray-400 font-mono">scraper_output.log</span>
        <div className="w-16"></div>
      </div>
      <div className="p-4 font-mono text-xs max-h-80 overflow-y-auto custom-scrollbar">
        <div className="text-gray-500 mb-2">$ python scraper.py --config config.yaml</div>
        {scraperLogs.slice(0, visibleLogs).map((log, index) => (
          <div key={index} className="flex space-x-2 mb-1 leading-relaxed">
            <span className="text-gray-600">[{log.time}]</span>
            <span className={`font-semibold min-w-[60px] ${getLevelColor(log.level)}`}>{log.level}</span>
            <span className="text-gray-300">{log.message}</span>
          </div>
        ))}
        {visibleLogs < scraperLogs.length && (
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
        )}
      </div>
    </div>
  );
};

export default Terminal;
