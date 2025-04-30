import React, { useEffect, useState } from 'react';
import TileSelector from './TileSelector';
import { fetchMaterials } from '../api/materialsApi';

const RuraSelection = ({ 
  selectedType, 
  setSelectedType, 
  selectedMaterial, 
  setSelectedMaterial,
  selectedSize,  
  setSelectedSize 
}) => {
  const [aluminiumSubtypes, setAluminiumSubtypes] = useState([]);
  const [showAluminiumSubtypes, setShowAluminiumSubtypes] = useState(false);
  const [selectedAluminiumSubtype, setSelectedAluminiumSubtype] = useState('');

  useEffect(() => {
    fetchMaterials().then(data => {
      const aluminiumOptions = data.filter(material => material.value.startsWith('AL'));
      console.log("Aluminium subtypes:", aluminiumOptions);
      setAluminiumSubtypes(aluminiumOptions);
    });
  }, []);

  useEffect(() => {
    setSelectedSize('');
  }, [selectedType, setSelectedSize]);

  const getAvailableSizes = () => {
    switch (selectedType) {
      case 'ROUND':
        return [
          { value: '1', label: 'Fi22' },
          { value: '2', label: 'Fi25' },
          { value: '3', label: 'Fi30' },
          { value: '4', label: 'Fi40' },
          { value: '5', label: 'Fi50' },
        ];
      case 'SQUARE':
        return [
          { value: '6', label: '40x40' },
          { value: '7', label: '25x25' },
          { value: '8', label: '30x30' },
        ];
      case 'RECT':
        return [
          { value: '9', label: '30x10' },
          { value: '10', label: '40x10' },
          { value: '11', label: '40x20' },
          { value: '12', label: '50x25' },
        ];
      case 'D_Shape':
        return [
          { value: '13', label: 'Marcepan' },
        ];
      default:
        return [];
    }
  };

  const availableSizes = getAvailableSizes();

  return (
    <div>
      <TileSelector 
        label="" 
        options={[
          { value: 'ROUND', label: 'Okrągła' },
          { value: 'SQUARE', label: 'Kwadratowa' },
          { value: 'RECT', label: 'Prostokątny' },
          { value: 'D_Shape', label: 'Marcepan' },
        ]}
        selectedValue={selectedType}
        onSelect={setSelectedType}
      />
      
      {selectedType && (
        <TileSelector 
          label="" 
          options={availableSizes}
          selectedValue={selectedSize}
          onSelect={setSelectedSize}
        />
      )}
      
      <TileSelector 
        label="" 
        options={[
          { value: 'AL', label: 'Aluminium' },
          { value: 'A304', label: '304' },
          { value: 'A316', label: '316' },
          { value: 'MS', label: 'Mosiądz' },
        ]}
        selectedValue={selectedMaterial}
        onSelect={(value) => {
          setSelectedMaterial(value);
          setShowAluminiumSubtypes(value === 'AL');
        }}
      />

      {showAluminiumSubtypes && (
        <div style={{ textAlign: 'center', marginBottom: '5px' }}>
            <h3>Wybierz typ aluminium</h3>
        
        <TileSelector
          options={aluminiumSubtypes}
          selectedValue={selectedAluminiumSubtype}
          onSelect={(value) => {
      // Zaktualizowanie stanu selectedAluminiumSubtype, żeby podświetlić kafelek
            setSelectedAluminiumSubtype(value);
      
      // Zaktualizowanie stanu selectedMaterial, aby przesłać ten wybrany materiał do backendu
            setSelectedMaterial(value);
    }}
        />
    </div>        
      )}
      
      
    </div>
  );
};

export default RuraSelection;
