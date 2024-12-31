import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

interface PageProps {
    params: Promise<{ jobId: string }>
}

export async function GET(request: Request, { params }: PageProps) {
    try {
        // Await the promise to extract 'jobId'
        const { jobId } = await params

        // Extract pagination and search query from the request
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = parseInt(searchParams.get('limit') || '10', 10)
        const search = searchParams.get('search') || ''

        // Fetch total count and paginated invitations with search filter
        const total = await prisma.sentInvitation.count({
            where: {
                jobId,
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            },
        })

        const invitations = await prisma.sentInvitation.findMany({
            where: {
                jobId,
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            },
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                sentOn: true,
                expires: true,
            },
        })

        // If no invitations found, return 404
        if (!invitations.length) {
            return NextResponse.json(
                { error: 'No invitations found for this job.' },
                { status: 404 }
            )
        }

        // Return invitations along with pagination metadata
        return NextResponse.json({
            invitations,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        })
    } catch (error) {
        console.error('GET /api/invitations/[jobId] error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch invitations.' },
            { status: 500 }
        )
    }
}
