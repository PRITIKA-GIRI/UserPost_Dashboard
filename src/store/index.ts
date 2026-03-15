import { create } from "zustand";
import { User, Post } from "@/types";

interface UsersState {
  users: User[];
  setUsers: (users: User[]) => void;
}

interface PostsState {
  postsByUser: Record<number, Post[]>;
  addPost: (userId: number, post: Post) => void;
  setPosts: (userId: number, posts: Post[]) => void;
  getLocalPosts: (userId: number) => Post[];
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

export const usePostsStore = create<PostsState>((set, get) => ({
  postsByUser: {},
  setPosts: (userId, posts) =>
    set((state) => ({
      postsByUser: { ...state.postsByUser, [userId]: posts },
    })),
  addPost: (userId, post) => {
    set((state) => {
      const existing = state.postsByUser[userId] ?? [];
      const updated = [post, ...existing];
      // Persist local posts to localStorage
      if (typeof window !== "undefined") {
        const stored = JSON.parse(
          localStorage.getItem("localPosts") ?? "{}"
        ) as Record<number, Post[]>;
        const localForUser = (stored[userId] ?? []).filter((p) => p.isLocal);
        stored[userId] = [post, ...localForUser];
        localStorage.setItem("localPosts", JSON.stringify(stored));
      }
      return { postsByUser: { ...state.postsByUser, [userId]: updated } };
    });
  },
  getLocalPosts: (userId) => {
    if (typeof window === "undefined") return [];
    const stored = JSON.parse(
      localStorage.getItem("localPosts") ?? "{}"
    ) as Record<number, Post[]>;
    return (stored[userId] ?? []).filter((p) => p.isLocal);
  },
}));
