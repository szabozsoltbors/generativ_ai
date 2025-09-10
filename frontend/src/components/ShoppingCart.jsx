import React, { useState, useEffect } from 'react';
import { getCartItems, updateCartItem, removeFromCart, clearCart, checkout } from '../api';

export default function ShoppingCart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const data = await getCartItems();
      setCartItems(data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      alert('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      await updateCartItem(cartItemId, newQuantity);
      setCartItems(cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Failed to update cart item:', error);
      alert('Failed to update cart item: ' + (error.response?.data?.detail || error.message));
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    setUpdating(true);
    try {
      await removeFromCart(cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Failed to remove cart item:', error);
      alert('Failed to remove cart item');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear the cart?')) return;
    
    setUpdating(true);
    try {
      await clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      alert('Failed to clear cart');
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    if (!window.confirm('Proceed with checkout?')) return;

    setCheckingOut(true);
    try {
      const result = await checkout();
      alert(`Checkout successful! Total: $${result.total_amount.toFixed(2)}`);
      setCartItems([]);
      onClose();
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setCheckingOut(false);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">${item.product.price.toFixed(2)} each</p>
                    <p className="text-sm text-gray-500">{item.product.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={updating || item.quantity <= 1}
                      className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={updating}
                      className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={updating}
                      className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total: ${getTotalAmount().toFixed(2)}</span>
                <button
                  onClick={handleClearCart}
                  disabled={updating}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  Clear Cart
                </button>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={checkingOut || updating}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {checkingOut ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
