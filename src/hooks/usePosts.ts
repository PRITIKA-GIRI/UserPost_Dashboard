"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchPostsByUserId } from "@/lib/api";
import { usePostsStore } from "@/store";

const POSTS_PER_PAGE = 5;

export function usePosts(userId: number) {
  const { postsByUser, setPosts, getLocalPosts } = usePostsStore(); 
  const [apiIsLoading, setApiIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setApiIsLoading(true);
    setCurrentPage(1);
    const localPosts = getLocalPosts(userId);

    fetchPostsByUserId(userId)
      .then((data) => {
        setPosts(userId, [...localPosts, ...data]); 
        setError(null);
      })
      .catch(() => setError("Something went wrong"))
      .finally(() => setApiIsLoading(false));
  }, [userId]);

  const allPosts = postsByUser[userId] ?? []; 
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return allPosts.slice(start, start + POSTS_PER_PAGE);
  }, [allPosts, currentPage]);

  return {
    posts: paginatedPosts,
    allPosts,
    apiIsLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
