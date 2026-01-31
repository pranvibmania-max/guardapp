'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-slate-800/50 animate-pulse flex items-center justify-center text-slate-500 rounded-2xl">
            Loading Map...
        </div>
    )
});

export default function ClientMap() {
    return <MapComponent />;
}
