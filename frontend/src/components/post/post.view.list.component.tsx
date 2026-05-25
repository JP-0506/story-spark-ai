import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../models/post";
import LoadingAnimation from "../loading/loading.component";

interface IExploreViewListComponentProps {
  posts: Post[];
  isLoading: boolean;
}

const ExploreViewListComponent: React.FC<IExploreViewListComponentProps> = ({
  posts,
  isLoading,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.length > 0 ? (
          posts.map((story) => (
            <div
              key={story._id}
              onClick={() => navigate(`/post/${story._id}`)}
              className="cursor-pointer bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full"
            >
              <div className="relative overflow-hidden">
                <img
                  src={story.imageURL}
                  alt={`Cover image for ${story.title}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 pointer-events-none"></div>

                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-600 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {story.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                  {story.title}
                </h3>

                <p className="text-sm text-slate-400 mb-6 line-clamp-2 flex-1 leading-relaxed">
                  {story.content.slice(0, 100)}...
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-700/50 pt-4 mt-auto">
                  <div className="flex items-center gap-4">
                    <span>Author</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
};

export default ExploreViewListComponent;
