'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Tag } from '@/features/chat/atoms/tag';

export const ChatHero: FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-slate-900/30 px-10 py-12 text-center shadow-[0_0_120px_rgba(12,180,255,0.2)]">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(13,116,255,0.25),transparent_60%)]" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8">
        <Image src="/img/awake-bot.svg" alt="smart assistant" width={160} height={160} />
        <div className="w-full rounded-3xl border border-cyan-500/50 bg-slate-950/80 p-8 text-white/90 shadow-[0_0_60px_rgba(12,180,255,0.25)]">
          <header className="mb-5 flex flex-wrap items-center justify-center gap-4 text-sm text-cyan-100/90">
            <Tag active>برنامه تغذیه هوشمند</Tag>
            <Tag>بررسی سلامت قلب</Tag>
            <Tag>پایش خواب</Tag>
          </header>
          <h2 className="text-2xl font-bold leading-10 text-white">
            برای استفاده از دستیار هوشمند، ابتدا به دلخواه یکی از برنامه‌های درمانی را از کادر بالا انتخاب کنید
          </h2>
        </div>
      </div>
    </section>
  );
};
