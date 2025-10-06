// src/pages/HomePage.jsx
import HeroSection from "../components/home/HeroSection";

// Hapus semua import resep dan section lain

export default function HomePage() {
  // Props tidak lagi diperlukan di sini
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <HeroSection />

      {/* Main content dikosongkan agar fokus pada Hero Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        {/* Anda bisa menambahkan konten lain di sini jika perlu,
            misalnya pengenalan singkat atau kategori populer.
            Untuk saat ini, kita kosongkan. */}
      </main>
    </div>
  );
}
