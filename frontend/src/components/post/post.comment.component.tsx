import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateCommentMutation,
  useGetCommentsListQuery,
  useToggleCommentLikeMutation,
} from "../../redux/apis/comment";
import { isLoggedIn, getUserInfo } from "../../services/auth.service";
import toast, { Toaster } from "react-hot-toast";
import SSProfile from "../ui-component/ss-profile/ss-profile";
import { timeAgo } from "../../utils/time-formate";
import { getErrorMessage } from "../../error/error.message";

type Inputs = {
  comment: string;
};

interface IPostCommentComponentProps {
  postId: string;
}

const PostCommentComponent: React.FC<IPostCommentComponentProps> = ({
  postId,
}) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [replyForms, setReplyForms] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const isLogin = isLoggedIn();
  const currentUser = getUserInfo();

  const { data: commentList } = useGetCommentsListQuery(postId);
  const [createComment] = useCreateCommentMutation();
  const [toggleCommentLike] = useToggleCommentLikeMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isLogin) {
      toast.error("Please login to post a comment.");
      return;
    }
    if (data.comment.trim() === "") {
      toast.error("Please enter a comment.");
      return;
    }
    const createPostComment = {
      postId: postId,
      comment: data.comment,
    };
    setIsBusy(true);
    try {
      const res = await createComment({ ...createPostComment }).unwrap();
      if (res) {
        toast.success("Comment posted successfully!");
        reset();
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsBusy(false);
    }
  };

  const onReplySubmit = async (e: React.FormEvent, parentCommentId: string) => {
    e.preventDefault();
    if (!isLogin) {
      toast.error("Please login to reply.");
      return;
    }
    const replyText = replyForms[parentCommentId];
    if (!replyText || replyText.trim() === "") {
      toast.error("Please enter a reply.");
      return;
    }

    const createPostComment = {
      postId: postId,
      comment: replyText,
      parentCommentId: parentCommentId,
    };
    try {
      const res = await createComment({ ...createPostComment }).unwrap();
      if (res) {
        toast.success("Reply posted successfully!");
        setReplyForms({ ...replyForms, [parentCommentId]: "" });
        setReplyingTo(null);
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  const isCommentLiked = (likes: string[] | undefined) =>
    (likes as unknown[])?.some((u) =>
      typeof u === "string"
        ? u === currentUser?.userId
        : (u as { email?: string })?.email === currentUser?.email
    ) ?? false;

  const handleLike = async (commentId: string) => {
    if (!isLogin) {
      toast.error("Please login to like a comment.");
      return;
    }
    try {
      await toggleCommentLike(commentId).unwrap();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("comment")}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder:text-slate-500 transition-all shadow-inner"
          rows={3}
          placeholder="Share your thoughts on this story..."
        ></textarea>
        <button
          type="submit"
          className={`!rounded-button mt-3 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md ${
            isBusy
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:scale-95 cursor-pointer"
          }`}
          disabled={isBusy}
        >
          {isBusy ? "Posting..." : "Post Comment"}
        </button>
      </form>
      <h3 className="text-2xl font-bold mb-8 text-slate-200 tracking-tight border-t border-slate-700/50 pt-8">
        Comments ({commentList?.totalComments || 0})
      </h3>
      <div className="space-y-6">
        {commentList?.comments.map((comment) => (
          <div key={comment._id} className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <SSProfile name={comment?.userId?.name || "Unknown User"} size="w-10 h-10" />
              <div className="flex-1">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-sm hover:border-slate-600 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-400 text-lg">
                      {comment?.userId?.name || "Unknown User"}
                    </h4>
                    <span className="text-sm text-slate-500 font-medium">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed mt-2">{comment.comment}</p>
                </div>
                <div className="flex items-center mt-3 pl-2 space-x-4 text-sm text-slate-500 font-medium">
                  <button
                    onClick={() => handleLike(comment._id)}
                    className={`hover:text-red-400 transition-colors flex items-center gap-1 ${isCommentLiked(comment.likes) ? "text-red-400" : ""}`}
                  >
                    <i className={`${isCommentLiked(comment.likes) ? "fas" : "far"} fa-heart mr-1`}></i>
                    {comment.likes?.length || 0}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                    className="hover:text-blue-400 transition-colors"
                  >
                    <i className="far fa-comment mr-1"></i> Reply
                  </button>
                </div>

                {replyingTo === comment._id && (
                  <form className="mt-4 flex space-x-3" onSubmit={(e) => onReplySubmit(e, comment._id)}>
                    <input
                      type="text"
                      value={replyForms[comment._id] || ""}
                      onChange={(e) => setReplyForms({ ...replyForms, [comment._id]: e.target.value })}
                      placeholder="Write a reply..."
                      className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Reply
                    </button>
                  </form>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 border-l-2 border-slate-700 pl-4 ml-2">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="flex space-x-3">
                        <SSProfile name={reply?.userId?.name || "Unknown User"} size="w-8 h-8" />
                        <div className="flex-1">
                          <div className="rounded-lg p-3 border border-slate-700 bg-slate-800/20">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm text-blue-400">
                                {reply?.userId?.name || "Unknown User"}
                              </h4>
                              <span className="text-xs text-slate-500">
                                {timeAgo(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-slate-300 text-sm">{reply.comment}</p>
                          </div>
                          <div className="flex items-center mt-1 space-x-4 text-xs text-slate-500">
                            <button
                              onClick={() => handleLike(reply._id)}
                              className={`hover:text-red-400 transition-colors ${isCommentLiked(reply.likes) ? "text-red-400" : ""}`}
                            >
                              <i className={`${isCommentLiked(reply.likes) ? "fas" : "far"} fa-heart mr-1`}></i>
                              {reply.likes?.length || 0}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default PostCommentComponent;
