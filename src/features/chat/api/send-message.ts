import { z } from "zod";
import type { SendMessageInput } from "../types";

const sendMessageSchema = z.object({
  text: z.string().trim().min(1, "لطفا پیام خود را وارد کنید"),
  programId: z.string().trim().min(1).optional().or(z.literal(null)),
});

export type SendMessageResponse = {
  reply: string;
};

export async function sendChatMessage(input: SendMessageInput): Promise<SendMessageResponse> {
  const parsed = sendMessageSchema.parse({
    text: input.text,
    programId: input.programId ?? null,
  });

  await new Promise((resolve) => setTimeout(resolve, 650));

  const suffix = parsed.programId ? ` در برنامه ${parsed.programId}` : "";
  return {
    reply: `پیام شما${suffix} دریافت شد و در حال تحلیل است.`,
  };
}
