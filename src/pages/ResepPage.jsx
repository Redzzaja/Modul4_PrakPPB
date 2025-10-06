// src/pages/ResepPage.jsx
import { useState, useEffect, useMemo } from "react";
// --- PASTIKAN BARIS INI BENAR ---
import { Search, Utensils, GlassWater, ChefHat } from "lucide-react";
// --------------------------------
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";
import RecipeGrid from "../components/makanan/RecipeGrid";
import Pagination from "../components/common/Pagination";

export default function ResepPage({
  onSelectRecipe,
  onToggleFavorite,
  favoriteRecipes,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allRecipes = useMemo(() => {
    const makanan = Object.values(ResepMakanan.resep).map((recipe) => ({
      ...recipe,
      type: "Makanan",
    }));
    const minuman = Object.values(ResepMinuman.resep).map((recipe) => ({
      ...recipe,
      type: "Minuman",
    }));
    return [...makanan, ...minuman];
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    const recipesByFilter = allRecipes.filter((recipe) => {
      if (filter === "Semua") return true;
      return recipe.type === filter;
    });

    const finalFiltered =
      searchQuery.trim() === ""
        ? recipesByFilter
        : recipesByFilter.filter((recipe) =>
            recipe.name.toLowerCase().includes(lowercasedQuery)
          );

    setFilteredRecipes(finalFiltered);
    setCurrentPage(1);
  }, [searchQuery, filter, allRecipes]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const FilterButton = ({ label, icon: Icon, activeFilter, setFilter }) => (
    <button
      onClick={() => setFilter(label)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
        activeFilter === label
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-white text-slate-600 hover:bg-blue-50"
      }`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
            Jelajahi Resep
          </h1>
          <p className="text-slate-500 mt-2">
            Temukan inspirasi masakan dan minuman Nusantara.
          </p>
        </div>

        <div className="mb-8 md:mb-12 space-y-6">
          <div className="flex justify-center items-center gap-3">
            <FilterButton
              label="Semua"
              icon={ChefHat}
              activeFilter={filter}
              setFilter={setFilter}
            />
            <FilterButton
              label="Makanan"
              icon={Utensils}
              activeFilter={filter}
              setFilter={setFilter}
            />
            <FilterButton
              label="Minuman"
              icon={GlassWater}
              activeFilter={filter}
              setFilter={setFilter}
            />
          </div>
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Cari resep ${filter.toLowerCase()}...`}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <RecipeGrid
          recipes={currentItems}
          onSelectRecipe={onSelectRecipe}
          onToggleFavorite={onToggleFavorite}
          favoriteRecipes={favoriteRecipes}
          isFavoritePage={false}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </main>
    </div>
  );
}
