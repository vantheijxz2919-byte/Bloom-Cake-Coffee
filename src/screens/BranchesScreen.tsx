import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRANCHES } from '../data/mockData';

export const BranchesScreen: React.FC = () => {
  const { setCurrentScreen, setSelectedBranch, showToast } = useApp();
  const [activeDistrict, setActiveDistrict] = useState<string>('all');
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [highlightedBranchId, setHighlightedBranchId] = useState<string | null>(null);

  const districtCounts = {
    all: BRANCHES.length,
    'thanh-khe': BRANCHES.filter((b) => b.district === 'thanh-khe').length,
    'hai-chau': BRANCHES.filter((b) => b.district === 'hai-chau').length,
    'son-tra': BRANCHES.filter((b) => b.district === 'son-tra').length,
    'ngu-hanh-son': BRANCHES.filter((b) => b.district === 'ngu-hanh-son').length,
  };

  const handleGpsFind = () => {
    setGpsStatus('Đang quét vị trí GPS vệ tinh tại Đà Nẵng...');
    setTimeout(() => {
      setGpsStatus('Cơ sở gần bạn nhất: Cơ sở 2 - 242 Bạch Đằng (~450m)');
      setActiveDistrict('all');
      setHighlightedBranchId('b2');
      showToast('Đã tìm thấy: Cơ sở 242 Bạch Đằng gần bạn nhất (~450m)!', 'Định vị GPS', 'success');

      const el = document.getElementById('branch-card-b2');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setTimeout(() => setHighlightedBranchId(null), 3000);
    }, 800);
  };

  const handleHighlightBranch = (branchId: string) => {
    setActiveDistrict('all');
    setHighlightedBranchId(branchId);
    const el = document.getElementById(`branch-card-${branchId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => setHighlightedBranchId(null), 2500);
  };

  const handleOrderFromBranch = (branchName: string, districtName: string) => {
    setSelectedBranch(`${branchName}, Q. ${districtName}`);
    setCurrentScreen('menu');
  };

  const displayedBranches =
    activeDistrict === 'all'
      ? BRANCHES
      : BRANCHES.filter((b) => b.district === activeDistrict);

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow Decorator */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-surface-variant/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-12 right-10 w-72 h-72 bg-secondary-container/30 blur-2xl pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10 lg:py-16 relative">
          {/* Breadcrumb & Brand Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-xs tracking-wider uppercase font-bold">
              <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
              Mạng Lưới Đà Nẵng
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="font-label-sm text-xs text-on-surface-variant tracking-wider uppercase">
              6 Cơ Sở Chính Thức
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="inline-flex items-center gap-1 font-label-sm text-xs text-secondary font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Đang phục vụ đồng loạt
            </span>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8">
              <h1 className="font-headline-lg text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight mb-4">
                <span className="font-display-custom font-bold">Khám phá 6 Tọa Độ</span>{' '}
                <span className="text-black font-script text-5xl lg:text-6xl font-normal block sm:inline">
                  Bloom Cake &amp; Coffe
                </span>{' '}
                <span className="font-display-custom font-bold">rực rỡ bên bờ vịnh Đà Nẵng</span>
              </h1>
              <p className="font-body-lg text-base text-on-surface-variant max-w-2xl leading-relaxed">
                Từ xưởng bánh trung tâm thơm phức mẻ nướng đầu ngày đến góc ban công ngắm Rồng phun lửa và đại lộ biển Mỹ Khê lộng gió. Mỗi cơ sở là một phong vị Gastro Pop riêng biệt đón chào bạn.
              </p>
            </div>

            {/* 1-Touch GPS Quick Finder CTA */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={handleGpsFind}
                className="w-full group relative overflow-hidden px-6 py-4 rounded-2xl bg-primary-container text-on-primary-container shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:rotate-12 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">my_location</span>
                  </div>
                  <div className="text-left">
                    <div className="font-headline-sm text-sm font-bold leading-tight text-white">
                      Tìm Cơ Sở Gần Nhất
                    </div>
                    <div className="font-label-sm text-[11px] text-white/80">Tự động định vị GPS (1 chạm)</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white text-[24px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              {gpsStatus && (
                <div className="px-4 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold flex items-center gap-2 animate-fadeIn border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px]">near_me</span>
                  <span>{gpsStatus}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Delivery Alert Bar (Hotel / Resort) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border border-outline-variant/30">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex-shrink-0 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">bolt</span>
              </div>
              <div>
                <span className="font-label-lg text-sm text-on-surface font-bold">
                  Giao Hỏa Tốc Bánh Nóng Đến Khách Sạn &amp; Resort
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Bảo quản hộp giữ nhiệt cao cấp, tặng kèm nến bánh kem &amp; thiệp chúc mừng thiết kế riêng theo yêu cầu.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="tel:19008899"
                className="px-5 py-2.5 rounded-full bg-surface-container-highest text-primary font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                <span>Tổng đài 1900 8899</span>
              </a>
            </div>
          </div>

          {/* District Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-outline-variant/20">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setActiveDistrict('all')}
                className={`px-5 py-2.5 rounded-full font-label-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeDistrict === 'all'
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                Tất cả <span className="ml-1 opacity-80">({districtCounts.all})</span>
              </button>
              <button
                onClick={() => setActiveDistrict('thanh-khe')}
                className={`px-4 py-2.5 rounded-full font-label-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeDistrict === 'thanh-khe'
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                Thanh Khê <span className="ml-1 opacity-60">({districtCounts['thanh-khe']})</span>
              </button>
              <button
                onClick={() => setActiveDistrict('hai-chau')}
                className={`px-4 py-2.5 rounded-full font-label-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeDistrict === 'hai-chau'
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                Hải Châu <span className="ml-1 opacity-60">({districtCounts['hai-chau']})</span>
              </button>
              <button
                onClick={() => setActiveDistrict('son-tra')}
                className={`px-4 py-2.5 rounded-full font-label-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeDistrict === 'son-tra'
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                Sơn Trà <span className="ml-1 opacity-60">({districtCounts['son-tra']})</span>
              </button>
              <button
                onClick={() => setActiveDistrict('ngu-hanh-son')}
                className={`px-4 py-2.5 rounded-full font-label-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeDistrict === 'ngu-hanh-son'
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                Ngũ Hành Sơn <span className="ml-1 opacity-60">({districtCounts['ngu-hanh-son']})</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
              <span>100% chi nhánh đạt chứng nhận ATTP &amp; Pháp Pastel Bar</span>
            </div>
          </div>

          {/* Branch Directory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {displayedBranches.map((b) => {
              const isHighlighted = highlightedBranchId === b.id;
              return (
                <div
                  id={`branch-card-${b.id}`}
                  key={b.id}
                  className={`flex flex-col justify-between bg-surface-container-lowest rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 relative group border ${
                    isHighlighted ? 'ring-4 ring-primary-container shadow-2xl scale-[1.02]' : 'border-outline-variant/30'
                  }`}
                >
                  {/* Badge */}
                  <div className="absolute -top-3 left-6 z-10">
                    <span
                      className={`inline-block px-3.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-[11px] uppercase tracking-wider font-bold shadow-md ${
                        b.badgeRotate || ''
                      }`}
                    >
                      {b.badge}
                    </span>
                  </div>

                  <div>
                    {/* Branch Image */}
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-5 mt-1 bg-surface-container">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={b.name}
                        src={b.image}
                      />
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-[11px] text-on-surface flex items-center gap-1.5 shadow-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span>{b.statusBadge}</span>
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">{b.icon}</span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors font-bold">
                        <span className="text-black font-script font-normal mr-1 text-2xl">
                          {b.number}.
                        </span>{' '}
                        {b.name}
                      </h2>
                      <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-[11px] text-on-surface-variant flex-shrink-0 font-bold">
                        {b.districtName}
                      </span>
                    </div>

                    <p className="font-body-sm text-xs text-on-surface-variant mb-4 flex items-start gap-1.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[18px] text-primary flex-shrink-0 mt-0.5">
                        pin_drop
                      </span>
                      <span>{b.address}</span>
                    </p>

                    <div className="p-3.5 rounded-xl bg-surface-container-low mb-4 text-on-surface font-body-sm text-xs border border-outline-variant/20">
                      <p className="line-clamp-2">{b.subtitle}</p>
                    </div>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {b.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-semibold"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action & Contact */}
                  <div className="pt-4 border-t border-surface-container flex flex-col gap-2">
                    <div className="flex items-center justify-between text-body-sm text-xs text-on-surface-variant mb-1">
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <span className="material-symbols-outlined text-[16px]">call</span>
                        <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="hover:underline">
                          {b.phone}
                        </a>
                      </span>
                      <span className="font-label-sm text-xs text-tertiary">Mở: {b.hours}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-1 transition-colors text-center"
                      >
                        <span className="material-symbols-outlined text-[16px]">map</span>
                        <span>Chỉ Đường</span>
                      </a>
                      <button
                        onClick={() => handleOrderFromBranch(b.name, b.districtName)}
                        className="px-3 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold hover:bg-primary-container transition-all shadow-sm flex items-center justify-center gap-1 text-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">shopping_basket</span>
                        <span>Đặt Món Ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map & Network Overview Section */}
          <div className="w-full bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-sm mb-16 border border-outline-variant/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs uppercase font-bold tracking-wider mb-2">
                    <span className="material-symbols-outlined text-[14px]">map</span>
                    Bản Đồ Phủ Sóng
                  </div>
                  <h3 className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold">
                    Toàn Cảnh Hệ Thống Phục Vụ{' '}
                    <span className="text-black font-script text-3xl font-normal">Tại Đà Nẵng</span>
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Mạng lưới 6 cửa hàng được phân bổ chiến lược xuyên suốt trục Sông Hàn, Trung tâm Hành chính và Bờ biển Mỹ Khê. Chúng tôi đảm bảo thời gian giao bánh trung bình chỉ từ 20 đến 35 phút.
                  </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-surface-container-low text-center border border-outline-variant/20">
                  <div>
                    <div className="font-headline-md text-xl text-primary font-bold">6/6</div>
                    <div className="font-label-sm text-xs text-on-surface-variant mt-0.5">Cơ Sở Hoạt Động</div>
                  </div>
                  <div>
                    <div className="font-headline-md text-xl text-secondary font-bold">30'</div>
                    <div className="font-label-sm text-xs text-on-surface-variant mt-0.5">Giao Hỏa Tốc</div>
                  </div>
                  <div>
                    <div className="font-headline-md text-xl text-tertiary font-bold">100%</div>
                    <div className="font-label-sm text-xs text-on-surface-variant mt-0.5">Bơ Pháp Tươi</div>
                  </div>
                </div>

                {/* Quick Map Selector Buttons */}
                <div className="space-y-2">
                  <p className="font-label-md text-xs text-on-surface font-bold">
                    Chọn cơ sở để kiểm tra khoảng cách:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-label-sm text-xs">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handleHighlightBranch(b.id)}
                        className="p-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary transition-all text-left flex items-center justify-between font-bold cursor-pointer"
                      >
                        <span className="truncate">{b.name}</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Static Map Visual */}
              <div className="lg:col-span-7">
                <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-md border border-outline-variant/30">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSjt3_TM1O_s5_TUWlaphm11gP9Ih9U4Zjbsi3j5m0keQQsN18MwIld4WJ8aqr7kvdHluBg-4ZME_v4GQoIEeO6IPZTXleih-LPq2jY5edlK5efZVoJRozgnySqXO73jo2pQx7u82Cyp4CxhgY1zwS8yCKed5wuQ839tH32YAQ_kui1ljt8Su6-mFdzg0Q2m5qwb_Bf6kQ7cKLb2722AJMK0tlPLSO6FyJ-QCMNVPXIX4xxehktD8')`,
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex items-center gap-3 border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">moped</span>
                    </div>
                    <div>
                      <div className="font-label-md text-xs text-on-surface font-bold">Giao Hỏa Tốc Nội Thành</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">
                        Miễn phí ship cho đơn từ 250k trong bán kính 5km
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ & Support Bento Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-3xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">schedule</span>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-bold mb-2">
                  Giờ Mở Cửa &amp; Mẻ Nóng
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Tất cả chi nhánh bắt đầu phục vụ từ 06:30 hoặc 07:00 sáng. Riêng cơ sở Hàm Nghi nướng bánh xuyên suốt và Nguyễn Văn Thoại mở đón khách đến 23:30 đêm.
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen('menu')}
                className="mt-4 pt-4 border-t border-outline-variant/30 font-label-md text-xs text-primary font-bold text-left hover:underline cursor-pointer"
              >
                Xem lịch ra lò hàng ngày →
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">local_cafe</span>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-bold mb-2">
                  Đặt Bàn &amp; Tiệc Nhỏ
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Nhận giữ chỗ trước bàn view Cầu Rồng (Bạch Đằng) và bàn tiệc sinh nhật ngoài trời (Võ Nguyên Giáp). Vui lòng liên hệ hotline chi nhánh trước 2 tiếng.
                </p>
              </div>
              <a
                href="tel:19008899"
                className="mt-4 pt-4 border-t border-outline-variant/30 font-label-md text-xs text-secondary font-bold text-left hover:underline"
              >
                Hotline đặt chỗ: 1900 8899 →
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-highest text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">card_giftcard</span>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-bold mb-2">
                  Quà Lưu Niệm Du Khách
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Cả 6 cơ sở đều có sẵn quầy hộp bánh đóng gói chuẩn du lịch bảo quản 14 ngày (bánh quy bơ Elle &amp; Vire, bánh dứa nướng, matcha financiers cao cấp).
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen('souvenirs')}
                className="mt-4 pt-4 border-t border-outline-variant/30 font-label-md text-xs text-primary font-bold text-left hover:underline cursor-pointer"
              >
                Khám phá danh mục hộp quà →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
