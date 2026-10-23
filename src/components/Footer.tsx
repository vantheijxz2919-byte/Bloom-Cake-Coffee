import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentScreen, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ!', 'Thông báo', 'error');
      return;
    }
    showToast(`Cảm ơn bạn! Đã đăng ký nhận bản tin bánh nóng tới ${email}`, 'Đăng ký thành công', 'success');
    setEmail('');
  };

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface border-t border-outline-variant/30 mt-auto">
      {/* 3 Pillar Value Proposition */}
      <div className="bg-surface-container py-10 px-4">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[26px]">verified</span>
            </div>
            <div>
              <p className="font-headline-sm text-base text-on-surface font-bold">100% Bơ Pháp Elle &amp; Vire</p>
              <p className="font-body-sm text-xs text-on-surface-variant">Nguyên liệu nhập khẩu chuẩn vị pastry cao cấp</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[26px]">spa</span>
            </div>
            <div>
              <p className="font-headline-sm text-base text-on-surface font-bold">Matcha Uji Kyoto Thượng Hạng</p>
              <p className="font-body-sm text-xs text-on-surface-variant">Hương thơm thanh khiết, vị đượm tự nhiên</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[26px]">timer</span>
            </div>
            <div>
              <p className="font-headline-sm text-base text-on-surface font-bold">Bake Fresh Everyday</p>
              <p className="font-body-sm text-xs text-on-surface-variant">Nướng mẻ mới mỗi sáng &amp; giao hỏa tốc 30 phút</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & 6 Branches Directory */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/image_409_9964af08.png"
                alt="Bloom Cake & Coffe"
                className="w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
              />
              <span className="font-headline-md text-xl text-primary font-bold">Bloom Cake &amp; Coffe</span>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Thương hiệu bánh ngọt và coffe phong cách Gastro Pop độc đáo tại thành phố biển Đà Nẵng. Kết hợp nghệ thuật làm bánh Pháp truyền thống cùng năng lượng nhiệt đới tươi mới rực rỡ.
            </p>
            <div className="pt-2 space-y-2">
              <a
                href="tel:19008899"
                className="font-label-lg text-sm text-primary flex items-center gap-2 hover:underline"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Hotline Đặt Bánh: 1900 8899</span>
              </a>
              <a
                href="mailto:hello@bloomcakedanang.vn"
                className="font-body-sm text-xs text-on-surface-variant flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
                <span>hello@bloomcakedanang.vn</span>
              </a>
            </div>

            <div className="pt-4">
              <p className="font-headline-sm text-sm font-bold mb-1">Fresh Alerts • Bản tin bánh mới</p>
              <p className="font-body-sm text-xs text-on-surface-variant mb-3">Đăng ký nhận lịch mẻ bánh nóng và ưu đãi đặc quyền tuần này</p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-surface border border-outline-variant/60 font-body-sm text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                >
                  Đăng Ký
                </button>
              </form>
            </div>
          </div>

          {/* 6 Branches Grid */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h3 className="font-headline-md text-lg text-on-surface font-bold">Hệ Thống 6 Cơ Sở Tại Đà Nẵng</h3>
              <button
                onClick={() => setCurrentScreen('branches')}
                className="font-label-md text-xs bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Mở cửa: 07:00 - 22:30
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              <button
                onClick={() => setCurrentScreen('branches')}
                className="text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
              >
                <div className="font-label-md text-xs text-primary font-bold mb-0.5 group-hover:underline">1. Flagship Bếp Nóng</div>
                <div className="font-body-sm text-sm text-on-surface font-semibold">784 Hàm Nghi</div>
                <div className="font-body-sm text-xs text-on-surface-variant">Q. Thanh Khê, Đà Nẵng</div>
                <div className="mt-2 font-label-sm text-[11px] text-secondary font-bold">Trải nghiệm mẻ bánh tại lò</div>
              </button>

              <button
                onClick={() => setCurrentScreen('branches')}
                className="text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
              >
                <div className="font-label-md text-xs text-primary font-bold mb-0.5 group-hover:underline">2. View Cầu Rồng</div>
                <div className="font-body-sm text-sm text-on-surface font-semibold">242 Bạch Đằng</div>
                <div className="font-body-sm text-xs text-on-surface-variant">Q. Hải Châu, Đà Nẵng</div>
                <div className="mt-2 font-label-sm text-[11px] text-secondary font-bold">Ngắm sông Hàn &amp; Cầu Rồng</div>
              </button>

              <button
                onClick={() => setCurrentScreen('branches')}
                className="text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
              >
                <div className="font-label-md text-xs text-primary font-bold mb-0.5 group-hover:underline">3. Beachway Mỹ Khê</div>
                <div className="font-body-sm text-sm text-on-surface font-semibold">15 Võ Văn Kiệt</div>
                <div className="font-body-sm text-xs text-on-surface-variant">Q. Sơn Trà, Đà Nẵng</div>
                <div className="mt-2 font-label-sm text-[11px] text-secondary font-bold">Cửa ngõ ra bãi tắm Mỹ Khê</div>
              </button>

              <button
                onClick={() => setCurrentScreen('branches')}
                className="text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
              >
                <div className="font-label-md text-xs text-primary font-bold mb-0.5 group-hover:underline">4. Ocean Breeze</div>
                <div className="font-body-sm text-sm text-on-surface font-semibold">128 Võ Nguyên Giáp</div>
                <div className="font-body-sm text-xs text-on-surface-variant">Q. Ngũ Hành Sơn, Đà Nẵng</div>
                <div className="mt-2 font-label-sm text-[11px] text-secondary font-bold">Tầm nhìn trực diện biển xanh</div>
              </button>

              <button
                onClick={() => setCurrentScreen('branches')}
                className="text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
              >
                <div className="font-label-md text-xs text-primary font-bold mb-0.5 group-hover:underline">5. Retro Vintage</div>
                <div className="font-body-sm text-sm text-on-surface font-semibold">310 Phan Châu Trinh</div>
                <div className="font-body-sm text-xs text-on-surface-variant">Q. Hải Châu, Đà Nẵng</div>
                <div className="mt-2 font-label-sm text-[11px] text-secondary font-bold">Góc phố cổ kính an yên</div>
              </button>

              <button
                onClick={() => setCurrentScreen('branches')}
                className="text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
              >
                <div className="font-label-md text-xs text-primary font-bold mb-0.5 group-hover:underline">6. Gastro Corner</div>
                <div className="font-body-sm text-sm text-on-surface font-semibold">88 Nguyễn Văn Thoại</div>
                <div className="font-body-sm text-xs text-on-surface-variant">Q. Ngũ Hành Sơn, Đà Nẵng</div>
                <div className="mt-2 font-label-sm text-[11px] text-secondary font-bold">Góc phố ẩm thực sôi động</div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & quick links */}
        <div className="mt-12 pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-body-sm text-xs text-on-surface-variant">
            © 2024 Bloom Cake &amp; Coffe Đà Nẵng. All rights reserved. Tiệm bánh Gastro Pop độc quyền miền Trung.
          </p>
          <div className="flex items-center gap-6 font-label-md text-xs text-on-surface-variant">
            <button
              onClick={() => setCurrentScreen('about')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Chính sách chất lượng
            </button>
            <button
              onClick={() => setCurrentScreen('loyalty')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Quy chế Bloom Club
            </button>
            <button
              onClick={() => setCurrentScreen('branches')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Tìm đường
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
