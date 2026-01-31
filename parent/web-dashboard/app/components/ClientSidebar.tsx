'use client';

import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), {
    ssr: false,
    loading: () => <div className="w-64 h-screen fixed left-0 top-0 bg-[#0f172a] border-r border-white/5" />
});

export default function ClientSidebar() {
    return <Sidebar />;
}
