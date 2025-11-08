'use client';

import type { FC } from 'react';
import { PanelItem } from '@/features/chat/molecules/panel-item';
import Image from 'next/image';

const items = [
  { label: 'گزارش دوره‌ای BMI', icon: '/window.svg' },
  { label: 'وضعیت قلب', icon: '/img/streamline-ultimate_laboratory-drug-file-bold.svg' },
  { label: 'گزارش خواب', icon: '/img/sleep-bot.svg' },
  { label: 'آزمایش کامل خون', icon: '/img/fontisto_laboratory.svg' },
  { label: 'آزمایش دیابت', icon: '/img/d-icon.svg' },
  { label: 'مکالمات قبلی', icon: '/file.svg' },
];

export const ChatSidebar: FC = () => {
  return (
    <aside className="relative flex h-full w-80 flex-col gap-6 rounded-l-3xl border-l border-white/5 bg-slate-900/30 p-6 backdrop-blur-xl">
      <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
            <Image src="/img/awake-bot.svg" alt="profile" width={32} height={32} />
          </span>
          <span className="leading-5">دستیار هوشمند سلامت</span>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white"
          aria-label="بازگشت"
        >
          ↩
        </button>
      </header>

      <div className="flex items-center gap-3">
        <button className="flex h-10 flex-1 items-center justify-center rounded-full bg-cyan-500/40 text-sm font-semibold text-white">
          + گفتگوی جدید
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white/80">
          ?
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
        <p>برنامه‌های درمانی</p>
        <div className="mt-3 space-y-3">
          {items.map((item) => (
            <PanelItem key={item.label} label={item.label} icon={item.icon} />
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-3 text-xs text-white/50">
        <p>آخرین فعالیت‌ها</p>
        <div className="space-y-2">
          <PanelItem
            label="بازخورد BMI"
            secondary="۲ دقیقه پیش"
            icon="/globe.svg"
            active
          />
          <PanelItem
            label="پرسش جدید"
            secondary="۱۰ دقیقه پیش"
            icon="/file.svg"
          />
        </div>
      </div>
    </aside>
  );
};
