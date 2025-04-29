import React, { useEffect, useState } from 'react';
import ContainerTile from '../components/ContainerTile';

const SummaryPage = () => {
  const [containers, setContainers] = useState([]);

useEffect(() => {
  fetch('http://localhost:8000/api/containers/')
    .then(response => response.json())
    .then(data => {
      console.log('Dane z API:', data); // ?
      setContainers(data);
    });
}, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {containers.map((container, index) => (
        <ContainerTile
          key={index}
          material={container.material}  // Zaktualizowany material
          shape={container.shape}  // Zaktualizowany ksztalt
          weight={container.weight_kg}  // Zaktualizowana waga
          size={container.size}  // Zaktualizowany rozmiar
        />
      ))}
    </div>
  );
};

export default SummaryPage;
