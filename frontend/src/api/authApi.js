// src/api/authApi.js
import axiosInstance from './axiosInstance'; // Importujemy instancję Axios

// Logowanie użytkownika
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('auth/login/', credentials);
    return response.data; // Zwracamy dane, np. token
  } catch (error) {
    console.error('Błąd przy logowaniu:', error);
    throw error;
  }
};

// Rejestracja nowego użytkownika
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('auth/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Błąd przy rejestracji:', error);
    throw error;
  }
};

// Wylogowanie użytkownika
export const logout = async () => {
  try {
    const response = await axiosInstance.post('auth/logout/');
    return response.data;
  } catch (error) {
    console.error('Błąd przy wylogowywaniu:', error);
    throw error;
  }
};
