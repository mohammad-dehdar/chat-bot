'use client';

import type { FC } from 'react';
import { Avatar } from '@/features/chat/atoms/avatar';
import { IconButton } from '@/features/chat/atoms/icon-button';

export type MessageVariant = 'bot' | 'user' | 'alert';

export interface MessageBubbleProps {
  variant?: MessageVariant;
  title?: string;
  timestamp?: string;
  children: string;
  showActions?: boolean;
  actionLabel?: string;
}

const variantStyles: Record<MessageVariant, string> = {
  bot: 'bg-cyan-900/40 border-cyan-500/30 shadow-[0_0_40px_rgba(12,180,255,0.25)]',
  user: 'bg-white/10 border-white/10',
  alert: 'bg-red-900/50 border-red-500/40 shadow-[0_0_30px_rgba(248,113,113,0.35)]',
};

export const MessageBubble: FC<MessageBubbleProps> = ({
  variant = 'bot',
  title,
  timestamp,
  children,
  showActions,
  actionLabel,
}) => {
  return (
    <div className="flex w-full max-w-2xl gap-4">
      {variant !== 'user' && <Avatar variant={variant} size={56} />}
      <div className="flex-1">
        {title && (
          <div className="mb-2 flex items-center justify-between text-xs text-white/70">
            <span>{title}</span>
            {timestamp && <span>{timestamp}</span>}
          </div>
        )}
        <div
          className={`rounded-3xl border p-6 text-sm leading-7 text-white/90 backdrop-blur ${
            variantStyles[variant]
          } ${variant === 'user' ? 'ml-auto rounded-tr-lg rounded-br-3xl rounded-tl-3xl' : ''}`}
        >
          <p className="whitespace-pre-line text-base leading-7">{children}</p>
          {showActions && (
            <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
              <IconButton
                aria-label="like"
                icon={<span className="text-lg">👍</span>}
                subtle
              />
              <IconButton
                aria-label="dislike"
                icon={<span className="text-lg">👎</span>}
                subtle
              />
              <IconButton
                aria-label="comment"
                icon={<span className="text-lg">💬</span>}
                subtle
              />
              {actionLabel && (
                <button
                  type="button"
                  className="ml-auto rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80"
                >
                  {actionLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {variant === 'user' && <Avatar variant="user" size={48} />}
    </div>
  );
};
