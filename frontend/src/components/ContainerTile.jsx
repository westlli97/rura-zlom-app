import React from 'react';

const ContainerTile = ({ material, shape, weight }) => {
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
    color: backgroundColor === 'yellow' ? 'black' : 'white', // lepszy kontrast dla żółtego
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '200px',
  };

  return (
    <div style={tileStyle}>
      <h3>{material}</h3>
      <p>Przekrój: {shape}</p>
      <p>Waga: {weight} kg</p>
    </div>
  );
};

export default ContainerTile;
