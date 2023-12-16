import { useEffect,  useRef, useState } from 'react';
import {  Image } from 'react-konva';

const BackgroundImageObject = ({ src , scale , dimension }) => {
    
      const [image, setImage] = useState(null);
      console.log(src)
      
  const imageRef = useRef();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const loadImage = () => {
      const img = new window.Image();
      img.src = src;
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
  }, [src]);
  const handleDrag = (e) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

      console.log(image)

      return (
        <Image
        // x={position.x}
        // y={position.y}
          image={image}
          ref={imageRef}
          scaleX={scale}
          scaleY={scale}
          width={dimension.width}
          height={dimension.height}
          // width={200 * scale} // Adjust the width and height based on the scale
          //   height={200 * scale}
           
            draggable
            onDragMove={handleDrag}
        />
      );
    }
    

    

export default BackgroundImageObject;
