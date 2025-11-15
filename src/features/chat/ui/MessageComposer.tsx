'use client';

import { useMemo } from 'react';
import { Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { z } from 'zod';

import { Button, Input } from '@/shared/ui';
import { SendMessageIcon } from '@icon';

interface MessageComposerProps {
  onSubmit: (message: string) => void;
}

const messageSchema = z.object({
  message: z.string().trim().min(1, 'لطفاً پیام خود را بنویسید.'),
});

export const MessageComposer = ({ onSubmit }: MessageComposerProps) => {
  const [form] = Form.useForm<{ message: string }>();
  const messageValue = Form.useWatch('message', form) ?? '';

  const canSend = useMemo(() => messageValue.trim().length > 0, [messageValue]);

  const validator: Rule['validator'] = async (_, value) => {
    const result = messageSchema.shape.message.safeParse(value ?? '');
    if (result.success) {
      return Promise.resolve();
    }
    return Promise.reject(result.error.issues[0]?.message ?? 'لطفاً پیام خود را بنویسید.');
  };

  const handleFinish = ({ message }: { message: string }) => {
    const parsed = messageSchema.safeParse({ message });
    if (!parsed.success) {
      form.setFields([
        {
          name: 'message',
          errors: parsed.error.issues.map((issue) => issue.message),
        },
      ]);
      return;
    }

    onSubmit(parsed.data.message.trim());
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} autoComplete="off">
      <Form.Item name="message" className="mb-0" validateTrigger="onSubmit" rules={[{ validator }]}>
        <div className="bg-input flex flex-1 items-center gap-4 rounded-full border border-accent shadow-lg">
          <Button
            htmlType="submit"
            type="text"
            rounded="full"
            disabled={!canSend}
            className="bg-foreground/10 h-12 w-12 rounded-full border-0 !p-0 text-muted transition-colors hover:bg-foreground/20"
          >
            <SendMessageIcon className="h-5 w-5" />
          </Button>
          <Input
            size="large"
            dir="rtl"
            bordered={false}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 bg-transparent pr-4 text-foreground"
          />
        </div>
      </Form.Item>
    </Form>
  );
};
