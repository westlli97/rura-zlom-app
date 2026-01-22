import React from 'react';

const TileSelector = ({ label, options, selectedValue, onSelect }) => {
  return (
    <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '12px',
            width: '100%',
            }}>
      {label && <h3>{label}</h3>}
      <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '15px', 
            marginTop: '10px', 
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px',
            }}>
        {options.map(option => (
          <div
            key={option.value}
            onClick={() => onSelect(option.value)}
            style={{
                padding: '20px 30px',
                minWidth: '120px',
                textAlign: 'center',
                fontSize: '1.1rem',
                backgroundColor: selectedValue === option.value ? '#0056b3' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                flex: '1 1 auto',
                maxWidth: '250px'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#ff8400';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}

            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              if (selectedValue === option.value) {
                e.currentTarget.style.backgroundColor = '#0056b3';
              } else {
                e.currentTarget.style.backgroundColor = '#007bff';
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
