"use client"

import { type FormEvent, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { SendMessageIcon, UserIcon } from "@icon"
import { HomeHeader, ProgramDropdown } from "@/features/home/components/header"
import { useChatStore } from "@/features/home/store"
import { MessageBubble } from "@/components/shared/message-bubble"
import Image from "next/image"
import bgVector1 from '@/assets/icons/Group-1.svg';
import bgVector2 from '@/assets/icons/Group-2.svg';


export const MainSection = () => {
    const [message, setMessage] = useState("")
    const hasInteracted = useChatStore((state) => state.hasInteracted)
    const messages = useChatStore((state) => state.messages)
    const sendUserMessage = useChatStore((state) => state.sendUserMessage)

    const canSendMessage = useMemo(() => message.trim().length > 0, [message])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!canSendMessage) {
            return
        }

        sendUserMessage(message)
        setMessage("")
    }

    return (
        <main className="relative flex h-screen flex-1 flex-col">
            <HomeHeader />

            <div className="flex-1 overflow-y-auto p-6">
                <Image
                    src={bgVector1}
                    alt="vector"
                    width={500}
                    height={500}
                    className="absolute -left-60 -top-20 -z-50"
                />
                <Image
                    src={bgVector2}
                    alt="vector"
                    width={500}
                    height={500}
                    className="absolute -right-60 -bottom-20 -z-50"
                />
                {hasInteracted ? (
                    messages.length > 0 ? (
                        <ul className="flex flex-col gap-3">
                            {messages.map((chatMessage) => {
                                return (
                                    <li key={chatMessage.id} className="flex justify-start items-start gap-3">
                                        <div className="bg-surface-muted rounded-full w-12 h-12 p-0.5 flex items-end justify-center ring-4 ring-accent/20 overflow-hidden flex-shrink-0">
                                            <UserIcon className="w-9 h-9 overflow-hidden text-muted rounded-full" />
                                        </div>
                                        <MessageBubble text={chatMessage.text} role={chatMessage.role} />
                                    </li>
                                )
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

            <form onSubmit={handleSubmit} className="bg-foreground/5 backdrop-blur-sm border-t border-divider p-6">
                <div className="flex h-11 items-center gap-2">
                    <div className="flex h-12 flex-1 items-center gap-4 rounded-full border border-accent bg-input shadow-lg">
                        <button
                            type="submit"
                            className="rounded-full bg-foreground/10 p-4 transition-colors hover:bg-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label="ارسال پیام"
                            disabled={!canSendMessage}
                        >
                            <SendMessageIcon className="text-muted" />
                        </button>
                        <Input
                            type="text"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className="flex-1 bg-transparent pr-4 text-right text-foreground placeholder:text-muted"
                            placeholder="پیام خود را بنویسید..."
                            dir="rtl"
                        />
                    </div>
                </div>
            </form>
        </main>
    )
}