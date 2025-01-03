import React, { useState, useEffect } from 'react'
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    ListSubheader,
    TextField,
    Link,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AdminButton from '../Btn'
import { useSession } from 'next-auth/react'
import { useSnackbar } from '@/lib/service/SnackbarService'

const invitationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().optional(),
    expires: z.string().min(1, 'Expiry date is required'),
})

type InvitationFormData = z.infer<typeof invitationSchema>

interface Invitation {
    id: string
    name: string
    email: string
    status: string
    sentOn: string
}

interface InvitationDrawerProps {
    open: boolean
    onClose: () => void
    jobId: string
}

const calculateExpiryDate = (option: string): string | null => {
    const currentDate = new Date()
    switch (option) {
        case '1_day':
            currentDate.setDate(currentDate.getDate() + 1)
            break
        case '3_days':
            currentDate.setDate(currentDate.getDate() + 3)
            break
        case '5_days':
            currentDate.setDate(currentDate.getDate() + 5)
            break
        case '1_week':
            currentDate.setDate(currentDate.getDate() + 7)
            break
        case '2_weeks':
            currentDate.setDate(currentDate.getDate() + 14)
            break
        case '3_weeks':
            currentDate.setDate(currentDate.getDate() + 21)
            break
        case 'no_expiry':
            return null
        default:
            return null
    }
    return currentDate.toISOString()
}

const InvitationDrawer: React.FC<InvitationDrawerProps> = ({
    open,
    onClose,
    jobId,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<InvitationFormData>({
        resolver: zodResolver(invitationSchema),
    })
    const [isSubmitting, setSubmitting] = useState(false)
    const [search, setSearch] = useState('')
    const [hasSearched, setHasSearched] = useState(false)
    const [invitations, setInvitations] = useState<Invitation[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1) // Start with page 1
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const { data: session } = useSession()
    const { showSuccess, showError } = useSnackbar()

    const totalPages = Math.ceil(total / rowsPerPage)

    const fetchInvitations = async (searchTerm = '', page = 1, limit = 10) => {
        try {
            const response = await axios.get(
                `/api/invitations/${jobId}?search=${searchTerm}&page=${page}&limit=${limit}`
            )
            setInvitations(response.data.invitations || [])
            setTotal(response.data.total || 0)
        } catch (error) {
            console.error('Failed to fetch invitations', error)
        }
    }

    const handleExpiryChange = (option: string) => {
        const calculatedExpiry = calculateExpiryDate(option)
        setValue('expires', calculatedExpiry || '')
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchInvitations(search, 1, rowsPerPage) // Reset to first page on search
        setPage(1)
        setHasSearched(true)
    }

    const clearSearch = () => {
        setSearch('')
        fetchInvitations('', 1, rowsPerPage) // Reset to first page
        setPage(1)
        setHasSearched(false)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        fetchInvitations(search, newPage, rowsPerPage)
    }

    const expiryOptions = [
        {
            group: 'Days',
            options: [
                { value: '1_day', label: '1 Day' },
                { value: '3_days', label: '3 Days' },
                { value: '5_days', label: '5 Days' },
            ],
        },
        {
            group: 'Weeks',
            options: [
                { value: '1_week', label: '1 Week' },
                { value: '2_weeks', label: '2 Weeks' },
                { value: '3_weeks', label: '3 Weeks' },
            ],
        },
        {
            group: 'No Expiry',
            options: [{ value: 'no_expiry', label: 'No Expiry' }],
        },
    ]

    const onSubmit = async (data: InvitationFormData) => {
        try {
            setSubmitting(true)
            const postData = {
                ...data,
                jobId,
                userId: session?.user?.id || '',
            }
            await axios.post('/api/invitations', postData)
            showSuccess('Invitation sent successfully!')
            reset()
            fetchInvitations(search, page, rowsPerPage)
            onClose()
            setSubmitting(false)
        } catch (error) {
            showError('Failed to send invitation')
            console.error('Failed to send invitation', error)
            setSubmitting(false)
        }
    }

    useEffect(() => {
        if (open) fetchInvitations('', 1, rowsPerPage)
    }, [open])

    return (
        <div className="p-6 w-full ">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextField
                    label="Name"
                    fullWidth
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <div className="flex gap-4">
                    <TextField
                        label="Email"
                        fullWidth
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <FormControl fullWidth error={!!errors.expires}>
                        <InputLabel>Expiry Date</InputLabel>
                        <Select
                            defaultValue=""
                            onChange={(e) => handleExpiryChange(e.target.value)}
                        >
                            {expiryOptions.map((group) => [
                                <ListSubheader key={group.group}>
                                    {group.group}
                                </ListSubheader>,
                                ...group.options.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                )),
                            ])}
                        </Select>
                        <FormHelperText>
                            {errors.expires?.message}
                        </FormHelperText>
                    </FormControl>
                </div>
                <TextField label="Message" fullWidth {...register('message')} />

                <AdminButton type="submit" loading={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send'}
                </AdminButton>
            </form>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="my-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search Invitations"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-3 border rounded-md"
                />
                <button
                    type="submit"
                    className="p-3 bg-blue-500 text-white rounded-md"
                >
                    Search
                </button>
                {hasSearched && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="p-3 bg-gray-200 text-gray-700 rounded-md"
                    >
                        Clear
                    </button>
                )}
            </form>

            {/* Invitation List */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">
                                Name
                            </th>
                            <th className="border border-gray-300 p-2 text-left">
                                Email
                            </th>
                            <th className="border border-gray-300 p-2 text-left">
                                Status
                            </th>
                            <th className="border border-gray-300 p-2 text-left">
                                Sent On
                            </th>
                            <th className="border border-gray-300 p-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitations.map((invitation) => (
                            <tr
                                key={invitation.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="border border-gray-300 p-2">
                                    {invitation.name}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {invitation.email}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {invitation.status}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {new Date(
                                        invitation.sentOn
                                    ).toLocaleString()}
                                </td>
                                <td>
                                    <Link
                                        className="focus:outline-none focus:bg-opacity-50 focus:text-black hover:text-black focus:ring-2 
                              focus:ring-offset-2 focus:ring-indigo-700 text-indigo-700 hover:bg-opacity-50 bg-gray-100 text-sm 
                              font-medium py-2 px-3 w-full rounded mr-3"
                                        href={`/interview/start/${invitation.id}`}
                                        target="_blank"
                                    >
                                        Start
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Custom Pagination */}
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 border rounded ${
                        page === 1
                            ? 'bg-gray-200 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    Previous
                </button>
                <span className="px-4 py-2">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 border rounded ${
                        page === totalPages
                            ? 'bg-gray-200 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default InvitationDrawer
