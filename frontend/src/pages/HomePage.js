import React, { useState, useEffect } from 'react';
import RuraSelection from '../components/RuraSelection';
import AddWeightForm from '../components/AddWeightForm';
import RecentEntries from '../components/RecentEntries';
import { addWeightEntry } from '../api/containersApi';
import axios from '../api/axiosInstance';

const HomePage = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [entries, setEntries] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    // Wykonaj GET na działający endpoint, żeby backend ustawił cookie csrftoken
    axios.get('/materials/')
      .then(response => {
        setMaterials(response.data);
      })
      .catch(error => {
        console.error('Błąd pobierania materiałów:', error);
      });
  }, []);

  // Pobierz ostatnie wpisy
  const fetchEntries = async () => {
    try {
      const response = await axios.get('/containers/');
      const recent = response.data.slice(-5).reverse();
      setEntries(recent);
    } catch (error) {
      console.error('Błąd podczas pobierania wpisów:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAddWeight = async (containerData) => {
    try {
      const savedEntry = await addWeightEntry(containerData);
      setEntries([savedEntry, ...entries.slice(0, 4)]);
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
        onSubmit={handleAddWeight}
      />
      <RecentEntries entries={entries} refreshEntries={fetchEntries} />
    </div>
  );
};

export default HomePage;
