import { NextResponse } from 'next/server';
import { getPairingCode, markCodeAsUsed } from '@/app/lib/store';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code: inputCode } = body;

        if (!inputCode) {
            return NextResponse.json({
                success: false,
                reason: "Code is required"
            }, { status: 400 });
        }

        const storedCode = getPairingCode();

        // Check if code exists
        if (!storedCode) {
            return NextResponse.json({
                success: false,
                reason: "Invalid code"
            }, { status: 400 });
        }

        // Check if code matches
        if (storedCode.code !== inputCode) {
            return NextResponse.json({
                success: false,
                reason: "Invalid code"
            }, { status: 400 });
        }

        // Check if already used
        if (storedCode.used) {
            return NextResponse.json({
                success: false,
                reason: "Code already used"
            }, { status: 400 });
        }

        // Check if expired
        if (Date.now() > storedCode.expiresAt) {
            return NextResponse.json({
                success: false,
                reason: "Code expired"
            }, { status: 400 });
        }

        // ✅ All checks passed - mark code as used
        markCodeAsUsed(inputCode);

        return NextResponse.json({
            success: true,
            message: "Device paired successfully!"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            reason: "Internal server error"
        }, { status: 500 });
    }
}
