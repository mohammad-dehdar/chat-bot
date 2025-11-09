'use client';

import { FormEvent, useMemo, useState } from 'react';

import { Input } from '@/components/ui';
import { SendMessageIcon } from '@icon';

import { HomeHeader, ProgramDropdown } from '../header';
import { useChatStore } from '../../store';

export const MainSection = () => {
    const [message, setMessage] = useState('');
    const hasInteracted = useChatStore((state) => state.hasInteracted);
    const messages = useChatStore((state) => state.messages);
    const sendUserMessage = useChatStore((state) => state.sendUserMessage);

    const canSendMessage = useMemo(() => message.trim().length > 0, [message]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSendMessage) {
            return;
        }

        sendUserMessage(message);
        setMessage('');
    };

    return (
        <main className="flex h-screen flex-1 flex-col">
            <HomeHeader />

            <div className="flex-1 overflow-y-auto p-6">
                {hasInteracted ? (
                    messages.length > 0 ? (
                        <ul className="flex flex-col gap-3">
                            {messages.map((chatMessage) => {
                                const bubbleClasses =
                                    chatMessage.role === 'user'
                                        ? 'bg-gradient-to-l from-[#00AFC2] to-[#62F5FF] text-white'
                                        : 'bg-white text-slate-700 border border-[#00AFC2]/30';

                                return (
                                    <li key={chatMessage.id} className="flex justify-end">
                                        <div className={`max-w-xl rounded-3xl px-4 py-2 text-sm shadow-lg ${bubbleClasses}`}>
                                            {chatMessage.text}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted">
                            برای شروع گفتگو یک پیام ارسال کنید.
                        </div>
                    )
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <ProgramDropdown className="w-full max-w-xl" />
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="bg-white/10 p-6">
                <div className="flex h-11 items-center gap-2">
                    <div className="flex h-12 flex-1 items-center gap-4 rounded-full border border-accent bg-input shadow-lg">
                        <button
                            type="submit"
                            className="rounded-full bg-white/10 p-4 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label="ارسال پیام"
                            disabled={!canSendMessage}
                        >
                            <SendMessageIcon className="text-muted" />
                        </button>
                        <Input
                            type="text"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className="flex-1 bg-transparent pr-4 text-right text-slate-900 placeholder:text-muted"
                            placeholder="پیام خود را بنویسید..."
                            dir="rtl"
                        />
                    </div>
                </div>
            </form>
        </main>
    );
};
