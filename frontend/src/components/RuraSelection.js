import React from 'react';

const RuraSelection = ({ selectedType, setSelectedType, selectedMaterial, setSelectedMaterial }) => (
  <div>
    <h2>Wybierz typ rury</h2>
    <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
      <option value="">-- Typ przekroju --</option>
      <option value="okrągła">Okrągła</option>
      <option value="kwadratowa">Kwadratowa</option>
    </select>

    <select value={selectedMaterial} onChange={e => setSelectedMaterial(e.target.value)}>
      <option value="">-- Materiał --</option>
      <option value="AISI 304">AISI 304</option>
      <option value="AISI 316">AISI 316</option>
      <option value="Aluminium">Aluminium</option>
      <option value="Mosiądz">Mosiądz</option>
    </select>
  </div>
);

export default RuraSelection;