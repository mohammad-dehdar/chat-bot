import { useMutation } from "@tanstack/react-query";
import { sendChatMessage } from "./send-message";
import type { SendMessageInput } from "../types";

export function useSendMessageMutation() {
  return useMutation({
    mutationFn: (input: SendMessageInput) => sendChatMessage(input),
  });
}
