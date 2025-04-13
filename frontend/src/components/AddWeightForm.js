import React, { useState } from 'react';

const AddWeightForm = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(weight);
    setWeight('');
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
      <button type="submit">Dodaj wagę</button>
    </form>
  );
};

export default AddWeightForm;