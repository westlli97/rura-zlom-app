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

  const handleAddWeight = async (weight) => {
    console.log("Dodano wagę:", weight);
    const newEntry = {
      shape: selectedType,
      material: selectedMaterial,
      size: selectedSize,
      weight_kg: weight,
    };
    try {
    const savedEntry = await addWeightEntry(newEntry); // wysyłamy do backendu
    setEntries([newEntry, ...entries.slice(0, 4)]); // lokalnie dodajemy
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
        onSubmit={handleAddWeight}
        />
      <RecentEntries entries={entries} />
    </div>
  );
};

export default HomePage;