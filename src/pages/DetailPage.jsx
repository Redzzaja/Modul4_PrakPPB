// src/pages/DetailPage.jsx
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, ChefHat } from "lucide-react";

export default function DetailPage({ recipe, onBack }) {
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimatingIn(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    setIsAnimatingOut(true);
    setTimeout(onBack, 300); // Durasi animasi
  };

  if (!recipe) {
    return null;
  }

  const animationClasses = isAnimatingOut
    ? "animate-slide-out-bottom"
    : isAnimatingIn
    ? "animate-slide-in-bottom"
    : "opacity-0";

  return (
    <div className={`min-h-screen bg-gray-50 pb-8 ${animationClasses}`}>
      <main className="max-w-4xl mx-auto">
        <div className="sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 p-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-slate-500 hover:text-slate-700 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Kembali
          </button>
        </div>

        <div className="h-64 md:h-96 overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            {recipe.name}
          </h1>
          <div className="flex items-center space-x-6 text-slate-600 mb-8">
            <div className="flex items-center space-x-2">
              <Clock size={20} />
              <span className="font-medium">
                {recipe.ingredients.length} bahan
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat size={20} />
              <span className="font-medium">{recipe.steps.length} langkah</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">
              Bahan-bahan
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 border-indigo-500 pb-2">
              Langkah-langkah
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-slate-700">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
