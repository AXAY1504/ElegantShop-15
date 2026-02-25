import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#C8A951] to-[#6B1E3B] rounded-lg blur opacity-25"></div>
        <div className="relative bg-[#6B1E3B] p-2 rounded-lg">
          <ShoppingBag className="w-6 h-6 text-[#C8A951]" strokeWidth={2.5} />
        </div>
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#6B1E3B]">Elegant</span>
            <span className="text-[#C8A951]">Shop</span>
          </span>
          <span className="text-[10px] text-[#6B6B6B] tracking-widest -mt-1">FASHION FOR YOU</span>
        </div>
      )}
    </Link>
  );
};
