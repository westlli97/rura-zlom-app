import React, { useState } from 'react';

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

      await onSubmit(containerData);  // Wywołujemy onSubmit, który będzie przekazywał dane do głównego komponentu
      setWeight('');
    } catch (err) {
      console.error('Błąd podczas dodawania wagi:', err);
      setError('Błąd podczas dodawania wagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md space-y-4">
      
      <input
        type="number"
        step="0.1"
        placeholder="Waga [kg]"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button 
        type="submit" 
        disabled={loading}
        className={`w-full text-white font-semibold py-2 rounded-md transition duration-200 ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    }`}>
        {loading ? 'Dodawanie...' : 'Dodaj wagę'}
      </button>
      {loading && <p>⏳ Trwa dodawanie...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddWeightForm;
