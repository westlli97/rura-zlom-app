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

function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'csrftoken') return value;
  }
  return null;
}

axiosInstance.interceptors.request.use(config => {
  const token = getCSRFToken();
  if (token) {
    config.headers['X-CSRFToken'] = token;
  }
  return config;
});

export default axiosInstance;
