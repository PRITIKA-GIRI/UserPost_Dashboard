"use client";

import { usePosts } from "@/hooks/usePosts";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";
import { PostCard } from "./PostCard";
import { Pagination } from "./ui/Pagination";
import { NewPostForm } from "./NewPostForm";

export function UserPostsClient({ userId }: { userId: number }) {
    const { posts, allPosts, apiIsLoading, error, currentPage, totalPages, setCurrentPage } =
        usePosts(userId);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Posts{!apiIsLoading && ` (${allPosts.length})`}
                </h2>
                <NewPostForm userId={userId} />
            </div>

            {apiIsLoading && <LoadingSpinner text="Loading users..." />}
            {error && <ErrorMessage message={error} />}

            {!apiIsLoading && !error && (
                <>
                    {posts.length === 0 ? (
                        <div className="text-center py-16 text-slate-400">No posts yet.</div>
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
                        onPageChange={(p) => {
                            setCurrentPage(p);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    />
                </>
            )}
        </div>
    );
}