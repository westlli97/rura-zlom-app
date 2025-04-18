import React from 'react';

const RuraSelection = ({ selectedType, setSelectedType, selectedMaterial, setSelectedMaterial }) => (
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
  </div>
);


export default RuraSelection;