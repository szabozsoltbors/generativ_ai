import React from 'react';

export default function ProductDetailsDialog({ 
  isOpen, 
  onClose, 
  product 
}) {
  if (!isOpen || !product) return null;

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
          width: '444px', 
          height: '286px',
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
            width: '119px',
            height: '16px'
          }}
        >
          Product Details
        </div>

        {/* Product Name */}
        <div 
          className="font-inter font-medium text-black"
          style={{ 
            fontSize: '16px', 
            lineHeight: '1.4765625em',
            position: 'absolute',
            left: '22px',
            top: '52px',
            width: '167px',
            height: '24px'
          }}
        >
          {product.name}
        </div>

        {/* Description */}
        <div 
          className="font-inter font-normal text-[#717182]"
          style={{ 
            fontSize: '16px', 
            lineHeight: '1.5em',
            position: 'absolute',
            left: '22px',
            top: '85px',
            width: '382px',
            height: '72px'
          }}
        >
          {product.description}
        </div>

        {/* Separator */}
        <div 
          className="bg-[rgba(0,0,0,0.1)]"
          style={{ 
            position: 'absolute',
            left: '22px',
            top: '168px',
            width: '400px',
            height: '1px'
          }}
        />

        {/* Price */}
        <div style={{ position: 'absolute', left: '22px', top: '183px', width: '51px', height: '35px' }}>
          <div 
            className="font-inter font-normal text-[#717182]"
            style={{ 
              fontSize: '12px', 
              lineHeight: '1.4583333333333333em',
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '32px',
              height: '18px'
            }}
          >
            Price:
          </div>
          <div 
            className="font-inter font-medium text-[#030213]"
            style={{ 
              fontSize: '12px', 
              lineHeight: '1.4583333333333333em',
              position: 'absolute',
              left: '0px',
              top: '17px',
              width: '51px',
              height: '18px'
            }}
          >
            $ {parseFloat(product.price).toFixed(2)}
          </div>
        </div>

        {/* Stock */}
        <div style={{ position: 'absolute', left: '229px', top: '183px', width: '46px', height: '35px' }}>
          <div 
            className="font-inter font-normal text-[#717182]"
            style={{ 
              fontSize: '12px', 
              lineHeight: '1.4583333333333333em',
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '36px',
              height: '18px'
            }}
          >
            Stock:
          </div>
          <div 
            className="font-inter font-normal text-black"
            style={{ 
              fontSize: '12px', 
              lineHeight: '1.4583333333333333em',
              position: 'absolute',
              left: '0px',
              top: '17px',
              width: '46px',
              height: '18px'
            }}
          >
            {product.stock} units
          </div>
        </div>

        {/* Product ID */}
        <div style={{ position: 'absolute', left: '22px', top: '232px', width: '64px', height: '32px' }}>
          <div 
            className="font-inter font-normal text-[#717182]"
            style={{ 
              fontSize: '12px', 
              lineHeight: '1.4583333333333333em',
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '64px',
              height: '18px'
            }}
          >
            Product ID:
          </div>
          <div 
            className="font-inter font-normal text-black"
            style={{ 
              fontSize: '11px', 
              lineHeight: '1.2727272727272727em',
              position: 'absolute',
              left: '0px',
              top: '18px',
              width: '6px',
              height: '14px'
            }}
          >
            {product.id}
          </div>
        </div>
      </div>
    </div>
  );
}
