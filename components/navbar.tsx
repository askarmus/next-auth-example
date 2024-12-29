import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Link from 'next/link'

const Navbar: React.FC = () => {
    const { data: session } = useSession()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <nav className="fixed top-0 mb-50  left-0 w-full z-50 border-gray-200 bg-gray-900 px-2.5 py-2.5 shadow-sm dark:bg-slate-800 sm:px-4 block print:hidden">
            <div className="container mx-0 flex max-w-full flex-wrap items-center lg:mx-auto">
                <div className="flex items-center">
                    <a href="#" className="flex items-center outline-none">
                        <Image
                            src="/logo-sm.png"
                            alt="Logo"
                            width={24}
                            height={24}
                            className="h-6"
                        />

                        <Image
                            src="/logo1.png"
                            alt="Logo"
                            className="ml-2 hidden xl:block mt-1"
                            width={79}
                            height={16}
                        />
                    </a>
                </div>
                <div className="order-2 hidden w-full items-center justify-between md:order-1 md:ml-5 md:flex md:w-auto active">
                    <ul className="font-body mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:text-sm md:font-medium space-x-0 md:space-x-4 lg:space-x-6 xl:space-x-8 navbar">
                        <li className="dropdown active text-gray-300">
                            <HomeIcon fontSize="small"> </HomeIcon> Dashboards
                        </li>
                        <li className="dropdown active text-gray-300">
                            <Link href="/dashboard/job">
                                <WorkIcon fontSize="small"></WorkIcon> Jobs
                            </Link>
                        </li>
                        <li className="dropdown active text-gray-300">
                            <CalendarMonthIcon fontSize="small"></CalendarMonthIcon>{' '}
                            Invitation
                        </li>
                    </ul>
                </div>
                <div className="order-1 ml-auto flex items-center md:order-2">
                    <div className="mr-2 lg:mr-0 dropdown relative">
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className="dropdown-toggle flex items-center rounded-full text-sm focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0"
                        >
                            <Image
                                src="/avatar-1.jpg"
                                alt="avatar"
                                className="h-8 w-8 rounded-full"
                                width={79}
                                height={16}
                            />
                            <span className="ml-2 hidden text-left xl:block">
                                <span className="block font-medium text-gray-400">
                                    {session?.user.name?.substring(
                                        0,
                                        session?.user.name?.indexOf(' ')
                                    )}
                                </span>
                                <span className="-mt-1 block text-sm font-medium text-gray-500">
                                    Admin
                                </span>
                            </span>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={() => signOut()}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                    <button
                        data-collapse-toggle="mobile-menu-2"
                        type="button"
                        id="toggle-menu"
                        className="ml-1 inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                        aria-controls="mobile-menu-2"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <i className="ti ti-menu-2 h-6 w-6 text-lg leading-6" />
                        <i className="ti ti-X hidden h-6 w-6 text-lg leading-6" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
