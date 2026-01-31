'use client';

import dynamic from 'next/dynamic';

const AppUsageChart = dynamic(() => import('./AppUsageChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full mt-4 flex items-center justify-center text-slate-500">Loading Chart...</div>
});

export default function ClientAppUsageChart() {
    return <AppUsageChart />;
}
