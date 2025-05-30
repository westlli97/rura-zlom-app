import React from 'react';

const ContainerTile = ({ material, shape, weight, totalLength, onDelete }) => {
  const numericWeight = parseFloat(weight);

  let backgroundColor;
  if (numericWeight === 0) {
    backgroundColor = 'green';
  } else if (numericWeight > 0 && numericWeight < 10) {
    backgroundColor = 'yellow';
  } else {
    backgroundColor = 'red';
  }

  const tileStyle = {
    backgroundColor,
    color: backgroundColor === 'yellow' ? 'black' : 'white',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '200px',
    position: 'relative',
  };

  const buttonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '5px 8px',
  };

  return (
    <div style={tileStyle}>
      <button
        style={buttonStyle}
        onClick={() => {
          const confirmed = window.confirm('Czy na pewno chcesz usunąć ten wpis?');
          if (confirmed) {
            onDelete();
          }
        }}
      >
        Złomuj
      </button>
      <h3>{material}</h3>
      <p>Przekrój: {shape}</p>
      <p>Waga: {weight} kg</p>
      {totalLength !== null && totalLength !== undefined ? (
        <p>Długość: {totalLength} m</p>
      ) : (
        <p style={{ color: 'gray' }}>(Brak danych o długości)</p>
      )}
    </div>
  );
};

export default ContainerTile;
