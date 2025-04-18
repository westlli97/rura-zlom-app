// src/api/containersApi.js
import axiosInstance from './axiosInstance'; // Importujemy instancję Axios

// Pobieranie wszystkich pojemników
export const getContainers = async () => {
  try {
    const response = await axiosInstance.get('containers/');
    return response.data; // Zwracamy dane po pobraniu
  } catch (error) {
    console.error('Błąd przy pobieraniu pojemników:', error);
    throw error;
  }
};

// Dodawanie nowego pojemnika
export const addContainer = async (newContainer) => {
  try {
    console.log("Wysyłane dane:", newContainer); //debug dane
    const response = await axiosInstance.post('containers/', newContainer);
    return response.data;
  } catch (error) {
    console.error('Błąd przy dodawaniu pojemnika:', error);
    throw error;
  }
};

//Dodawanie wagi

export const addWeightEntry = async (entry) => {
  const response = await axiosInstance.post('containers/', entry); //zmiana bez /add
  return response.data;
};

// Aktualizacja wagi pojemnika
export const updateContainerWeight = async (id, weight) => {
  try {
    const response = await axiosInstance.put(`containers/${id}/`, { weight });
    return response.data;
  } catch (error) {
    console.error('Błąd przy aktualizacji wagi pojemnika:', error);
    throw error;
  }
};
