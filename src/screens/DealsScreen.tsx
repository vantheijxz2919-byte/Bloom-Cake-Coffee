import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FLASH_SALE_ITEMS, COMBOS, VOUCHERS, SOUVENIRS } from '../data/mockData';

export const DealsScreen: React.FC = () => {
  const { addToCart, applyVoucher, showToast } = useApp();

  // Live countdown timer simulation
  const [secondsLeft, setSecondsLeft] = useState(6 * 3600 + 41 * 60 + 38);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 12 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600).toString().padStart(2, '0');
  const mins = Math.floor((secondsLeft % 3600) / 60).toString().padStart(2, '0');
  const secs = (secondsLeft % 60).toString().padStart(2, '0');

  const copyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        applyVoucher(code);
        showToast(`Đã lưu mã ${code} vào bộ nhớ tạm!`, 'Sao chép thành công', 'success');
      });
    } else {
      applyVoucher(code);
      showToast(`Đã áp dụng mã ${code}!`, 'Sao chép thành công', 'success');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner: Gastro Pop Sun-drenched Vignette */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-surface-container-high/60 via-surface-container-low to-surface pb-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-8">
          {/* Breadcrumbs & Meta Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 font-label-md text-xs text-on-surface-variant">
              <span>Trang chủ</span>
              <span className="opacity-40">/</span>
              <span className="text-primary font-bold">Ưu Đãi Đặc Biệt Đà Nẵng</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs tracking-wide uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span>Bếp Bánh Nóng Cập Nhật: 07:00 &amp; 14:00 Mỗi Ngày</span>
            </div>
          </div>

          {/* Hero Header Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-xs font-bold shadow-sm -rotate-1">
                <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                <span>GASTRO POP DEALS • MÙA HÈ ĐÀ NẴNG</span>
              </div>
              <h1 className="font-headline-lg text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">
                <span className="font-display-custom font-bold">Thưởng Thức Vị Ngọt</span> <br />
                <span className="font-script text-black text-5xl lg:text-6xl font-normal leading-tight px-1">
                  Ưu Đãi Vàng
                </span>{' '}
                <span className="font-display-custom font-bold">Trong Ngày</span>
              </h1>
              <p className="font-body-lg text-base text-on-surface-variant max-w-xl leading-relaxed">
                Hương bơ Pháp thơm nồng hòa quyện cùng vị biển miền Trung. Tiết kiệm tới 28% cho mẻ bánh nướng nóng sốt, trà sữa Uji chuẩn Kyoto và set quà lưu niệm thủ công.
              </p>

              {/* Live Timer Capsule */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-surface-container-lowest shadow-[0_4px_20px_rgba(39,24,20,0.06)] border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[22px]">hourglass_top</span>
                  <span className="font-label-md text-xs text-on-surface-variant">Kết thúc sau:</span>
                  <div className="flex items-center gap-1 font-headline-sm text-base text-primary font-bold">
                    <span className="bg-primary-fixed/60 px-2 py-0.5 rounded-md">{hours}</span>
                    <span>:</span>
                    <span className="bg-primary-fixed/60 px-2 py-0.5 rounded-md">{mins}</span>
                    <span>:</span>
                    <span className="bg-primary-fixed/60 px-2 py-0.5 rounded-md">{secs}</span>
                  </div>
                </div>
                <a
                  href="#sale-vang"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label-lg text-xs font-bold shadow-[0_8px_24px_rgba(227,23,84,0.28)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Săn Bánh Nóng Ngay</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
              </div>
            </div>

            {/* Hero Bento Graphic Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-surface-container-lowest p-4 shadow-[0_16px_40px_rgba(39,24,20,0.08)] border border-outline-variant/30">
                <div className="relative h-72 rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBw2RIaz_e-RQLW-q88uLhBxbkGMVsrVecd0Bm2XThVBp-aoGbC2mNr5hL_RyYeb_HPp5EmC5YaYHaJTLG4y8tWKFEpbmS7xXNlmbCISteapKKqQsUsNbeXc-GfmZc5Q0X5uXx18dL2aifRXFap4ZPZ3AY7POJJfEChJlPqsIR3oQ9CgpajGrXbZWPbXBX0dWe767wotBgzj9ZmqoLGG2QLriuWMTGn0ZJCKqPJqcJQ3hR5Z-GW_o')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent flex items-end p-5">
                    <span className="text-surface font-headline-sm text-base font-bold">
                      Thực đơn bơ Pháp &amp; Matcha nguyên bản
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-primary text-on-primary font-label-md text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md rotate-2">
                    GIẢM ĐẾN 28%
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-surface-container-low">
                    <div className="font-headline-sm text-base text-primary font-bold">100%</div>
                    <div className="font-label-sm text-[10px] text-on-surface-variant">Bơ Pháp Elle &amp; Vire</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low">
                    <div className="font-headline-sm text-base text-secondary font-bold">Uji</div>
                    <div className="font-label-sm text-[10px] text-on-surface-variant">Kyoto Thượng Hạng</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low">
                    <div className="font-headline-sm text-base text-on-surface font-bold">30 Phút</div>
                    <div className="font-label-sm text-[10px] text-on-surface-variant">Hỏa tốc nội thành</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Sale Vàng Trong Ngày */}
      <section className="w-full py-14 max-w-[1280px] mx-auto px-4 lg:px-8" id="sale-vang">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs uppercase mb-2 font-bold">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Bake Fresh Everyday • Giới Hạn Theo Mẻ</span>
            </div>
            <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Sale Vàng Trong Ngày</h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Bánh nướng mới ra lò &amp; thức uống đặc trưng với giá ưu đãi tốt nhất hôm nay
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-md text-xs text-on-surface-variant">Cơ sở còn hàng nhiều nhất:</span>
            <span className="font-label-md text-xs bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold">
              784 Hàm Nghi &amp; 242 Bạch Đằng
            </span>
          </div>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {FLASH_SALE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-surface-container-lowest p-4 flex flex-col justify-between shadow-[0_4px_20px_rgba(39,24,20,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all border border-outline-variant/30 group"
            >
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden bg-surface-container mb-4">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.name}
                    src={item.image}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-primary-container text-on-primary-container font-label-md text-xs font-bold px-2.5 py-1 rounded-full shadow-md -rotate-2">
                    {item.discount}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-[10px] text-on-surface font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-primary">cake</span>
                    <span>{item.featureBadge}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-label-sm text-[10px] uppercase text-secondary font-bold">
                    {item.category}
                  </span>
                  <span className="font-label-sm text-[10px] text-error font-semibold flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                    {item.stockText}
                  </span>
                </div>
                <h3 className="font-headline-sm text-sm text-on-surface font-bold line-clamp-1 mb-1">
                  {item.name}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mb-3">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-headline-md text-base text-primary font-bold">
                    {item.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="font-body-sm text-xs text-outline line-through">
                    {item.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  className="w-full py-2.5 px-4 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>Thêm Vào Giỏ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Gastro Pairing Sets (Combo Tiết Kiệm) */}
      <section className="w-full py-16 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs uppercase font-bold mb-2">
                <span className="material-symbols-outlined text-[16px]">dinner_dining</span>
                <span>Gastro Pop Pairing • Chuẩn Vị &amp; Tiết Kiệm</span>
              </div>
              <h2 className="font-headline-lg text-3xl text-on-surface">
                <span className="font-display-custom font-bold">Combo Thưởng Thức</span>{' '}
                <span className="font-script text-black text-4xl font-normal">Tiết Kiệm</span>
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant">
                Sự kết hợp hoàn hảo giữa hương vị bánh bơ Pháp và thức uống biểu tượng của Bloom Cake
              </p>
            </div>
            <div className="flex items-center gap-2 font-label-md text-xs text-on-surface-variant font-bold">
              <span className="material-symbols-outlined text-secondary">takeout_dining</span>
              <span>Hỗ trợ đóng hộp mang đi biển tiện lợi</span>
            </div>
          </div>

          {/* 3 Gastro Combo Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {COMBOS.map((combo) => (
              <div
                key={combo.id}
                className="rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-[0_6px_24px_rgba(39,24,20,0.06)] hover:shadow-xl transition-all relative overflow-hidden group border border-outline-variant/30"
              >
                {combo.badge && (
                  <div className="absolute top-3 right-3 bg-primary text-on-primary font-label-sm text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-10">
                    {combo.badge}
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold">
                      {combo.savings}
                    </span>
                    <span className="font-label-sm text-xs text-on-surface-variant">{combo.category}</span>
                  </div>

                  <div className="relative h-52 rounded-2xl overflow-hidden bg-surface-container mb-5">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={combo.name}
                      src={combo.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent flex items-end p-4">
                      <span className="font-label-md text-xs text-white font-semibold">{combo.title}</span>
                    </div>
                  </div>

                  <h3 className="font-headline-md text-lg text-on-surface mb-2 font-bold">{combo.name}</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                    {combo.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {combo.items.map((itemStr, idx) => (
                      <div key={idx} className="flex items-center gap-2 font-body-sm text-xs text-on-surface">
                        <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                        <span>{itemStr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-headline-md text-base text-primary font-bold">
                      {combo.price.toLocaleString('vi-VN')}đ
                    </div>
                    <div className="font-label-sm text-xs text-outline line-through">
                      Giá gốc: {combo.originalPrice.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        name: combo.name,
                        price: combo.price,
                        image: combo.image,
                      })
                    }
                    className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>Chọn Combo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Quà Lưu Niệm Ưu Đãi */}
      <section className="w-full py-16 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs uppercase font-bold mb-2">
              <span className="material-symbols-outlined text-[16px]">redeem</span>
              <span>Đặc Sản Du Lịch • Mang Đà Nẵng Về Nhà</span>
            </div>
            <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Quà Lưu Niệm Ưu Đãi</h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Bộ sưu tập bánh khô nướng bơ cao cấp &amp; dụng cụ pha trà độc quyền của Bloom Cake
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-label-sm text-xs bg-surface-container px-3 py-1.5 rounded-full text-on-surface font-semibold">
              Đóng gói chống sốc hàng không chuẩn 100%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SOUVENIRS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-[0_4px_24px_rgba(39,24,20,0.06)] hover:-translate-y-1 transition-all border border-outline-variant/30"
            >
              <div>
                <div className="relative h-60 rounded-2xl overflow-hidden bg-surface-container mb-5">
                  <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                  <div className="absolute top-3 left-3 bg-primary text-on-primary font-label-md text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {item.badge}
                  </div>
                </div>

                <div className="flex items-center justify-between text-label-sm text-xs text-on-surface-variant mb-1 font-bold">
                  <span>{item.type}</span>
                  <span className="text-secondary">Chính hãng</span>
                </div>

                <h3 className="font-headline-sm text-base text-on-surface font-bold mb-2">{item.name}</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="bg-surface-container-low p-3 rounded-xl mb-4 space-y-1">
                  <div className="font-label-sm text-xs text-primary font-bold">Đặc quyền đi kèm:</div>
                  <div className="font-body-sm text-xs text-on-surface">{item.perk}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-3">
                <div>
                  <div className="font-headline-md text-base text-primary font-bold">
                    {item.price.toLocaleString('vi-VN')}đ
                  </div>
                  {item.originalPrice && (
                    <div className="font-label-sm text-xs text-outline line-through">
                      Gốc: {item.originalPrice.toLocaleString('vi-VN')}đ
                    </div>
                  )}
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Mua Kèm Quà Tặng
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Voucher Wallet & Hướng Dẫn Áp Dụng */}
      <section className="w-full py-16 bg-surface-container">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs uppercase font-bold mb-3">
              <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
              <span>Kho Mã Giảm Giá Độc Quyền</span>
            </div>
            <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Mã Ưu Đãi Du Lịch Đà Nẵng</h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Nhấp sao chép mã và dán tại bước thanh toán online hoặc đưa mã QR cho nhân viên thu ngân tại 6 cơ sở Bloom Cake
            </p>
          </div>

          {/* 3 Voucher Tickets Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {VOUCHERS.map((v) => (
              <div
                key={v.code}
                className="rounded-2xl bg-surface-container-lowest p-6 shadow-md border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold">
                      {v.category}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[24px]">{v.icon}</span>
                  </div>
                  <div className="font-headline-lg text-xl text-primary font-bold mb-1">{v.title}</div>
                  <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                    {v.discountDesc}
                  </p>
                </div>
                <div className="pt-4 border-t border-dashed border-outline-variant/60 flex items-center justify-between gap-2">
                  <div className="bg-surface-container px-3.5 py-2 rounded-lg font-headline-sm text-sm text-on-surface tracking-wider font-bold">
                    {v.code}
                  </div>
                  <button
                    onClick={() => copyCode(v.code)}
                    className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-xs font-bold hover:bg-primary-container transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>Sao Chép</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Step-by-Step Guide Box */}
          <div className="rounded-2xl bg-surface-container-lowest p-8 shadow-sm border border-outline-variant/30">
            <h3 className="font-headline-md text-lg text-on-surface mb-6 flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-primary">help</span>
              <span>4 Bước Đơn Giản Để Sử Dụng Ưu Đãi</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary font-headline-sm text-sm font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <p className="font-label-lg text-sm text-on-surface mb-1 font-bold">Chọn món ngon</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Lựa chọn các món nướng trong danh mục Sale Vàng hoặc Combo tiết kiệm vào giỏ hàng.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary font-headline-sm text-sm font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <p className="font-label-lg text-sm text-on-surface mb-1 font-bold">Sao chép mã voucher</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Nhấp nút "Sao Chép" vào mã ưu đãi phù hợp nhất với đơn hàng của bạn phía trên.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary font-headline-sm text-sm font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <p className="font-label-lg text-sm text-on-surface mb-1 font-bold">Áp dụng tại thanh toán</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Dán mã vào ô "Mã giảm giá" tại bước giỏ hàng hoặc đọc mã trực tiếp cho thu ngân.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary font-headline-sm text-sm font-bold flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <p className="font-label-lg text-sm text-on-surface mb-1 font-bold">Nhận bánh hỏa tốc</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Bếp nướng mẻ mới và shipper giao tận tay trong 30 phút khắp khu vực nội thành Đà Nẵng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Gastro Pop Call to Action Strip */}
      <section className="w-full py-12 bg-primary-container text-on-primary-container">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="font-headline-lg text-xl font-bold">Đặt Bánh Sự Kiện Hay Du Lịch Nhóm?</h3>
            <p className="font-body-md text-sm opacity-90">
              Nhận tư vấn thiết kế bánh sinh nhật nghệ thuật và set quà lưu niệm doanh nghiệp với chiết khấu tới 25%.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:19008899"
              className="px-6 py-3 rounded-full bg-surface text-on-surface font-label-lg text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">call</span>
              <span>Hotline: 1900 8899</span>
            </a>
            <button
              onClick={() => showToast('Đội ngũ CSKH sẽ liên hệ báo giá nhóm trong 15 phút!', 'Yêu cầu gửi đi', 'info')}
              className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-surface font-label-lg text-xs font-bold hover:bg-white/30 transition-all cursor-pointer"
            >
              Yêu Cầu Báo Giá Nhanh
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
