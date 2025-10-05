// src/pages/MinumanPage.jsx
import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { ResepMinuman } from "../data/minuman";
import RecipeGrid from "../components/minuman/RecipeGrid";
import Pagination from "../components/common/Pagination";

export default function MinumanPage({ onSelectRecipe }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allMinuman = useMemo(() => Object.values(ResepMinuman.resep), []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered =
      searchQuery.trim() === ""
        ? allMinuman
        : allMinuman.filter((recipe) =>
            recipe.name.toLowerCase().includes(lowercasedQuery)
          );
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [searchQuery, allMinuman]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Search Bar */}
        <div className="mb-8 md:mb-12">
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari resep minuman..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <RecipeGrid recipes={currentItems} onSelectRecipe={onSelectRecipe} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
