import type { ChatProgram } from "../types";

export const chatProgramsMock: ChatProgram[] = [
  {
    id: "nutrition",
    label: "برنامه تغذیه",
    description: "پایش و شخصی‌سازی تغذیه روزانه برای بهبود کیفیت زندگی.",
  },
  {
    id: "fitness",
    label: "برنامه تمرین",
    description: "مسیر ورزشی مبتنی بر وضعیت جسمانی و سطح انرژی فعلی.",
  },
  {
    id: "sleep",
    label: "برنامه خواب",
    description: "تنظیم زمان خواب و روتین‌های آرامش‌بخش برای بازیابی سریع‌تر.",
  },
  {
    id: "stress",
    label: "برنامه مدیریت استرس",
    description: "تمرین‌های تنفسی و مراقبه برای تمرکز در محیط‌های پرتنش.",
  },
];

export async function fetchChatPrograms(): Promise<ChatProgram[]> {
  const response = await fetch("/api/chat/programs", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("امکان دریافت برنامه‌ها وجود ندارد");
  }

  const { data } = (await response.json()) as { data: ChatProgram[] };
  return data;
}
