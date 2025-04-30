import React from 'react';

const TileSelector = ({ label, options, selectedValue, onSelect }) => {
  return (
    <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center', // <== ŚRODKOWANIE
            gap: '22px',              // <== ODSTĘPY MIĘDZY KAFELKAMI
            marginTop: '12px',
            }}>
      <h3>{label}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '22px', marginTop: '22px', justifyContent: 'center',}}>
        {options.map(option => (
          <div
            key={option.value}
            onClick={() => onSelect(option.value)}
            style={{
                padding: '32px 50px',
                fontSize: '1.0rem',
                backgroundColor: selectedValue === option.value ? '#0056b3' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = '#ff8400';
            }}

            onMouseOut={(e) => {
              if (selectedValue === option.value) {
                e.target.style.backgroundColor = '#0056b3'; // Zostaje ciemniejszy
              } else {
                e.target.style.backgroundColor = '#007bff'; // Wraca do jaśniejszego
              }
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
