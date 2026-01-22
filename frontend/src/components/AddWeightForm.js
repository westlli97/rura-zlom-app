import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddWeightForm = ({ selectedType, selectedMaterial, selectedSize, onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tares, setTares] = useState([]);
  const [selectedTare, setSelectedTare] = useState(null);
  const [finalWeight, setFinalWeight] = useState(0);
    
  useEffect(() => {
    // Pobierz dostępne tary z API
    axios.get('/api/tares/')
      .then(response => {
        setTares(response.data);
      })
      .catch(error => {
        console.error('Error fetching tares:', error);
      });
  }, []);

  const handleTareClick = (tare) => {
    setSelectedTare(tare); // Ustaw wybraną tarę
    setFinalWeight(weight - tare.weight_kg); // Pomniejsz wagę o wartość tary
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value); // Zmienna wagi
    if (selectedTare) {
      setFinalWeight(e.target.value - selectedTare.weight_kg); // Pomniejsz wagę po zmianie
    }
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Kliknięto Dodaj wagę');
    const weightNum = parseFloat(weight);
    const weightToSend = selectedTare ? weight - selectedTare.weight_kg : weight;

    try {
      const containerData = {
        weight_kg: weightToSend,
        material: selectedMaterial,
        shape: selectedType,
        size: selectedSize,
      };

      console.log('📦 Wysyłane dane:', containerData);

      await onSubmit(containerData);  // Wywołujemy onSubmit, który będzie przekazywał dane do głównego komponentu
      setWeight('');
    } catch (err) {
      console.error('Błąd podczas dodawania wagi:', err);
      setError('Błąd podczas dodawania wagi');
    } finally {
      setLoading(false);
    }
  };

return (
    <div>
      <form onSubmit={handleSubmit}
        style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Wyśrodkowanie w poziomie
        justifyContent: 'center',// Wyśrodkowanie w pionie
        marginTop: '30px',
        }}
        >

          <p></p>
          <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Wpisz wagę"
            className="rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            style={{
                width: '300px',  // Szerokość inputa
                height: '50px',  // Wysokość inputa
                paddingLeft: '15px',  // Zwiększenie paddingu od lewej
                paddingRight: '15px',  // Zwiększenie paddingu od prawej
                paddingTop: '10px',   // Zwiększenie paddingu od góry
                paddingBottom: '10px',
                fontSize: '1.5rem',
  }}
          />
        
        
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', // <== ŚRODKOWANIE
            alignItems: 'center',              // <== ODSTĘPY MIĘDZY KAFELKAMI
            marginTop: '12px', }}>
          <h3>Wybierz tarę:</h3>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center', // <== ŚRODKOWANIE
            gap: '22px',              // <== ODSTĘPY MIĘDZY KAFELKAMI
            marginTop: '12px',
            }}>
    
            {tares.map(tare => (
              <div
                key={tare.id}
                style={{

                padding: '12px 24px',
                fontSize: '0.9rem',
                backgroundColor: selectedTare?.id === tare.id ? '#0056b3' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = '#ff8400';
            }}

            onMouseOut={(e) => {
              if (selectedTare?.id === tare.id) {
                e.target.style.backgroundColor = '#0056b3'; // Zostaje ciemniejszy
              } else {
                e.target.style.backgroundColor = '#007bff'; // Wraca do jaśniejszego
              }
            }}
            onClick={() => handleTareClick(tare)}
              >
                {tare.name}
                {/* <p>{tare.weight_kg} kg</p> */}
              </div>
            ))}
          </div>
        </div>

        <button
            type="submit"
            style={{
                marginTop: '62px',  
                padding: '12px 24px',
                fontSize: '1.2rem',
                backgroundColor: '#ff8400',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ff8400')}
            >
                         Dodaj wagę
                    </button>
      </form>


    </div>
  );
};

export default AddWeightForm;
