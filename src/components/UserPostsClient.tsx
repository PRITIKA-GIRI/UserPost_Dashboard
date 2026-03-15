"use client";

import { usePosts } from "@/hooks/usePosts";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";
import { PostCard } from "./PostCard";
import { Pagination } from "./ui/Pagination";
import { NewPostForm } from "./NewPostForm";

interface UserPostsClientProps {
  userId: number;
  userName?: string;
}

export function UserPostsClient({ userId, userName }: UserPostsClientProps) {
  const {
    posts,
    allPosts,
    apiIsLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePosts(userId);

  return (
    <div>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-slate-800">
          Posts
          {!apiIsLoading && allPosts.length > 0 && (
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({allPosts.length} total)
            </span>
          )}
        </h2>
        <NewPostForm userId={userId} />
      </div>

      {/* Loading State — variable name required by spec */}
      {apiIsLoading && <LoadingSpinner text="Loading users..." />}

      {/* Error State */}
      {!apiIsLoading && error && <ErrorMessage message={error} />}

      {/* Posts List */}
      {!apiIsLoading && !error && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-slate-500 font-medium">No posts yet.</p>
              <p className="text-slate-400 text-sm mt-1">
                {userName} hasn&apos;t written anything yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {posts.map((post, idx) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={(currentPage - 1) * 5 + idx}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
}
