'use client'

import AddJob from '@/components/job/AddJob'
import PageHeader from '@/components/page.header'
import React from 'react'

const JobPage: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Jobs"
                breadcrumb="Dashaborad / Job / New"
                buttonText="Back"
                buttonLink="/admin/job"
            />

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 mb-6 h-full p-5">
                <AddJob />
            </div>
        </div>
    )
}

export default JobPage
