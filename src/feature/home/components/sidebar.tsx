'use client';

import { AddIcon, Dicon, SearchIcon } from '@icon';
import { useState } from 'react';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside
            className={`h-screen border-l bg-sidebar border-gray-700/50 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-[200px]' : 'w-[48px]'
                }`}
        >
            {/* Header */}
            <div className={`p-2    flex items-center ${isOpen ? 'justify-end' : 'justify-center'}`}>
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label={isOpen ? 'بستن سایدبار' : 'باز کردن سایدبار'}
                >
                    <Dicon />
                </button>
            </div>

            {/* Chat List */}
            {isOpen && (
                <div className="flex-1 overflow-y-auto p-2">
                    <div className="space-y-2">
                        {/* Example chat items */}
                        <div className="items-center px-2 py-1 flex gap-2 rounded-2xl bg-[#F9FAFB] cursor-pointer transition-colors shadow-sm">
                            <SearchIcon />
                            <input type="text" placeholder="جستجو" className="w-full" />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <ul className='space-y-2 font-semibold'>
                            <li className="bg-[#F9FAFB] p-2 flex items-center gap-2 shadow-sm"><AddIcon />گفتگوی جدید</li>
                        </ul>
                    </div>
                </div>
            )}
        </aside>
    );
}
