import React, { useState } from 'react';
import { addContainer } from '../api/containersApi';

const AddWeightForm = ({ selectedType, selectedMaterial, selectedSize, onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Kliknięto Dodaj wagę');

    try {
      const containerData = {
        weight_kg: parseFloat(weight),
        material: selectedMaterial,
        shape: selectedType,
        size: selectedSize,
      };

      console.log('📦 Wysyłane dane:', containerData);

      //await addContainer(containerData);
      onSubmit(weight);
      setWeight('');
    } catch (err) {
      console.error('Błąd podczas dodawania wagi:', err);
      setError('Błąd podczas dodawania wagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        step="0.1"
        placeholder="Waga [kg]"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Dodawanie...' : 'Dodaj wagę'}
      </button>

      {loading && <p>⏳ Trwa dodawanie...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddWeightForm;
