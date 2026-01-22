import React, { useEffect, useState } from 'react';
import TileSelector from './TileSelector';
import { fetchMaterials, fetchShapes, fetchSizes } from '../api/materialsApi';

const RuraSelection = ({ 
  selectedType, 
  setSelectedType, 
  selectedMaterial, 
  setSelectedMaterial,
  selectedSize,  
  setSelectedSize 
}) => {
  const [materials, setMaterials] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  
  const [selectedShapeId, setSelectedShapeId] = useState('');

  useEffect(() => {
    fetchMaterials().then(setMaterials);
    fetchShapes().then(setShapes);
  }, []);

  useEffect(() => {
    if (selectedType) {
      const shape = shapes.find(s => s.code === selectedType);
      if (shape) {
        setSelectedShapeId(shape.id);
        fetchSizes(shape.id).then(data => {
            setAvailableSizes(data.map(s => ({ value: s.id.toString(), label: s.size_label })));
        });
      }
    } else {
      setAvailableSizes([]);
      setSelectedShapeId('');
    }
    setSelectedSize('');
  }, [selectedType, shapes, setSelectedSize]);

  return (
    <div>
      <TileSelector 
        label="" 
        options={shapes.map(s => ({ value: s.code, label: s.name }))}
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
        options={materials.map(m => ({ value: m.value, label: m.label }))}
        selectedValue={selectedMaterial}
        onSelect={setSelectedMaterial}
      />
    </div>
  );
};

export default RuraSelection;
