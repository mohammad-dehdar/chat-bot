"use client";

import { type FormEvent, useMemo, useState } from "react";
import Image from "next/image";

import { MessageBubble } from "@/components/shared/message-bubble";
import { Input } from "@/components/ui/input";
import { SendMessageIcon, UserIcon } from "@icon";

import { useChatStore } from "../state/chat-store";
import { HomeHeader } from "./HomeHeader";
import { ProgramDropdown } from "./ProgramDropdown";
import bgVector1 from "@/assets/icons/Group-1.svg";
import bgVector2 from "@/assets/icons/Group-2.svg";

interface MainSectionProps {
  onOpenMobileSidebar?: () => void;
}

export function MainSection({ onOpenMobileSidebar }: MainSectionProps) {
  const [message, setMessage] = useState("");
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
    setMessage("");
  };

  return (
    <main className="relative flex min-h-screen flex-1 flex-col md:h-screen">
      {onOpenMobileSidebar ? (
        <div className="border-divider bg-foreground/5 sticky top-0 z-40 flex items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="bg-foreground/5 text-foreground relative flex h-10 w-10 items-center justify-center rounded-full border border-divider transition-all hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-label="باز کردن منو"
          >
            <span className="sr-only">باز کردن منو</span>
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
              <span className="block h-0.5 w-6 rounded-full bg-foreground" />
              <span className="block h-0.5 w-6 rounded-full bg-foreground" />
              <span className="block h-0.5 w-6 rounded-full bg-foreground" />
            </span>
          </button>

          <div className="flex flex-1 justify-end text-right">
            {hasInteracted ? (
              <ProgramDropdown className="w-full max-w-[220px]" />
            ) : (
              <span className="text-base font-semibold text-foreground">دستیار سلامت</span>
            )}
          </div>
        </div>
      ) : null}
      <HomeHeader className="hidden md:flex" />

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <Image
          src={bgVector1}
          alt="vector"
          width={500}
          height={500}
          priority
          className="absolute -left-40 -top-20 -z-50 hidden lg:block"
          style={{ width: "auto", height: "auto" }}
        />
        <Image
          src={bgVector2}
          alt="vector"
          width={500}
          height={500}
          priority
          className="absolute -right-40 -bottom-20 -z-50 hidden lg:block"
          style={{ width: "auto", height: "auto" }}
        />
        {hasInteracted ? (
          messages.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {messages.map((chatMessage) => (
                <li key={chatMessage.id} className="flex items-start justify-start gap-3">
                  <div className="bg-surface-muted flex h-12 w-12 flex-shrink-0 items-end justify-center overflow-hidden rounded-full p-0.5 ring-4 ring-accent/20">
                    <UserIcon className="h-9 w-9 overflow-hidden rounded-full text-muted" />
                  </div>
                  <MessageBubble text={chatMessage.text} role={chatMessage.role} />
                </li>
              ))}
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

      <form onSubmit={handleSubmit} className="border-divider bg-foreground/5 backdrop-blur-sm border-t p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="bg-input flex h-12 flex-1 items-center gap-4 rounded-full border border-accent shadow-lg sm:h-12">
            <button
              type="submit"
              className="bg-foreground/10 rounded-full p-4 transition-colors hover:bg-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="ارسال پیام"
              disabled={!canSendMessage}
            >
              <SendMessageIcon className="text-muted" />
            </button>
            <Input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="text-foreground flex-1 bg-transparent pr-4 text-right placeholder:text-muted"
              placeholder="پیام خود را بنویسید..."
              dir="rtl"
            />
          </div>
        </div>
      </form>
    </main>
  );
}
