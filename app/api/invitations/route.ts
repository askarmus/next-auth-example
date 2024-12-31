import { prisma } from '@/lib/db'
import { sendInvitationEmail } from '@/mail/send/sendI.nvitation.email'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Zod Validation Schemas
const sendInvitationSchema = z.object({
    jobId: z.string(),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().optional(),
    expires: z.string(),
    userId: z.string(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const data = sendInvitationSchema.parse(body)

        // Create the invitation in the database
        const invitation = await prisma.sentInvitation.create({
            data: {
                jobId: data.jobId,
                userId: data?.userId,
                name: data.name,
                email: data.email,
                message: data.message!,
                expires: new Date(data.expires),
                status: 'scheduled ',
                sentOn: new Date(),
            },
        })

        // Send the email using the sendInvitationEmail function
        const emailStatus = await sendInvitationEmail(
            data.name,
            invitation.id,
            'AI-Based Interview Invitation',
            data.expires,
            data.email
        )

        if (emailStatus.status === 'success') {
            return NextResponse.json(
                { invitation, message: emailStatus.message },
                { status: 201 }
            )
        } else {
            return NextResponse.json(
                { error: emailStatus.message },
                { status: 500 }
            )
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export async function GET(request: Request) {
    const url = new URL(request.url)
    const jobId = url.searchParams.get('jobId')
    const invitationId = url.searchParams.get('invitationId')

    if (jobId) {
        const invitations = await prisma.sentInvitation.findMany({
            where: { jobId },
        })
        return NextResponse.json(invitations)
    }

    if (invitationId) {
        const invitation = await prisma.sentInvitation.findUnique({
            where: { id: invitationId },
        })
        return NextResponse.json(invitation)
    }

    return NextResponse.json(
        { error: 'Missing jobId or invitationId query parameter' },
        { status: 400 }
    )
}
