/*
|--------------------------------------------------------------------------
| File: services/api.js
|--------------------------------------------------------------------------
|
| Description:
| Creates a centralized Axios instance for making HTTP requests.
|
| Responsibilities:
| - Define base configuration for API calls
| - Provide a reusable HTTP client across the application
| - Attach the Bearer auth token to every request automatically
|
| Notes:
| - baseURL is set to "https://g2-sun-11-mpos-back.onrender.com/api/v1"
| - This backend uses Bearer token auth, so the interceptor below attaches
|   Authorization: Bearer <token> to every request automatically.
| - The token is expected to be stored in localStorage under "authToken"
|   after login. Adjust TOKEN_STORAGE_KEY below if your login flow
|   stores it under a different key.
|
*/

import axios from 'axios'

const TOKEN_STORAGE_KEY = 'authToken' // <-- adjust to match your login code

/**
 * Axios instance
 * Used for all API requests in the application
 */
const api = axios.create({
  baseURL: 'https://g2-sun-11-mpos-back.onrender.com/api/v1',
})

// Attach the Bearer token to every outgoing request, if one is present.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Optional: if the token is invalid/expired, the API will return 401.
// Surface that clearly instead of letting it look like any other error.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Auth token missing or expired. User needs to log in again.')
      // e.g. localStorage.removeItem(TOKEN_STORAGE_KEY); router.push('/login');
    }
    return Promise.reject(error)
  }
)

const LOCAL_ORDERS_KEY = "mpos_local_orders";

export const getLocalOrders = () => {
  try {
    const savedOrders = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]");
    return Array.isArray(savedOrders) ? savedOrders : [];
  } catch (error) {
    console.error("Unable to read locally saved orders:", error);
    return [];
  }
};

export const saveLocalOrder = (order) => {
  const orders = getLocalOrders();
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([order, ...orders]));
};

// delete category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fail:", error);
    throw error;
  }
};

// get order
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.error("Get Orders Fail:", error);
    throw error;
  }
}

// Customer checkout uses this endpoint to create an order that the dashboard
// receives through getOrders().
export const createOrder = async (payload) => {
  try {
    const response = await api.post('/orders', payload);
    return response.data;
  } catch (error) {
    console.error("Create Order Fail:", error);
    throw error;
  }
};

export const updateCategory = async (id, payload) => {
  try {
    const response = await api.put(`/categories/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Update category failed:", error);
    throw error;
  }
};

export default api