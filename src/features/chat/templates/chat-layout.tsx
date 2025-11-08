'use client';

import type { FC } from 'react';
import { ChatSidebar } from '@/features/chat/organisms/chat-sidebar';
import { ChatHero } from '@/features/chat/organisms/chat-hero';
import { ChatTimeline } from '@/features/chat/organisms/chat-timeline';
import { ChatInput } from '@/features/chat/organisms/chat-input';

export const ChatLayout: FC = () => {
  return (
    <div className="flex h-screen w-full gap-6 bg-gradient-to-b from-[#001b38] to-[#000d1e] px-8 py-6 text-white">
      <main className="flex flex-1 flex-col gap-6 overflow-hidden">
        <ChatHero />
        <div className="flex h-[calc(100%-22rem)] flex-col gap-6">
          <ChatTimeline />
          <ChatInput />
        </div>
      </main>
      <ChatSidebar />
    </div>
  );
};
