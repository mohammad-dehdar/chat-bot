'use client';

import type { FC } from 'react';
import { MessageBubble } from '@/features/chat/molecules/message-bubble';

const sampleMessages = [
  {
    variant: 'bot' as const,
    title: 'دستیار هوشمند',
    timestamp: 'لحظاتی پیش',
    message:
      'گزارش BMI جدید شما ۲۳.۸ ثبت شده است. محدوده‌ی مناسب بین ۱۸.۵ تا ۲۴.۹ است. برای حفظ این وضعیت توصیه می‌شود رژیم غذایی فعلی را ادامه دهید و مصرف پروتئین را در وعده‌ی صبحانه افزایش دهید.',
  },
  {
    variant: 'user' as const,
    title: 'شما',
    timestamp: 'لحظاتی پیش',
    message: 'برنامه پیشنهادی برای فعالیت روزانه رو هم می‌خوام.',
  },
  {
    variant: 'bot' as const,
    title: 'دستیار هوشمند',
    timestamp: 'چند ثانیه پیش',
    message:
      'با توجه به وضعیت BMI و الگوی خواب اخیر، ۳۰ دقیقه فعالیت هوازی سبک و ۱۵ دقیقه تمرین کششی در عصر توصیه می‌شود. آیا تمایل دارید این برنامه در تقویم ثبت شود؟',
    showActions: true,
    actionLabel: 'ثبت در تقویم',
  },
  {
    variant: 'alert' as const,
    title: 'هشدار سیستم',
    timestamp: '۱ ساعت پیش',
    message: 'در حال حاضر امکان دسترسی به اطلاعات آزمایشگاه فراهم نیست. لطفاً بعداً تلاش کنید.',
  },
];

export const ChatTimeline: FC = () => {
  return (
    <div className="flex h-full flex-col gap-8 overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/40 p-10 backdrop-blur-xl">
      {sampleMessages.map((item) => (
        <MessageBubble
          key={`${item.title}-${item.timestamp}`}
          variant={item.variant}
          title={item.title}
          timestamp={item.timestamp}
          showActions={item.showActions}
          actionLabel={item.actionLabel}
        >
          {item.message}
        </MessageBubble>
      ))}
    </div>
  );
};
