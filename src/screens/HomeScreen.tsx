import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SIGNATURE_ITEMS, BRANCHES } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const { setCurrentScreen, addToCart } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'matcha'>('all');

  // Countdown timer for next oven batch
  const [countdown, setCountdown] = useState(7 * 60 + 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 25 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const displayedSignatures =
    filterType === 'matcha'
      ? SIGNATURE_ITEMS.filter((item) => item.name.toLowerCase().includes('matcha'))
      : SIGNATURE_ITEMS;

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION WITH GASTRO POP FLAVOR */}
      <section className="relative w-full overflow-hidden bg-surface-container-low py-12 lg:py-20 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy & Gastro Pop Stickers */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 z-10">
            {/* Floating Gastro Pop Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-xs font-bold shadow-md -rotate-2 transform hover:rotate-0 transition-transform border border-outline-variant/30">
                <img
                  src="/assets/aistudio/image_409_9964af08.png"
                  alt="Bloom Cake & Coffe"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-primary/30"
                />
                <span className="text-primary font-bold">Bloom Artisan</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold shadow-md">
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                MẺ BÁNH NÓNG MỖI SÁNG
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold shadow-sm rotate-1 transform">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                100% Elle &amp; Vire French Butter
              </span>
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface">
                <div className="flex text-amber-500">
                  <span className="material-symbols-outlined text-[18px]">star</span>
                </div>
                <span className="font-label-md text-xs font-bold">4.9/5</span>
                <span className="font-body-sm text-xs text-on-surface-variant">(2.400+ đánh giá)</span>
              </div>
            </div>

            {/* Grand Display Heading */}
            <div className="space-y-3">
              <h1 className="font-headline-lg text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">
                <span className="font-script text-black text-5xl lg:text-6xl italic block sm:inline font-normal pr-1">
                  Nơi Bơ Pháp Tan Chảy &amp;
                </span>{' '}
                <span className="font-display-custom font-bold text-primary tracking-tight">
                  Vị Matcha
                </span>{' '}
                <span className="font-script text-black text-5xl lg:text-6xl font-normal">
                  Lên Ngôi.
                </span>
              </h1>
              <p className="font-body-lg text-base lg:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Tiệm bánh thủ công Gastro Pop độc quyền tại thành phố biển Đà Nẵng. Thưởng thức hương bơ ngào ngạt bên bờ sông Hàn thơ mộng hay nhâm nhi matcha lạnh ngắm hoàng hôn bãi biển Mỹ Khê.
              </p>
            </div>

            {/* Action Pill CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentScreen('menu')}
                className="px-7 py-4 rounded-full bg-primary-container text-on-primary-container font-label-lg text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:animate-bounce">moped</span>
                <span>Đặt Bánh Giao Ngay 30 Phút</span>
              </button>
              <button
                onClick={() => setCurrentScreen('menu')}
                className="px-7 py-4 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-sm font-bold shadow-sm hover:bg-surface-container transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">restaurant_menu</span>
                <span>Khám Phá Menu Hôm Nay</span>
              </button>
            </div>

            {/* Hot Oven Fresh Batch Live Ticker */}
            <div className="w-full max-w-lg mt-4 p-4 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[22px] animate-spin" style={{ animationDuration: '6s' }}>
                    bakery_dining
                  </span>
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface"></span>
                </div>
                <div>
                  <p className="font-label-sm text-[11px] text-primary uppercase font-bold tracking-wider">
                    Mẻ bánh tiếp theo trong lò
                  </p>
                  <p className="font-headline-sm text-sm text-on-surface font-bold">
                    Croissant Than Tre &amp; Matcha Lava
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-md text-xl text-primary font-bold">
                  {formatCountdown(countdown)}
                </span>
                <span className="block font-label-sm text-[10px] text-on-surface-variant uppercase">
                  Phút nữa ra lò
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Bento Layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              {/* Main Showcase Rounded Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-surface-container-lowest p-3 border border-outline-variant/30">
                <img
                  className="w-full h-[420px] object-cover rounded-2xl"
                  alt="Uji Matcha Croissant Lava bơ Pháp nóng hổi rưới kem matcha"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Y_f26D8WvtCOvc8XxLygD4y2wccOnyJGXq30kL8YBlC8oDtauSRcAObcHJet7Q8sKhVGSwg1Ky0P8NPEdEjEUpDWPSl6i8cjDuq8ccu1VmFpRf7_0DHvpZxjkRFNVdApQjt4Cgmg2XK5cvsjn8ddO2Obw1LRtB3vrSm6eia0jJyTP-NjfZMuDONkenXPwPa91RoANsLTqGyvWKwbJP4YRNS4q2Bi1mYnEHdHFl-n_MNe5BTlDaA"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex items-center justify-between border border-outline-variant/20">
                  <div>
                    <span className="font-label-sm text-[10px] uppercase bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold">
                      Best Seller #1
                    </span>
                    <h4 className="font-headline-sm text-base text-on-surface mt-1 font-bold">
                      Uji Matcha Croissant Lava
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Nướng 3 mẻ mỗi sáng • 68.000đ
                    </p>
                  </div>
                  <button
                    aria-label="Thêm vào giỏ"
                    onClick={() =>
                      addToCart({
                        name: 'Uji Matcha Croissant Lava',
                        price: 68000,
                        image:
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Y_f26D8WvtCOvc8XxLygD4y2wccOnyJGXq30kL8YBlC8oDtauSRcAObcHJet7Q8sKhVGSwg1Ky0P8NPEdEjEUpDWPSl6i8cjDuq8ccu1VmFpRf7_0DHvpZxjkRFNVdApQjt4Cgmg2XK5cvsjn8ddO2Obw1LRtB3vrSm6eia0jJyTP-NjfZMuDONkenXPwPa91RoANsLTqGyvWKwbJP4YRNS4q2Bi1mYnEHdHFl-n_MNe5BTlDaA',
                      })
                    }
                    className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>

              {/* Pop Sticker Floating Elements */}
              <div className="absolute -top-6 -right-4 p-4 rounded-2xl bg-primary text-on-primary shadow-xl rotate-6 hidden sm:flex flex-col items-center justify-center w-28 h-28 text-center">
                <span className="material-symbols-outlined text-[24px]">air</span>
                <span className="font-display-lg text-[22px] leading-tight font-bold">100%</span>
                <span className="font-label-sm text-[10px] uppercase font-bold tracking-tighter">Bơ Elle &amp; Vire</span>
              </div>
              <div className="absolute -bottom-6 -left-6 p-3.5 rounded-2xl bg-secondary text-on-secondary shadow-xl -rotate-3 hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <p className="font-label-md text-xs font-bold text-on-secondary">Matcha Uji Kyoto</p>
                  <p className="font-label-sm text-[10px] text-secondary-container">Chính ngạch từ Nhật Bản</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S FRESH BAKE SIGNATURE SECTION */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-8 bg-surface" id="signature-menu">
        <div className="max-w-[1280px] mx-auto space-y-12">
          {/* Section Header with Micro-Badge */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-xs font-bold">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>MẺ NƯỚNG THỦ CÔNG HÔM NAY</span>
              </div>
              <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface">
                <span className="font-script text-4xl lg:text-5xl text-black font-normal pr-1">Bốn Dấu Ấn</span>{' '}
                <span className="font-display-custom font-bold">Vị Giác Không Thể Bỏ Lỡ</span>
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant max-w-2xl">
                Tất cả bánh chỉ được nướng trong khung giờ 06:30, 11:30 và 16:30 hằng ngày. Cam kết nguyên liệu tự nhiên không chất phụ gia.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-md text-xs text-on-surface-variant">Lọc theo:</span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-full font-label-sm text-xs font-bold shadow-sm transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                }`}
              >
                Tất Cả Mẻ Nóng
              </button>
              <button
                onClick={() => setFilterType('matcha')}
                className={`px-4 py-2 rounded-full font-label-sm text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'matcha'
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                }`}
              >
                Matcha Series
              </button>
            </div>
          </div>

          {/* 4 Signature Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedSignatures.map((card) => (
              <div
                key={card.id}
                className="group bg-surface-container-lowest rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-square mb-4">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={card.name}
                      src={card.image}
                    />
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full font-label-sm text-[11px] font-bold shadow-md ${card.badgeBg}`}
                    >
                      {card.badge}
                    </span>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-wider">
                        {card.highlight}
                      </span>
                      <span className="font-label-sm text-[10px] bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-base text-on-surface font-bold group-hover:text-primary transition-colors">
                      {card.name}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="font-headline-sm text-base text-primary font-bold">
                    {card.price.toLocaleString('vi-VN')}đ
                  </span>
                  <button
                    onClick={() =>
                      addToCart({
                        name: card.name,
                        price: card.price,
                        image: card.image,
                      })
                    }
                    className="px-3.5 py-2 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-bold flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>Đặt Bánh</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UJI MATCHA BAR PRIVILEGE EXPERIENCE */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-8 bg-surface-container-high relative overflow-hidden">
        {/* Ambient matcha decorative glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Matcha Chasen Experience */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-surface-container-lowest p-3 border border-outline-variant/30">
              <img
                className="w-full h-[460px] object-cover rounded-2xl"
                alt="Nghệ nhân đánh matcha Uji bằng chổi chasen tre 100 nan"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_WV2p_wPS_QVVvfGikCTMszOk4kg7I7FsZWgVKsT9BpJTkKbjbqTx3dQl8e9rVw2aygDPWbrYQOdoP4PtDgPWNO31-1PKzkFY9HgyBBzot1XGffT0eN68clXEiRqr6ZuNgwvVFhvPEtMh4KXL_mykmKh1DnZiv11l2A8BF-TkvIiOpqQFvcGJD71_DaQ35y4PQGgKuwLIhd1gV2nuWOCxr74OV00ZTM1bZ2ciZJul6qV1kiCerBk"
              />
              <div className="absolute top-8 left-8 p-3 px-4 rounded-full bg-secondary-container text-on-secondary-container shadow-lg font-label-md text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">eco</span>
                <span>Chasen 100 Nan Thủ Công</span>
              </div>
            </div>
            {/* Floating Testimonial mini card */}
            <div className="absolute -bottom-6 right-6 p-4 rounded-2xl bg-surface-container-lowest shadow-xl max-w-xs hidden sm:block border border-outline-variant/30">
              <p className="font-body-sm text-xs text-black italic font-script text-base">
                "Vị umami thanh nhẹ, hậu vị sâu ngọt không hề chát gắt. Chuẩn gu Uji bậc nhất Đà Nẵng!"
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[10px]">
                  HN
                </div>
                <span className="font-label-sm text-[11px] text-on-surface font-bold">
                  Hà Nhi • Food Stylist
                </span>
              </div>
            </div>
          </div>

          {/* Detail & Menu Highlight */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold">
              <span className="material-symbols-outlined text-[18px]">spa</span>
              <span>QUẦY TRẢI NGHIỆM ĐẶC QUYỀN</span>
            </div>
            <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface leading-snug">
              <span className="font-script text-4xl lg:text-5xl text-black font-normal pr-1">Nghệ Thuật Uji Matcha Kyoto:</span>
              <br />
              <span className="text-secondary font-display-custom font-bold">Đánh Tay Tươi Ngay Tại Quầy</span>
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
              Mỗi cốc Matcha tại Bloom Cake &amp; Coffe được pha chế theo phương thức cổ truyền: Dùng chổi tre Chasen 100 nan đánh bông bột Matcha vụ xuân thượng hạng Kyoto trong nước khoáng 75°C, giữ trọn vẹn diệp lục tố và hương hoa cỏ thiên nhiên.
            </p>

            {/* Feature Points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">local_cafe</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface">Cold Whisked Dirty Matcha</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Lớp sữa tươi yến mạch béo ngậy rót đè dòng matcha đánh bọt cô đặc mát lạnh, thơm nồng nàn không ngọt khé.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">cake</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface">Matcha Mochi Roll Cake</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Bánh cuộn bông lan matcha kẹp lõi bánh nếp mochi dẻo kéo sợi cùng kem phô mai Mascarpone béo dịu.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentScreen('menu')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-secondary text-on-secondary font-label-lg text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span>Xem Menu Quầy Bar Matcha</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY & DELIVERY ASSURANCE SECTION */}
      <section className="w-full py-16 px-4 sm:px-8 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-label-md text-xs uppercase bg-primary-fixed text-on-primary-fixed px-3.5 py-1 rounded-full font-bold">
              Bloom Standard
            </span>
            <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface">
              <span className="font-script text-4xl text-black font-normal pr-1">Cam Kết</span>{' '}
              <span className="font-display-custom font-bold">Chuẩn Pastry &amp; Giao Tận Resort</span>
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Chăm chút từng lớp bơ nướng tới bao bì bảo quản giữ lạnh khi vận chuyển dọc bờ biển Đà Nẵng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow space-y-4 border border-outline-variant/30">
              <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[30px]">workspace_premium</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface">100% Bơ Tươi Elle &amp; Vire</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Nhập khẩu nguyên khối từ vùng Normandie (Pháp). Tạo nên từng tầng bánh xốp giòn tự nhiên với độ ẩm hoàn hảo, thơm thanh thoát không ngậy dầu.
              </p>
              <div className="flex items-center gap-2 text-primary font-label-md text-xs font-bold pt-1">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Không dùng chất béo chuyển hóa</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow space-y-4 border border-outline-variant/30">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[30px]">flight_takeoff</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface">Uji Matcha Độc Quyền</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Hạt bột matcha siêu mịn xay bằng cối đá granite tại nông trại Uji, Kyoto. Bảo quản lạnh chân không để lưu giữ sắc xanh ngọc lục bảo và chất chống oxy hóa.
              </p>
              <div className="flex items-center gap-2 text-secondary font-label-md text-xs font-bold pt-1">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Chứng nhận Organic Nông Nghiệp Nhật</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow space-y-4 border border-outline-variant/30">
              <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[30px]">local_shipping</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface">Hộp Giữ Nhiệt 30-45 Phút</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Bánh lạnh được đóng thùng xốp chuyên dụng với túi gel đá khô. Bánh croissant được giữ trong hộp thông khí chống đọng sương, giao nguyên vẹn đến các resort Mỹ Khê &amp; Sơn Trà.
              </p>
              <div className="flex items-center gap-2 text-primary font-label-md text-xs font-bold pt-1">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Đền bù 100% nếu móp méo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 BRANCHES IN DA NANG MAP & OVERVIEW */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-8 bg-surface">
        <div className="max-w-[1280px] mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label-md text-xs uppercase bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded-full font-bold">
                Ghé Thăm Tiệm
              </span>
              <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface mt-2">
                <span className="font-script text-4xl text-black font-normal pr-1">Hệ Thống</span>{' '}
                <span className="font-display-custom font-bold">6 Cơ Sở Tại Đà Nẵng</span>
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant">
                Khám phá không gian Gastro Pop độc đáo tại các vị trí đắc địa nhất thành phố.
              </p>
            </div>
            <div className="flex items-center gap-2 text-on-surface font-label-md text-xs bg-surface-container-high px-4 py-2 rounded-full font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
              <span>Tất cả 6 cơ sở đang hoạt động phục vụ</span>
            </div>
          </div>

          {/* Interactive Branch Mosaic Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Da Nang Map Visual Trigger */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl bg-surface-container-high relative border border-outline-variant/30">
              <div
                className="w-full h-[480px] bg-cover bg-center rounded-3xl"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSjt3_TM1O_s5_TUWlaphm11gP9Ih9U4Zjbsi3j5m0keQQsN18MwIld4WJ8aqr7kvdHluBg-4ZME_v4GQoIEeO6IPZTXleih-LPq2jY5edlK5efZVoJRozgnySqXO73jo2pQx7u82Cyp4CxhgY1zwS8yCKed5wuQ839tH32YAQ_kui1ljt8Su6-mFdzg0Q2m5qwb_Bf6kQ7cKLb2722AJMK0tlPLSO6FyJ-QCMNVPXIX4xxehktD8')`,
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-lg flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                  </div>
                  <div>
                    <p className="font-headline-sm text-sm font-bold text-on-surface">Bao phủ 4 quận trọng điểm</p>
                    <p className="font-body-sm text-xs text-on-surface-variant">Bán kính giao hàng nhanh trong 5km quanh bạn</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentScreen('branches')}
                  className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-xs font-bold hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  Mở Chỉ Đường
                </button>
              </div>
            </div>

            {/* Branch Listing Details Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BRANCHES.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow space-y-2 border border-outline-variant/30 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-[10px] uppercase bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-bold">
                        {b.badge.replace('★ ', '')}
                      </span>
                      <span className="font-label-sm text-[10px] text-secondary font-bold">Mở cửa</span>
                    </div>
                    <h4 className="font-headline-sm text-base text-on-surface font-bold">{b.name}</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Q. {b.districtName} • {b.subtitle.split('-')[0]}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-xs">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> {b.hours}
                    </span>
                    <button
                      onClick={() => setCurrentScreen('branches')}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Xem menu quán →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF & GUEST LOVE */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-8 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-label-md text-xs uppercase bg-primary text-on-primary px-3.5 py-1 rounded-full font-bold">
              Đánh Giá Từ Thực Khách
            </span>
            <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface">
              <span className="font-script text-4xl text-black font-normal pr-1">Họ Nói Gì Về</span>{' '}
              <span className="font-display-custom font-bold">Trải Nghiệm Tại Bloom Cake?</span>
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Những dòng cảm nhận chân thực nhất từ du khách, cư dân Đà Nẵng và những tín đồ bánh ngọt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-4 border border-outline-variant/30">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-sm text-on-surface leading-relaxed italic">
                  "Đi nghỉ ở InterContinental Đà Nẵng, mình đặt hộp bánh Croissant Lava và bánh kem dâu giao tận nơi. Thùng xốp giữ lạnh cực kỳ chuyên nghiệp, bánh đến tay vẫn lạnh mát và bông xốp hoàn hảo. 10/10!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-container">
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">
                  TT
                </div>
                <div>
                  <p className="font-label-md text-xs text-on-surface font-bold">Thảo Trang</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant">Du khách từ TP. Hồ Chí Minh</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-4 border border-outline-variant/30">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-sm text-on-surface leading-relaxed italic">
                  "Uji Matcha ở đây chuẩn vị Nhật nhất Đà Nẵng. Món Dirty Matcha đánh tay bông bọt uống cùng bánh Canelé nướng giòn vỏ là combo hoàn hảo cho mỗi buổi sáng làm việc bên bờ sông Hàn."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-container">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary flex items-center justify-center font-bold text-xs">
                  MH
                </div>
                <div>
                  <p className="font-label-md text-xs text-on-surface font-bold">Minh Huy (Food Blogger)</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant">@danang_foodie</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-4 border border-outline-variant/30">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-sm text-on-surface leading-relaxed italic">
                  "Không gian cơ sở Bạch Đằng view sông cực chill, tông màu hồng phấn - xanh matcha siêu cưng chụp góc nào cũng đẹp chuẩn Gastro Pop. Điểm đến nhất định phải ghé khi tới Đà Nẵng!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-container">
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">
                  EA
                </div>
                <div>
                  <p className="font-label-md text-xs text-on-surface font-bold">Elena &amp; Alex</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant">Digital Nomads từ Melbourne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POP SPEED-ORDER BANNER CTA */}
      <section className="w-full py-16 px-4 sm:px-8 bg-surface">
        <div className="max-w-[1280px] mx-auto rounded-3xl bg-primary text-on-primary p-8 lg:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-container/40 blur-2xl pointer-events-none"></div>
          <div className="absolute left-10 -top-20 w-60 h-60 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-on-primary font-label-sm text-[11px] uppercase font-bold tracking-wider">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                GIAO TẬN KHÁCH SẠN / RESORT
              </span>
              <h2 className="font-display-lg text-3xl lg:text-4xl font-bold leading-tight">
                <span className="font-script text-black text-4xl lg:text-5xl font-normal block mb-1">
                  Thèm Bánh Nóng Giòn?
                </span>
                <span className="font-display-custom">Giao Tới Trong 30 Phút.</span>
              </h2>
              <p className="font-body-lg text-base text-white/90">
                Đội ngũ shipper riêng của Bloom Cake sẵn sàng giao mẻ bánh vừa lấy từ lò trực tiếp đến cửa phòng của bạn tại Đà Nẵng.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <button
                onClick={() => setCurrentScreen('menu')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface-container-lowest text-primary font-label-lg text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-transform text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span>Đặt Giao Hỏa Tốc Ngay</span>
              </button>
              <a
                href="tel:19008899"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-on-primary font-label-lg text-sm font-bold transition-colors text-center flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>1900 8899</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
