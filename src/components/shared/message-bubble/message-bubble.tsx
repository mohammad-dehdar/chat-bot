"use client";

import type { MessageBubbleProps } from "./type";

const baseBubbleClass =
  "max-w-xl rounded-2xl px-4 py-2 text-sm bg-white text-slate-900 shadow-lg";

const variantClassName: Record<MessageBubbleProps["role"], string> = {
  program: "border border-[#00AFC2]/60",
  user: "border border-[#00AFC2]",
};

export const MessageBubble = ({ text, role }: MessageBubbleProps) => {
  return (
    <div className={`${baseBubbleClass} ${variantClassName[role]}`}>
      {text}
    </div>
  );
};
