import React, { useState, useEffect } from 'react';
import { getCartItems, removeFromCart, updateCartItem } from '../api';
import Toast from './Toast';

export default function ShoppingCart({ isOpen, onClose, onItemRemoved }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState({});
  const [updating, setUpdating] = useState({});
  
  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

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
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    setRemoving(prev => ({ ...prev, [cartItemId]: true }));
    try {
      await removeFromCart(cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
      // Notify parent component to refresh products
      if (onItemRemoved) {
        onItemRemoved();
      }
    } catch (error) {
      console.error('Failed to remove cart item:', error);
      setToast({
        isVisible: true,
        message: 'Failed to remove item from cart',
        type: 'error'
      });
    } finally {
      setRemoving(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleIncreaseQuantity = async (cartItemId, currentQuantity) => {
    setUpdating(prev => ({ ...prev, [cartItemId]: true }));
    try {
      const updatedItem = await updateCartItem(cartItemId, currentQuantity + 1);
      setCartItems(cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: updatedItem.quantity } : item
      ));
      // Notify parent component to refresh products for stock update
      if (onItemRemoved) {
        onItemRemoved();
      }
    } catch (error) {
      console.error('Failed to increase quantity:', error);
      setToast({
        isVisible: true,
        message: error.response?.data?.detail || 'Failed to increase quantity',
        type: 'error'
      });
    } finally {
      setUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleDecreaseQuantity = async (cartItemId, currentQuantity) => {
    if (currentQuantity <= 1) {
      // If quantity is 1, remove the item instead of decreasing to 0
      handleRemoveItem(cartItemId);
      return;
    }
    
    setUpdating(prev => ({ ...prev, [cartItemId]: true }));
    try {
      const updatedItem = await updateCartItem(cartItemId, currentQuantity - 1);
      setCartItems(cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: updatedItem.quantity } : item
      ));
      // Notify parent component to refresh products for stock update
      if (onItemRemoved) {
        onItemRemoved();
      }
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
      setToast({
        isVisible: true,
        message: error.response?.data?.detail || 'Failed to decrease quantity',
        type: 'error'
      });
    } finally {
      setUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflow: 'auto',
          border: '1px solid #e5e7eb',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px',
          borderBottom: '2px solid #eee',
          paddingBottom: '16px'
        }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            margin: 0,
            color: '#030213'
          }}>
            🛒 Shopping Cart
          </h2>
          <button
            onClick={onClose}
            style={{
              background: '#6b7280',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            fontSize: '18px',
            color: '#666'
          }}>
            Loading cart items...
          </div>
        ) : cartItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px',
            fontSize: '18px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
            Your cart is empty
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              {/* Table Header */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                gap: '16px',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                color: '#374151',
                marginBottom: '16px'
              }}>
                <div>Product</div>
                <div style={{ textAlign: 'center' }}>Quantity</div>
                <div style={{ textAlign: 'center' }}>Unit Price</div>
                <div style={{ textAlign: 'center' }}>Total</div>
                <div style={{ width: '80px' }}></div>
              </div>

              {/* Table Rows */}
              {cartItems.map(item => (
                <div key={item.id} style={{ 
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: '1px solid #eee',
                  fontSize: '14px'
                }}>
                  <div>
                    <h4 style={{ 
                      margin: 0, 
                      marginBottom: '4px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#030213'
                    }}>
                      {item.product?.name || 'Unknown Product'}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      color: '#666', 
                      fontSize: '12px'
                    }}>
                      {item.product?.description || ''}
                    </p>
                  </div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                      disabled={updating[item.id]}
                      style={{
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#374151',
                        opacity: updating[item.id] ? 0.5 : 1
                      }}
                    >
                      −
                    </button>
                    <span style={{ 
                      fontSize: '16px',
                      fontWeight: '500',
                      minWidth: '24px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                      disabled={updating[item.id]}
                      style={{
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#374151',
                        opacity: updating[item.id] ? 0.5 : 1
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ 
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    ${(item.product?.price || 0).toFixed(2)}
                  </div>
                  <div style={{ 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#030213'
                  }}>
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={removing[item.id]}
                      style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        opacity: removing[item.id] ? 0.5 : 1,
                        fontWeight: '500',
                        width: '70px'
                      }}
                    >
                      {removing[item.id] ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ 
              marginTop: '24px', 
              paddingTop: '24px', 
              borderTop: '3px solid #030213',
              textAlign: 'right'
            }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: '#030213'
              }}>
                Total: ${cartItems.reduce((total, item) => total + ((item.product?.price || 0) * item.quantity), 0).toFixed(2)}
              </div>
            </div>
          </div>
        )}
        
        <div style={{ 
          marginTop: '32px', 
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '12px 32px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Continue Shopping
          </button>
          {cartItems.length > 0 && (
            <button
              style={{
                backgroundColor: '#030213',
                color: 'white',
                padding: '12px 32px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Checkout
            </button>
          )}
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
