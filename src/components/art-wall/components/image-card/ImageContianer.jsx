import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

function ImageContianer({url}) {
    const [image, setImage] = useState(null);
      console.log(url)
      
  const imageRef = useRef();
  useEffect(() => {
    const loadImage = () => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        setImage(img);
      };
    };

    loadImage();

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', loadImage);
      }
    };
  }, [url]);

      console.log(image)

      return (
        <Image
          alt="image"
          src={url}
          ref={imageRef}
          width={400}
          height={400}
          className=" rounded-xl"
        
        />
      );
    }
    


export default ImageContianer