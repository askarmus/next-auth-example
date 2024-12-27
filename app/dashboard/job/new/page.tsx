'use client';

import AddJob from '@/components/job/AddJob';
import JobList from '@/components/job/JobList';
import { Typography } from '@mui/material';
import React from 'react';

const JobPage: React.FC = () => {
  return (
    <div className="container mx-auto">
        
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <h4 className="text-title-md6 font-bold text-black dark:text-white">
    Add Job
  </h4>
  <nav>
    <ol className="flex items-center gap-2">
      <li>
        <a className="font-medium" href="index.html">
          Dashboard /
        </a>
      </li>
      <li className="font-medium text-primary">Task List</li>
    </ol>
  </nav>
</div>

    <div className='bg-white dark:bg-gray-800 rounded-lg p-5 mb-6 h-full p-5'>
      <AddJob />
    </div>
    </div>
  );
};

export default JobPage;
