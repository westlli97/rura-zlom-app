import React, { useEffect, useState } from 'react';
import ContainerTile from '../components/ContainerTile';
import Cookies from 'js-cookie'; // 🆕 import js-cookie

const SummaryPage = () => {
  const [entries, setEntries] = useState([]);

  const fetchData = () => {
    fetch('https://zlom-app.onrender.com/api/containers/summary/', {
      credentials: 'include', // 🆕 ważne, żeby przeglądarka przesłała ciasteczka (csrftoken)
    })
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
    const csrfToken = Cookies.get('csrftoken'); // 🆕 pobranie tokena przez js-cookie

    fetch(`https://zlom-app.onrender.com/api/entries/${id}/delete/`, {
      method: 'DELETE',
      credentials: 'include', // 🆕 przesyłanie ciastek z sesją
      headers: {
        'X-CSRFToken': csrfToken, // 🆕 dodanie tokena do nagłówka
      },
    })
      .then(response => {
        if (response.ok) {
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
          totalLength={entry.total_length_m}
          onDelete={() => handleDelete(entry.id)}
        />
      ))}
    </div>
  );
};

export default SummaryPage;
