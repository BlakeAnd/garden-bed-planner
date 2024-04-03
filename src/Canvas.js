import React, { useRef, useEffect, useState } from 'react';

function MyCanvasComponent() {
  const canvasRef = useRef(null);
  const [circle, setCircle] = useState({ x: 50, y: 50, radius: 20, isDragging: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // context.fillStyle = '';
    // context.fillRect(10, 10, 100, 100);

    const drawCircle = () => {
      

      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      context.fillStyle = 'white';
      context.fillRect(0, 0, 4000, 4000);

      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill();
      context.stroke();
    };

    drawCircle();

    const handleMouseDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Check if the mouse is inside the circle
      if (
        Math.sqrt(
          (mouseX - circle.x) * (mouseX - circle.x) +
            (mouseY - circle.y) * (mouseY - circle.y)
        ) < circle.radius
      ) {
        setCircle({ ...circle, isDragging: true });
      }
    };

    const handleMouseMove = (event) => {
      if (circle.isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        setCircle({ ...circle, x: mouseX, y: mouseY });
        drawCircle();
      }
    };

    const handleMouseUp = () => {
      setCircle({ ...circle, isDragging: false });
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [circle]);

  return (
    <div>
      <canvas ref={canvasRef} width="200" height="200" />
    </div>
  );
}

export default MyCanvasComponent;