"use client"
import Productlist from '@/components/shared-components/product-list/Productlist'
import { all_products } from '@/mockup'
import React, { use, useEffect, useState } from 'react'

export default function Results() {
    const product = all_products
    const [list , setList] = useState([])

    const productAdjust = () => {
       const topProduct = product.sort((posA , posB) => posA?.position - posB?.position).slice(0,5)
       console.log(topProduct)

    //    const affiliate = product.slice(6,product.length).filter( pro => {
    //         const affiliateLink = new URL(pro?.link)
    //         console.log(affiliateLink)
    //         if(affiliateLink.host ===  "www.ebay.com") return true;
    //         if(affiliateLink.host ===  "amazon.com") return true;

    //    })

    const affiliate = product.slice(6,product.length).sort( pro => {
        const affiliateLink = new URL(pro?.link)
        if(affiliateLink.host ===  "www.ebay.com" || affiliateLink.host ===  "amazon.com" ) return -1;
        else return 1;

   })

       console.log(affiliate)
       setList(pro => [...topProduct , ...affiliate])
    }

    useEffect(()=>{
        productAdjust()
    },[])

  return (
    <div className='flex flex-col pb-10 items-center'>
    <div className='p-10 mt-20 flex flex-wrap gap-6 items-center'>
    <Productlist list={list} />
    </div>
    </div>
  )
}
