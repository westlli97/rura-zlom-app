import React, { useState } from 'react';
import { addContainer } from '../api/containersApi'; // Zaimportuj funkcję do wysyłania danych

const AddWeightForm = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const containerData = { weight: parseFloat(weight) }; // Przygotuj dane
      await addContainer(containerData); // Wyślij dane do backendu
      onSubmit(weight); // Jeśli chcesz wykonać jakieś akcje po wysłaniu
      setWeight('');
    } catch (err) {
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
      {error && <p>{error}</p>}
    </form>
  );
};

export default AddWeightForm;
