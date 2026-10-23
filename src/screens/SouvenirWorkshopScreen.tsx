import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WORKSHOPS, SOUVENIRS } from '../data/mockData';

export const SouvenirWorkshopScreen: React.FC = () => {
  const { addToCart, showToast } = useApp();

  const [selectedClass, setSelectedClass] = useState<string>('Nướng Croissant Ngàn Lớp Chuẩn Pháp');
  const [selectedSession, setSelectedSession] = useState<string>('Thứ Bảy - Ca Sáng (09:00 - 12:00)');
  const [studentName, setStudentName] = useState('Nguyễn Hoàng Lan');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [phone, setPhone] = useState('0905 xxx xxx');
  const [email, setEmail] = useState('danang.traveler@gmail.com');
  const [isBooked, setIsBooked] = useState(false);

  const handleSelectWorkshop = (title: string) => {
    setSelectedClass(title);
    const formElement = document.getElementById('workshopForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    showToast(
      `Đã nhận giữ chỗ lớp "${selectedClass}" cho ${guestCount} khách! Bloom Cake sẽ gọi xác nhận trong 15 phút.`,
      'Đăng ký thành công',
      'success'
    );
    setTimeout(() => setIsBooked(false), 5000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header Banner */}
      <section className="relative overflow-hidden bg-surface-container-low px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface shadow-sm text-primary -rotate-1 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              <span className="font-label-sm text-xs uppercase tracking-widest font-bold">
                Danang Coastal Gastro Studio
              </span>
            </div>
            <h1 className="font-headline-lg text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">
              <span className="font-display-custom font-bold">Quà Tặng Lưu Niệm &amp;</span>{' '}
              <span className="font-script text-black text-5xl lg:text-6xl font-normal inline-block px-1">
                Workshop
              </span>{' '}
              <span className="font-display-custom font-bold">Bánh Bơ</span>
            </h1>
            <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
              <span className="font-script text-black text-2xl mr-1 font-normal inline-block">
                Chạm vào
              </span>
              nghệ thuật nhào bột bơ Pháp thủ công, đánh thức hương vị trà đạo Kyoto và mang về những món quà mang đậm hơi thở đại dương Đà Nẵng.
            </p>
          </div>

          {/* Quick Switch Tabs */}
          <div className="flex items-center bg-surface-container p-1.5 rounded-full shadow-sm border border-outline-variant/30">
            <a
              href="#workshop-lab"
              className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">soup_kitchen</span>
              <span>Workshop Cuối Tuần</span>
            </a>
            <a
              href="#souvenir-boutique"
              className="px-5 py-2 rounded-full text-on-surface-variant font-label-md text-xs font-bold hover:text-on-surface transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
              <span>Boutique Quà Tặng</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: WORKSHOP LÀM BÁNH & TRÀ ĐẠO */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 space-y-12" id="workshop-lab">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary font-label-sm text-xs uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Exclusive Sensory Experience</span>
            </div>
            <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface font-bold">
              Weekend Creative Laboratory
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant max-w-xl">
              Trải nghiệm văn hóa làm bánh bơ Pháp tinh tế và trà đạo Uji thượng hạng. Giới hạn chỉ đúng{' '}
              <strong className="text-on-surface font-semibold">8 học viên/buổi</strong> tại Studio 784 Hàm Nghi để bảo đảm chất lượng kèm 1:1 cùng Bếp trưởng.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-[20px]">groups</span>
              <span>Max 8 Học Viên/Ca</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary-fixed text-on-primary-fixed font-label-md text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>100% Elle &amp; Vire &amp; Uji Matcha</span>
            </div>
          </div>
        </div>

        {/* 3 Highlight Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.id}
              className="group bg-surface-container-lowest rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={ws.title}
                    src={ws.image}
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-[11px] uppercase tracking-wider font-bold shadow-md">
                    {ws.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-xs font-semibold shadow-sm">
                    {ws.duration}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-wider">
                      {ws.category}
                    </span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      {ws.price.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <h3 className="font-headline-md text-base text-on-surface font-bold mt-1 group-hover:text-primary transition-colors">
                    {ws.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                    {ws.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2 border border-outline-variant/20">
                  {ws.perks.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-label-sm text-xs text-on-surface">
                      <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectWorkshop(ws.title)}
                className="mt-6 w-full py-3 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Chọn Lớp Này</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>

        {/* Booking Form & Schedule Section */}
        <div className="bg-surface-container-high rounded-3xl p-6 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-outline-variant/30">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-primary font-label-sm text-xs font-bold uppercase tracking-wide border border-outline-variant/30">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span>Lịch Workshop Tháng Này</span>
            </div>
            <h3 className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold">
              Đăng Ký Giữ Chỗ Online
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Do không gian giới hạn 8 người, Bloom Cake khuyến khích bạn đặt trước ít nhất 24 giờ. Chúng tôi sẽ gọi xác nhận trong vòng 15 phút.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                </div>
                <div>
                  <p className="font-label-md text-xs text-on-surface font-bold">
                    Ca Sáng (09:00 - 12:00) | Ca Chiều (14:30 - 17:30)
                  </p>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Thứ Bảy &amp; Chủ Nhật hàng tuần tại Studio Bếp Mở Hàm Nghi
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                  <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                </div>
                <div>
                  <p className="font-label-md text-xs text-on-surface font-bold">Bloom Studio Lầu 2</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    784 Hàm Nghi, P. Tam Thuận, Q. Thanh Khê, Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-md border border-outline-variant/30">
            <form id="workshopForm" onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-xs text-on-surface mb-1.5 font-bold">
                    Khóa Học Mong Muốn
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                  >
                    {WORKSHOPS.map((w) => (
                      <option key={w.id} value={w.title}>
                        {w.title} ({w.price / 1000}k)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-xs text-on-surface mb-1.5 font-bold">
                    Khung Giờ &amp; Ca
                  </label>
                  <select
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                  >
                    <option value="Thứ Bảy - Ca Sáng (09:00 - 12:00)">Thứ Bảy - Ca Sáng (09:00 - 12:00)</option>
                    <option value="Thứ Bảy - Ca Chiều (14:30 - 17:30)">Thứ Bảy - Ca Chiều (14:30 - 17:30)</option>
                    <option value="Chủ Nhật - Ca Sáng (09:00 - 12:00)">Chủ Nhật - Ca Sáng (09:00 - 12:00)</option>
                    <option value="Chủ Nhật - Ca Chiều (14:30 - 17:30)">Chủ Nhật - Ca Chiều (14:30 - 17:30)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-label-md text-xs text-on-surface mb-1.5 font-bold">
                    Họ và Tên Học Viên
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nguyễn Hoàng Lan"
                    className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-md text-xs text-on-surface mb-1.5 font-bold">
                    Số Lượng Khách
                  </label>
                  <div className="flex items-center bg-surface-container-low rounded-full px-2 py-1 border border-outline-variant/30">
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-on-surface text-xs">{guestCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.min(8, c + 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-xs text-on-surface mb-1.5 font-bold">
                    Số Điện Thoại Zalo
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0905 xxx xxx"
                    className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-md text-xs text-on-surface mb-1.5 font-bold">
                    Email Nhận Vé Điện Tử
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="danang.traveler@gmail.com"
                    className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-full bg-primary-container text-on-primary-container font-label-lg text-xs font-bold shadow-[0_8px_20px_rgba(227,23,84,0.28)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                <span>Xác Nhận Giữ Chỗ Ngay</span>
              </button>

              {isBooked && (
                <div className="text-center text-secondary font-label-md text-xs bg-secondary-container py-2.5 px-4 rounded-full font-bold">
                  Đã nhận giữ chỗ thành công! Bloom Cake sẽ liên hệ bạn ngay qua số {phone}.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 2: BOUTIQUE QUÀ LƯU NIỆM */}
      <section className="w-full bg-surface-container-lowest py-16" id="souvenir-boutique">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs uppercase font-bold tracking-wider">
                <span className="material-symbols-outlined text-[16px]">redeem</span>
                <span>Danang Limited Edition Collection</span>
              </div>
              <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface font-bold">
                Boutique Quà Lưu Niệm{' '}
                <span className="font-script font-normal text-black text-4xl ml-1.5 inline-block">
                  Độc Bản
                </span>
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Gói trọn nắng vàng, vị mặn mòi gió biển Sơn Trà và sự ngọt ngào của cốt bơ Pháp vào những hộp quà tinh tế được đóng gói thủ công chuẩn thẩm mỹ Gastro Pop.
              </p>
            </div>

            {/* 45-Minute Quick Delivery Alert */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-high border border-outline-variant/30 max-w-md">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
              </div>
              <div>
                <p className="font-label-md text-xs font-bold text-on-surface">Giao Quà Tận Nơi Trong 45 Phút</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant">
                  Đến sảnh Khách Sạn / Resort / Ga Sân Bay Đà Nẵng
                </p>
              </div>
            </div>
          </div>

          {/* Souvenirs Product Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SOUVENIRS.map((item) => (
              <div
                key={item.id}
                className="group bg-surface rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-outline-variant/30"
              >
                <div className="space-y-4">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={item.name}
                      src={item.image}
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-xs uppercase font-bold shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                        {item.type}
                      </span>
                      <span className="font-headline-sm text-base text-primary font-bold">
                        {item.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <h3 className="font-headline-md text-base text-on-surface font-bold mt-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">shopping_bag</span>
                    <span className="font-label-sm text-xs text-on-surface font-semibold">{item.perk}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() =>
                      addToCart({
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="flex-1 py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    <span>Đặt Mua Quà</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TRAVELER TESTIMONIALS */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold">
            Feedback Từ Khắp Nơi
          </span>
          <h2 className="font-headline-lg text-3xl text-on-surface font-bold">
            Du Khách Nói Gì Về Bloom Cake?
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Những kỷ niệm ngọt ngào được mang về từ Hà Nội, Sài Gòn, Seoul đến Paris.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-low p-6 rounded-2xl space-y-4 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-primary text-[16px]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                ))}
              </div>
              <p className="font-body-sm text-xs text-on-surface leading-relaxed italic">
                "Cả nhà mình đi du lịch Đà Nẵng, tham gia lớp Croissant sáng thứ 7. Bé nhà mình thích mê vì được nhào bột thật. Lúc về tiệm còn ship 3 hộp thiếc ra sảnh Furama đúng 40 phút!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-surface-container">
              <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                TL
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface font-bold">Thùy Linh &amp; Gia đình</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant">Du khách từ Hà Nội</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl space-y-4 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-primary text-[16px]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                ))}
              </div>
              <p className="font-body-sm text-xs text-on-surface leading-relaxed italic">
                "Matcha Uji ở đây thơm chuẩn Kyoto, không bị ngọt gắt hương liệu như mấy quán khác. Hộp bánh nướng 6 vị mang về Sài Gòn làm quà cho đồng nghiệp công ty ai cũng trầm trồ."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-surface-container">
              <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
                QM
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface font-bold">Quốc Minh</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant">Food Blogger, TP. Hồ Chí Minh</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl space-y-4 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-primary text-[16px]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                ))}
              </div>
              <p className="font-body-sm text-xs text-on-surface leading-relaxed italic">
                "다낭 여행 중 가장 특별했던 베이킹 클래스! 인테리어도 너무 힙하고 버터 향기가 환상적이었어요. 선물용 틴케이스 쿠키도 최고입니다."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-surface-container">
              <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                JY
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface font-bold">Ji-yeon Park</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant">Du khách Seoul, Hàn Quốc</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl space-y-4 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-primary text-[16px]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                ))}
              </div>
              <p className="font-body-sm text-xs text-on-surface leading-relaxed italic">
                "Une merveilleuse surprise au cœur de Da Nang ! La qualité du beurre feuilleté est exceptionnelle, digne des bonnes boulangeries parisiennes."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-surface-container">
              <div className="w-9 h-9 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs">
                AL
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface font-bold">Antoine Laurent</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant">Du khách Paris, Pháp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LOCATION & CONCIERGE MAP BANNER */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-surface-container-low rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm border border-outline-variant/30">
          <div className="w-full md:w-1/2 h-64 rounded-2xl overflow-hidden shadow-inner">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCo4e-OrsWBKrU9LeUZchb1ilPvIe22fcfoZsy_p0ZrqZNQK6jPvGF_Z0H4uAZHFtEIfShgvSXBzoIu0_6h6_Q06kIzFxlnQNBTM3Zqcuk48LdB7tNKvXU5Sz8I4RZ3QQfvPHYcAuE9Y8hXfZ3_rZcqUCyw-LBLDllT6jAiBDGEY03FfoZF9akJ34kw4Mlm4Gt-5Z4GXi6cOOwWPELBOmsJWL36hg-X9hjDZ8SViC3gnesOUSBQKmM')`,
              }}
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <span className="px-3 py-1 rounded-full bg-surface text-primary font-label-sm text-xs font-bold uppercase border border-outline-variant/30">
              Điểm Hẹn Sáng Tạo
            </span>
            <h3 className="font-headline-md text-xl text-on-surface font-bold">Ghé Thăm Studio Trực Tiếp</h3>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Nằm ngay trung tâm thành phố, Studio Hàm Nghi sở hữu hệ thống bếp mở vô trùng đạt chuẩn quốc tế, khu vực thưởng trà ngoài trời ngập tràn hoa lá và quầy lưu niệm trưng bày đầy đủ mẫu hộp giới hạn.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 font-label-md text-xs text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">directions_car</span>
                <span>Chỗ đỗ ô tô du lịch rộng rãi</span>
              </div>
              <div className="flex items-center gap-2 font-label-md text-xs text-on-surface">
                <span className="material-symbols-outlined text-secondary text-[20px]">language</span>
                <span>Kèm cặp song ngữ Anh - Việt</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
