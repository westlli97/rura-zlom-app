import React from 'react';

const RecentEntries = ({ entries }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Ostatnie wpisy</h3>
    <ul className="space-y-1">
      {entries.map((entry, index) => (
        <li key={index} className="text-gray-700">
          {entry.material} – {entry.shape} {entry.size} – {entry.weight_kg} kg
        </li>
      ))}
    </ul>
  </div>
);

export default RecentEntries;
