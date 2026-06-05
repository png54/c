"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  Wrench,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "الخدمات" },
  { href: "/search", label: "البحث" },
  { href: "/auth/register?role=artisan", label: "انضم كحرفي" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userRole, setUserRole] = useState<string>("client");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setUserRole(user?.user_metadata?.role || "client");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setUserRole(session?.user?.user_metadata?.role || "client");
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const getDashboardPath = () => `/dashboard/${userRole}`;

  const navbarClass = isHomePage && !isScrolled
    ? "bg-transparent"
    : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClass}`}
    >
      <nav className="container-rtl">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-black transition-colors ${
                isHomePage && !isScrolled
                  ? "text-white"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              خدماتي
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isHomePage && !isScrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-primary hover:bg-primary/5 dark:text-gray-300 dark:hover:text-white"
                } ${pathname === link.href ? "text-primary bg-primary/5" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                isHomePage && !isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5 dark:text-gray-300"
              }`}
              aria-label="تبديل الوضع"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <button
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative ${
                    isHomePage && !isScrolled
                      ? "text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5 dark:text-gray-300"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span className="notification-dot" />
                </button>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                      isHomePage && !isScrolled
                        ? "text-white hover:bg-white/10"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold hidden sm:block">
                      {user.user_metadata?.full_name?.split(" ")[0] || "حسابي"}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {user.user_metadata?.full_name || "مستخدم"}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                      <Link
                        href={getDashboardPath()}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        لوحة التحكم
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        الإعدادات
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                        <button
                          onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          تسجيل الخروج
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                    isHomePage && !isScrolled
                      ? "text-white hover:bg-white/10"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary text-sm px-5 py-2 rounded-xl"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center ${
                isHomePage && !isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 rounded-xl text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 px-4 pt-3 border-t border-gray-100 mt-3">
                <Link href="/auth/login" className="flex-1 btn-outline text-center text-sm py-2">
                  دخول
                </Link>
                <Link href="/auth/register" className="flex-1 btn-primary text-center text-sm py-2">
                  تسجيل
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Click outside to close menus */}
      {(userMenuOpen || mobileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setUserMenuOpen(false); setMobileOpen(false); }}
        />
      )}
    </header>
  );
}
