import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/app/lib/store';

export async function GET() {
    return NextResponse.json(getSettings());
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newSettings = updateSettings(body);
        return NextResponse.json({ success: true, settings: newSettings });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
