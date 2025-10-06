// src/pages/FavoritesPage.jsx
import RecipeGrid from "../components/makanan/RecipeGrid";

// Pastikan ada kata kunci "default" di sini
export default function FavoritesPage({
  favoriteRecipes,
  onSelectRecipe,
  onToggleFavorite,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
            Resep Favorit Anda
          </h1>
          <p className="text-slate-500 mt-2">Resep yang telah Anda simpan.</p>
        </div>
        {favoriteRecipes.length > 0 ? (
          <RecipeGrid
            recipes={favoriteRecipes}
            onSelectRecipe={onSelectRecipe}
            onToggleFavorite={onToggleFavorite}
            isFavoritePage={true}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">Anda belum memiliki resep favorit.</p>
          </div>
        )}
      </main>
    </div>
  );
}
