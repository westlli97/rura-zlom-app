import React, { useEffect, useState } from 'react';
import ContainerTile from '../components/ContainerTile';

const SummaryPage = () => {
  const [entries, setEntries] = useState([]);

  // 🆕 funkcja do pobierania wartości cookie po nazwie
  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

  const fetchData = () => {
    fetch('https://zlom-app.onrender.com/api/containers/summary/', {
      credentials: 'include', // 🆕 przesyłanie ciasteczek (np. sesji, csrftoken)
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
    const csrfToken = getCookie('csrftoken'); // 🆕 pobranie tokena z cookie

    fetch(`https://zlom-app.onrender.com/api/entries/${id}/delete/`, {
      method: 'DELETE',
      credentials: 'include', // 🆕 przesyłanie ciastek
      headers: {
        'X-CSRFToken': csrfToken, // 🆕 dołączenie CSRF tokena do nagłówka
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
