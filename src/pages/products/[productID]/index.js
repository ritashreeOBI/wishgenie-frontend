
import { shopping_results } from '@/components/originalList';
import SimilarProduct from '@/components/shared-components/similar-product/SimilarProduct'
import Aos from 'aos';
import { data } from 'autoprefixer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { MdStar } from 'react-icons/md';
import axios from "axios";
import { printFullApi } from "@/api/Api";

function filterUniqueKey (arrayOfObjects){
  const uniqueObjects = arrayOfObjects.filter((object, index, self) => {
    // Find the index of the first occurrence of the current object
    const firstIndex = self.findIndex(obj => obj.color === object.color);
    
    // Include the object only if its index matches the first occurrence index
    return index === firstIndex;
  });
  
  return uniqueObjects;
  
}

function ProductDetail() {

  const router = useRouter();
  const [product, setProductDetail] = useState([])
  const [variants, setVariants] = useState([])
  const [seletedVariants , setSelectedVariants] = useState([])
  const [selectedColor , setSelectedColor] = useState('')
  const [availableColor, setAvailableColor] = useState([])
  const [filteredProducts , setFilterProducts] = useState([])

  const productID = router?.query?.productID
  useEffect(() => {
    //  setProductDetail( shopping_results.filter(data => data.product_id === router.query.productID))
   if(productID){
    getCustomProductDetails();
   }
   

    Aos.init();
  }, [productID])

  const filterFromSelectedColor = ( value , variants) =>{

    return variants?.filter(product => product.color === value)
  }

  const getCustomProductDetails = async () => {
    axios.get(`${printFullApi}/products/${productID}`)
      .then(response => {
        // Handle the success response here
        console.log('Response:', response.data);
        if (response.data.code === 200) {
          setProductDetail(response.data.result.product);
          setVariants(response.data.result.variants);
          setSelectedColor(
            {
             colorCode: response.data.result.variants[0]?.color_code,
             colorName: response.data.result.variants[0]?.color,
            }
          )
          setAvailableColor(filterUniqueKey(response.data.result.variants))
          setFilterProducts(filterFromSelectedColor(response.data.result.variants[0]?.color ,response.data.result.variants ))
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the POST request
        console.error('Error:', error);
      });
  }

  const colorSelection = (color, colorCode) =>{

    setSelectedColor( {
      colorCode: colorCode,
      colorName: color,
     })
    setFilterProducts(filterFromSelectedColor(color ,variants ))
       
  }

  console.log('product detail', product);
  console.log('product variants', variants);
  console.log('available colors', availableColor);
  console.log('selected variant', selectedColor);
  console.log('filtered products' , filteredProducts)

  return (
    <div>
      <div className='  mt-24  pb-10  '
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1000">
        <div className='detail  px-12  flex flex-wrap  gap-2'>
          <div className='flex flex-col gap-6 buy'>
            <div className=' dummy  ' />
            <div style={{height:'fit-cotent'}} className= 'w-[550px] bg-white    rounded-lg flex flex-col p-2 px-4 gap-4 drop' >
              <div className='grid grid-cols-8  gap-2 items-center'>
                <div className=' p-2 font-bold flex flex-col  col-span-2'>
                  <strong>Price</strong>
                  <strong>${variants[0]?.price}</strong>
                </div>
                <div className='bg-slate-100 h-32 flex flex-col col-span-4 px-4 p-2 font-semibold  rounded-lg '>
                  <h3 className='title-sm'>Estimate delivery to</h3>
                  <div className='flex items-center gap-2'>
                    <Image src="/flag.png" width={48} height={48} alt='product ' className='flag' />
                    <p className='text font-light title-sm'> United States </p>
                  </div>
                  <div >
                    <p className='text-xl title-sm'>5-8 days</p>
                  </div>
                  <span className='opacity-50 text-xs font-light'>Shipping Starts at:  $3.99</span>
                </div>

                <div
                  onClick={() => router.push(`/products/${router.query.productID}/customize`)}
                  className='title-lg text-center cursor-pointer bg-sky-500 rounded-md h-32 text-white text-xl flex flex-col items-center justify-center font-medium tracking-wide col-span-2' >
                  <h3>Design </h3>
                  <h3>This Item</h3>
                </div>
              </div>
              <div className=' flex flex-row  justify-between gap-2'>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-bold '>Choose color</span>
                  <div className='flex flex-row flex-wrap gap-2'>
                    {
                        availableColor?.map((color) =>{
                           console.log(color?.color === selectedColor?.colorName)
                          return(
                            <div className={` ${color?.color === selectedColor?.colorName ? ' border-2 border-[#0284c7]' :'border' }   rounded-md  hover:border-[#0284c7] p-[2px]`} >
                              {
                                 color?.color_code2 ?
                                 <div className={`w-6 h-6 rounded-md flex `} onClick={() => colorSelection(color?.color, color?.color_code)}>
                                  <div className='w-3 h-full rounded-l-md' style={{backgroundColor:color?.color_code , cursor:'pointer' }} />
                                  <div className='w-3 h-full rounded-r-md' style={{backgroundColor:color?.color_code2 , cursor:'pointer' }} />
                                  </div>
                                 :
                                 <div className={`w-6 h-6 rounded-md`}  onClick={() => colorSelection(color?.color, color?.color_code)} style={{backgroundColor:color?.color_code , cursor:'pointer' }}/>

                              }
                             
                             </div> 
                            // <input type="checkbox" value={color?.color_code} onChange={colorSelection} checked={color?.color_code === selectedColor} style={{backgroundColor:color?.color_code}} className={`checkbox  ${bg} border`} />
                   
                          )
                        })
                    }
                    

                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between gap-4 title-sm ' >
                    <span className='font-bold '>Choose Size</span>
                    <span className='font-light text-sky-600  '>Size Guide</span>
                  </div>
                  <div className='flex flex-wrap  gap-2 text-center'>
                    {filteredProducts.map((variant) => (
                      <div className='border-2 w-8 h-8 flex cursor-pointer items-center justify-center hover:border-black rounded p-1'>
                        <span className='text-xs font-bold '>{variant.size}</span>
                      </div>
                    ))}

                  </div>
                </div>


              </div>

            </div>

          </div>
          <div className='rounded-md grow  bg-white drop flex flex-col items-center justify-between py-4 mt-4'>
            <div>

            </div>
          { filteredProducts[0]?.image && <Image src={filteredProducts[0]?.image} width={300} height={300} />}
            <div className='flex flex-col gap-4 p-4'>
              <div className='flex flex-wrap text-center w-full'>
                <h1 className='font-bold text-xl text-center  w-full'>{product?.title} </h1>

              </div>

              <div className='flex items-center gap-3'>
                <div className='flex gap-1'>
                  {
                    [1, 1, 1, 1, 1].map(val => <MdStar className='text-yellow-500 text-xl' />

                    )
                  }
                </div>
                <span className='text-sky-600 text-xs'>{product[0]?.reviews} Reviews</span>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between text-sm'>
                  <span className='font-semibold'>Choose technique</span>
                  <span className='text-sky-600'>File guideline</span>
                </div>
                <div className='flex w-full gap-2'>
                  <div className='border-2 border-slate-400 hover:border-black  hover:border-2 cursor-pointer grow text-center rounded-md py-2'>
                    Embroidery
                  </div>
                  <div className='border-2 border-slate-400  hover:border-black  hover:border-2 cursor-pointer grow text-center py-2 rounded-md focus:border-2'>
                    DTG printing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail