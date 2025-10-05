// src/main.jsx
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import MakananPage from "./pages/MakananPage";
import MinumanPage from "./pages/MinumanPage";
import ProfilePage from "./pages/ProfilePage";
import DetailPage from "./pages/DetailPage"; // Import DetailPage
import DesktopNavbar from "./components/navbar/DesktopNavbar";
import MobileNavbar from "./components/navbar/MobileNavbar";
import "./index.css";
import PWABadge from "./PWABadge";

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedRecipe(null); // Kembali ke list saat ganti halaman
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null); // Kembali dari halaman detail
  };

  const renderCurrentPage = () => {
    // Jika ada resep yang dipilih, tampilkan halaman detail
    if (selectedRecipe) {
      return <DetailPage recipe={selectedRecipe} onBack={handleBack} />;
    }

    // Jika tidak, tampilkan halaman sesuai navigasi
    switch (currentPage) {
      case "home":
        // Kirim fungsi handleSelectRecipe sebagai prop
        return <HomePage onSelectRecipe={handleSelectRecipe} />;
      case "makanan":
        // Kirim fungsi handleSelectRecipe sebagai prop
        return <MakananPage onSelectRecipe={handleSelectRecipe} />;
      case "minuman":
        // Untuk minuman, kita belum pasang (fokus ke makanan dulu)
        return <MinumanPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage onSelectRecipe={handleSelectRecipe} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Jangan tampilkan navbar jika sedang di halaman detail */}
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
