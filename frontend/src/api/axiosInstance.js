import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://zlom-app.onrender.com/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // jeśli korzystasz z sesji lub cookies
});

export default axiosInstance;
