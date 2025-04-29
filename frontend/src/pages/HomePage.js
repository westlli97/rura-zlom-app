import React, { useState, useEffect } from 'react';
import RuraSelection from '../components/RuraSelection';
import AddWeightForm from '../components/AddWeightForm';
import RecentEntries from '../components/RecentEntries';
import { addWeightEntry } from '../api/containersApi';
import axios from '../api/axiosInstance';

const HomePage = () => {
  console.log('✅ Komponent HomePage został załadowany');

  useEffect(() => {
    axios.get('csrf/').then(() => {
      console.log('✅ CSRF token pobrany i ustawiony w ciasteczkach');
    }).catch((err) => {
      console.error('❌ Błąd podczas pobierania CSRF tokena:', err);
    });
  }, []);

  const [selectedType, setSelectedType] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [entries, setEntries] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddWeight = async (containerData) => {
    console.log("Dodano wagę:", containerData);
    
    try {
      // Wysłanie danych do API
      const savedEntry = await addWeightEntry(containerData);
      
      // Po udanej wysyłce, dodajemy nowy wpis do lokalnego stanu
      setEntries([savedEntry, ...entries.slice(0, 4)]);  // Lokalnie dodajemy do stanu, ograniczając do 5 ostatnich
    } catch (error) {
      console.error('Błąd przy dodawaniu wagi:', error);
      alert('Nie udało się zapisać danych. Sprawdź połączenie z backendem.');
    }
  };

  return (
    <div>
      <RuraSelection
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <AddWeightForm
        selectedType={selectedType}
        selectedMaterial={selectedMaterial}
        selectedSize={selectedSize}
        onSubmit={handleAddWeight}  // Przekazujemy funkcję do obsługi wysyłki
      />
      <RecentEntries entries={entries} />
    </div>
  );
};

export default HomePage;
