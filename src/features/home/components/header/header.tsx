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
                    <div className="space-y-4 text-right p-2  bg-sidebar
                                    border border-x border-t
                                    border-b-0 rounded-t-sm
                                    shadow-[0_-5px_5px_-2px_rgba(203,213,225,0.9)]
                                    relative z-0">
                        <section className="space-y-2 rounded-sm">
                            <h2 className="text-xs font-medium text-right">برنامه های درمانی شما</h2>
                            <Tab
                                items={tabItems}
                                defaultActiveId="nutrition"
                                contentClassName="min-h-[200px] bg-white rounded-b-sm border border-t-0 border-x border-b border-slate-200"
                            />
                        </section>
                    </div>
                </div>
            </Dropdown>
        </header>
    );
};
