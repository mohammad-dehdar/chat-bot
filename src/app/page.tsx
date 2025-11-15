import { Suspense } from "react";
import { ChatPage } from "@/features/chat/components/ChatPage";
import { ChatSkeleton } from "@/features/chat/ui/ChatSkeleton";

export default function Home() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatPage />
    </Suspense>
  );
}
