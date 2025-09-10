// API utility for Product Management
import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update if FastAPI runs elsewhere

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_BASE_URL}/products/`, product);
  return response.data;
};

export const updateProduct = async (productId, product) => {
  const response = await axios.put(
    `${API_BASE_URL}/products/${productId}`,
    product
  );
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
  return response.data;
};
