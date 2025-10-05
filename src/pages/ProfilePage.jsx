// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
// Tambahkan 'ChefHat' pada baris import di bawah ini
import {
  User,
  Mail,
  MapPin,
  Award,
  Heart,
  Settings,
  LogOut,
  ChefHat,
} from "lucide-react";

// Data Pengguna Mockup
const user = {
  name: "Chef Jawa Asli",
  username: "@JawaMemasakRIll",
  email: "JawaBukanHama@example.com",
  location: "Pati, Indonesia",
  avatarUrl: "https://i.pravatar.cc/150?u=chefnusantara",
  stats: {
    recipes: 28,
    favorites: 74,
    awards: 5,
  },
};

export default function ProfilePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Memicu animasi setelah komponen dimuat
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 pb-20 md:pb-8 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div
          className={`bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6 transform transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-200 shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800">
              {user.name}
            </h1>
            <p className="text-md text-slate-500">{user.username}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <Mail size={16} /> {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={16} /> {user.location}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Award,
              label: "Penghargaan",
              value: user.stats.awards,
              color: "text-yellow-500",
            },
            {
              icon: Heart,
              label: "Favorit",
              value: user.stats.favorites,
              color: "text-red-500",
            },
            {
              icon: ChefHat,
              label: "Total Resep",
              value: user.stats.recipes,
              color: "text-blue-500",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
              className={`bg-white rounded-2xl shadow-md p-6 flex items-center gap-5 transform transition-all duration-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <stat.icon size={36} className={stat.color} />
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Section */}
        <div
          style={{ transitionDelay: "450ms" }}
          className={`bg-white rounded-2xl shadow-md p-6 transform transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <h2 className="text-xl font-bold text-slate-700 mb-4">Pengaturan</h2>
          <div className="space-y-2">
            <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-slate-600">
              <Settings size={20} />
              <span>Pengaturan Akun</span>
            </button>
            <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-slate-600">
              <LogOut size={20} className="text-red-500" />
              <span className="text-red-500">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
