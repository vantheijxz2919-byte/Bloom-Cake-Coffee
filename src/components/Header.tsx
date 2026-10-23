import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useCRM } from '../context/CRMContext';
import { ScreenName } from '../types';
import { ShieldCheck, LayoutDashboard } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentScreen, setCurrentScreen, totalItems, setIsCartOpen, setIsSearchOpen } = useApp();
  const { setPortalMode, activeStaff } = useCRM();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; screen: ScreenName }[] = [
    { label: 'Trang chủ', screen: 'home' },
    { label: 'Thực đơn', screen: 'menu' },
    { label: 'Quà lưu niệm', screen: 'souvenirs' },
    { label: 'Chi nhánh', screen: 'branches' },
    { label: 'Ưu đãi', screen: 'deals' },
    { label: 'Thành viên & Tích điểm', screen: 'loyalty' },
    { label: 'Về Bloom Cake', screen: 'about' },
  ];

  const handleNavClick = (screen: ScreenName) => {
    setCurrentScreen(screen);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner Marquee */}
      <div className="w-full bg-primary-container text-on-primary-container px-4 py-1.5 overflow-hidden shadow-[0_2px_12px_rgba(227,23,84,0.18)]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-center">
          <div className="w-full whitespace-nowrap overflow-x-auto text-[11px] uppercase tracking-wider flex items-center justify-center gap-3 sm:gap-4 no-scrollbar">
            <span className="font-semibold">BÁNH NƯỚNG MẺ MỚI LIÊN TỤC</span>
            <span className="opacity-60">•</span>
            <span className="font-semibold">TƯƠI MỖI BÌNH MINH</span>
            <span className="opacity-60">•</span>
            <span className="font-semibold">GIAO HỎA TỐC 30 PHÚT TẠI ĐÀ NẴNG</span>
            <span className="opacity-60 hidden md:inline">•</span>
            <span className="font-semibold hidden md:inline">HỆ THỐNG 6 CƠ SỞ ĐÀ NẴNG</span>
            <span className="opacity-60">•</span>
            <a
              href="tel:19008899"
              className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full font-bold transition-colors"
            >
              HOTLINE: 1900 8899
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(39,24,20,0.06)] border-b border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 flex-shrink-0 group text-left cursor-pointer"
          >
            <img
              src="/assets/aistudio/image_409_9964af08.png"
              alt="Bloom Cake & Coffe"
              className="w-10 h-10 rounded-full object-cover shadow-[0_4px_14px_rgba(195,61,105,0.35)] ring-2 ring-primary/20 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg text-primary tracking-tight leading-none font-bold">
                Bloom
              </span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant leading-none mt-1">
                Cake &amp; Coffe
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 flex-nowrap whitespace-nowrap overflow-x-hidden">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.screen;
              return (
                <button
                  key={link.screen}
                  onClick={() => handleNavClick(link.screen)}
                  className={`px-3.5 py-2 rounded-full font-label-md text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary-fixed text-on-primary-fixed font-bold shadow-[0_2px_10px_rgba(255,51,102,0.12)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Search Trigger */}
            <button
              aria-label="Tìm kiếm món & cơ sở"
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer"
              title="Tìm kiếm"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              aria-label="Giỏ hàng"
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer"
              title="Khay món của bạn"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-sm text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Quick Order Button */}
            <button
              onClick={() => handleNavClick('menu')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-sm font-bold shadow-[0_6px_18px_rgba(227,23,84,0.28)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">moped</span>
              <span>Đặt Giao Nhanh</span>
            </button>

            {/* Portal Switcher to Staff CRM */}
            <button
              onClick={() => setPortalMode('crm')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs shadow-md border border-amber-400/40 hover:scale-105 transition-all cursor-pointer"
              title="Vào cổng Quản trị, Thu ngân, Bếp & Vận hành CRM"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Cổng Vận Hành CRM</span>
              <span className="sm:hidden">CRM</span>
            </button>

            {/* Member Profile Avatar */}
            <button
              onClick={() => handleNavClick('auth')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                currentScreen === 'auth'
                  ? 'ring-2 ring-primary bg-primary text-white'
                  : 'bg-primary text-white hover:opacity-90'
              }`}
              title="Tài khoản Bloom Club"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              aria-label="Mở menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-outline-variant/30 bg-surface-container-lowest px-4 py-3 shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentScreen === link.screen;
                return (
                  <button
                    key={link.screen}
                    onClick={() => handleNavClick(link.screen)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-2 mt-2 border-t border-outline-variant/20 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setPortalMode('crm');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-400/40"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Vào Cổng Quản Trị & Vận Hành CRM</span>
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavClick('menu')}
                    className="flex-1 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">moped</span>
                    <span>Đặt Giao Nhanh</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('order-tracking')}
                    className="px-4 py-2.5 rounded-full bg-surface-container text-on-surface font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">route</span>
                    <span>Đơn Hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
