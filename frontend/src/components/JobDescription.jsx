// import React, { useEffect, useState } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

// const JobDescription = () => {
//     const {singleJob} = useSelector(store => store.job);
//     const {user} = useSelector(store=>store.auth);
//     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
//             if(res.data.success){
//                 setIsApplied(true); // Update the local state
//                 const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
//                 dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
//                 toast.success(res.data.message);

//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }

//     useEffect(()=>{
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
//                 if(res.data.success){
//                     dispatch(setSingleJob(res.data.job));
//                     setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleJob(); 
//     },[jobId,dispatch, user?._id]);

//     return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-2 mt-4'>
//                         <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
//                         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
//                         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                 onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>
//                 <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                 <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                 <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//                 <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
//                 <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }

// export default JobDescription

import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        if (singleJob && user) {
            const applied = singleJob.applications?.some(app => app.applicant === user._id);
            setIsApplied(applied);
        }
    }, [singleJob, user]);

    const applyJobHandler = async () => {
        // Redirect to login if user is not logged in
        if (!user) {
            toast.error("Please login to apply for the job.");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                const updatedApplications = [...singleJob.applications, { applicant: user._id }];
                const updatedSingleJob = { ...singleJob, applications: updatedApplications };
                dispatch(setSingleJob(updatedSingleJob));
                setIsApplied(true);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            // Handle 401 Unauthorized error specifically
            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again to apply.");
                navigate("/login");
            } else {
                toast.error(error.response?.data?.message || "An error occurred while applying.");
            }
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.error(error);
                // Handle 401 Unauthorized error specifically
                if (error.response?.status === 401) {
                    toast.error("You are not authorized. Please login.");
                    navigate("/login");
                } else {
                    toast.error("Failed to fetch job details.");
                }
                dispatch(setSingleJob(null));
            } finally {
                setLoading(false);
            }
        };
        if (jobId) {
            fetchSingleJob();
        }
    }, [jobId, dispatch, navigate]);

    if (loading) {
        return <div className='max-w-7xl mx-auto my-10 text-center'>Loading...</div>;
    }

    if (!singleJob) {
        return <div className='max-w-7xl mx-auto my-10 text-center font-bold text-xl'>Job details not found.</div>;
    }

    return (
        <div className='max-w-7xl mx-auto my-10 p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>{singleJob?.title}</h1>
                    <div className='flex items-center flex-wrap gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg w-full sm:w-auto transition-colors duration-300 ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <div className='my-6 border-b-2 border-gray-200'></div>
            <div>
                <h2 className='font-bold text-xl mb-4'>Job Description</h2>
                <div className='space-y-3 text-gray-700'>
                    <p><strong className='font-semibold text-gray-900'>Role:</strong> {singleJob?.title}</p>
                    <p><strong className='font-semibold text-gray-900'>Location:</strong> {singleJob?.location}</p>
                    <p><strong className='font-semibold text-gray-900'>Description:</strong> {singleJob?.description}</p>
                    <p><strong className='font-semibold text-gray-900'>Experience:</strong> {singleJob?.experience} years</p>
                    <p><strong className='font-semibold text-gray-900'>Salary:</strong> {singleJob?.salary} LPA</p>
                    <p><strong className='font-semibold text-gray-900'>Total Applicants:</strong> {singleJob?.applications?.length}</p>
                    <p><strong className='font-semibold text-gray-900'>Posted Date:</strong> {new Date(singleJob?.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
