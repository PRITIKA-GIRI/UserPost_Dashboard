"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPostSchema, NewPostSchema } from "@/lib/validations";
import { usePostsStore } from "@/store";
import { Post } from "@/types";
import { useState } from "react";
import { toast } from "sonner"; 

interface NewPostFormProps {
  userId: number;
}

export function NewPostForm({ userId }: NewPostFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const addPost = usePostsStore((s) => s.addPost);
  // ✅ removed submitted state entirely

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewPostSchema>({ resolver: zodResolver(newPostSchema) });

  const onSubmit = async (data: NewPostSchema) => {
    const newPost: Post = {
      id: Date.now(),
      userId,
      title: data.title,
      body: data.body,
      isLocal: true,
    };
    addPost(userId, newPost);
    reset();
    setIsOpen(false);
    toast.success("Post added successfully!"); 
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <span>+</span> Add New Post
      </button>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Add New Post</h3>
        <button
          onClick={() => { setIsOpen(false); reset(); }}
          className="text-slate-400 hover:text-slate-600 text-xl leading-none"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-black gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            placeholder="Enter post title"
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.title ? "border-red-400 bg-red-50" : "border-slate-200"
              }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Body <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("body")}
            placeholder="Enter post body"
            rows={4}
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${errors.body ? "border-red-400 bg-red-50" : "border-slate-200"
              }`}
          />
          {errors.body && (
            <p className="text-red-500 text-xs mt-1">{errors.body.message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isSubmitting ? "Saving..." : "Submit Post"}
          </button>
          <button
            type="button"
            onClick={() => { setIsOpen(false); reset(); }}
            className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}