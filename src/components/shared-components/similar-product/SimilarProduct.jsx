import React from 'react'
import { extraProduct } from '@/components/product'
import SecondaryCard from '../card/SecondaryCard'

function SimilarProduct() {


    console.log()

  return (
    <div className='px-14 similar'>
    <h2 className='text-3xl text-center pb-4  mt-10'>Similar Available Products</h2>
      <div className=' product h-[600px] overflow-scroll  '>

        <div className=' flex flex-wrap gap-6 grow justify-start z-10'>

        {
            extraProduct.map((pro, idx) => {
              return (
                <div className={`  flex flex-col gap-2  transition delay-150 duration-300 ease-in-out cursor-pointer `}  key={idx}>

                  <SecondaryCard  pro={pro} />
                   
                 
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}

export default SimilarProduct