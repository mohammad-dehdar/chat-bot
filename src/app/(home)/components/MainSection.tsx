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

export function MainSection() {
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
    <main className="relative flex h-screen flex-1 flex-col">
      <HomeHeader />

      <div className="flex-1 overflow-y-auto p-6">
        <Image
          src={bgVector1}
          alt="vector"
          width={500}
          height={500}
          priority
          className="absolute -left-60 -top-20 -z-50"
          style={{ width: "auto", height: "auto" }}
        />
        <Image
          src={bgVector2}
          alt="vector"
          width={500}
          height={500}
          priority
          className="absolute -right-60 -bottom-20 -z-50"
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

      <form onSubmit={handleSubmit} className="border-divider bg-foreground/5 backdrop-blur-sm border-t p-6">
        <div className="flex h-11 items-center gap-2">
          <div className="bg-input flex h-12 flex-1 items-center gap-4 rounded-full border border-accent shadow-lg">
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
