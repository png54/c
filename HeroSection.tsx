"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown, Shield, Star, Users, Zap } from "lucide-react";
import { WILAYAS, SERVICE_CATEGORIES, type ServiceCategory } from "@/types";

const SERVICE_LIST = Object.entries(SERVICE_CATEGORIES).map(([key, val]) => ({
  key: key as ServiceCategory,
  ...val,
}));

const STATS = [
  { value: "5,000+", label: "حرفي موثوق", icon: "👷" },
  { value: "48", label: "ولاية تغطيها", icon: "📍" },
  { value: "15,000+", label: "عميل راضٍ", icon: "😊" },
  { value: "4.8★", label: "متوسط التقييم", icon: "⭐" },
];

export default function HeroSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "">("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedWilaya) params.set("wilaya", selectedWilaya);
    if (searchQuery) params.set("q", searchQuery);
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-overlay z-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating service badges */}
      <div className="absolute top-32 right-8 lg:right-24 hidden lg:flex flex-col gap-3 z-10 animate-slide-up" style={{ animationDelay: "0.5s" }}>
        {[
          { icon: "⚡", label: "كهربائي", color: "bg-yellow-400/20" },
          { icon: "🔧", label: "سباك", color: "bg-blue-400/20" },
          { icon: "❄️", label: "مكيفات", color: "bg-cyan-400/20" },
        ].map((badge) => (
          <div
            key={badge.label}
            className={`${badge.color} backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm font-medium`}
          >
            <span className="text-lg">{badge.icon}</span>
            {badge.label}
          </div>
        ))}
      </div>

      <div className="absolute top-40 left-8 lg:left-24 hidden lg:flex flex-col gap-3 z-10 animate-slide-up" style={{ animationDelay: "0.8s" }}>
        {[
          { icon: "🪚", label: "نجار", color: "bg-orange-400/20" },
          { icon: "🎨", label: "دهان", color: "bg-pink-400/20" },
          { icon: "📹", label: "كاميرات", color: "bg-red-400/20" },
        ].map((badge) => (
          <div
            key={badge.label}
            className={`${badge.color} backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm font-medium`}
          >
            <span className="text-lg">{badge.icon}</span>
            {badge.label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="container-rtl relative z-10 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 text-white text-sm font-medium animate-fade-in">
          <Shield className="w-4 h-4 text-secondary" />
          <span>منصة موثوقة ومعتمدة للسوق الجزائري</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 animate-slide-up leading-tight">
          اعثر على
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-secondary mt-2">
            حرفي محترف
          </span>
          قريب منك
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
          منصة <strong className="text-white">خدماتي</strong> تربطك بأفضل الحرفيين والمهنيين في{" "}
          <strong className="text-secondary">الجزائر</strong> — بسهولة، سرعة وأمان.
        </p>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Service type */}
              <div className="md:col-span-4 relative">
                <label className="block text-xs font-semibold text-gray-500 mb-1 px-1 text-right">
                  نوع الخدمة
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer text-right"
                    dir="rtl"
                  >
                    <option value="">كل الخدمات</option>
                    {SERVICE_LIST.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.icon} {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Wilaya */}
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-semibold text-gray-500 mb-1 px-1 text-right">
                  الولاية
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer text-right"
                    dir="rtl"
                  >
                    <option value="">كل الولايات</option>
                    {WILAYAS.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Text search */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-gray-500 mb-1 px-1 text-right">
                  بحث حر
                </label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اسم الحرفي..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder-gray-400 text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Search button */}
              <div className="md:col-span-2 flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full btn-primary justify-center rounded-xl py-3 text-base font-bold"
                >
                  <Search className="w-5 h-5" />
                  بحث
                </button>
              </div>
            </div>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-white/60 text-sm">الأكثر بحثاً:</span>
            {["كهربائي الجزائر", "سباك وهران", "مصلح مكيفات", "دهان قسنطينة"].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-1.5 text-white text-sm transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.5s" }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-4 px-3">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: "0.7s" }}>
          {[
            { icon: <Shield className="w-4 h-4" />, text: "حرفيون موثقو الهوية" },
            { icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />, text: "نظام تقييمات حقيقية" },
            { icon: <Zap className="w-4 h-4" />, text: "رد سريع خلال ساعة" },
            { icon: <Users className="w-4 h-4" />, text: "ضمان الجودة" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/80 text-sm">
              <span className="text-secondary">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
