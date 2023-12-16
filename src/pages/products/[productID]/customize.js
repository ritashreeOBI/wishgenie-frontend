import { shopping_results } from '@/components/originalList'
import SimilarProduct from '@/components/shared-components/similar-product/SimilarProduct'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GET_PRODUCT_DETAIL, MOCKUP_TEMPLATE, printFullApi } from '@/api/Api';
import { TestEditor } from '@/components/shared-components/editor/TestEditor';




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
function filterUniqueKey(arrayOfObjects) {
  const uniqueObjects = arrayOfObjects.filter((object, index, self) => {
    // Find the index of the first occurrence of the current object
    const firstIndex = self.findIndex(obj => obj.color === object.color);

    // Include the object only if its index matches the first occurrence index
    return index === firstIndex;
  });

  return uniqueObjects;

}


function CustomProduct() {

  const router = useRouter()
  const [product, setProductDetail] = useState([])
  const [variants, setVariants] = useState([])
  const [selectedColor, setSelectedColor] = useState('')
  const [availableColor, setAvailableColor] = useState([])
  const [filteredProducts, setFilterProducts] = useState([])
  const productID = router?.query?.productID
  const [template, setTemplate] = useState([])
  const [templateID, setTemplateId] = useState('')
  const [type, setTypes] = useState([])
  const [templateVariant, setTemplateVariant] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState({})


  const filterFromSelectedColor = (value, variants) => {

    return variants?.filter(product => product.color === value)
  }

  const getCustomProductDetails = async () => {
    axios.get(`${GET_PRODUCT_DETAIL}/${productID}`)
      .then(response => {
        console.log(response)
        if (response.data.code === 200) {
          setProductDetail(response.data.result.product);
          setVariants(response.data.result.variants);
          setSelectedColor({
              colorCode: response.data.result.variants[0]?.color_code,
              colorName: response.data.result.variants[0]?.color,
              productID: response.data.result.variants[0]?.id,
            })
          setAvailableColor(filterUniqueKey(response.data.result.variants))
          setFilterProducts(filterFromSelectedColor(response.data.result.variants[0]?.color, response.data.result.variants))

        }
      })
      .catch(error => {
        // Handle any errors that occurred during the POST request
        console.error('Error:', error);
      });
  }

  console.log(MOCKUP_TEMPLATE)
  const getMockup = async () => {
    axios.get(`http://localhost:8005/api/printful/mockup-generator/templates/${productID}`,)
      .then(response => {
        setTemplate(response?.data?.result?.templates)
        setTemplateVariant(response?.data?.result?.variant_mapping)
        console.log('mockup', response.data);
        console.log()
      })
      .catch(error => {
        // Handle any errors that occurred during the GET request
        console.error('Error:', error);
      });
  }

  const colorSelection = (color, colorCode, id) => {
    setSelectedColor({
      colorCode: colorCode,
      colorName: color,
      productID: id
    })
    setFilterProducts(filterFromSelectedColor(color, variants))

  }

  useEffect(() => {
    //  setProductDetail( shopping_results.filter(data => data.product_id === router.query.productID))
    if (productID) {
      getMockup()
      getCustomProductDetails();

    }
  }, [productID])

  useEffect(() => {

    const types = templateVariant?.filter((data) => data.variant_id === filteredProducts[0]?.id)[0]
    setTypes(types)

  }, [filteredProducts])

  useEffect(() => {
    setSelectedTemplate(template?.filter((data) => data.template_id === templateID)[0])
  }, [templateID])

  useEffect(() => {
    const col = template?.filter(data => data?.background_color === selectedColor?.colorCode)
    console.log(col[0], selectedColor)
    setTemplateId(col[0]?.template_id)
  }, [selectedColor?.colorCode])

  console.log("selected template", selectedTemplate, templateID, selectedColor)


  return (
    <div className=' flex flex-col gap-8 pt-8 pb-8  ' data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500">
      <div className='flex flex-wrap gap-6'>
        <div className='flex flex-col gap-12 items-center'>
          <div className=' dummy  ' />
          <div className='w-[550px] bg-white mt-10  ml-14   rounded-lg flex flex-col p-2 px-4 gap-4 drop' >
            <div className='grid grid-cols-2  gap-2 items-center'>
              <div className=' p-2 font-bold flex flex-col  '>
                <strong>Price</strong>
                <strong>${variants[0]?.price}</strong>
              </div>
              <div
                onClick={() => router.push(`/products/${router.query.productID}/customize`)}
                className='title-lg text-center cursor-pointer bg-sky-500 rounded-md h-24 text-white text-xl flex flex-col items-center justify-center font-medium tracking-wide ' >
                <p>At to Cart</p>
              </div>
            </div>
            <div className=' flex flex-row  justify-between gap-2'>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-bold '>Choose color</span>
                <div className='flex flex-row flex-wrap gap-2'>
                  {
                    availableColor?.map((color, idx) => {

                      return (
                        <div key={idx} className={` ${color?.color === selectedColor?.colorName ? ' border-2 border-[#0284c7]' : 'border'}   rounded-md  hover:border-[#0284c7] p-[2px]`} >
                          {
                            color?.color_code2 ?
                              <div className={`w-6 h-6 rounded-md flex `} onClick={() => colorSelection(color?.color, color?.color_code)}>
                                <div className='w-3 h-full rounded-l-md' style={{ backgroundColor: color?.color_code, cursor: 'pointer' }} />
                                <div className='w-3 h-full rounded-r-md' style={{ backgroundColor: color?.color_code2, cursor: 'pointer' }} />
                              </div>
                              :
                              <div className={`w-6 h-6 rounded-md`} onClick={() => colorSelection(color?.color, color?.color_code, color?.id)} style={{ backgroundColor: color?.color_code, cursor: 'pointer' }} />

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
                  {filteredProducts.map((variant, idx) => (
                    <div key={idx} className='border-2 w-8 h-8 flex cursor-pointer items-center justify-center hover:border-black rounded p-1'>
                      <span className='text-xs font-bold '>{variant.size}</span>
                    </div>
                  ))}

                </div>
              </div>


            </div>

          </div>

        </div>
        <div className='pb-4 pr-2 rounded-md grow gap-4 flex flex-col items-center mt-2 justify-between pt-4'>
          <div className='flex gap-4 justify-center'>
            {
              Stepper.map((data, idx) => {

                const { step, name, component } = data

                return (
                  <div key={idx} className='  flex items-center gap-1 cursor-pointer' onClick={() => setSection(pre => {
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

          {/* <Editor path={productDetail?.image} />   */}
          {/* <CustomEditor/> 
                    <ImageEditor/> */}
          {product?.image &&
            <div style={{
              width: 750, borderRadius: 20, overflow: 'hidden',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              height: 700, background: 'white', display: 'flex', flexDirection: 'column'

            }}>
              <div className='flex gap-2 justify-center p-4 w-full overflow-y -scroll'>
                {
                  type?.templates?.map((list, idx) => {

                    return (
                      <div key={idx} onClick={() => setTemplateId(list.template_id)} className='p-3 flex items-center justify-center text-center min-w-16 w-24 h-10 cursor-pointer text-xs rounded-full shadow-md bg-[#f8fafc] hover:bg-[#f1f5f9]'>
                        {list?.placement}
                      </div>
                    )
                  })
                }
              </div>
              {selectedTemplate?.image_url && <TestEditor path={selectedTemplate?.image_url} types={type?.templates} />}
            </div>}
        </div>

      </div>

    </div>
  )
}

export default CustomProduct