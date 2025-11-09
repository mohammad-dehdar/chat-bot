import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { RoundedSize } from "@/components/ui/types";

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  > {
  type?: string;
  rounded?: RoundedSize;
}
