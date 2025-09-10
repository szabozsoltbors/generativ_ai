import React from 'react';

export default function DeleteProductDialog({ 
  isOpen, 
  onClose, 
  product,
  onConfirm,
  deleting 
}) {
  if (!isOpen || !product) return null;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          position: 'relative',
          width: '444px',
          height: '156px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8.75px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.1), 0px 4px 6px 0px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Title */}
        <div
          style={{
            position: 'absolute',
            left: '22px',
            top: '21px',
            width: '116px',
            height: '25px',
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '1.53125em',
            color: '#000000',
          }}
        >
          Delete Product
        </div>

        {/* Confirmation Message */}
        <div
          style={{
            position: 'absolute',
            left: '22px',
            top: '55px',
            width: '380px',
            height: '35px',
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '1.4583333333333333em',
            color: '#717182',
          }}
        >
          Are you sure you want to delete "{product.name}"? This action cannot be undone.
        </div>

        {/* Cancel Button */}
        <div
          style={{
            position: 'absolute',
            left: '238px',
            top: '103px',
            width: '68px',
            height: '32px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '68px',
              height: '32px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '6.75px',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '1.4583333333333333em',
              color: '#000000',
              textAlign: 'center',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '14px',
                top: '7px',
                width: '40px',
                height: '18px',
              }}
            >
              Cancel
            </span>
          </button>
        </div>

        {/* Delete Product Button */}
        <div
          style={{
            position: 'absolute',
            left: '314px',
            top: '103px',
            width: '109px',
            height: '32px',
          }}
        >
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '109px',
              height: '32px',
              backgroundColor: '#D4183D',
              border: 'none',
              borderRadius: '6.75px',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '1.4583333333333333em',
              color: '#FFFFFF',
              textAlign: 'center',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '7px',
                width: '86px',
                height: '18px',
              }}
            >
              {deleting ? "Deleting..." : "Delete Product"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
