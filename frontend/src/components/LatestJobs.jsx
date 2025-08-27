// import React from 'react'
// import LatestJobCards from './LatestJobCards';
// import { useSelector } from 'react-redux'; 
// import FilterCard from './FilterCard';

// // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

// const LatestJobs = () => {
//     const {allJobs} = useSelector(store=>store.job);
   
//     return (
//   <>


 
//   <div>
    
//       <h1 className='text-4xl text-center font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
// <div className="w-full my-20 flex gap-8 mx-auto
// ">
 
 


//   <div className="w-3/4">
//     <div className="grid grid-cols-3 gap-6">
//       {allJobs.length <= 0 ? (
//         <span>No Job Available</span>
//       ) : (
//         allJobs?.slice(0, 6).map((job) => (
//           <LatestJobCards key={job._id} job={job} />
//         ))
//       )}
//     </div>
//   </div>
// </div>
//  </div>


//   </>

//     )
// }

// export default LatestJobs

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
    // 1. Get all jobs directly from the Redux store
    const { allJobs } = useSelector(store => store.job);

    // A safe fallback in case allJobs is initially null or undefined
    const jobs = allJobs || [];

    // 2. Logic to display only the first 6 jobs on this page
    const jobsToDisplay = jobs.slice(0, 6);

    return (
        // Main container to center the entire section on the page
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className='text-4xl text-center font-bold my-10'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>

            {/* 3. This container centers the grid and the button below it */}
            <div className="w-full flex flex-col items-center">
                
                {/* The grid for the job cards. It's limited to 2 columns on medium screens */}
                {/* On large screens, its width is constrained to 4/5ths to improve the centered appearance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-4/5">
                    {jobsToDisplay.length > 0 ? (
                        jobsToDisplay.map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    ) : (
                        <div className='col-span-full text-center text-gray-500 py-10'>
                            <span>No jobs are available at the moment.</span>
                        </div>
                    )}
                </div>

                {/* 4. The "View All" button appears if there are more than 6 jobs total */}
                {jobs.length > 6 && (
                    <div className="mt-10">
                        <Link
                            to="/jobs" // Navigates to your main jobs page
                            className="bg-[#6A38C2] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#582eae] transition-colors shadow-lg"
                        >
                            View All Jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
