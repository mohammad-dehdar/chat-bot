"use client";

import { useMemo } from "react";
import { Select, Typography } from "antd";
import { useChatProgramsQuery } from "../api/programs-query";
import { useChatStore } from "../hooks/useChatStore";

export function ProgramSelect() {
  const { data } = useChatProgramsQuery();
  const selectedProgramId = useChatStore((state) => state.selectedProgramId);
  const selectProgram = useChatStore((state) => state.selectProgram);

  const options = useMemo(
    () =>
      data.map((program) => ({
        label: program.label,
        value: program.id,
        description: program.description,
      })),
    [data]
  );

  return (
    <Select
      size="large"
      showSearch
      allowClear
      value={selectedProgramId ?? undefined}
      placeholder="انتخاب برنامه تمرکز"
      optionFilterProp="label"
      style={{ width: "100%" }}
      options={options}
      onChange={(value) => {
        const program = data.find((item) => item.id === value) ?? null;
        selectProgram(program?.id ?? null, program?.label ?? null);
      }}
      onClear={() => selectProgram(null, null)}
      optionRender={(option) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography.Text strong>{option.data.label}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {option.data.description}
          </Typography.Text>
        </div>
      )}
    />
  );
}
