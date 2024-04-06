import React, { useRef, useEffect, useState } from 'react';
import "./Plants.css";

function PlantsKey() {

  const [plants, setPlants] = useState([
    {id: 1, type: "carrot", distance_inches: 10, color: "orange", icon: "🟠"}
    // Add more circle objects here as needed
  ]);

  return(
    <div className='plants'>
      {plants.map((plant) => (
        <div className='plant' key={plant.id}>
          <p>{plant.icon}</p>
          <p> | {plant.type}</p>
        </div>
      ))}
    </div>
  );
}

export default PlantsKey;