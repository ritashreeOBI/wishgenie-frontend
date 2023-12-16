"use client"
import UserAuthWrapper from '@/utils/UserAuthWrapper'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
 
const Studio = dynamic(() => import('@/editor-components/Studio/Studio'), { ssr: false })


function CustomizeProducts() {
    const router = useRouter()
    const productID = router?.query?.productID

  return (
    <div>
      <Studio productID ={productID}/>
    </div>
  )
}

export default CustomizeProducts

