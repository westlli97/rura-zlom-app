export const fetchMaterials = async () => {
  const response = await fetch('http://localhost:8000/api/materials/');
  const data = await response.json();
  return data;
};
