'use client';
import { SendMessageIcon } from '@icon';

export const MainSection = () => {
    return (
        <main className="flex-1 h-screen flex flex-col" >
            {/* Chat Header */}
            <header className="bg-white/10 h-12">
            </header >

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" >

            </div >

            {/* Input Area */}
            <div className="bg-white/10 p-6">
                <div className="flex gap-2 items-center h-11">
                    <div className="flex-1 flex items-center bg-[#D9D9D9] rounded-full gap-4 h-12 shadow-lg border border-[#0097A7]">
                        <div className='border-l !my-4'>
                            <div className="p-4 rounded-full bg-white/10">
                                <SendMessageIcon className='text-[#525252]' />
                            </div>
                        </div>
                        <input type="text" className="flex-1 bg-transparent outline-none text-slate-900  pr-4 placeholder-gray-400 text-right" placeholder="پیام خود را بنویسید..." dir="rtl" />
                    </div>
                </div>
            </div>
        </main >
    );
}
