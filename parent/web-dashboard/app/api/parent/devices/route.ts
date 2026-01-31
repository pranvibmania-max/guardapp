import { NextResponse } from 'next/server';
import { getDevice } from '@/app/lib/store';

export async function GET() {
    const device = getDevice();
    // Return array to allow for multiple devices in future
    return NextResponse.json({ devices: device ? [device] : [] });
}
