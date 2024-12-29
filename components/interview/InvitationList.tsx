import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'
import axios from 'axios'

interface Invitation {
    id: string
    name: string
    email: string
    status: string
    sentOn: string
    expires: string
}

interface InvitationListProps {
    jobId: string
}

const InvitationList: React.FC<InvitationListProps> = ({ jobId }) => {
    const [invitations, setInvitations] = useState<Invitation[]>([])

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await axios.get(
                    `/api/invitations?jobId=${jobId}`
                )
                setInvitations(response.data)
            } catch (error) {
                console.error('Failed to fetch invitations', error)
            }
        }

        fetchInvitations()
    }, [jobId])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Sent On</TableCell>
                        <TableCell>Expires</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invitations.map((invitation) => (
                        <TableRow key={invitation.id}>
                            <TableCell>{invitation.name}</TableCell>
                            <TableCell>{invitation.email}</TableCell>
                            <TableCell>{invitation.status}</TableCell>
                            <TableCell>
                                {new Date(invitation.sentOn).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                {new Date(invitation.expires).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InvitationList
