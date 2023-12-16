"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
 
const Studio = dynamic(() => import('@/editor-components/Studio/Studio'), { ssr: false })


const inter = Inter({ subsets: ['latin'] })

export default function Editor() {
  return (
    <div  >
      <Studio/>
    </div>
  )
}