"use client"

import type React from "react"
import { MessageBubbleProps } from "./type"

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, role }) => {
  if (role !== "user") {
    // Assistant message styling
    return (
      <div className="bg-background text-foreground rounded-2xl border border-accent max-w-xl px-4 py-2 text-sm shadow-lg">
        {text}
      </div>
    )
  }

  // User message with accent border
  return (
    <div className="flex flex-col gap-3">
      <div
        className="max-w-xl rounded-2xl px-4 border border-accent py-2 text-sm bg-background text-foreground shadow-lg"
      >
        {text}
      </div>
    </div>
  )
}