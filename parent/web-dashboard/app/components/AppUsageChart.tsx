"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const data = [
    { name: 'Instagram', time: 145 }, // minutes
    { name: 'YouTube', time: 120 },
    { name: 'WhatsApp', time: 80 },
    { name: 'Chrome', time: 45 },
    { name: 'Snapchat', time: 30 },
    { name: 'Roblox', time: 120 },
];

const AppUsageChart = () => {
    return (
        <div className="h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                        </linearGradient>
                        <linearGradient id="warnGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={15}
                        fontWeight={500}
                    />
                    <YAxis
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}m`}
                        dx={-10}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-[#0f172a] border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-xl">
                                        <p className="text-slate-300 text-xs font-semibold mb-1">{label}</p>
                                        <p className="text-white text-lg font-bold">
                                            {payload[0].value} <span className="text-xs text-slate-500 font-normal">mins</span>
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar dataKey="time" radius={[8, 8, 0, 0]} barSize={50} animationDuration={1500}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.time > 100 ? 'url(#warnGradient)' : 'url(#barGradient)'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default AppUsageChart;
