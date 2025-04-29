import React, { useEffect, useState } from 'react';
import ContainerTile from '../components/ContainerTile';

const SummaryPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/container-entries/')
      .then(response => response.json())
      .then(data => {
        console.log('Dane z nowego API:', data);
        setEntries(data);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {entries.map((entry, index) => (
        <ContainerTile
          key={index}
          material={entry.material_name} // np. "Mosiądz"
          shape={entry.size_label}       // np. "Marcepan"
          weight={entry.total_weight_kg} // np. "112.00"
        />
      ))}
    </div>
  );
};

export default SummaryPage;