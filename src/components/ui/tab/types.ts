import { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabProps {
  items: TabItem[];
  defaultActiveId?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}
