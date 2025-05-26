import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { fetchMaterials } from '../api/materialsApi';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const RecentEntries = ({ entries, refreshEntries }) => {
  const [materialMap, setMaterialMap] = useState({});
  const [sizeMap, setSizeMap] = useState({});

  useEffect(() => {
    fetchMaterials().then(materials => {
      const map = {};
      materials.forEach(m => {
        map[m.value] = m.label;
      });
      setMaterialMap(map);
    });
  }, []);

  useEffect(() => {
    // Dla każdego unikalnego shape w entries robimy fetch do backendu
    const shapes = [...new Set(entries.map(e => e.shape))];

    const fetchSizesForShape = async (shape) => {
      try {
        const response = await axios.get(`/get-sizes/?shape=${shape}`);
        // response.data to lista obiektów: { id, size_label }
        return { shape, sizes: response.data };
      } catch (error) {
        console.error(`Błąd pobierania rozmiarów dla shape=${shape}:`, error);
        return { shape, sizes: [] };
      }
    };

    const fetchAllSizes = async () => {
      const allSizes = await Promise.all(shapes.map(s => fetchSizesForShape(s)));
      const newSizeMap = {};

      entries.forEach(entry => {
        const shapeSizes = allSizes.find(s => s.shape === entry.shape)?.sizes || [];
        // Szukamy rozmiaru po id (w entry.size mamy id)
        const sizeLabel = shapeSizes.find(sz => sz.id === entry.size)?.size_label || entry.size;
        newSizeMap[`${entry.shape}_${entry.size}`] = sizeLabel;
      });

      setSizeMap(newSizeMap);
    };

    if (shapes.length > 0) {
      fetchAllSizes();
    }
  }, [entries]);

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`/containers/${id}/`);
      refreshEntries();
    } catch (error) {
      console.error('Błąd podczas usuwania wpisu:', error);
    }
  };

  return (
    <div className="recent-entries">
      
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {entries.map(entry => (
          <li key={entry.id}>
            {materialMap[entry.material] || entry.material} – {sizeMap[`${entry.shape}_${entry.size}`] || entry.size} – {" "}
            {entry.weight_kg} kg –  {" "}
            {formatDate(entry.created_at)} {"   "}
            <button 
              style={{
                marginTop: '10px',  
                padding: '7px 10px',
                fontSize: '0.8rem',
                backgroundColor: '#ff1900',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease'
              }}
              onClick={() => {
                if (window.confirm("Czy na pewno chcesz usunąć ten wpis?")) {
                  deleteEntry(entry.id);
                }
              }}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentEntries;
