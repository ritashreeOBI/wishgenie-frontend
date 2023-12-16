import React, { Children, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { BsStars } from "react-icons/bs";
import { MdKeyboardArrowRight, MdStar } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { product } from '@/components/product';
import { NavigationModal } from './NavigationModal';
import { useDisclosure } from '@chakra-ui/react';

function Card({ pro  ,setModalView }) {

    //console.log("🚀 ~ file: Card.jsx:10 ~ Card ~ pro:", pro)
    
    const {thumbnail, image,brand,price,options,title,store_rating ,store_review ,productID, id ,rating, reviews, link,delivery, variant_count} =  pro.data || pro

    const dispatch = useDispatch()

    console.log(pro)

    // const encodedURL = encodeURI(pro?.link);

    // const url = new URL(encodedURL);
    // const domain = url.hostname
   

    const affliate = "www.amazon.com" 

    const router = useRouter()

    const ViewHandler = () => {
        if (!options) {
            if(link.includes('amazon.com')){
                console.log("affliate")
                setModalView(true)
                setTimeout ( () =>{
                    window.open(link)
                    setModalView(false)
                } , 4000) 
                
            }
            else{
                window.open(link)
            }
            
        } else {
            router.push(`/products/${id}`)
        }
    }

    return (

        <div
            className="image relative"
            onClick={ViewHandler}
            //onClick={() => ViewHandler(pro.link, pro.customize, pro.product_id ? pro.product_id : pro.id)}
        >
          
            {
                options ?
                    <div className=' border bg-white absolute right-2 p-1 rounded-full top-2 flex items-center gap-1 pr-2  hover:scale-110 transition delay-100 duration-300 ease-in-out'
                        
                    >
                        <BsStars />
                        <span className='text-[8px]'>Customize </span>
                    </div>
                    : 
                link.includes('amazon.com') ?
                <div className=' border bg-[#0ea5e9] text-white absolute right-2 p-1 px-2 rounded-full top-2 flex items-center gap-1   hover:scale-110 transition delay-100 duration-300 ease-in-out'
                >
                    
                    <span className='text-[10px]'>Affliate Partner </span>
                </div>
                :""

                    
            }
            <div className='img-container flex justify-center items-center h-[300px] overflow-hidden '>
                <Image
                    src={thumbnail || image} alt="product" width={400} height={400} />
            </div>
            <div className='h-full p-2 bg-white'>
                <div className='flex flex-col h-[220px] detail'>
                    <div className='title flex flex-col  border-b '>
                        <p className='para font-bold text-sm title'>{title}</p>

                        <div className=' review flex-wrap flex  gap-1 pb-1 mt-1 text-gray-500'>

                            <span className=' font-bold  '>{store_rating || rating}</span>
                            <div className='flex  pl-2'>
                                {
                                    store_rating || rating ?
                                        [1, 1, 1, 1, 1].map((val, idx) => <MdStar className='text-yellow-500 text-lg' key={idx} />)
                                        : ''
                                }

                            </div>
                            {
                                store_review || reviews ?
                                    <span className=' font-bold  flex gap-2 '>{store_review || reviews} reviews</span>
                                    : ''
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 grow h-full  py-2 '>
                        {price?.value || price && <strong className=' price   '>{price?.value || price}</strong>}
                        {brand && <p className='text-xs opacity-50'>Brand <strong>{brand}</strong></p>}
                        {price?.value  && <strong className='price'>{price?.value || price }</strong>}
                        {variant_count && <p className='text-sm'>Total Variants <strong className='text-md'>{variant_count}</strong></p>}
                        { options && options[0]?.values &&
                            <div className='flex flex-row gap-1 flex-wrap  h-fit'>
                                {
                                    Object.keys(options[0]?.values).map((value) => {
                                        return (
                                            <div style={{ background: value }} className={`w-4 h-4 border rounded-full`}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        <a href={link} className='affliate text-sky-500 para-1'>{pro.source || "Wish Genie"}</a>
                        <span className='ship opacity-50  font-light text-[12px]'>
                            {delivery || "3-5 Working Days"}
                        </span>
                        {/*      {
                            pro.number_of_comparisons ? <div className='flex gap-2 items-center'>
                                Comparisons
                                <strong className='p-2 w-10 rounded-full  bg-slate-100 text-center'>{pro.number_of_comparisons}</strong> </div> : ""
                        }
                        {
                            pro.number_of_comparisons ?
                                <a href={pro.comparison_link} className='affliate text-sky-500 text-xs '>see comparisons</a>
                                : ""
                        } */}
                        {/* <div
                            className='check flex w-full justify-end text-sky-600 text-xs items-center gap-2'
                            onClick={() => ViewHandler(pro.link ? pro.link : pro.id)}>
                            Check Product
                            <MdKeyboardArrowRight />
                        </div> */}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Card