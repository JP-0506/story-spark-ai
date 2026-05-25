import React from 'react';
import { Link } from 'react-router-dom';
import { resources } from './community.data';

const ResourcesListComponent: React.FC = () => {
  return (
    <div className="gradient-bg min-h-screen text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/community" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Community
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Writing Resources
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Explore guides, tutorials, and templates designed to spark your storytelling and master AI-assisted writing.
          </p>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, idx) => (
            <Link
              key={idx}
              to={`/resources/${resource.slug}`}
              className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer block text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <i className={`fa-solid ${resource.icon} text-xl`}></i>
              </div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">
                {resource.category}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                {resource.overview}
              </p>
              <div className="flex items-center text-gray-500 text-sm font-medium">
                <i className="fa-regular fa-clock mr-2 text-blue-400"></i> {resource.readTime} read
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesListComponent;
