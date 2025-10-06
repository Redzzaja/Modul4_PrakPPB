// src/main.jsx
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import ResepPage from "./pages/ResepPage"; // Menggantikan MakananPage dan MinumanPage
import FavoritesPage from "./pages/FavoritesPage"; // Halaman baru untuk favorit
import ProfilePage from "./pages/ProfilePage";
import DetailPage from "./pages/DetailPage";
import DesktopNavbar from "./components/navbar/DesktopNavbar";
import MobileNavbar from "./components/navbar/MobileNavbar";
import "./index.css";
import PWABadge from "./PWABadge";

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // useEffect untuk memuat resep favorit dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteRecipes");
      if (storedFavorites) {
        setFavoriteRecipes(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Gagal memuat resep favorit dari localStorage:", error);
      setFavoriteRecipes([]);
    }
  }, []);

  // Fungsi untuk menambah/menghapus resep dari daftar favorit
  const handleToggleFavorite = (recipe) => {
    const isFavorite = favoriteRecipes.some(
      (fav) => fav.id === recipe.id && fav.type === recipe.type
    );
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favoriteRecipes.filter(
        (fav) => !(fav.id === recipe.id && fav.type === recipe.type)
      );
    } else {
      updatedFavorites = [...favoriteRecipes, recipe];
    }

    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedRecipe(null); // Selalu kembali dari detail view saat navigasi
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  // Fungsi untuk merender halaman yang sedang aktif
  const renderCurrentPage = () => {
    if (selectedRecipe) {
      return <DetailPage recipe={selectedRecipe} onBack={handleBack} />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage />; // HomePage tidak lagi perlu props resep
      case "resep":
        return (
          <ResepPage
            onSelectRecipe={handleSelectRecipe}
            onToggleFavorite={handleToggleFavorite}
            favoriteRecipes={favoriteRecipes}
          />
        );
      case "favorites":
        return (
          <FavoritesPage
            favoriteRecipes={favoriteRecipes}
            onSelectRecipe={handleSelectRecipe}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedRecipe && (
        <>
          <DesktopNavbar
            currentPage={currentPage}
            onNavigate={handleNavigation}
          />
          <MobileNavbar
            currentPage={currentPage}
            onNavigate={handleNavigation}
          />
        </>
      )}
      <main className="min-h-screen">{renderCurrentPage()}</main>
      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>
);
