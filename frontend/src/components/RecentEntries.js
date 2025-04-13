import React from 'react';

const RecentEntries = ({ entries }) => (
  <div>
    <h3>Ostatnie wpisy</h3>
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>{entry.material} – {entry.shape} – {entry.weight} kg</li>
      ))}
    </ul>
  </div>
);

export default RecentEntries;