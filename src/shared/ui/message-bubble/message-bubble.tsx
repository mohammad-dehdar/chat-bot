'use client';

import type { CSSProperties } from 'react';
import { Card, Typography } from 'antd';

import type { MessageBubbleProps } from './type';
import { cn } from '@/shared/lib/utils/cn';

const bubbleBodyStyle: CSSProperties = {
  padding: '0.75rem 1rem',
};

export const MessageBubble = ({ text, role }: MessageBubbleProps) => {
  const isUser = role === 'user';

  return (
    <Card
      bordered
      bodyStyle={bubbleBodyStyle}
      className={cn(
        'max-w-xl border border-accent shadow-lg backdrop-blur-sm',
        'bg-background text-foreground',
        isUser ? 'rounded-3xl' : 'rounded-2xl',
      )}
    >
      <Typography.Paragraph className="mb-0 text-sm leading-relaxed text-foreground" dir="rtl">
        {text}
      </Typography.Paragraph>
    </Card>
  );
};
