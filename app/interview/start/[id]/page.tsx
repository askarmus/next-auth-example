'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { use } from 'react'
import { useRouter } from 'next/navigation'

interface InvitationData {
    jobTitle: string
    invitationStatus: string
}

interface PageProps {
    params: Promise<{
        id: string
    }>
}

const InvitationViewPage: React.FC<PageProps> = ({ params }) => {
    const { id } = use(params) // Unwrap the `params` promise
    const [invitationData, setInvitationData] = useState<InvitationData | null>(
        null
    )
    const [error, setError] = useState<string | null>(null)
    const [isStarting, setIsStarting] = useState(false)
    const router = useRouter()

    const fetchAndValidateInvitation = async (invitationId: string) => {
        try {
            const response = await axios.get(
                `/api/invitations/validate/${invitationId}`
            )
            setInvitationData(response.data)
        } catch (err: any) {
            setError(
                err.response?.data?.error || err.message || 'Validation failed'
            )
        }
    }

    const startInterview = async (invitationId: string) => {
        try {
            setIsStarting(true) // Indicate the starting process

            const response = await axios.post('/api/interview/start', {
                invitationId,
            })

            if (response.status !== 200) {
                throw new Error(
                    response.data.error || 'Failed to update invitation'
                )
            }

            // Navigate to the interview page and block going back
            router.replace(`/interview/${invitationId}`)
        } catch (err: any) {
            setError(
                err.response?.data?.error || 'Failed to start the interview'
            )
        } finally {
            setIsStarting(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchAndValidateInvitation(id)
        } else {
            setError('No invitation ID provided')
        }
    }, [id])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Invitation Details</h1>
            {error && <p className="text-red-500">{error}</p>}

            {invitationData ? (
                <div className="space-y-6">
                    <div className="border p-4 rounded-lg bg-gray-100">
                        <h2 className="text-xl font-semibold">
                            Job Information
                        </h2>
                        <p>
                            <strong>Title:</strong> {invitationData.jobTitle}
                        </p>
                    </div>

                    <div className="border p-4 rounded-lg bg-white">
                        <h2 className="text-xl font-semibold">
                            Invitation Status
                        </h2>
                        <p>
                            <strong>Status:</strong>{' '}
                            {invitationData.invitationStatus}
                        </p>
                    </div>

                    {invitationData.invitationStatus !== 'scheduled' && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => startInterview(id)}
                                disabled={isStarting}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {isStarting ? 'Starting...' : 'Start Interview'}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading invitation details...</p>
            )}
        </div>
    )
}

export default InvitationViewPage
