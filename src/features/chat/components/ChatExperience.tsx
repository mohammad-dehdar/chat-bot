"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import {
  Button,
  Card,
  Drawer,
  Empty,
  Flex,
  Form,
  Grid,
  Input,
  Layout,
  List,
  Space,
  Typography,
} from "antd";
import { MenuOutlined, ReloadOutlined, SendOutlined } from "@ant-design/icons";
import { z } from "zod";
import { useChatStore } from "../hooks/useChatStore";
import { useSendMessageMutation } from "../api/useSendMessageMutation";
import { ProgramSelect } from "../ui/ProgramSelect";
import { ProgramSelectSkeleton } from "../ui/ProgramSelectSkeleton";
import { MessageBubble } from "../ui/MessageBubble";

const { Header, Content, Sider } = Layout;
const composerSchema = z.object({
  message: z.string().trim().min(1, "پیام خود را بنویسید"),
});

type ComposerFormValues = z.infer<typeof composerSchema>;

export function ChatExperience() {
  const screens = Grid.useBreakpoint();
  const isDesktop = screens.md ?? false;
  const [isDrawerRequested, setIsDrawerRequested] = useState(false);
  const [form] = Form.useForm<ComposerFormValues>();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const messages = useChatStore((state) => state.messages);
  const hasInteracted = useChatStore((state) => state.hasInteracted);
  const selectedProgramLabel = useChatStore((state) => state.selectedProgramLabel);
  const selectedProgramId = useChatStore((state) => state.selectedProgramId);
  const reset = useChatStore((state) => state.reset);
  const addUserMessage = useChatStore((state) => state.addUserMessage);
  const addAssistantMessage = useChatStore((state) => state.addAssistantMessage);

  const sendMutation = useSendMessageMutation();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleComposerFinish = async (values: ComposerFormValues) => {
    const result = composerSchema.safeParse(values);
    if (!result.success) {
      const errorMessage = result.error.formErrors.fieldErrors.message?.[0] ?? "پیام نامعتبر است";
      form.setFields([{ name: "message", errors: [errorMessage] }]);
      return;
    }

    const userMessage = addUserMessage(result.data.message);
    if (!userMessage) {
      form.setFields([{ name: "message", errors: ["لطفا پیام معتبری بنویسید"] }]);
      return;
    }

    form.resetFields();

    try {
      const response = await sendMutation.mutateAsync({
        text: result.data.message,
        programId: selectedProgramId,
      });
      addAssistantMessage(response.reply);
    } catch {
      form.setFields([{ name: "message", errors: ["ارسال پیام با خطا مواجه شد"] }]);
    }
  };

  const isDrawerOpen = !isDesktop && isDrawerRequested;

  const sidebar = useMemo(
    () => (
      <SidebarContent
        selectedProgramLabel={selectedProgramLabel}
        onReset={() => {
          reset();
          form.resetFields();
        }}
      />
    ),
    [selectedProgramLabel, reset, form]
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isDesktop && (
        <Sider
          width={320}
          theme="light"
          style={{
            background: "#f7f9fc",
            borderInlineEnd: "1px solid #f0f0f0",
            padding: 24,
          }}
        >
          {sidebar}
        </Sider>
      )}

      <Layout>
        <Header
          style={{
            background: "#ffffff",
            borderBottom: "1px solid #f0f0f0",
            paddingInline: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            دستیار سلامت دیجیتال
          </Typography.Title>
          {!isDesktop && (
            <Button icon={<MenuOutlined />} onClick={() => setIsDrawerRequested(true)}>
              برنامه‌ها
            </Button>
          )}
        </Header>

        <Content style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <Typography.Text type="secondary">برنامه فعال</Typography.Text>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {selectedProgramLabel ?? "برنامه‌ای انتخاب نشده است"}
              </Typography.Title>
            </Space>
          </Card>

          <Card style={{ flex: 1, display: "flex", flexDirection: "column" }} bodyStyle={{ padding: 0, height: "100%" }}>
            <div ref={messageContainerRef} style={{ flex: 1, overflowY: "auto", padding: 24 }}>
              {hasInteracted ? (
                messages.length > 0 ? (
                  <List
                    dataSource={messages}
                    split={false}
                    renderItem={(item) => (
                      <List.Item key={item.id} style={{ border: "none", display: "block" }}>
                        <MessageBubble message={item} />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description="برای شروع گفتگو پیام ارسال کنید" />
                )
              ) : (
                <Flex vertical align="center" justify="center" gap="large" style={{ minHeight: 280 }}>
                  <Typography.Paragraph style={{ maxWidth: 320, textAlign: "center" }}>
                    ابتدا یکی از برنامه‌های پیشنهادی را انتخاب کنید تا دستیار بتواند محتوای دقیق‌تری تولید کند.
                  </Typography.Paragraph>
                  <Suspense fallback={<ProgramSelectSkeleton />}>
                    <ProgramSelect />
                  </Suspense>
                </Flex>
              )}
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", padding: 16 }}>
              <Form form={form} layout="vertical" onFinish={handleComposerFinish} autoComplete="off">
                <Flex gap={8} align="end" wrap>
                  <Form.Item name="message" style={{ flex: 1, marginBottom: 0 }}>
                    <Input.TextArea
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      placeholder="پیام خود را بنویسید..."
                      disabled={sendMutation.isPending}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    loading={sendMutation.isPending}
                  >
                    ارسال
                  </Button>
                </Flex>
              </Form>
            </div>
          </Card>
        </Content>
      </Layout>

      {!isDesktop && (
        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerRequested(false)}
          title="انتخاب برنامه"
          width={360}
          styles={{ body: { padding: 24 } }}
        >
          {sidebar}
        </Drawer>
      )}
    </Layout>
  );
}

interface SidebarContentProps {
  selectedProgramLabel: string | null;
  onReset: () => void;
}

function SidebarContent({ selectedProgramLabel, onReset }: SidebarContentProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Typography.Title level={4} style={{ marginBottom: 8 }}>
          برنامه‌های تمرکز
        </Typography.Title>
        <Typography.Text type="secondary">
          یکی از برنامه‌ها را انتخاب کنید تا پیشنهادهای متناسب دریافت کنید.
        </Typography.Text>
      </div>

      <Suspense fallback={<ProgramSelectSkeleton />}>
        <ProgramSelect />
      </Suspense>

      <Card size="small">
        <Space direction="vertical" size={4} style={{ width: "100%" }}>
          <Typography.Text type="secondary">برنامه فعال</Typography.Text>
          <Typography.Text strong>{selectedProgramLabel ?? "انتخاب نشده"}</Typography.Text>
        </Space>
      </Card>

      <Button icon={<ReloadOutlined />} onClick={onReset} block>
        شروع مجدد گفتگو
      </Button>
    </Space>
  );
}
