import React from 'react';

export default function AddProductDialog({ 
  isOpen, 
  onClose, 
  newProduct, 
  setNewProduct, 
  onSubmit, 
  adding 
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={handleBackdropClick}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }}
    >
      <div 
        className="bg-white rounded-[8.75px] shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)] relative border border-[rgba(0,0,0,0.1)]"
        style={{ 
          width: '388px', 
          height: '338px',
          backgroundColor: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="absolute flex items-center justify-center"
          style={{ 
            top: '15px', 
            right: '15px',
            width: '24px',
            height: '24px',
            backgroundColor: '#FFFFFF',
            border: 'none',
            outline: 'none'
          }}
          onClick={onClose}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L3 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 3l6 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Title */}
        <div 
          className="font-inter font-semibold text-black"
          style={{ 
            fontSize: '16px', 
            lineHeight: '0.984375em',
            position: 'absolute',
            left: '22px',
            top: '21px',
            width: '136px',
            height: '16px'
          }}
        >
          Add New Product
        </div>

        <form onSubmit={onSubmit}>
          {/* Product Name */}
          <div style={{ position: 'absolute', left: '22px', top: '58px', width: '344px', height: '50px' }}>
            <div 
              className="font-inter font-medium text-black"
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.0208333333333333em',
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '82px',
                height: '13px'
              }}
            >
              Product Name
            </div>
            <div style={{ position: 'absolute', left: '0px', top: '18px', width: '344px', height: '32px' }}>
              <input 
                type="text" 
                className="font-inter"
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  width: '344px',
                  height: '32px',
                  backgroundColor: '#F3F3F5',
                  border: '1px solid rgba(0, 0, 0, 0)',
                  borderRadius: '6.75px',
                  fontSize: '12px',
                  lineHeight: '1.2102272510528564em',
                  paddingLeft: '11px',
                  color: '#000000',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter product name"
                required 
                value={newProduct.name} 
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} 
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ position: 'absolute', left: '22px', top: '127px', width: '344px', height: '74px' }}>
            <div 
              className="font-inter font-medium text-black"
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.0208333333333333em',
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '66px',
                height: '13px'
              }}
            >
              Description
            </div>
            <div style={{ position: 'absolute', left: '0px', top: '18px', width: '344px', height: '56px' }}>
              <textarea 
                className="font-inter resize-none"
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  width: '344px',
                  height: '56px',
                  backgroundColor: '#F3F3F5',
                  border: '1px solid rgba(0, 0, 0, 0)',
                  borderRadius: '6.75px',
                  fontSize: '12px',
                  lineHeight: '1.2102272510528564em',
                  paddingLeft: '11px',
                  paddingTop: '9px',
                  color: '#000000',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter product description"
                required 
                value={newProduct.description} 
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} 
              />
            </div>
          </div>

          {/* Price */}
          <div style={{ position: 'absolute', left: '22px', top: '221px', width: '165px', height: '50px' }}>
            <div 
              className="font-inter font-medium text-black"
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.0208333333333333em',
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '50px',
                height: '13px'
              }}
            >
              Price ($)
            </div>
            <div style={{ position: 'absolute', left: '0px', top: '18px', width: '165px', height: '32px' }}>
              <input 
                type="number" 
                step="0.01" 
                className="font-inter"
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  width: '165px',
                  height: '32px',
                  backgroundColor: '#F3F3F5',
                  border: '1px solid rgba(0, 0, 0, 0)',
                  borderRadius: '6.75px',
                  fontSize: '12px',
                  lineHeight: '1.2102272510528564em',
                  paddingLeft: '11px',
                  color: '#000000',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="0.00"
                required 
                value={newProduct.price} 
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} 
              />
            </div>
          </div>

          {/* Stock */}
          <div style={{ position: 'absolute', left: '201px', top: '221px', width: '165px', height: '50px' }}>
            <div 
              className="font-inter font-medium text-black"
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.0208333333333333em',
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '33px',
                height: '13px'
              }}
            >
              Stock
            </div>
            <div style={{ position: 'absolute', left: '0px', top: '18px', width: '165px', height: '32px' }}>
              <input 
                type="number" 
                className="font-inter"
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  width: '165px',
                  height: '32px',
                  backgroundColor: '#F3F3F5',
                  border: '1px solid rgba(0, 0, 0, 0)',
                  borderRadius: '6.75px',
                  fontSize: '12px',
                  lineHeight: '1.2102272510528564em',
                  paddingLeft: '13px',
                  color: '#000000',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="0"
                required 
                value={newProduct.stock} 
                onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} 
              />
            </div>
          </div>

          {/* Cancel Button */}
          <div style={{ position: 'absolute', left: '195px', top: '285px', width: '68px', height: '32px' }}>
            <button 
              type="button" 
              className="font-inter font-medium"
              style={{
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '68px',
                height: '32px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '6.75px',
                fontSize: '12px',
                lineHeight: '1.4583333333333333em',
                color: '#000000',
                cursor: 'pointer'
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

          {/* Add Product Button */}
          <div style={{ position: 'absolute', left: '271px', top: '285px', width: '95px', height: '32px' }}>
            <button 
              type="submit" 
              className="font-inter font-medium"
              style={{
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '95px',
                height: '32px',
                backgroundColor: '#030213',
                border: 'none',
                borderRadius: '6.75px',
                fontSize: '12px',
                lineHeight: '1.4583333333333333em',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
