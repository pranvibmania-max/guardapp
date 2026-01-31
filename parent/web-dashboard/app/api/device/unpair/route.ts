import { NextResponse } from 'next/server';
import { unpairDevice } from '@/app/lib/store';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.deviceId) {
            return NextResponse.json({ error: 'Device ID required' }, { status: 400 });
        }

        // In a real app check specific ID, here we just clear the single mock device
        unpairDevice();
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
