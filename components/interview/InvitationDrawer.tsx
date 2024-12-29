import React, { useState } from 'react'
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    ListSubheader,
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
            return null // No expiry date
        default:
            return null
    }
    return currentDate.toISOString() // Return ISO string for datetime-local format
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
    const [isSubmiting, setSubmiting] = useState(false)
    const { data: session } = useSession()
    const { showSuccess, showError } = useSnackbar()

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

    const handleExpiryChange = (option: string) => {
        const calculatedExpiry = calculateExpiryDate(option)
        setValue('expires', calculatedExpiry || '')
    }

    const onSubmit = async (data: InvitationFormData) => {
        try {
            setSubmiting(true)
            const postData = {
                ...data,
                jobId,
                userId: session?.user?.id || '',
            }
            await axios.post('/api/invitations', postData)

            showSuccess('Invitation sent successfully!')
            reset()
            onClose()
            setSubmiting(false)
        } catch (error) {
            showSuccess('Failed to send invitation')
            console.error('Failed to send invitation', error)
            setSubmiting(false)
        }
    }

    return (
        <div className="p-6 ">
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

                <AdminButton type="submit" loading={isSubmiting}>
                    {isSubmiting ? 'Sending...' : 'Send'}
                </AdminButton>
            </form>
        </div>
    )
}

export default InvitationDrawer
