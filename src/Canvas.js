import React, { useRef, useEffect, useState } from 'react';

function MyCanvasComponent() {
  const canvasRef = useRef(null);
  const [circles, setCircles] = useState([
    { x: 50, y: 50, radius: 15, isDragging: false, id:1, icon: "🔵", title: "bluebell"},
    { x: 70, y: 70, radius: 15, isDragging: false, id:2, icon: "🔵", title: "bluebell"},
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const drawCircles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      context.fillStyle = 'wheat';
      context.fillRect(0, 0, canvas.width, canvas.height);
    
      circles.forEach(circle => {
        // Draw circle
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        context.fillStyle = 'rgba(0, 0, 255, 0.5)';
        context.fill();
        context.stroke();

        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        context.fillStyle = 'rgba(0, 0, 255, 0.5)';
        context.fill();
        context.stroke();
    
        // Draw icon centered within the circle
        const fontSize = circle.radius * .5; // Adjust multiplier as needed
        context.font = `${fontSize}px Arial`; // Set the font size and family
        context.textAlign = 'center'; // Center horizontally
        context.textBaseline = 'middle'; // Center vertically
        context.fillText(circle.icon, circle.x, circle.y + (circle.radius * .1)); // Position the icon
        context.fillText(circle.title, circle.x, circle.y + (circle.radius * .3)); // Position the icon
      });
    };
    

    drawCircles();

    const handleMouseDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      let isInsideCircle = false;

      circles.forEach(circle => {
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (distance < circle.radius) {
          isInsideCircle = true;
          setCircles(circles => circles.map(c => 
            c === circle ? { ...c, isDragging: true } : c
          ));
        }
      });

      if (!isInsideCircle) {
        const newId = circles.length > 0 ? circles[circles.length - 1].id + 1 : 1; // Calculate new ID
        setCircles([...circles, { id: newId, x: mouseX, y: mouseY, radius: 20, isDragging: false }]);
      }
    };

    const handleMouseMove = (event) => {
      if (!circles.some(circle => circle.isDragging)) {
        return; // Do nothing if no circle is being dragged
      }

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;


      //todo: fix circle dragging to prevent circles from getting too close to each other...
      setCircles(currentCircles => {
        return currentCircles.map(circle => {
          if (!circle.isDragging) return circle; // Skip if not dragging
      
          let canMove = true;
          for (let other_circle of currentCircles) {
            if (circle.id === other_circle.id) continue; // Skip self
      
            const distance = Math.sqrt((mouseX - other_circle.x) ** 2 + (mouseY - other_circle.y) ** 2);
            if (distance < circle.radius) {
              canMove = false; // Collision detected, cannot move
              break;
            }
          }
      
          // If can move, update position, otherwise return the circle as is
          return canMove ? { ...circle, x: mouseX, y: mouseY } : circle;
        });
      });
      drawCircles();      
    };

    const handleMouseUp = () => {
      setCircles(circles => circles.map(circle => ({
        ...circle,
        isDragging: false
      })));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [circles]); // Reacting to changes in the circles array

  return (
    <div>
      <canvas ref={canvasRef}  />
    </div>
  );
}

export default MyCanvasComponent;
