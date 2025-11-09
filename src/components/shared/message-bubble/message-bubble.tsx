"use client"

import type React from "react"
import { useState } from "react"
import { MessageBubbleProps } from "./type"

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, role }) => {
  const [likes, setLikes] = useState({ liked: false, disliked: false, bookmarked: false })

  if (role !== "user") {
    // Assistant message styling (original)
    return (
      <div className="bg-white text-slate-900 rounded-2xl border  border-[#00AFC2] max-w-xl px-4 py-2 text-sm shadow-lg">
        {text}
      </div>
    )
  }

  // User message with green neon border and action buttons
  return (
    <div className="flex flex-col gap-3">
      {/* Message bubble with green neon border */}
      <div
        className="max-w-xl rounded-2xl px-4 border border-[#00AFC2] py-2 text-sm bg-white text-slate-900 shadow-lg"
      >
        {text}
      </div>

      {/* Action buttons row */}
      {/* <div className="flex gap-2 mt-2">
        <button
          onClick={() => setLikes({ ...likes, bookmarked: !likes.bookmarked })}
          className={`p-3 rounded-full transition-all ${
            likes.bookmarked ? "bg-slate-800 text-white" : "bg-slate-700 text-slate-300 hover:text-white"
          }`}
          aria-label="Bookmark"
        >
          <BookmarkIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => setLikes({ ...likes, disliked: !likes.disliked })}
          className={`p-3 rounded-full transition-all ${
            likes.disliked ? "bg-red-500 text-white" : "bg-slate-700 text-slate-300 hover:text-white"
          }`}
          aria-label="Dislike"
        >
          <ThumbsDownIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => setLikes({ ...likes, liked: !likes.liked })}
          className={`p-3 rounded-full transition-all ${
            likes.liked ? "bg-green-500 text-white" : "bg-slate-700 text-slate-300 hover:text-white"
          }`}
          aria-label="Like"
        >
          <ThumbsUpIcon className="w-5 h-5" />
        </button>
      </div> */}
    </div>
  )
}

// // Simple icon components
// const BookmarkIcon = ({ className }: { className?: string }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
//   </svg>
// )

// const ThumbsDownIcon = ({ className }: { className?: string }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M15 3H6a2 2 0 00-2 2v12a2 2 0 002 2h13a2 2 0 002-2v-5.5a2 2 0 00-2-2h-2.5L13 4.5a2 2 0 00-2-1.5zm0 3v6.75L14.25 15H2V6h13zm4 3v5h2V9h-2z"
//       transform="scale(-1, 1) translate(-24, 0)"
//     />
//   </svg>
// )

// const ThumbsUpIcon = ({ className }: { className?: string }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path d="M14 10l-2 1m2-1l2-1m-2 1v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m8-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2zm-5 6v2m-4-4v6" />
//   </svg>
// )
