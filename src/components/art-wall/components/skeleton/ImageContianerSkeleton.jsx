import { Skeleton } from '@chakra-ui/react'
import React from 'react'

function ImageContianerSkeleton({height , width}) {
  return (
    <Skeleton borderRadius={'xl'} height={height}  width ={width} />
  )
}

export default ImageContianerSkeleton