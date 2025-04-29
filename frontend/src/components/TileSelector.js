import React from 'react';

const TileSelector = ({ label, options, selectedValue, onSelect }) => {
  return (
    <div>
      <h3>{label}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {options.map(option => (
          <div
            key={option.value}
            onClick={() => onSelect(option.value)}
            style={{
              padding: '10px 20px',
              margin: '5px',
              backgroundColor: selectedValue === option.value ? 'lightblue' : 'lightgray',
              cursor: 'pointer',
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TileSelector;
