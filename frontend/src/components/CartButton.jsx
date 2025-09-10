import React from 'react';

export default function CartButton({ itemCount, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center gap-[4px] bg-[#030213] px-[24px] py-[8px] h-[31.5px] rounded-[6.75px] font-inter font-medium text-[12px] hover:bg-[#23234a] transition shadow min-w-[116px]"
      style={{ lineHeight: '1.46', letterSpacing: '0.01em', color: '#fff' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2h2l.9 6h7.1l1-6H4" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5" cy="11" r="1" stroke="white" strokeWidth="1.17"/>
        <circle cx="11" cy="11" r="1" stroke="white" strokeWidth="1.17"/>
      </svg>
      <span className="text-white">Cart</span>
    </button>
  );
}
