// src/main.jsx
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import MakananPage from "./pages/MakananPage";
import MinumanPage from "./pages/MinumanPage";
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

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedRecipe(null);
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const renderCurrentPage = () => {
    if (selectedRecipe) {
      return <DetailPage recipe={selectedRecipe} onBack={handleBack} />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage onSelectRecipe={handleSelectRecipe} />;
      case "makanan":
        return <MakananPage onSelectRecipe={handleSelectRecipe} />;
      case "minuman":
        // Pastikan prop ini ditambahkan
        return <MinumanPage onSelectRecipe={handleSelectRecipe} />;
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
