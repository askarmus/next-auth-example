// src/schemas/jobSchema.ts

import { z } from 'zod'

// Regular expression to validate MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/

// Common Job Fields
const jobBaseSchema = z.object({
    jobTitle: z.string().min(1, 'Job title is required'),
    description: z.string().min(1, 'Description is required'),
    questions: z.array(z.string()).min(1, 'At least one question is required'),
    status: z.enum(['open', 'closed']).default('open'),
    recordStatus: z.enum(['active', 'deleted']).default('active'),
    experienceLevel: z.string(),
})

// Create Job Schema
export const createJobSchema = jobBaseSchema.extend({
    userId: z.string().regex(objectIdRegex, 'Invalid User ID format'),
})

// Update Job Schema
export const updateJobSchema = jobBaseSchema.partial()

// Response Schema
export const jobResponseSchema = jobBaseSchema.extend({
    id: z.string().regex(objectIdRegex, 'Invalid Job ID format'),
    userId: z.string().regex(objectIdRegex, 'Invalid User ID format'),
    totalApplication: z.number(),
    shortListedApplication: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
})
