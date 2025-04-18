import React, { useState } from 'react';
import RuraSelection from '../components/RuraSelection';
import AddWeightForm from '../components/AddWeightForm';
import RecentEntries from '../components/RecentEntries';
import { addWeightEntry } from '../api/containersApi';

const HomePage = () => {
    console.log('✅ Komponent HomePage został załadowany');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [entries, setEntries] = useState([]);

  const handleAddWeight = async (weight) => {
    console.log("Dodano wagę:", weight);
    const newEntry = {
      shape: selectedType,
      material: selectedMaterial,
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