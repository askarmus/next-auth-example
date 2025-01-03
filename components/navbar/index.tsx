'use client'
import Link from 'next/link'
import { Package2, Settings } from 'lucide-react'
import ModeToggle from '@/components/providers/toogle-mode'

export default function Navbar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-full max-w-xs flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col  gap-6 px-4 py-10">
                <Link
                    href="/admin"
                    className="flex gap-2  text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Package2 className=" transition-all group-hover:scale-110" />
                    <span>Next Auth Example</span>
                    <span className="sr-only">Home</span>
                </Link>

                <Link
                    href="/admin/settings"
                    className="flex gap-2 items-center    text-muted-foreground transition-colors hover:text-foreground "
                >
                    <Settings />
                    <span>Settings</span>
                    <span className="sr-only">Settings</span>
                </Link>
            </nav>

            <nav className="mt-auto flex justify-bettween  gap-4  sm:py-4">
                <div className="px-2">Change Theme</div>
                <ModeToggle />
            </nav>
        </aside>
    )
}
