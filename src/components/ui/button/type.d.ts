import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import type { RoundedSize } from "@/components/ui/types";

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "children"
  > {
  icon?: ReactNode;
  children?: ReactNode;
  rounded?: RoundedSize;
}
