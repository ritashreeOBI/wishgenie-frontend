import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    // Example: Add a rectangle to the canvas
    const rect = new fabric.Rect({
      left: 10,
      top: 10,
      width: 300,
      height: 400,
      fill: 'white',
    });
    canvas.add(rect);

    // Clean up on unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default Canvas;
