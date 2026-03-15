import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <div
      className={`bg-white border rounded-xl p-5 hover:shadow-sm transition-all duration-200 ${
        post.isLocal
          ? "border-green-200 bg-green-50"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-mono text-slate-400">#{index + 1}</span>
        {post.isLocal && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            New (local)
          </span>
        )}
      </div>
      <h4 className="font-semibold text-slate-800 mb-2 capitalize leading-snug">
        {post.title}
      </h4>
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 capitalize">
        {post.body}
      </p>
    </div>
  );
}
