import React, { useEffect } from 'react';

const RuraSelection = ({ 
  selectedType, 
  setSelectedType, 
  selectedMaterial, 
  setSelectedMaterial,
  selectedSize,  
  setSelectedSize 
}) => {

  // Zmienna przechowująca dostępne rozmiary na podstawie typu rury
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
          { value: '9', label: '30x10' },
          { value: '10', label: '40x10' },
        ];
      case 'RECT':
        return [
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

  // Zaktualizuj rozmiary, gdy zmieni się typ rury
  useEffect(() => {
    setSelectedSize(''); // Resetuj rozmiar po zmianie typu
  }, [selectedType, setSelectedSize]);

  const availableSizes = getAvailableSizes();

  return (
    <div>
      <h2>Wybierz typ rury</h2>
      <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
        <option value="">-- Typ przekroju --</option>
        <option value="ROUND">Okrągła</option>
        <option value="SQUARE">Kwadratowa</option>
        <option value="RECT">Prostokątny</option>
        <option value="D_Shape">Marcepan</option>
      </select>

      <select value={selectedMaterial} onChange={e => setSelectedMaterial(e.target.value)}>
        <option value="">-- Materiał --</option>
        <option value="AL">Aluminium</option>
        <option value="A304">AISI 304</option>
        <option value="A316">AISI 316</option>
        <option value="MS">Mosiądz</option>
      </select>

      <h2>Wybierz rozmiar</h2>
      <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} disabled={!selectedType}>
        <option value="">-- Wybierz rozmiar --</option>
        {availableSizes.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RuraSelection;
