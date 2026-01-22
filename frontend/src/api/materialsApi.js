export const fetchMaterials = async () => {
  const response = await fetch('/api/materials/');
  const data = await response.json();
  return data;
};

export const fetchShapes = async () => {
  const response = await fetch('/api/shapes/');
  const data = await response.json();
  return data;
};

export const fetchSizes = async (shapeId) => {
  const response = await fetch(`/api/get-sizes/?shape_id=${shapeId}`);
  const data = await response.json();
  return data;
};
