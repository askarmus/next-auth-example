'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Job } from '@/types/jobTypes';
import axios from 'axios';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import ConfirmDeleteAlertDialog from '../ui/ConfirmDeleteAlertDialog';
import JobCard from './jobcard';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
 
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get(`/api/job?page=${page}&limit=${limit}`);
      const data = response.data;

      setJobs(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
      alert('Failed to fetch jobs. Please try again.');
    }
  }, [page, limit]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDeleteClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleConfirmDelete = async () => {
    if (!selectedJob) return;

    try {
      await axios.delete(`/api/job/${selectedJob.id}`);
      alert('Job deleted successfully!');
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setSelectedJob(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 bg-white dark:bg-gray-800 rounded-lg p-5 mb-6 h-full">
        <h2 className="text-xl font-semibold">Job Listings</h2>
        <Link 
          href="/dashboard/job/new" 
          className="inline-block text-center border leading-5 hover:ring-0 focus:outline-none focus:ring-0 py-2 px-4 text-gray-100 bg-indigo-500 border-indigo-500 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 rounded"
        >
          Add New Job
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard
            key={job.id} // Unique key prop
            tags={['sssss']}
            title={'Senior software engineer'}
            description={
              'Creating a website redesign project plan is vital to making your redesign go smoothly. There’s who you think your customers are, who you want your customers to be.'
            }
            progress={0}
            dueDate={''}
            taskDone={0}
            totalTasks={0}
            avatars={[]}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 bg-gray-200 rounded ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 bg-gray-200 rounded ${
            page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          Next
        </button>
      </div>

      {selectedJob && (
        <ConfirmDeleteAlertDialog
          open={selectedJob !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedJob(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          description={`Are you sure you want to delete the job "${selectedJob.jobTitle}"?`}
        />
      )}
    </div>
  );
};

export default JobList;
