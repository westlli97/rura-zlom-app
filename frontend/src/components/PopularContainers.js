import React, { useEffect, useState } from "react";
import { fetchPopularContainers } from "../api/containersApi";

function PopularContainers({ onSelectContainer }) {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetchPopularContainers().then(setPopular);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {popular.map((container) => (
        <div
          key={container.id}
          className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelectContainer(container)}
        >
          <h3 className="text-lg font-semibold">{container.name}</h3>
          <p className="text-sm text-gray-600">{container.weight} kg</p>
        </div>
      ))}
    </div>
  );
}

export default PopularContainers;
