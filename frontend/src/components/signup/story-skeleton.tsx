import React from "react";

const StorySkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-slate-800/80 backdrop-blur-2xl border border-blue-500/30 rounded-2xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] animate-pulse relative overflow-hidden">
      {/* Ambient glowing orbs inside the skeleton card */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-14 h-14 rounded-full bg-slate-700/80 shadow-inner"></div>
        <div className="space-y-3">
          <div className="h-5 w-56 bg-slate-700/80 rounded-md"></div>
          <div className="h-3 w-36 bg-slate-700/50 rounded-md"></div>
        </div>
      </div>

      {/* Story Content Skeleton */}
      <div className="space-y-5 relative z-10">
        <div className="h-4 w-full bg-slate-700/60 rounded-md"></div>
        <div className="h-4 w-[96%] bg-slate-700/60 rounded-md"></div>
        <div className="h-4 w-[92%] bg-slate-700/60 rounded-md"></div>
        <div className="h-4 w-[98%] bg-slate-700/60 rounded-md"></div>
        <div className="h-4 w-[85%] bg-slate-700/60 rounded-md"></div>
        
        <div className="h-4 w-[94%] bg-slate-700/60 rounded-md mt-8"></div>
        <div className="h-4 w-[88%] bg-slate-700/60 rounded-md"></div>
        <div className="h-4 w-[75%] bg-slate-700/60 rounded-md"></div>
      </div>
    </div>
  );
};

export default StorySkeleton;