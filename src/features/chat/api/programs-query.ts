import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchChatPrograms } from "./programs";

export const chatProgramsQueryKey = ["chat-programs"] as const;

export function useChatProgramsQuery() {
  return useSuspenseQuery({
    queryKey: chatProgramsQueryKey,
    queryFn: fetchChatPrograms,
    staleTime: 1000 * 60 * 10,
  });
}
