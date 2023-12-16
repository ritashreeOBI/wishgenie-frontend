import { GET_ALL_AFFILIATE } from '@/api/AdminApi'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const affiliate = [
    {
        _id:"1",
        title:"Amazon",
        description:"Amazon.com, Inc., commonly referred to as Amazon, is one of the world's largest and most prominent multinational technology and e-commerce companies. It was founded by Jeff Bezos in July 1994, originally as an online bookstore. Over the years, Amazon has expanded its product and service offerings, becoming a massive conglomerate with a significant global presence.",
        logo:"/affiliate/amazon.png",
        link:"amazon.com"
    },
    {
        _id:"2",
        title:"Wallmart",
        description:"Walmart, Inc., commonly referred to as Walmart, is one of the world's largest retail corporations, and it is known for its extensive chain of hypermarkets, supermarkets, and discount department stores. Founded by Sam Walton in 1962, Walmart has grown to become a global retail giant.",
        logo:"/affiliate/wallmart.png",
        link:"wallmart.com"
    },
    {
        _id:"3",
        title:"Ebay",
        description:"eBay is an American multinational e-commerce corporation that was founded in 1995 by Pierre Omidyar. It's known for its online marketplace, where individuals and businesses can buy and sell a wide variety of products, both new and used, through auctions and fixed-price listings.",
        logo:"/affiliate/ebay.png",
        link:"ebay.com"
    },

]


function Affiliates() {

    

    const [list, setList] = useState([])
    const [selectedID , setSelectedID] = useState()

    const getAffiliateList = async () => {
        try {
            const { data } = await axios.get(GET_ALL_AFFILIATE)
            setList(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAffiliateList()
    }, [])

    useEffect(() =>{

        setSelectedID(list.length && list[0]?._id)
    },[list])


  return (
    <div className='min-h-screen w-full  mt-20 mb-4 p-8 flex flex-col gap-4'>
        <div className='w-full p-8 bg-white shadow-md rounded-md flex flex-col gap-4'>
            <p className='text-md font-bold  opacity-70 pb-1 border-b-4 border-[#0ea5e9] w-fit mb-8'>Our Affiliate Partners</p>
            <div className='flex w-full gap-6'>
            {
            list.map((detail) =>{
                return(
                   <div key={detail?._id} className={` ${selectedID === detail?._id ?  'hover:bg-[#f0f9ff] hover:shadow-md hover:border-[#f0f9ff]' :''} grow p-4 rounded-md border hover:bg-[#f0f9ff] hover:shadow-md hover:border-[#f0f9ff] cursor-pointer`} onClick={()=> setSelectedID(detail?._id)}>
                     <div className='flex items-center flex-col '>
                        <Image src={detail.image} alt="companylogo" width={100} height={100} />
                     </div>
                      
                   </div> 
                )
            })
            }
           </div>
        </div>
        <div className='w-full p-8 bg-white shadow-md rounded-md flex gap-4'>
          {
            list.filter((aff) => aff._id === selectedID).map((affiliateDetail) =>{
                return(
                    <div>
                        <p className='text-xl font-bold uppercase opacity-70 pb-1 border-b-4  w-fit mb-4'>{affiliateDetail.title}</p>
                        <p className='p-4 leading-8' dangerouslySetInnerHTML={{ __html: affiliateDetail?.description }}/>
                    </div>
                )
            })
          }      
        </div>
        
    </div>
  )
}

export default Affiliates