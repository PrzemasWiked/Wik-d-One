
import React from 'react';
import { ServiceLink } from '../types';
import { getIcon } from '../constants';
import { ArrowUpRight, Lock } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceLink;
  isLocked?: boolean;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isLocked, onClick }) => {
  const CardContent = (
    <div 
      className={`group relative flex flex-col h-full bg-[#fcfcfc] border border-black/[0.03] p-10 transition-all duration-500 ease-out ${
        isLocked 
        ? 'opacity-40 cursor-not-allowed grayscale' 
        : 'hover:bg-white hover:border-black/10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] cursor-pointer'
      }`}
      onClick={isLocked ? undefined : onClick}
    >
      <div className={`w-14 h-14 flex items-center justify-center mb-10 transition-all duration-500 ${
        isLocked ? 'text-slate-300' : 'text-black group-hover:text-red-600 group-hover:scale-110'
      }`}>
        {getIcon(service.icon)}
      </div>
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-black text-black tracking-tight leading-none uppercase">
          {service.title}
        </h3>
        {!isLocked && (
          <div className="text-slate-200 group-hover:text-red-600 transition-colors">
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </div>
        )}
      </div>
      
      <p className="text-slate-500 font-medium leading-relaxed flex-grow text-sm">
        {service.description}
      </p>

      {/* Hover decoration */}
      <div className="mt-8 h-[2px] w-0 bg-red-600 transition-all duration-500 group-hover:w-12"></div>
      
      {isLocked && (
        <div className="absolute top-6 right-6">
          <Lock size={16} className="text-slate-300" />
        </div>
      )}
    </div>
  );

  if (isLocked) {
    return CardContent;
  }

  return service.url && service.url !== '#' ? (
    <a href={service.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {CardContent}
    </a>
  ) : (
    <div className="h-full">{CardContent}</div>
  );
};

export default ServiceCard;
