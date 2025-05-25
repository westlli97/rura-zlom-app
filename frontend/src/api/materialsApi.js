export const fetchMaterials = async () => {
  const response = await fetch('https://zlom-app.onrender.com/api/materials/');
  const data = await response.json();
  return data;
};
