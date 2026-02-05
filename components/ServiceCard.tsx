
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
      className={`service-card-hover group relative h-[450px] flex flex-col p-12 bg-white border-r border-b border-black/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isLocked 
        ? 'opacity-30 grayscale cursor-not-allowed' 
        : 'hover:bg-black cursor-pointer'
      }`}
      onClick={isLocked ? undefined : onClick}
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-full h-0 bg-[#8fcc25]/10 group-hover:h-2 transition-all duration-500"></div>
      
      {/* Icon Area */}
      <div className={`icon-move w-16 h-16 mb-12 flex items-center justify-center transition-all duration-700 ${
        isLocked ? 'text-slate-300' : 'text-black group-hover:text-white'
      }`}>
        {getIcon(service.icon)}
      </div>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className={`text-3xl font-black uppercase tracking-tighter leading-none transition-colors duration-500 ${
          isLocked ? 'text-slate-200' : 'text-black group-hover:text-white'
        }`}>
          {service.title}
        </h3>
        {!isLocked && (
          <ArrowUpRight size={24} className="text-slate-200 group-hover:text-[#8fcc25] transition-colors duration-500" />
        )}
      </div>
      
      {/* Description */}
      <p className={`text-sm font-medium leading-relaxed transition-colors duration-500 ${
        isLocked ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-400'
      }`}>
        {service.description}
      </p>

      {/* Decorative vertical line */}
      <div className="mt-auto pt-8 flex items-center gap-4">
        <div className="h-[1px] w-8 bg-black/10 group-hover:bg-[#8fcc25] group-hover:w-16 transition-all duration-700"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-white/20 transition-colors">Wikęd0{Math.floor(Math.random()*9+1)}</span>
      </div>
      
      {isLocked && (
        <div className="absolute top-12 right-12">
          <Lock size={16} className="text-slate-200" />
        </div>
      )}
    </div>
  );

  if (isLocked) return CardContent;

  return service.url && service.url !== '#' ? (
    <a href={service.url} target="_blank" rel="noopener noreferrer" className="block w-full">
      {CardContent}
    </a>
  ) : (
    <div className="w-full">{CardContent}</div>
  );
};

export default ServiceCard;
