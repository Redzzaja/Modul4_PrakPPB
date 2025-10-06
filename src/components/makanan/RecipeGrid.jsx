// src/components/makanan/RecipeGrid.jsx
import { Clock, Star, ChefHat, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Menambahkan props onToggleFavorite dan favoriteRecipes
export default function RecipeGrid({
  recipes,
  onSelectRecipe,
  onToggleFavorite,
  favoriteRecipes,
  isFavoritePage,
}) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    // ... (useEffect hook remains the same)
    cardRefs.current = cardRefs.current.slice(0, recipes.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(index));
            }, (index % 3) * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [recipes]);

  // Fungsi untuk mengecek apakah resep sudah difavoritkan
  const isFavorited = (recipe) => {
    if (!favoriteRecipes) return false;
    return favoriteRecipes.some(
      (fav) => fav.id === recipe.id && fav.type === recipe.type
    );
  };

  return (
    <section>
      {!isFavoritePage && (
        <>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
            Jelajahi Semua Resep
          </h1>
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
            Temukan inspirasi masakan dan minuman Nusantara favoritmu.
          </p>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {recipes.map((recipe, index) => (
          <div
            key={`${recipe.type}-${recipe.id}`} // Kunci unik untuk makanan & minuman
            ref={(el) => (cardRefs.current[index] = el)}
            className={`group transform transition-all duration-700 ${
              visibleCards.has(index)
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 group-hover:bg-white/20">
              {/* Bagian ini dibuat clickable untuk ke detail */}
              <div
                onClick={() => onSelectRecipe(recipe)}
                className="cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-32 md:h-56 overflow-hidden">
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 p-4 md:p-8">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span
                      className={`text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full ${
                        recipe.type === "Makanan"
                          ? "text-blue-700 bg-blue-100/90"
                          : "text-green-700 bg-green-100/90"
                      }`}
                    >
                      {recipe.type}
                    </span>
                    <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                      <span className="text-xs md:text-sm font-semibold text-slate-700">
                        {recipe.type === "Makanan" ? "4.8" : "4.7"}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                    <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-medium">
                        {recipe.ingredients.length} bahan
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                      <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-medium">
                        {recipe.steps.length} langkah
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* --- TOMBOL FAVORIT DITAMBAHKAN DI SINI --- */}
              <button
                onClick={() => onToggleFavorite(recipe)}
                className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-white/75 transition-colors z-20"
                aria-label="Toggle Favorite"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isFavorited(recipe) ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      {recipes.length === 0 && !isFavoritePage && (
        <div className="text-center py-16">
          <p className="text-slate-500">
            Resep tidak ditemukan. Coba kata kunci lain.
          </p>
        </div>
      )}
    </section>
  );
}
