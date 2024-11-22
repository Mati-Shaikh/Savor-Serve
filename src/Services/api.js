// src/services/api.js
import axios from 'axios';
import { getToken } from '../utils/tokenUtils';

const BASE_URL = 'http://localhost:3005/api';

export const registerShop = async (shopData) => {
    try {
      console.log('Shop Data:', shopData); // Log the data being sent
      const response = await axios.post(`${BASE_URL}/supplier/register`, shopData, {
        headers: { 'token': getToken() }
      });
      console.log('API Response:', response.data); // Log the API response
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with an error (e.g., 400, 500)
        console.error('API Error:', error.response.data);
        throw new Error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        // No response from the server (network issue)
        console.error('Network Error:', error.request);
        throw new Error('Network error occurred during registration');
      } else {
        // Something else caused the error (e.g., client-side issue)
        console.error('Unknown Error:', error.message);
        throw new Error('Unknown error occurred');
      }
    }
  };
  

export const fetchShopDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/supplier/shop`, {
      headers: { 'token': getToken() }
    });
    return response.data.shop;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Fetch shop details failed');
  }
};


export const updateShopDetails = async (formData) => {
  try {
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
    const response = await axios.put(
      'http://localhost:3005/api/supplier/update-store',
      formData,
      {
        headers: {
          token:token, // Pass the token in the header
          
        }
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update shop details'); // Provide a meaningful error message
  }
};
