// src/types/job.ts

export interface JobFormData {
    jobTitle: string;
    description: string;
    questions: string[];
    status: 'open' | 'closed';
  }
  
  export interface Job {
    id: string;
    userId: string;
    jobTitle: string;
    description: string;
    questions: string[];
    totalApplication: number;
    shortListedApplication: number;
    createdAt: string;
    updatedAt: string;
    status: 'open' | 'closed';
    recordStatus: 'active' | 'deleted';
  }
  