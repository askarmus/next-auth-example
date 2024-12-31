'use client'

import JobList from '@/components/job/JobList'
import PageHeader from '@/components/page.header'
import React from 'react'

const JobPage: React.FC = () => {
    return (
        <>
            <PageHeader
                title="Jobs"
                breadcrumb="Dashaborad / Job / List"
                buttonText="Add new job +"
                buttonLink="/admin/job/new"
            />
            <div className="bg-white dark:bg-gray-800 rounded-lg p-10 mb-6 h-full p-5">
                <JobList />
            </div>
        </>
    )
}

export default JobPage
