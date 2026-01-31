import { NextResponse } from 'next/server';
import { updateDeviceHeartbeat } from '@/app/lib/store';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validate body structure briefly
        if (!body.deviceId || typeof body.battery !== 'number') {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const updatedDevice = updateDeviceHeartbeat({
            battery: body.battery,
            network: body.network || 'online'
        });

        if (!updatedDevice) {
            return NextResponse.json({ error: 'Device not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, timestamp: Date.now() });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
