'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import {
    UsersRound,
    UserCheck,
    ClockIcon as UserClock,
    Award,
} from 'lucide-react'

import {
    CircularProgress,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import PageHeader from '@/components/page.header'

const JobViewPage: React.FC = () => {
    const { jobId } = useParams()

    const [job, setJob] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const invitations = [
        {
            name: 'fsdfds',
            email: 'askarmus@hotmail.com',
            status: 'pending',
            expires: '1/11/2025, 11:13:59 PM',
        },
        {
            name: 'fsdfds',
            email: 'askarmus@hotmail.com',
            status: 'pending',
            expires: '1/11/2025, 11:18:09 PM',
        },
        {
            name: 'Askar Stokes Musthaffa',
            email: 'askarmus@hotmail.com',
            status: 'pending',
            expires: '12/31/2024, 11:47:27 PM',
        },
    ]

    useEffect(() => {
        if (!jobId) return

        const fetchJob = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `/api/job/${jobId}?id=${jobId}`
                )
                setJob(response.data)
            } catch (err: any) {
                setError(
                    err.response?.data?.message || 'Failed to fetch job details'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [jobId])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </div>
        )
    }

    if (!job) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Typography variant="h6">Job not found</Typography>
            </div>
        )
    }

    return (
        <div>
            <PageHeader
                title={job.jobTitle}
                breadcrumb="Dashaborad / Job / View"
                buttonText="Back"
                buttonLink="/dashboard/job"
            />
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 mb-6 h-full p-5">
                <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                <p className="text-gray-700 leading-relaxed">
                    {job.description}
                </p>

                <div className="mt-6 space-y-6 mb-5">
                    {/* Analytics Overview */}
                    <div className="grid gap-4 md:grid-cols-4">
                        {[
                            {
                                title: 'Total Applications',
                                value: '100',
                                description: '+20.1% from last month',
                                icon: UsersRound,
                            },
                            {
                                title: 'Shortlisted',
                                value: '25',
                                description: '25% success rate',
                                icon: UserCheck,
                            },
                            {
                                title: 'Pending Review',
                                value: '45',
                                description: '45% of total applications',
                                icon: UserClock,
                            },
                            {
                                title: 'Experience Level',
                                value: 'Trainee',
                                description: 'Entry level position',
                                icon: Award,
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {item.title}
                                        </p>
                                        <p className="text-2xl font-semibold mt-1">
                                            {item.value}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.description}
                                        </p>
                                    </div>
                                    <item.icon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Sent Invitations
                    </h3>
                    <div className="space-y-4 mb-5">
                        {job.sentInvitations &&
                        job.sentInvitations.length > 0 ? (
                            <div className="border rounded-lg p-4">
                                {job.sentInvitations.map(
                                    (invitation: any, index: number) => (
                                        <div
                                            key={index}
                                            className="flex flex-col space-y-2"
                                        >
                                            <div className="border rounded-lg p-4  mb-3">
                                                <div className="font-medium">
                                                    {invitation.name}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Email: {invitation.email}
                                                </div>
                                                <div className="flex gap-2 items-center text-sm text-gray-600">
                                                    <span>
                                                        Status:{' '}
                                                        {invitation.status}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        Expires:{' '}
                                                        {invitation.expires}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <Typography variant="body2">
                                No invitations sent yet.
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobViewPage
