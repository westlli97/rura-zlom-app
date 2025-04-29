import React from 'react';

const ContainerTile = ({ material, shape, weight, size }) => {
  const isEmpty = weight === 0;
  const tileStyle = {
    backgroundColor: isEmpty ? 'green' : 'red',
    color: 'white',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '200px', // Możesz dostosować szerokość
  };

  return (
    <div style={tileStyle}>
      <h3>{material}</h3>
      <p>Rodzaj: {shape}</p>
      <p>Rozmiar: {size.size_label}</p> {/* Wyświetlanie etykiety rozmiaru */}
      <p>Waga: {weight} kg</p>
    </div>
  );
};

export default ContainerTile;
