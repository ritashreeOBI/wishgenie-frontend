import Image from 'next/image'
import React from 'react'
import { BsStars} from "react-icons/bs";
import { MdKeyboardArrowRight, MdStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';

function SecondaryCard({ pro }) {

    const dispatch = useDispatch()

    const ViewHandler = (link , customize) => {

        if(!customize){
            // window.open(link)
        }else{
            dispatch(ProductActionDetail(pro))
        }

       
    }
    


    return (
        <div className="image relative h-full " 
         onClick={() =>  ViewHandler(pro.link , pro.customize)} >

            {
                pro.customize ?
                    <div className=' border bg-white absolute right-2 p-1 rounded-full top-2 flex items-center gap-1 pr-2  hover:scale-110 transition delay-100 duration-300 ease-in-out'
                    
                     >
                        <BsStars />
                        <span className='text-[8px]'>Customize </span>
                    </div>
                    : ""
            }
            <Image className="image__img" src={pro.path} alt="product" width={250} height={250} priority />
            <div className='h-full p-2 bg-white'>
                <div className='flex flex-col h-full'>
                    <div className='title flex flex-col  border-b'>
                        <p className='font-bold'>{pro.product}</p> 
                        <p className='font-bold '>{pro.subtitle}</p>
                        <div className=' review flex-wrap flex  gap-1 pb-1 mt-1 text-gray-500'>

                            <span className=' font-bold  '>{ pro.rating}</span>
                            <div className='flex  pl-2  '>
                                {
                                    [1, 1, 1, 1, 1].map((val ,idx )=> <MdStar className='text-yellow-500 text-lg' key={idx}/>

                                    )
                                }

                            </div>
                            <span className=' font-bold  flex gap-2 '>{pro.store_review || pro.reviews} reviews</span>
                        </div>
                    </div>
                    <div className='flex flex-col h-full  py-1'>
                        <strong className=' price '>{pro.price}</strong>
                        <a href={pro.link} className='affliate text-sky-500 '>{pro.seller }</a>
                        <span className='ship opacity-50  font-light'>
                        {pro.delivery}
                        </span>
                        {
                            pro.number_of_comparisons  ? <div className='flex gap-2 items-center'> 
                            Comparisons 
                            <strong className='p-2 w-10 rounded-full  bg-slate-100 text-center'>{pro.number_of_comparisons}</strong> </div> :""
                        }
                        {
                            pro.number_of_comparisons ? 
                            <a href={pro.comparison_link} className='affliate text-sky-500 text-xs '>see comparisons</a>
                            :""
                        }
                        <div
                            className='check flex w-full justify-end text-sky-600 text-xs items-center gap-2'
                            onClick={() => ViewHandler(pro.link)}>
                            Check Product
                            <MdKeyboardArrowRight />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondaryCard