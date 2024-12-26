'use client';

import JobList from '@/components/job/JobList';
import React from 'react';

const JobPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <JobList />
    </div>
  );
};

export default JobPage;
