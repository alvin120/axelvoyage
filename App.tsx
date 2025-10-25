
import React, { useState, useCallback } from 'react';
import { TOURIST_SPOTS } from './constants';
import PlaceCard from './components/PlaceCard';
import DescriptionDisplay from './components/DescriptionDisplay';
import { fetchPlaceDescription } from './services/geminiService';

const App: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlace = useCallback(async (name: string) => {
    if (isLoading && name === selectedPlace) return;
    
    setSelectedPlace(name);
    setIsLoading(true);
    setDescription(null);
    setError(null);

    try {
      const result = await fetchPlaceDescription(name);
      setDescription(result);
    } catch (e: any) {
      setError(e.message || "Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, selectedPlace]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-8">
      <main className="max-w-5xl mx-auto">
        <header className="text-center my-8 md:my-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
            Guyane Française
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Votre guide touristique interactif alimenté par l'IA pour explorer les trésors cachés de la Guyane.
          </p>
        </header>

        <section id="places">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center sm:text-left">
            Explorez les lieux incontournables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOURIST_SPOTS.map((spot) => (
              <PlaceCard
                key={spot.name}
                place={spot}
                onSelect={handleSelectPlace}
                isSelected={selectedPlace === spot.name}
              />
            ))}
          </div>
        </section>

        <section id="description" className="mt-12">
           <DescriptionDisplay 
             selectedPlace={selectedPlace}
             description={description}
             isLoading={isLoading}
             error={error}
           />
        </section>
        
        <footer className="text-center mt-16 py-4 text-slate-500 text-sm border-t border-slate-800">
            <p>Généré avec l'aide de l'API Gemini de Google.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
