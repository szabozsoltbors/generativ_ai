import React from 'react';

export default function PersistentCartWidget({ itemCount, totalPrice, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: '#030213',
        color: 'white',
        borderRadius: '12px',
        padding: '16px 20px',
        cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        minWidth: '180px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2h2l.9 6h7.1l1-6H4" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="5" cy="11" r="1" stroke="white" strokeWidth="1.17"/>
            <circle cx="11" cy="11" r="1" stroke="white" strokeWidth="1.17"/>
          </svg>
        </div>
        <div>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            marginBottom: '2px'
          }}>
            {itemCount === 0 ? 'Empty cart' : `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          </div>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: 'bold',
            color: '#fff'
          }}>
            ${totalPrice.toFixed(2)}
          </div>
        </div>
        <div style={{ 
          marginLeft: 'auto',
          opacity: 0.7,
          fontSize: '12px'
        }}>
          →
        </div>
      </div>
    </div>
  );
}
