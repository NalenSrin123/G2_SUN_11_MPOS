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
| - Allow extension (interceptors, headers, auth tokens)
|
| Notes:
| - baseURL is set to "https://g2-sun-11-mpos-back.onrender.com/api/v1"
| - Add interceptors here for auth, error handling, logging
|
*/

import axios from 'axios'

/**
 * Axios instance
 * Used for all API requests in the application
 */
const api = axios.create({
  baseURL: 'https://g2-sun-11-mpos-back.onrender.com/api/v1',
})

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Fail:", error);
    throw error; 
  }
};


//update table data
export const updateTable = async (id, tableData) => {
  try {
    // Make a PUT request to update the table data
    const response = await api.put(`/tables/${id}`, tableData);
    return response.data;
  } catch (error) {
    console.error(`Error updating table ${id}:`, error);
    throw error;
  }
};
export default api;