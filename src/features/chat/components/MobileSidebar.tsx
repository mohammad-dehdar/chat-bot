'use client';

import { Drawer } from 'antd';

import { Button, Input } from '@/shared/ui';
import { AddIcon, DIcon, SearchIcon } from '@icon';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            placement="bottom"
            height={360}
            maskClosable
            closeIcon={null}
            rootClassName="mobile-sidebar-drawer"
            styles={{
                body: {
                    padding: '1.5rem',
                    background: 'transparent',
                    direction: 'rtl',
                },
                content: {
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    background: 'var(--sidebar)',
                },
                mask: {
                    backdropFilter: 'blur(6px)',
                },
            }}
        >
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DIcon className="h-6 w-6 text-foreground" />
                    <span className="text-base font-semibold text-foreground">منوی گفتگو</span>
                </div>
                <Button
                    type="text"
                    rounded="full"
                    htmlType="button"
                    aria-label="بستن منو"
                    onClick={onClose}
                    className="bg-foreground/5 border border-divider text-foreground"
                >
                    <span className="sr-only">بستن</span>
                    <span className="relative block h-5 w-5">
                        <span className="absolute inset-0 block h-0.5 w-full rotate-45 transform bg-foreground" />
                        <span className="absolute inset-0 block h-0.5 w-full -rotate-45 transform bg-foreground" />
                    </span>
                </Button>
            </div>

            <div className="space-y-4">
                <label className="text-foreground/70 block text-sm font-medium">جستجو</label>
                <div className="bg-surface flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm">
                    <SearchIcon className="h-5 w-5 text-muted" />
                    <Input
                        type="text"
                        placeholder="عبارت مورد نظر را جستجو کنید"
                        className="flex-1 border-0 bg-transparent text-right text-foreground"
                    />
                </div>
            </div>

            <div className="mt-6">
                <Button
                    type="text"
                    rounded="full"
                    htmlType="button"
                    className="bg-foreground/10 text-foreground flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold hover:bg-foreground/15"
                >
                    <AddIcon className="h-4 w-4 text-muted" />
                    گفت و گو جدید
                </Button>
            </div>
        </Drawer>
    );
}
