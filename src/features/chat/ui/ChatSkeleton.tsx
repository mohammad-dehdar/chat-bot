"use client";

import { Card, Skeleton, Space } from "antd";

export function ChatSkeleton() {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Card>
        <Skeleton active paragraph={{ rows: 2 }} />
      </Card>
      <Card>
        <Skeleton active paragraph={{ rows: 6 }} />
      </Card>
      <Card>
        <Skeleton.Input active size="large" style={{ width: "100%" }} />
      </Card>
    </Space>
  );
}
