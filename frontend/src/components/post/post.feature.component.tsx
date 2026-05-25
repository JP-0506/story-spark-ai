import React from "react";
import { useGetFeaturedListsQuery } from "../../redux/apis/post.api";
import { Post } from "../../models/post";
import LoadingAnimation from "../loading/loading.component";

const ExploreFeatureComponent = () => {
  const { data, isLoading } = useGetFeaturedListsQuery(undefined);
  if (isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {data?.posts?.length ?? 0 > 0 ? (
        data?.posts?.map((post: Post) => (
          <div key={post._id} className="relative group overflow-hidden rounded-3xl border border-slate-700/50 shadow-2xl cursor-pointer">
            <img src={post.imageURL} className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white text-3xl font-bold tracking-tight drop-shadow-md group-hover:text-blue-300 transition-colors">{post.title}</h3>
              <p className="text-slate-300 text-base mt-3 leading-relaxed max-w-2xl line-clamp-2">
                {post.content.slice(0, 150)}...
              </p>
              <div className="flex items-center mt-6 pt-4 border-t border-white/10">
                <span className="bg-blue-600/40 border border-blue-500/50 backdrop-blur-md text-blue-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {post.tag}
                </span>
                <div className="ml-auto flex items-center gap-6 text-slate-200 text-sm font-medium">
                  <span className="flex items-center gap-2 hover:text-white transition-colors"><i className="fas fa-heart text-red-400"></i> {post.likesCount}</span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors"><i className="fas fa-comment text-blue-400"></i> {post.commentsCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Feature Post is not available!</div>
      )}
    </div>
  );
};

export default ExploreFeatureComponent;
