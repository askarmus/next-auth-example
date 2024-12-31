import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { invitationId } = body

        if (!invitationId) {
            return NextResponse.json(
                { error: 'Invitation ID is required' },
                { status: 400 }
            )
        }

        const updatedInvitation = await prisma.sentInvitation.update({
            where: { id: invitationId },
            data: { status: 'started' },
        })

        return NextResponse.json({
            message: 'Invitation started successfully',
            updatedInvitation,
        })
    } catch (error: any) {
        console.error('Error starting invitation:', error)
        return NextResponse.json(
            { error: 'Failed to start invitation' },
            { status: 500 }
        )
    }
}
