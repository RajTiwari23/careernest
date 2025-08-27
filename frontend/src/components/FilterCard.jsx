// import React, { useEffect, useState } from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

// const fitlerData = [
//     {
//         fitlerType: "Location",
//         array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
//     },
//     {
//         fitlerType: "Industry",
//         array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
//     },
//     {
//         fitlerType: "Salary",
//         array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
//     },
// ]

// const FilterCard = () => {
//     const [selectedValue, setSelectedValue] = useState('');
//     const dispatch = useDispatch();
//     const changeHandler = (value) => {
//         setSelectedValue(value);
//     }
//     useEffect(()=>{
//         dispatch(setSearchedQuery(selectedValue));
//     },[selectedValue]);
//     return (
//         <div className='w-full bg-white p-3 rounded-md'>
//             <h1 className='font-bold text-lg'>Filter Jobs</h1>
//             <hr className='mt-3' />
//             <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//                 {
//                     fitlerData.map((data, index) => (
//                         <div>
//                             <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
//                             {
//                                 data.array.map((item, idx) => {
//                                     const itemId = `id${index}-${idx}`
//                                     return (
//                                         <div className='flex items-center space-x-2 my-2'>
//                                             <RadioGroupItem value={item} id={itemId} />
//                                             <Label htmlFor={itemId}>{item}</Label>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     ))
//                 }
//             </RadioGroup>
//         </div>
//     )
// }

// export default FilterCard


import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    // Use an object to store filters for each category independently
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    // This handler updates the state for a specific filter category
    const changeHandler = (value, filterType) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    // This effect runs whenever the filters change and dispatches the combined query
    useEffect(() => {
        // Create a single search string from all selected filters
        const query = Object.values(selectedFilters).filter(Boolean).join(' ');
        dispatch(setSearchedQuery(query));
    }, [selectedFilters, dispatch]);

    const clearFilters = () => {
        setSelectedFilters({});
    }

    return (
        
        <div className='w-full bg-white p-4 rounded-lg shadow-md'>
            <div className="flex justify-between items-center">
                <h1 className='font-bold text-xl'>Filter Jobs</h1>
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">Clear</button>
            </div>
            <hr className='my-3' />
            <div className="space-y-4">
                {
                    filterData.map((data) => (
                        <div key={data.filterType}>
                            <h2 className='font-semibold text-lg mb-2'>{data.filterType}</h2>
                            {/* Each RadioGroup is now independent */}
                            <RadioGroup 
                                value={selectedFilters[data.filterType] || ''} 
                                onValueChange={(value) => changeHandler(value, data.filterType)}
                            >
                                {
                                    data.array.map((item) => {
                                        const itemId = `${data.filterType}-${item}`;
                                        return (
                                            <div key={itemId} className='flex items-center space-x-2 my-2'>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FilterCard;
