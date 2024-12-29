import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Toaster } from '@/components/ui/toaster'
import { SnackbarProvider } from '@/lib/service/SnackbarService'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50', // Your custom primary color (e.g., green)
            contrastText: '#ffffff', // Text color for contrast
        },
    },
})

export const metadata: Metadata = {
    title: {
        default: 'TalentBot',
        template: '%s-Next-Auth-Example',
    },
    description: 'Example Of Authentication in next js using Next-auth',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
        shortcut: '/favicon-16x16.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="  ">
                <SessionProvider>
                    <SnackbarProvider>
                        <TooltipProvider>
                            {children}
                            <Toaster />
                        </TooltipProvider>
                    </SnackbarProvider>
                </SessionProvider>
            </body>
        </html>
    )
}
