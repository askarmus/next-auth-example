'use client'

import React from 'react'
import { Button, ButtonProps, styled, CircularProgress } from '@mui/material'
import { SvgIconProps } from '@mui/material/SvgIcon'

const StyledButton = styled(Button)<ButtonProps>(({ theme, variant }) => ({
    backgroundColor:
        variant === 'outlined' ? 'transparent' : 'rgb(66, 133, 244)',
    color: variant === 'outlined' ? 'rgb(66, 133, 244)' : 'white',
    border: variant === 'outlined' ? '2px solid rgb(66, 133, 244)' : 'none',
    padding: '8px 24px',
    height: '40px',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.75,
    minWidth: 120,
    '&:hover': {
        backgroundColor:
            variant === 'outlined'
                ? 'rgba(66, 133, 244, 0.04)'
                : 'rgb(57, 115, 209)',
        border: variant === 'outlined' ? '2px solid rgb(57, 115, 209)' : 'none',
    },
    '&.Mui-disabled': {
        backgroundColor:
            variant === 'outlined' ? 'transparent' : 'rgba(66, 133, 244, 0.5)',
        color:
            variant === 'outlined'
                ? 'rgba(66, 133, 244, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
        border:
            variant === 'outlined'
                ? '2px solid rgba(66, 133, 244, 0.5)'
                : 'none',
    },
    '& .MuiButton-startIcon': {
        marginRight: '8px',
    },
}))

interface AdminButtonProps extends ButtonProps {
    children: React.ReactNode
    icon?: React.ReactElement<SvgIconProps>
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
}

const AdminButton: React.FC<AdminButtonProps> = ({
    children,
    icon,
    loading = false,
    disabled,
    type = 'button',
    ...props
}) => {
    return (
        <StyledButton
            startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : icon
            }
            disabled={loading || disabled}
            type={type}
            {...props}
        >
            {loading ? 'Loading...' : children}
        </StyledButton>
    )
}

export default AdminButton
