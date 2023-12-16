import React, { useEffect, useState } from 'react'
import SimilarProduct from '../shared-components/similar-product/SimilarProduct'
import Editor from '../Editor';




const Stepper = [
    {
        name: "Select Product",
        step: 1,
        complete: true,

    },
    {
        name: "Design",
        step: 2,
        complete: true,
    },
    {
        name: "Add To Cart",
        step: 3,
        complete: false,
    }
]

function CustomProduct({ productDetail }) {



    return (
        <div className=' flex flex-col gap-8 pt-8 ' data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500">
            <div className='flex flex-wrap gap-14'>
                <div className='dummy' />


                <div className='rounded-md grow gap-4 flex flex-col items-start mt-2 justify-between py-4'>
                    <div className='flex gap-4 justify-center'>
                        {
                            Stepper.map((data) => {

                                const { step, name, component } = data

                                return (
                                    <div className='  flex items-center gap-1 cursor-pointer' onClick={() => setSection(pre => {
                                        return {
                                            name: name,
                                            component: component,
                                            step: step
                                        }
                                    })}>
                                        <div className={`step p-4 rounded-full  w-10 h-10 flex justify-center items-center text-lg text-black font-light ${data.complete ? 'bg-sky-200 border-2 border-sky-400' : 'bg-white border '}`}>{step}</div>

                                        <div className=' border w-8  border-black' />

                                        <div className='val text-sm font-light'>{name}</div>
                                    </div>
                                )
                            })
                        }

                    </div> 

                    <Editor path={productDetail.path} />
                </div>

            </div>

            <SimilarProduct />
        </div>
    )
}

export default CustomProduct