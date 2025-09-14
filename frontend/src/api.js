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

// Cart API functions
export const getCartItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart/`);
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(`${API_BASE_URL}/cart/`, {
    product_id: productId,
    quantity: quantity,
  });
  return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await axios.put(`${API_BASE_URL}/cart/${cartItemId}`, {
    quantity: quantity,
  });
  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/${cartItemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.delete(`${API_BASE_URL}/cart/`);
  return response.data;
};

export const checkout = async () => {
  const response = await axios.post(`${API_BASE_URL}/cart/checkout`);
  return response.data;
};
