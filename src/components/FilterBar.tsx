import React from 'react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  totalResults: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSource,
  setSelectedSource,
  selectedType,
  setSelectedType,
  totalResults,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search jobs by title, company, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Source Filter */}
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white min-w-[160px]"
        >
          <option value="">All Sources</option>
          <option value="indeed.com">Indeed</option>
          <option value="linkedin.com">LinkedIn</option>
          <option value="glassdoor.com">Glassdoor</option>
          <option value="stackoverflow.com">Stack Overflow</option>
          <option value="upwork.com">Upwork</option>
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white min-w-[140px]"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        {/* Results Count */}
        <div className="flex items-center px-4 py-2.5 bg-indigo-50 rounded-lg border border-indigo-100">
          <span className="text-sm font-medium text-indigo-700">{totalResults} results</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
