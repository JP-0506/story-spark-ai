import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { resources } from './community.data';

const ResourceDetailComponent: React.FC = () => {
  const { resourceName } = useParams<{ resourceName: string }>();
  const resource = resources.find((res) => res.slug === resourceName);

  if (!resource) {
    return (
      <div className="gradient-bg min-h-screen text-white pt-32 pb-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Resource Not Found</h2>
        <p className="text-gray-400 mb-8">The writing resource you are looking for does not exist.</p>
        <Link to="/resources">
          <button className="!rounded-button bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold transition-colors cursor-pointer">
            Back to Resources
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="gradient-bg min-h-screen text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation */}
        <div className="mb-8 flex justify-between items-center">
          <Link to="/resources" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Resources
          </Link>
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            {resource.category}
          </span>
        </div>

        {/* Header Section */}
        <div className="flex items-start gap-6 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20">
            <i className={`fa-solid ${resource.icon} text-3xl`}></i>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              {resource.title}
            </h1>
            <div className="flex items-center text-gray-400 text-sm">
              <i className="fa-regular fa-clock mr-2 text-blue-400"></i>
              {resource.readTime} read time
            </div>
          </div>
        </div>

        <hr className="border-white/10 mb-10" />

        {/* Core Content Layout */}
        <div className="space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              {resource.overview}
            </p>
          </div>

          {/* Beginner-Friendly Guidance */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/5">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Beginner-Friendly Guidance</h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {resource.guidance}
            </p>
          </div>

          {/* Quick Tips */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Quick Tips</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resource.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5">
                  <i className="fa-solid fa-circle-check text-blue-400 mt-1 shrink-0"></i>
                  <span className="text-sm md:text-base">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples/Templates */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Concise Templates & Examples</h2>
            <div className="space-y-6">
              {resource.examples.map((ex, index) => (
                <div key={index} className="bg-slate-950/60 border border-white/5 rounded-xl p-5 md:p-6">
                  <div className="font-semibold text-blue-400 mb-3 text-sm md:text-base">{ex.label}</div>
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans bg-black/40 p-4 rounded-lg border border-white/5 leading-relaxed">
                    {ex.prompt}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailComponent;
