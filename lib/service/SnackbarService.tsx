'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

// Define the Snackbar Context
interface SnackbarContextProps {
    showSuccess: (message: string) => void
    showError: (message: string) => void
}

// Create Context
const SnackbarContext = createContext<SnackbarContextProps | undefined>(
    undefined
)

// Snackbar Provider Component
export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<AlertColor>('success')

    // Function to show success snackbar
    const showSuccess = (message: string) => {
        setMessage(message)
        setSeverity('success')
        setOpen(true)
    }

    // Function to show error snackbar
    const showError = (message: string) => {
        setMessage(message)
        setSeverity('error')
        setOpen(true)
    }

    // Close handler for Snackbar
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    return (
        <SnackbarContext.Provider value={{ showSuccess, showError }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

// Custom hook to use the Snackbar context
export const useSnackbar = (): SnackbarContextProps => {
    const context = useContext(SnackbarContext)
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider')
    }
    return context
}
