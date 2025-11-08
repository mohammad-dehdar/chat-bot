'use client';

import type { FC } from 'react';

export const ChatInput: FC = () => {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-4 shadow-[0_0_40px_rgba(12,180,255,0.2)]">
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/20 text-2xl text-cyan-100"
        aria-label="پیوست"
      >
        +
      </button>
      <input
        type="text"
        placeholder="سؤال خود را اینجا بنویسید..."
        className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-6 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
      />
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/60 text-xl text-slate-950 shadow-lg"
        aria-label="ارسال"
      >
        ➤
      </button>
    </div>
  );
};
