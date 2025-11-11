import type { TabItem } from '@/components/ui';

export const getTabItems = (): TabItem[] => [
    {
        id: 'nutrition',
        label: 'بهبود وضعیت تغذیه',
        content: (
            <div className="p-4">
                <p className="text-foreground">محتوای برنامه بهبود وضعیت تغذیه</p>
            </div>
        ),
    },
    {
        id: 'diet',
        label: 'رژیم درمانی',
        content: (
            <div className="p-4">
                <p className="text-foreground">محتوای برنامه رژیم درمانی</p>
            </div>
        ),
    },
];