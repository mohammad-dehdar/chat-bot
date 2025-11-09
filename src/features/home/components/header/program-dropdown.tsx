'use client';

import { Dropdown, Tab } from '@/components/ui';
import { useChatStore } from '@/features/home/store';

import { getTabItems } from './constants';

interface ProgramDropdownProps {
    className?: string;
}

export const ProgramDropdown = ({ className }: ProgramDropdownProps) => {
    const tabItems = getTabItems();
    const sendProgramMessage = useChatStore((state) => state.sendProgramMessage);

    return (
        <Dropdown className={className}>
            <div className="relative">
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
    );
};
