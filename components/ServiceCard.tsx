
import React from 'react';
import { ServiceLink } from '../types';
import { getIcon } from '../constants';
import { ExternalLink, Lock } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceLink;
  isLocked?: boolean;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isLocked, onClick }) => {
  const CardContent = (
    <div 
      className={`group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-all duration-300 ${
        isLocked 
        ? 'opacity-60 cursor-not-allowed' 
        : 'hover:shadow-xl hover:border-red-500/30 hover:-translate-y-1 cursor-pointer'
      }`}
      onClick={isLocked ? undefined : onClick}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
        isLocked ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
      }`}>
        {getIcon(service.icon)}
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
          {service.title}
        </h3>
        {isLocked ? (
          <Lock size={16} className="text-slate-400" />
        ) : (
          <ExternalLink size={16} className="text-slate-300 group-hover:text-red-400" />
        )}
      </div>
      
      <p className="text-slate-600 text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-red-500/5 rounded-full transition-all group-hover:scale-150"></div>
    </div>
  );

  if (isLocked) {
    return CardContent;
  }

  return service.url.startsWith('http') ? (
    <a href={service.url} target="_blank" rel="noopener noreferrer" className="block">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
};

export default ServiceCard;
