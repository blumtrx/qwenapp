import React from 'react';
import { JobListing } from '../data/jobData';

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'indeed.com': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'linkedin.com': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'glassdoor.com': return 'bg-green-100 text-green-700 border-green-200';
      case 'stackoverflow.com': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'upwork.com': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-indigo-50 text-indigo-700';
      case 'Part-time': return 'bg-purple-50 text-purple-700';
      case 'Contract': return 'bg-amber-50 text-amber-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors text-lg leading-tight">
              {job.title}
            </h3>
            <p className="text-sm text-indigo-600 font-medium mt-1">{job.company}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getSourceColor(job.source)}`}>
            {job.source.replace('.com', '')}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTypeColor(job.type)}`}>
              {job.type}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-bold text-green-600">{job.salary}</span>
          <span className="text-xs text-gray-400 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.posted}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
