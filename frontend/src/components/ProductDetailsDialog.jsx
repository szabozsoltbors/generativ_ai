import React from 'react';

export default function ProductDetailsDialog({ 
  isOpen, 
  onClose, 
  product 
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="bg-white rounded-[8.75px] shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)] px-[22px] py-[22px] pb-[56px] w-[388px] h-[338px] relative border border-[rgba(0,0,0,0.1)]" style={{ backgroundColor: '#ffffff' }}>
        <button 
          className="absolute top-[15px] right-[15px] w-[24px] h-[24px] flex items-center justify-center text-[#666666] hover:text-[#333333]" 
          onClick={onClose}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="font-inter font-semibold text-[16px] leading-[0.98] text-[#000000] mb-[21px]">Product Details</h3>
        <div className="space-y-[20px]">
          <div>
            <h4 className="font-inter font-semibold text-[14px] leading-[1.2] text-[#000000] mb-[12px]">{product.name}</h4>
            <p className="font-inter font-normal text-[12px] leading-[1.5] text-[#717182] mb-[16px]">{product.description}</p>
          </div>
          
          <div className="flex gap-[24px]">
            <div className="flex-1">
              <div className="bg-[#F8F8F8] rounded-[6.75px] p-[16px] text-center">
                <div className="font-inter font-medium text-[11px] leading-[1.2] text-[#717182] mb-[4px]">PRICE</div>
                <div className="font-inter font-semibold text-[18px] leading-[1.2] text-[#030213]">${parseFloat(product.price).toFixed(2)}</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-[#F8F8F8] rounded-[6.75px] p-[16px] text-center">
                <div className="font-inter font-medium text-[11px] leading-[1.2] text-[#717182] mb-[4px]">STOCK</div>
                <div className="font-inter font-semibold text-[18px] leading-[1.2] text-[#030213]">{product.stock}</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-[32px]">
            <button 
              type="button" 
              className="w-[120px] h-[31.5px] border border-[#E5E5E5] bg-white rounded-[6.75px] font-inter font-medium text-[12px] text-[#666666] hover:bg-[#F9F9F9] transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
