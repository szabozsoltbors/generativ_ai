import React from 'react';

export default function EditProductDialog({ 
  isOpen, 
  onClose, 
  product, 
  setProduct, 
  onSubmit, 
  updating 
}) {
  if (!isOpen) return null;

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
        <h3 className="font-inter font-semibold text-[16px] leading-[0.98] text-[#000000] mb-[21px]">Edit Product</h3>
        <form onSubmit={onSubmit} className="space-y-[16px]">
          <div>
            <label className="block font-inter font-medium text-[12px] leading-[1.02] text-[#000000] mb-[8px]">Product Name</label>
            <input 
              type="text" 
              className="w-[344px] h-[28px] border border-[rgba(0,0,0,0)] bg-[#F3F3F5] rounded-[6.75px] px-[11px] py-[6px] font-inter text-[12px] placeholder:text-[#999999]" 
              placeholder="Enter product name"
              required 
              value={product.name} 
              onChange={e => setProduct({ ...product, name: e.target.value })} 
            />
          </div>
          <div>
            <label className="block font-inter font-medium text-[12px] leading-[1.02] text-[#000000] mb-[8px]">Description</label>
            <textarea 
              className="w-[344px] h-[60px] border border-[rgba(0,0,0,0)] bg-[#F3F3F5] rounded-[6.75px] px-[13px] py-[8px] font-inter text-[12px] placeholder:text-[#999999] resize-none" 
              placeholder="Enter product description"
              required 
              value={product.description} 
              onChange={e => setProduct({ ...product, description: e.target.value })} 
            />
          </div>
          <div className="flex gap-[14px]">
            <div className="flex-1">
              <label className="block font-inter font-medium text-[12px] leading-[1.02] text-[#000000] mb-[8px]">Price ($)</label>
              <input 
                type="number" 
                step="0.01" 
                className="w-[165px] h-[28px] border border-[rgba(0,0,0,0)] bg-[#F3F3F5] rounded-[6.75px] px-[11px] py-[6px] font-inter text-[12px] placeholder:text-[#999999]" 
                placeholder="0.00"
                required 
                value={product.price} 
                onChange={e => setProduct({ ...product, price: e.target.value })} 
              />
            </div>
            <div className="flex-1">
              <label className="block font-inter font-medium text-[12px] leading-[1.02] text-[#000000] mb-[8px]">Stock</label>
              <input 
                type="number" 
                className="w-[165px] h-[28px] border border-[rgba(0,0,0,0)] bg-[#F3F3F5] rounded-[6.75px] px-[11px] py-[6px] font-inter text-[12px] placeholder:text-[#999999]" 
                placeholder="0"
                required 
                value={product.stock} 
                onChange={e => setProduct({ ...product, stock: e.target.value })} 
              />
            </div>
          </div>
          <div className="flex gap-[14px] mt-[16px]">
            <button 
              type="button" 
              className="flex-1 h-[31.5px] border border-[#E5E5E5] bg-white rounded-[6.75px] font-inter font-medium text-[12px] text-[#666666] hover:bg-[#F9F9F9]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 h-[31.5px] bg-[#030213] rounded-[6.75px] font-inter font-medium text-[12px] hover:bg-[#23234a] transition shadow text-white"
              style={{ lineHeight: '1.46', letterSpacing: '0.01em', color: '#fff' }}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
