import React, { useState } from 'react';
import RuraSelection from '../components/RuraSelection';
import AddWeightForm from '../components/AddWeightForm';
import RecentEntries from '../components/RecentEntries';

const HomePage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [entries, setEntries] = useState([]);

  const handleAddWeight = (weight) => {
    const newEntry = {
      shape: selectedType,
      material: selectedMaterial,
      weight,
    };
    setEntries([newEntry, ...entries.slice(0, 4)]); // max 5 ostatnich
  };

  return (
    <div>
      <RuraSelection
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
      />
      <AddWeightForm onSubmit={handleAddWeight} />
      <RecentEntries entries={entries} />
    </div>
  );
};

export default HomePage;