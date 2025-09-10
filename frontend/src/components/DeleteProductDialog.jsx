import React from 'react';

export default function DeleteProductDialog({ 
  isOpen, 
  onClose, 
  product,
  onConfirm,
  deleting 
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="bg-white rounded-[8.75px] shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)] px-[22px] py-[22px] pb-[56px] w-[388px] h-[280px] relative border border-[rgba(0,0,0,0.1)]" style={{ backgroundColor: '#ffffff' }}>
        <button 
          className="absolute top-[15px] right-[15px] w-[24px] h-[24px] flex items-center justify-center text-[#666666] hover:text-[#333333]" 
          onClick={onClose}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="font-inter font-semibold text-[16px] leading-[0.98] text-[#000000] mb-[21px]">Delete Product</h3>
        
        <div className="mb-[32px]">
          <div className="flex items-center justify-center mb-[20px]">
            <div className="w-[48px] h-[48px] bg-[#FEF2F2] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334z" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.667 7.333v4M9.333 7.333v4" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          <div className="text-center mb-[24px]">
            <p className="font-inter font-medium text-[14px] leading-[1.4] text-[#000000] mb-[8px]">
              Are you sure you want to delete this product?
            </p>
            <p className="font-inter font-normal text-[12px] leading-[1.4] text-[#717182]">
              "<span className="font-medium text-[#000000]">{product.name}</span>" will be permanently removed from your inventory.
            </p>
          </div>
        </div>

        <div className="flex gap-[14px]">
          <button 
            type="button" 
            className="flex-1 h-[31.5px] border border-[#E5E5E5] bg-white rounded-[6.75px] font-inter font-medium text-[12px] text-[#666666] hover:bg-[#F9F9F9] transition"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="flex-1 h-[31.5px] bg-[#DC2626] rounded-[6.75px] font-inter font-medium text-[12px] text-white hover:bg-[#B91C1C] transition"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
