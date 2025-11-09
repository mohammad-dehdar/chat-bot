'use client';

import Image from 'next/image';
import { Dropdown, Tab } from '@/components/ui';
import { useChatStore } from '@/features/home/store';
import awakeBotSvg from '@/assets/icons/awake-bot.svg';

import { getTabItems } from './constants';

interface ProgramDropdownProps {
    className?: string;
}

export const ProgramDropdown = ({ className }: ProgramDropdownProps) => {
    const tabItems = getTabItems();
    const sendProgramMessage = useChatStore((state) => state.sendProgramMessage);

    return (
        <div className="relative overflow-visible w-lg">
            <div className="absolute -top-50 left-1/2 -translate-x-1/2">
                <Image
                    src={awakeBotSvg}
                    alt="AwakeBot"
                    width={160}
                    height={197}
                    className="h-auto"
                />
            </div>
            <Dropdown className={className}>
                <div className="relative z-50">
                    <div className="space-y-4 text-right p-2">
                        <section className="space-y-2 rounded-sm">
                            <h2 className="text-xs font-medium text-right">برنامه های درمانی شما</h2>
                            <Tab
                                items={tabItems}
                                defaultActiveId="nutrition"
                                onSelect={(item) => sendProgramMessage(item.label)}
                            />
                        </section>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
};
