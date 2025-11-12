'use client';

import Image from 'next/image';

import { Dropdown, Tab, type TabItem } from '@/components/ui';
import { useChatStore } from '../state/chat-store';

interface ProgramDropdownProps {
  className?: string;
}

const programTabs: TabItem[] = [
  {
    id: 'nutrition',
    label: 'بهبود وضعیت تغذیه',
    content: (
      <div className="p-4">
        <p className="text-foreground">محتوای برنامه بهبود وضعیت تغذیه</p>
      </div>
    ),
  },
  {
    id: 'diet',
    label: 'رژیم درمانی',
    content: (
      <div className="p-4">
        <p className="text-foreground">محتوای برنامه رژیم درمانی</p>
      </div>
    ),
  },
];

export function ProgramDropdown({ className }: ProgramDropdownProps) {
  const sendProgramMessage = useChatStore((state) => state.sendProgramMessage);

  return (
    <div className="relative w-xs sm:w-lg overflow-visible">
      <div className="absolute -top-61 left-1/2 -translate-x-1/2">
        <Image
          src="/img/awake-bot.svg"
          alt="AwakeBot"
          width={160}
          height={197}
          priority
          className="h-auto"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      <Dropdown className={className}>
        <div className="relative z-50">
          <div className="space-y-4 p-2 text-right">
            <section className="space-y-2 rounded-sm">
              <h2 className="text-xs font-medium">برنامه های درمانی شما</h2>
              <Tab
                items={programTabs}
                defaultActiveId="nutrition"
                onSelect={(item) => sendProgramMessage(item.label)}
              />
            </section>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
