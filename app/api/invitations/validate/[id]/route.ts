import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: PageProps) {
    try {
        // Await the promise to extract 'id'
        const { id: invitationId } = await params

        // Fetch the invitation and associated job with only the required fields
        const invitation = await prisma.sentInvitation.findUnique({
            where: { id: invitationId },
            include: { job: { select: { jobTitle: true } } },
        })

        if (!invitation) {
            return NextResponse.json(
                { error: 'Invitation not found' },
                { status: 404 }
            )
        }

        // Check expiration and status
        // const now = new Date()
        // if (invitation.expires < now) {
        //     return NextResponse.json(
        //         { error: 'The invitation has expired.' },
        //         { status: 400 }
        //     )
        // }

        // if (invitation.status !== 'scheduled') {
        //     return NextResponse.json(
        //         {
        //             error: `The invitation is already ${invitation.status.toLowerCase()}.`,
        //         },
        //         { status: 400 }
        //     )
        // }

        // Return a custom response with only required fields
        return NextResponse.json({
            jobTitle: invitation.job.jobTitle,
            invitationStatus: invitation.status,
            name: invitation.name,
            email: invitation.email,
        })
    } catch (error) {
        console.error('GET /api/invitation/validate/[id] error:', error)
        return NextResponse.json(
            { error: 'Failed to validate the invitation.' },
            { status: 500 }
        )
    }
}
