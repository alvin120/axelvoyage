
import React from 'react';
import Spinner from './Spinner';

interface DescriptionDisplayProps {
  description: string | null;
  isLoading: boolean;
  error: string | null;
  selectedPlace: string | null;
}

const DescriptionDisplay: React.FC<DescriptionDisplayProps> = ({
  description,
  isLoading,
  error,
  selectedPlace,
}) => {
  const renderMarkdown = (text: string) => {
    const paragraphs = text.split('\n').filter(line => line.trim() !== '');
    return paragraphs.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-3xl font-bold mt-6 mb-3 text-cyan-300">{line.substring(2)}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-2xl font-semibold mt-5 mb-2 text-cyan-400">{line.substring(3)}</h3>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc mb-2">{line.substring(2)}</li>;
      }
      return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
    });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-slate-800/50 rounded-lg p-8 mt-8 flex flex-col items-center justify-center min-h-[300px] border border-slate-700">
        <Spinner />
        <p className="text-cyan-300 mt-4 text-center">Génération de la description pour <span className="font-bold">{selectedPlace}</span>...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-900/50 border border-red-700 rounded-lg p-8 mt-8 text-center min-h-[300px] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-red-300 mb-4">Une erreur est survenue</h2>
        <p className="text-red-200">{error}</p>
      </div>
    );
  }

  if (!description) {
    return (
      <div className="w-full bg-slate-800/50 rounded-lg p-8 mt-8 flex items-center justify-center text-center min-h-[300px] border border-slate-700 border-dashed">
        <p className="text-slate-400 text-lg">
          Cliquez sur un lieu pour découvrir sa description détaillée.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-800 rounded-lg p-6 sm:p-8 mt-8 animate-fade-in border border-slate-700">
      <div className="prose prose-invert max-w-none prose-p:text-slate-300">
        {renderMarkdown(description)}
      </div>
    </div>
  );
};

export default DescriptionDisplay;
