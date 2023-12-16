import Productlist from '@/components/shared-components/product-list/Productlist';
import { affliate_mockup } from '@/mockup'
import React, { useEffect, useState } from 'react'

export default function AffliateMockup() {
  const affliateProduct = affliate_mockup.filtered_objects
  const [mergedAffliateProduct, setMergedAffliateProduct] = useState([])
  const [mergedVisualMatches, setMergedVisualMatches] = useState([]);
  const [viewMore , setViewMore] = useState(false)

  useEffect(() => {
    Object.values(affliateProduct).forEach(data => {
      const { filtered, remaining } = data.visual_matches;
      setMergedAffliateProduct(pre => [...pre, ...filtered])
      setMergedVisualMatches(pre => [...pre, ...remaining])
    }
    )

  }, [])

  console.log(mergedAffliateProduct, mergedVisualMatches)


  return (
    <div className='flex flex-col pb-10 items-center'>
      <div className='p-10 mt-20 flex flex-wrap gap-6 items-center'>
        <Productlist list={mergedAffliateProduct} />
        {
         viewMore && <Productlist list={mergedVisualMatches} />
         }
      </div>
      {
         !viewMore && <button onClick={() => setViewMore(true)} className='bg-[#0ea5e9] h-fit w-[50%] p-4 text-white rounded-md'>View More </button>

      }

      
    </div>
  )
}
