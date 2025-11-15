"use client";

import { Card, Typography } from "antd";
import type { ChatMessage } from "../types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <Card
      bordered
      style={{
        backgroundColor: isUser ? "#eef4ff" : "#ffffff",
        marginInlineStart: isUser ? "auto" : undefined,
        maxWidth: 520,
      }}
      bodyStyle={{ padding: "12px 16px" }}
    >
      <Typography.Paragraph style={{ marginBottom: 4, color: "#1f1f1f" }}>
        {message.text}
      </Typography.Paragraph>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        {new Date(message.createdAt).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
      </Typography.Text>
    </Card>
  );
}
