'use client';

import Image from 'next/image';
import type { FC } from 'react';

interface AvatarProps {
  variant?: 'user' | 'bot' | 'alert';
  size?: number;
  name?: string;
}

const avatarImages: Record<NonNullable<AvatarProps['variant']>, string> = {
  user: '/img/awake-bot.svg',
  bot: '/img/d-icon.svg',
  alert: '/img/sleep-bot.svg',
};

export const Avatar: FC<AvatarProps> = ({ variant = 'user', size = 56, name }) => {
  const src = avatarImages[variant];

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-900/40 shadow-lg"
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <Image src={src} alt={name ?? variant} width={size} height={size} priority />
    </div>
  );
};
