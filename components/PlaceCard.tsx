
import React from 'react';
import type { Place } from '../types';

interface PlaceCardProps {
  place: Place;
  onSelect: (name: string) => void;
  isSelected: boolean;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onSelect, isSelected }) => {
  const selectedClasses = isSelected
    ? 'ring-4 ring-cyan-400 ring-offset-4 ring-offset-slate-900'
    : 'ring-2 ring-slate-700 hover:ring-cyan-400';

  return (
    <div
      onClick={() => onSelect(place.name)}
      className={`relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 group ${selectedClasses}`}
    >
      <img src={place.imageUrl} alt={place.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white text-xl font-bold transition-colors duration-300 group-hover:text-cyan-300">{place.name}</h3>
      </div>
    </div>
  );
};

export default PlaceCard;
