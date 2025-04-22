import React from 'react';

const RuraSelection = ({ 
  selectedType, 
  setSelectedType, 
  selectedMaterial, 
  setSelectedMaterial,
  selectedSize,  // Nowe pole dla rozmiaru
  setSelectedSize // Funkcja do ustawiania rozmiaru
}) => (
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
<select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
  <option value="">-- Wybierz rozmiar --</option>
  <option value="1">Fi22</option>
  <option value="2">Fi25</option>
  <option value="3">Fi30</option>
  <option value="4">Fi40</option>
  <option value="5">Fi50</option>
  <option value="6">40x40</option>
  <option value="7">25x25</option>
  <option value="8">30x30</option>
  <option value="9">30x10</option>
  <option value="10">40x10</option>
  <option value="11">40x20</option>
  <option value="12">50x25</option>
  <option value="13">Marcepan</option>
</select>

  </div>
);


export default RuraSelection;