'use client';

import { Input } from '@/components/ui';
import { SendMessageIcon } from '@icon';

import { HomeHeader } from './header';

export const MainSection = () => {
    return (
        <main className="flex h-screen flex-1 flex-col">
            <HomeHeader />

            <div className="flex-1 space-y-4 overflow-y-auto p-6" />

            <div className="bg-white/10 p-6">
                <div className="flex h-11 items-center gap-2">
                    <div className="flex h-12 flex-1 items-center gap-4 rounded-full border border-accent bg-input shadow-lg">
                        <div className="">
                            <div className="rounded-full bg-white/10 p-4">
                                <SendMessageIcon className="text-muted" />
                            </div>
                        </div>
                        <Input
                            type="text"
                            className="flex-1 bg-transparent pr-4 text-right text-slate-900 placeholder:text-muted"
                            placeholder="پیام خود را بنویسید..."
                            dir="rtl"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};
