'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Job } from '@/types/jobTypes'
import axios from 'axios'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import ConfirmDeleteAlertDialog from '../ui/ConfirmDeleteAlertDialog'
import JobCard from './jobcard'
import JobCardSkeleton from './JobCardSkeleton'

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setLoading] = useState(false)
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)

    const limit = 10
    const totalPages = Math.ceil(total / limit)

    const fetchJobs = useCallback(async () => {
        setLoading(true)
        const response = await axios.get(`/api/job?page=${page}&limit=${limit}`)
        const data = response.data
        setJobs(data.data)
        setTotal(data.total)
        setLoading(false)
    }, [page, limit])

    useEffect(() => {
        fetchJobs()
    }, [fetchJobs])

    const handleDeleteClick = (job: Job) => {
        setSelectedJob(job)
    }

    const handleConfirmDelete = async () => {
        if (!selectedJob) return

        try {
            await axios.delete(`/api/job/${selectedJob.id}`)
            alert('Job deleted successfully!')
            fetchJobs()
        } catch (error) {
            console.error('Failed to delete job', error)
            alert('Failed to delete job. Please try again.')
        } finally {
            setSelectedJob(null)
        }
    }

    return (
        <div>
            <div className="mb-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                        View all
                    </button>
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        Monitored
                    </button>
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        Unmonitored
                    </button>
                </div>
                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>

            {isLoading && (
                <div className="max-w-12xl mx-auto p-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(9)].map((_, index) => (
                            <JobCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            )}

            {!isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            title={job.jobTitle}
                            jobId={job.id}
                            description={job.description}
                            createdOn={job.createdAt}
                            status={job.status}
                            totalApplication={job.totalApplication}
                        />
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-3 py-1 bg-gray-200 rounded ${
                        page === 1
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-gray-300'
                    }`}
                >
                    Previous
                </button>
                <span className="px-3 py-1">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className={`px-3 py-1 bg-gray-200 rounded ${
                        page === totalPages
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-gray-300'
                    }`}
                >
                    Next
                </button>
            </div>
            {selectedJob && (
                <ConfirmDeleteAlertDialog
                    open={selectedJob !== null}
                    onOpenChange={(open) => {
                        if (!open) setSelectedJob(null)
                    }}
                    onConfirm={handleConfirmDelete}
                    title="Confirm Deletion"
                    description={`Are you sure you want to delete the job "${selectedJob.jobTitle}"?`}
                />
            )}
        </div>
    )
}

export default JobList
