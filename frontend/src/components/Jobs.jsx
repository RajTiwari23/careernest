import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }   
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className=' md:w-1/4'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs
// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import Job from './Job';
// import { useSelector, useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
// import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { Label } from './ui/label';
// import { setSearchedQuery } from '@/redux/jobSlice';

// const Jobs = () => {
//     const { allJobs, searchedQuery } = useSelector(store => store.job);
//     const [filterJobs, setFilterJobs] = useState(allJobs);
//     const [selectedFilters, setSelectedFilters] = useState({});
//     const dispatch = useDispatch();

//     const changeHandler = (value, filterType) => {
//         setSelectedFilters(prevFilters => ({
//             ...prevFilters,
//             [filterType]: value
//         }));
//     };

//     const filterData = [
//         {
//             filterType: "Location",
//             array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
//         },
//         {
//             filterType: "Industry",
//             array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
//         },
//         {
//             filterType: "Salary",
//             array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
//         },
//     ];

//     useEffect(() => {
//         const query = Object.values(selectedFilters).filter(Boolean).join(' ');
//         dispatch(setSearchedQuery(query));
//     }, [selectedFilters, dispatch]);

//     const clearFilters = () => {
//         setSelectedFilters({});
//     };

//     useEffect(() => {
//         if (searchedQuery) {
//             const filteredJobs = allJobs.filter((job) => {
//                 return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//             });
//             setFilterJobs(filteredJobs);
//         } else {
//             setFilterJobs(allJobs);
//         }
//     }, [allJobs, searchedQuery]);

//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-7xl mx-auto mt-5">
//                 <div className="flex gap-5">
                    
//                     {/* Filters Sidebar */}
//                     <div className="w-1/4 bg-white p-4 rounded-lg shadow-md h-fit">
//                         <div className="flex justify-between items-center">
//                             <h1 className="font-bold text-xl">Filter Jobs</h1>
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-sm text-blue-600 hover:underline"
//                             >
//                                 Clear
//                             </button>
//                         </div>
//                         <hr className="my-3" />
//                         <div className="space-y-4">
//                             {filterData.map((data) => (
//                                 <div key={data.filterType}>
//                                     <h2 className="font-semibold text-lg mb-2">{data.filterType}</h2>
//                                     <RadioGroup
//                                         value={selectedFilters[data.filterType] || ''}
//                                         onValueChange={(value) => changeHandler(value, data.filterType)}
//                                     >
//                                         {data.array.map((item) => {
//                                             const itemId = `${data.filterType}-${item}`;
//                                             return (
//                                                 <div key={itemId} className="flex items-center space-x-2 my-2">
//                                                     <RadioGroupItem
//                                                         value={item}
//                                                         id={itemId}
//                                                         className="h-4 w-4 border border-gray-400"
//                                                     />
//                                                     <Label htmlFor={itemId}>{item}</Label>
//                                                 </div>
//                                             );
//                                         })}
//                                     </RadioGroup>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Jobs Section */}
//                     {filterJobs.length <= 0 ? (
//                         <span className="flex-1">Job not found</span>
//                     ) : (
//                         <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//                             <div className="grid grid-cols-3 gap-4">
//                                 {filterJobs.map((job) => (
//                                     <motion.div
//                                         initial={{ opacity: 0, x: 100 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         exit={{ opacity: 0, x: -100 }}
//                                         transition={{ duration: 0.3 }}
//                                         key={job?._id}
//                                     >
//                                         <Job job={job} />
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Jobs
