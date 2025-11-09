'use client';

import { Dropdown } from '@/components/ui';

const quickActions = [
    'ایجاد گفتگوی جدید',
    'افزودن برچسب به گفتگو',
    'اشتراک‌گذاری با همکاران',
];

export const HomeHeader = () => {
    return (
        <header className="flex items-center justify-between border-b border-divider bg-white/10 px-6 py-4 backdrop-blur">
            <div className="text-right">
                <h1 className="text-lg font-semibold text-slate-900">خوش آمدید</h1>
                <p className="text-sm text-muted">برای مدیریت گفتگوها از منوی بالا استفاده کنید.</p>
            </div>

            <Dropdown label="تنظیمات پیشرفته" className="text-left">
                <div className="space-y-4 text-right">
                    <section className="space-y-2">
                        <h2 className="text-sm font-medium text-slate-900">اقدامات سریع</h2>
                        <ul className="space-y-2">
                            {quickActions.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-xl bg-white/60 px-3 py-2 text-sm text-slate-700 shadow-sm"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="overflow-hidden rounded-xl border border-divider">
                        <table className="w-full text-sm text-slate-700">
                            <thead className="bg-white/70 text-right text-xs font-medium uppercase text-muted">
                                <tr>
                                    <th className="px-3 py-2">عنوان</th>
                                    <th className="px-3 py-2">وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-white/60 even:bg-white/40">
                                    <td className="px-3 py-2">گفتگوی امروز</td>
                                    <td className="px-3 py-2">فعال</td>
                                </tr>
                                <tr className="odd:bg-white/60 even:bg-white/40">
                                    <td className="px-3 py-2">پیشنویس پاسخ</td>
                                    <td className="px-3 py-2">در انتظار</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <p className="text-xs text-muted">
                        این منو می‌تواند هر نوع محتوایی مانند جدول، فرم یا لیست را در خود جای دهد.
                    </p>
                </div>
            </Dropdown>
        </header>
    );
};
