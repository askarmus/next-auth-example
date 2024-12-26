// src/app/api/job/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createJobSchema, updateJobSchema, jobResponseSchema } from '@/app/schemas/jobSchema';
import { z } from 'zod';
import { Prisma } from '@prisma/client'; // Import Prisma namespace
import { prisma } from '@/lib/db';

// GET /api/job - List jobs with pagination and exclude soft-deleted records
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const jobs = await prisma.job.findMany({
      where: { recordStatus: { not: 'deleted' } }, // Exclude soft-deleted jobs
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.job.count({
      where: { recordStatus: { not: 'deleted' } },
    });

    return NextResponse.json({
      data: jobs,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('GET /api/job error:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST /api/job - Create a new job
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createJobSchema.parse(body);

    const newJob = await prisma.job.create({
      data: {
        ...parsed,
        totalApplication: 0,
        shortListedApplication: 0,
        recordStatus: 'active', // Ensure the job is active upon creation
      },
    });

    return NextResponse.json(jobResponseSchema.parse(newJob), { status: 201 });
  } catch (error) {
    console.error('POST /api/job error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

 
 