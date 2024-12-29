import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (id) {
        const job = await prisma.job.findUnique({
            where: { id },
            include: { sentInvitations: true }, // Include related invitations
        })
        return NextResponse.json(job)
    }

    return NextResponse.json(
        { error: 'Missing jobId or invitationId query parameter' },
        { status: 400 }
    )
}
