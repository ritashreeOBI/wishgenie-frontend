import React, { useEffect, useRef, useState } from 'react'
import { BiChevronRight } from "react-icons/bi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { printFullApi } from '@/api/Api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import {setProductCategory} from "@/store/slices/ProductSlice";

// function DropDownMenu() {

//     const dispatch = useDispatch();
//     const router = useRouter();

//     const [showdropdown, setShowdropdown] = useState(false);
//     const dropdownRef = useRef(null);
//     const [category, setCategory] = useState(0);
//     const [subCategory, setSubCategory] = useState(0);
//     const [menuMainCategories, setMenuMainCategories] = useState([]);

//     useEffect(() => {

//         function handleClickOutside(event) {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 setShow(true)
//             }
            
//         }
//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on clean up
//             document.removeEventListener("mousedown", handleClickOutside);
//         };

//     }, [ref]);
// }

function DropDownMenu() {
   
    const dispatch = useDispatch();
    const router = useRouter();
  /*   useOutsideAlerter(dropdownRef, setShowdropdown) */

    const [showdropdown, setShowdropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [category, setCategory] = useState(1);
    const [subCategory, setSubCategory] = useState(0);
    const [menuMainCategories, setMenuMainCategories] = useState([]);

    useEffect(() => {
        // Check if data exists in local storage
        const cachedData = localStorage.getItem('menuData');

        if (cachedData) {
            // Parse and set the cached data to your state
            setMenuMainCategories(JSON.parse(cachedData));
        } else {
            axios({
                method: 'GET',
                url: `${printFullApi}/categories`
            })
                .then((result) => {
                    const responseData = result.data;
                    const allCategories = responseData.result?.categories;
                    console.log(allCategories)

                    // Separate and sort main categories
                    const mainCategories = allCategories?.filter(category => category.parent_id === 0)
                        .sort((a, b) => a.catalog_position - b.catalog_position);

                    // Organize data into the desired structure
                    const organizedData = {};
                    mainCategories.forEach(main => {
                        // Find and sort sub-categories for this main category
                        const mainSubCategories = allCategories?.filter(sub => sub.parent_id === main.id)
                            .sort((a, b) => a.catalog_position - b.catalog_position);

                        // For each sub-category, find and sort its sub-sub-categories
                        mainSubCategories.forEach(sub => {
                            sub.subSubCategories = allCategories?.filter(subSub => subSub.parent_id === sub.id)
                                .sort((a, b) => a.catalog_position - b.catalog_position);
                        });

                        organizedData[main.id] = {
                            main_category: main,
                            sub_categories: mainSubCategories
                        };
                    });

                    // Set the organized data to state
                    setMenuMainCategories(organizedData);

                    // Cache the organized data in local storage for future use
                    localStorage.setItem('menuData', JSON.stringify(organizedData));

                    
                })
                .catch((err) => {
                    // Code to handle errors
                    console.error('Error:', err); // For example, log the error
                });

        }
       

    }, []);

    const showProductsByCategory = async (para) => {
        console.log('Show Products', category);
        dispatch(
            setProductCategory({
                category: para,
            })
        );
        router.push(`/products`);
    }

    return (
        <div
            className={`dropDown  relative select-none cursor-pointer ${showdropdown ? "drop" : ""} `}
            ref={dropdownRef}
            onMouseEnter={() =>
                setShowdropdown(true)
            }
            onMouseLeave={() =>
                setShowdropdown(false)
            }>
            <div
                className={`flex  items-center gap-2  p-3 px-4  ${showdropdown ? "bg-white " : ""} rounded-t-md `}
                onClick={() => setShowdropdown(pre => !pre)}
            >
                <p className='font-[400] text-sm font-bold'>Create Your Wish </p> <HiOutlineChevronDown />
            </div>
            {
                showdropdown ?
                    <div className='w-[800px] -left-[500px] top-10  bg-white absolute rounded-t-md  overflow-hidden  '>
                        <div className='flex flex-col  relative pt-10 '>
                            <div className='p-2 bg-[#98bbc4]'>
                                <h3 className=' text-center text-3xl text-white font-light'>Custom Product Available</h3>
                            </div>
                            <div className='flex h-full p-2 gap-1'>
                                {/* Main Categories */}
                                <div className='flex flex-col gap-1 pt-2 border-b pb-4 h-full'>
                                    {
                                        Object.values(menuMainCategories).map(mainItem => (
                                            <div
                                                className='px-2 cursor-pointer'
                                                key={mainItem.main_category.id}
                                                onMouseEnter={() => setCategory(mainItem.main_category.id)}>
                                                <div
                                                    className='flex w-60 justify-between hover:bg-slate-200 px-4 py-3'>
                                                    <p className='text-sm font-[500]'>{mainItem.main_category.title}</p>
                                                    <BiChevronRight />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* Sub-Categories based on active main category */}


                                {category && menuMainCategories[category] && (
                                    <div className='flex gap-4'>
                                        {/* First half of sub_categories */}
                                        <div className='flex flex-col border-l gap-4 p-8 pt-4 grow'>
                                            {
                                                // Extract half of the sub-categories using slice
                                                menuMainCategories[category].sub_categories.slice(0, Math.ceil(menuMainCategories[category].sub_categories.length / 2))
                                                    .map(subItem => (
                                                        <div
                                                            className='flex flex-col'
                                                            key={subItem.id}
                                                            onMouseEnter={() => setSubCategory(subItem.id)}
                                                        >
                                                            <li
                                                                className='text-sm font-bold transition ease-in-out delay-50 
                                                                            hover:text-bold hover:scale-110 duration-200'

                                                                onClick={() => showProductsByCategory(subItem.id)}>
                                                                {subItem.title}
                                                            </li>
                                                            {
                                                                subItem.subSubCategories.length > 0 ?
                                                                    <div className='flex flex-col gap-4'>
                                                                        {subItem?.subSubCategories?.map(subSubItem => (
                                                                            <p
                                                                                className='text-sm w-fit font-[200] mt-2  transition ease-in-out delay-50  hover:text-bold hover:scale-110 duration-200'
                                                                                onClick={() => showProductsByCategory(subSubItem.id)}
                                                                            >
                                                                                {subSubItem.title}
                                                                            </p>
                                                                        ))
                                                                        }
                                                                    </div>
                                                                    : ""
                                                            }
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                        {/* Second half of sub_categories */}
                                        <div className='flex flex-col border-l gap-4 p-8 pt-4 grow'>
                                            {
                                                // Extract half of the sub-categories using slice
                                                menuMainCategories[category].sub_categories.slice(Math.ceil(menuMainCategories[category].sub_categories.length / 2))
                                                    .map(subItem => (
                                                        <div
                                                            className='flex flex-col'
                                                            key={subItem.id}
                                                            onMouseEnter={() => setSubCategory(subItem.id)}
                                                        >
                                                            <li
                                                                className='text-sm font-bold transition ease-in-out delay-50 
                                                                            hover:text-bold hover:scale-110 duration-200'
                                                                onClick={() => showProductsByCategory(subItem.id)}            
                                                            >
                                                                {subItem.title}
                                                            </li>
                                                            {
                                                                subItem.subSubCategories.length > 0 ?
                                                                    <div className='flex flex-col gap-4'>
                                                                        {subItem?.subSubCategories?.map(subSubItem => (
                                                                            <p 
                                                                                className='text-sm w-fit font-[200] mt-2  transition ease-in-out delay-50  hover:text-bold hover:scale-110 duration-200'
                                                                                onClick={() => showProductsByCategory(subSubItem.id)}
                                                                            >
                                                                                {subSubItem.title}
                                                                            </p>
                                                                        ))
                                                                        }
                                                                    </div>
                                                                    : ""
                                                            }
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    : ""
            }


        </div>
    )
}

export default DropDownMenu