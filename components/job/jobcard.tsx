'use client'

import { FC, useState } from 'react'
import { Delete, Send, Visibility, Edit } from '@mui/icons-material'
import { Drawer, IconButton, Tooltip } from '@mui/material'
import InvitationDrawer from '../interview/InvitationDrawer'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import { TrashIcon, PencilIcon, EyeIcon, SendIcon } from 'lucide-react'

const JobCard: FC<any> = ({
    jobId,
    title,
    description,
    createdOn,
    totalApplication,
    status,
}) => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen)
    }
    return (
        <div className="border rounded-lg p-6 bg-white flex flex-col h-full">
            <div className="mt-0">
                <h3 className="text-lg font-bold text-gray-800 mb-5">
                    {title}
                </h3>

                <div className="flex justify-between text-sm text-gray-600 flex-1">
                    <span className="text-sm text-gray-500">
                        Applications: {totalApplication}
                    </span>
                    <span className="text-sm text-gray-500">
                        {' '}
                        Shortlisted: {10}
                    </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>
                        Status:{' '}
                        <span
                            className={`font-semibold ${status === 'open' ? 'text-green-600' : status === 'completed' ? 'text-blue-600' : 'text-red-600'}`}
                        >
                            {status}
                        </span>
                    </span>
                    <span>Experience: {11}</span>
                </div>
            </div>
            {/* Bottom Section (Footer) */}
            <div className="mt-auto flex justify-between items-center pt-4">
                <div>
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                        One-Time
                    </span>
                </div>
                {/* View Link */}
                <div>
                    <div className="flex">
                        <Link
                            className="focus:outline-none focus:bg-opacity-50 focus:text-black hover:text-black focus:ring-2 
                              focus:ring-offset-2 focus:ring-indigo-700 text-indigo-700 hover:bg-opacity-50 bg-gray-100 text-sm 
                              font-medium py-2 px-3 w-full rounded mr-3"
                            href={`/dashboard/job/view/${jobId}`}
                        >
                            View
                        </Link>
                        <button
                            onClick={toggleDrawer(true)}
                            className="focus:outline-none focus:bg-opacity-50 focus:text-black hover:text-black focus:ring-2 
                              focus:ring-offset-2 focus:ring-indigo-700 text-indigo-700 hover:bg-opacity-50 bg-gray-100 text-sm 
                              font-medium py-2 px-3 w-full rounded"
                        >
                            Invite
                        </button>
                    </div>
                </div>
            </div>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                <div className="w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-300 ">
                        <IconButton onClick={toggleDrawer(false)}>
                            <CloseIcon className="text-gray-600 hover:text-gray-800" />
                        </IconButton>
                    </div>
                </div>
                <div>
                    <InvitationDrawer
                        jobId={jobId}
                        open={false}
                        onClose={function (): void {
                            toggleDrawer(false)
                        }}
                    />
                </div>
            </Drawer>
        </div>
    )
}

export default JobCard

// <div className="bg-white dark:bg-gray-800 rounded-lg flex-col h-ful  mb-6 border border-gray-200">
// <div className="px-6 py-4">
//     <div className="font-bold text-xl mb-2 text-gray-800">
//         {title}
//     </div>

//     <div className="flex justify-between text-sm text-gray-600 flex-1">
//         <span>Applications: {totalApplication}</span>
//         <span>Shortlisted: {10}</span>
//     </div>
//     <div className="flex justify-between text-sm text-gray-600 mt-2">
//         <span>
//             Status:{' '}
//             <span
//                 className={`font-semibold ${status === 'open' ? 'text-green-600' : status === 'completed' ? 'text-blue-600' : 'text-red-600'}`}
//             >
//                 {status}
//             </span>
//         </span>
//         <span>Experience: {11}</span>
//     </div>
//     <div className="text-xs text-gray-500 mt-2">
//         Created: {createdOn}
//     </div>
// </div>
// <div className="px-6 py-4 border border-gray-200   mt-auto flex space-x-2 justify-end space-x-2">
//     <Link
//         className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
//         href={`/dashboard/job/view/${jobId}`}
//     >
//         <EyeIcon className="w-5 h-5" />
//     </Link>

//     <button
//         className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
//         title="Edit"
//     >
//         <PencilIcon className="w-5 h-5" />
//     </button>
//     <button
//         className="text-red-600 hover:text-red-800 transition-colors duration-200"
//         title="Delete"
//     >
//         <TrashIcon className="w-5 h-5" />
//     </button>
//     <button
//         onClick={toggleDrawer(true)}
//         className="text-green-600 hover:text-green-800 transition-colors duration-200"
//         title="Send Invitation"
//     >
//         <SendIcon className="w-5 h-5" />
//     </button>
// </div>

// </div>
