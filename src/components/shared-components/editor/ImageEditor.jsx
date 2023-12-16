import React, { useRef, useState } from 'react';

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImage(event.target.result);
    };

    if (uploadedImage) {
      reader.readAsDataURL(uploadedImage);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setImage(null);
  };

  const handleDrawImage = () => {
    if (image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleClearCanvas}>Clear Canvas</button>
      <button onClick={handleDrawImage}>Draw Image</button>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default ImageEditor;
