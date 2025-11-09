'use client';

import { Dropdown, Tab } from '@/components/ui';

import { getTabItems } from './constants';

export const HomeHeader = () => {
    const tabItems = getTabItems();

    return (
        <header className="flex items-center justify-center border-b border-divider bg-white/10 px-6 backdrop-blur">
            <Dropdown label="" className='w-xl'>
                {/* کانتینر اصلی محتوا برای اعمال جلوه محوشوندگی */}
                <div className="relative">
                    {/* این بخش شامل محتوای داخلی است و حالا Border Fade را دارد */}
                    <div className="space-y-4 text-right p-2">
                        <section className="space-y-2 rounded-sm">
                            <h2 className="text-xs font-medium text-right">برنامه های درمانی شما</h2>
                            <Tab
                                items={tabItems}
                                defaultActiveId="nutrition"
                            />
                        </section>
                    </div>
                </div>
            </Dropdown>
        </header>
    );
};
