import React, { useEffect, useState } from 'react';
import ContainerTile from '../components/ContainerTile';

const SummaryPage = () => {
  const [entries, setEntries] = useState([]);

  const fetchData = () => {
    fetch('https://zlom-app.onrender.com/api/containers/summary/')
      .then(response => response.json())
      .then(data => {
        console.log('Dane z nowego API:', data);
        setEntries(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    fetch(`https://zlom-app.onrender.com/api/entries/${id}/delete/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // odśwież dane
          fetchData();
        } else {
          alert('Nie udało się usunąć wpisu.');
        }
      });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {entries.map((entry, index) => (
        <ContainerTile
          key={index}
          material={entry.material_name || entry.material}
          shape={entry.size_label || entry.size_id}
          weight={entry.total_weight_kg || entry.total_weight}
          onDelete={() => handleDelete(entry.id)}
        />
      ))}
    </div>
  );
};

export default SummaryPage;
