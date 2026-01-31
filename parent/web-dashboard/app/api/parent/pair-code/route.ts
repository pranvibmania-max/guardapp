import { NextResponse } from 'next/server';
import { getPairingCode, generatePairingCode } from '@/app/lib/store';

export async function GET() {
    const pairingCode = getPairingCode();
    return NextResponse.json(pairingCode);
}

export async function POST() {
    // Force generate new code
    const newCode = generatePairingCode();
    return NextResponse.json(newCode);
}
