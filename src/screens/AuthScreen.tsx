import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AuthScreen: React.FC = () => {
  const { setCurrentScreen, setMemberData, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'otp'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('0905 123 456');
  const [loginPassword, setLoginPassword] = useState('summer123');

  const [regName, setRegName] = useState('Nguyễn Hoàng Lan');
  const [regPhone, setRegPhone] = useState('0905 889 123');
  const [regDob, setRegDob] = useState('1998-06-15');
  const [regPassword, setRegPassword] = useState('password123');

  // OTP state
  const [otpPhone, setOtpPhone] = useState('0905 889 123');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMemberData({
      name: 'Lan Phương',
      phone: loginIdentifier,
      points: 2450,
      tier: 'Matcha Bloom',
      isLoggedIn: true,
      cycleStartDate: '29/04/2026',
      cycleResetDate: '29/10/2026',
      daysUntilReset: 6,
      smsNoticeSent: true,
      smsNoticeDate: '22/10/2026 09:00',
      lastSmsMessage:
        '[BLOOM CAFE] Chào Lan Phương, bạn đang có 2.450 điểm Bloom Club sắp hết hạn vào 29/10/2026 (còn 6 ngày). Hãy ghé tiệm đổi quà trước khi điểm reset về 0 nhé!',
    });
    showToast('Đăng nhập thành công! Chào mừng bạn trở lại Bloom Club.', 'Xin chào', 'success');
    setCurrentScreen('loyalty');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const future = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
    setMemberData({
      name: regName,
      phone: regPhone,
      points: 50,
      tier: 'Butter Sun',
      isLoggedIn: true,
      cycleStartDate: now.toLocaleDateString('vi-VN'),
      cycleResetDate: future.toLocaleDateString('vi-VN'),
      daysUntilReset: 180,
      smsNoticeSent: false,
    });
    showToast(
      'Tạo tài khoản thành công! Tặng bạn 50 Sweet Points chào mừng. Chu kỳ tích điểm 6 tháng đã bắt đầu.',
      'Chào mừng hội viên mới',
      'success'
    );
    setCurrentScreen('loyalty');
  };

  const handleSendOtp = (channel: string) => {
    if (!otpPhone.trim()) {
      showToast('Vui lòng nhập số điện thoại trước!', 'Thông báo', 'error');
      return;
    }
    setIsOtpSent(true);
    showToast(`Đã gửi mã xác nhận 4 số qua ${channel}!`, 'OTP gửi đi', 'info');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    setIsOtpVerified(true);
    setMemberData({
      name: 'Lan Phương ✨',
      phone: otpPhone,
      points: 380,
      tier: 'Matcha Bloom',
      isLoggedIn: true,
      cycleStartDate: '29/04/2026',
      cycleResetDate: '29/10/2026',
      daysUntilReset: 6,
      smsNoticeSent: true,
      smsNoticeDate: '22/10/2026 09:00',
    });
    showToast('Xác thực OTP thành công! Đã tải dữ liệu Sweet Points của bạn.', 'Xác thực', 'success');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex items-center justify-center">
      <div className="w-full bg-surface-container-lowest rounded-3xl lg:rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(185,0,64,0.12)] border border-outline-variant/30 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* LEFT PANEL: Hero / Brand Privilege Card (5 cols) */}
          <section className="lg:col-span-5 bg-gradient-to-br from-surface-container-high via-surface-container-low to-primary-fixed/30 p-7 lg:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-outline-variant/30">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/15 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-4 -left-12 w-48 h-48 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 bg-primary text-on-primary px-3.5 py-1.5 rounded-full shadow-sm text-xs font-label-md tracking-wider uppercase font-bold">
                <img
                  src="/assets/aistudio/image_409_9964af08.png"
                  alt="Bloom Logo"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-white/50"
                />
                <span>Đà Nẵng Artisan Bakery • Bloom Club</span>
              </div>

              {/* Title & Pitch */}
              <div>
                <h1 className="text-2xl lg:text-3xl leading-tight">
                  <span className="font-display-custom text-2xl lg:text-3xl font-bold text-on-surface block mb-1 tracking-tight">
                    Gia Nhập Bloom Club
                  </span>
                  <span className="font-script text-4xl lg:text-5xl text-black font-normal block leading-none py-1">
                    Trọn Vị Ngọt Ngào Bên Biển Đà Nẵng
                  </span>
                </h1>
                <p className="font-body-md text-on-surface-variant text-xs sm:text-sm mt-2.5 leading-relaxed">
                  Cộng đồng dành riêng cho tín đồ say mê cốt bánh bơ Pháp giòn xốp và Uji Matcha Kyoto thượng hạng tại 6 chi nhánh Đà Nẵng.
                </p>
              </div>

              {/* Brand Visual Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <div
                  className="w-full h-44 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKC0AuPr0I1GAQUpFjZdR_x0SAgwunmgjg7BOvJxti-1aGpBVWbR4xx6XNz7xQv4qqmI5DrC1vyw8Gud9T0T8_0nzE1ZWryVABbrP9U_ERPsMwYLkrtLFvsLr3irD4rI6YBdl06tzO2pkJNcLyMrRgF0Et7Gn5U_MAhB1ha4n8UaO5HE8JP-y8_IIdV4ZyAcHD2j11asmjjHLayPS5Br8AfDOjcp1-6hvNRbMhZfI9Tb3rAs7kb9M')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-label-sm font-bold shadow-sm backdrop-blur-sm">
                    <span className="material-symbols-outlined text-xs">eco</span>
                    100% Bơ Pháp &amp; Uji Matcha Kyoto
                  </span>
                </div>
              </div>

              {/* Member Privileges List */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-1.5 font-label-md text-xs uppercase tracking-wider font-bold text-primary">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Đặc quyền thành viên độc quyền</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur border border-outline-variant/30 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">stars</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-xs font-bold text-on-surface">Tích điểm 5% - 10%</p>
                      <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Quy đổi trực tiếp cho mọi mẻ bánh nướng mới
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur border border-outline-variant/30 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">cake</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-xs font-bold text-on-surface">Voucher sinh nhật 50.000đ</p>
                      <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Món quà ngọt ngào riêng cho tháng sinh của bạn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur border border-outline-variant/30 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-primary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">upgrade</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-xs font-bold text-on-surface">Miễn phí nâng size Matcha Uji</p>
                      <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Áp dụng vào mỗi thứ 4 hàng tuần cho dòng Cold Foam &amp; Latte
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur border border-outline-variant/30 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">moped</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-xs font-bold text-on-surface">
                        Đồng bộ 6 chi nhánh &amp; Giao hỏa tốc
                      </p>
                      <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Giao giỏ bánh nóng tới tận khách sạn &amp; resort Đà Nẵng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-5 mt-5 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-primary text-base">pin_drop</span>
                Hải Châu • Sơn Trà • Ngũ Hành Sơn
              </span>
              <span className="font-semibold text-primary">#BloomBakeryDaNang</span>
            </div>
          </section>

          {/* RIGHT PANEL: Interactive Login / Register / OTP Portals (7 cols) */}
          <section className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-surface-container-lowest">
            <div>
              {/* Tab Switcher */}
              <div className="flex items-center bg-surface-container-low p-1.5 rounded-full mb-8 border border-outline-variant/20 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2.5 px-4 rounded-full font-label-md text-xs font-bold transition-all text-center cursor-pointer ${
                    activeTab === 'login'
                      ? 'text-on-primary bg-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2.5 px-4 rounded-full font-label-md text-xs font-bold transition-all text-center cursor-pointer ${
                    activeTab === 'register'
                      ? 'text-on-primary bg-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Đăng Ký Thành Viên
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('otp')}
                  className={`flex-1 py-2.5 px-3 rounded-full font-label-md text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'otp'
                      ? 'text-on-primary bg-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm text-secondary">bolt</span>
                  <span>1-Chạm OTP</span>
                </button>
              </div>

              {/* FORM 1: LOGIN */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-5 animate-fadeIn">
                  <div>
                    <label className="block font-label-md text-xs font-bold text-on-surface mb-2">
                      Số điện thoại hoặc Email
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
                        person
                      </span>
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="0905 xxx xxx hoặc banhngot@bloomcake.vn"
                        className="w-full bg-surface-bright text-on-surface placeholder:text-outline font-body-md text-xs pl-12 pr-4 py-3.5 rounded-full border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block font-label-md text-xs font-bold text-on-surface">Mật khẩu</label>
                      <button
                        type="button"
                        onClick={() =>
                          showToast('Liên kết đặt lại mật khẩu đã gửi qua tin nhắn SMS/Email', 'Khôi phục', 'info')
                        }
                        className="font-label-sm text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
                        lock
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-surface-bright text-on-surface placeholder:text-outline font-body-md text-xs pl-12 pr-12 py-3.5 rounded-full border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded-full transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      defaultChecked
                      id="remember-me"
                      type="checkbox"
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="font-body-sm text-xs text-on-surface-variant cursor-pointer select-none">
                      Duy trì đăng nhập trên thiết bị này
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs font-bold py-3.5 rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <span>Đăng Nhập Bloom Club</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </form>
              )}

              {/* FORM 2: REGISTER */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block font-label-md text-xs font-bold text-on-surface mb-1.5">
                      Họ và Tên
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
                        badge
                      </span>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Nguyễn Hoàng Lan"
                        className="w-full bg-surface-bright text-on-surface placeholder:text-outline font-body-md text-xs pl-12 pr-4 py-3 rounded-full border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-label-md text-xs font-bold text-on-surface mb-1.5">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg">
                          call
                        </span>
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="0905 123 456"
                          className="w-full bg-surface-bright text-on-surface placeholder:text-outline font-body-md text-xs pl-10 pr-3 py-3 rounded-full border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-md text-xs font-bold text-on-surface mb-1.5">
                        Ngày sinh (Nhận quà)
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg">
                          cake
                        </span>
                        <input
                          type="date"
                          value={regDob}
                          onChange={(e) => setRegDob(e.target.value)}
                          className="w-full bg-surface-bright text-on-surface placeholder:text-outline font-body-md text-xs pl-10 pr-3 py-2.5 rounded-full border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-md text-xs font-bold text-on-surface mb-1.5">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
                        lock
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Tối thiểu 6 ký tự"
                        className="w-full bg-surface-bright text-on-surface placeholder:text-outline font-body-md text-xs pl-12 pr-12 py-3 rounded-full border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded-full transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      defaultChecked
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 mt-0.5 rounded text-secondary focus:ring-secondary accent-secondary cursor-pointer"
                      required
                    />
                    <label htmlFor="terms" className="font-body-sm text-xs text-on-surface-variant cursor-pointer leading-relaxed">
                      Tôi đồng ý với điều khoản thành viên và chấp thuận đồng bộ điểm tích lũy tại toàn bộ 6 chi nhánh Đà Nẵng.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-xs font-bold py-3.5 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <span>Tạo Tài Khoản &amp; Nhận Quà Chào Mừng</span>
                    <span className="material-symbols-outlined text-lg">redeem</span>
                  </button>
                </form>
              )}

              {/* FORM 3: FAST OTP */}
              {activeTab === 'otp' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="bg-surface-container-low p-4 rounded-2xl flex items-start gap-3.5 border border-outline-variant/30">
                    <div className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">speed</span>
                    </div>
                    <div>
                      <p className="font-label-md text-xs font-bold text-on-surface">Tra cứu 1-Chạm không cần nhớ mật khẩu</p>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        Nhập số điện thoại để nhận mã OTP qua Zalo hoặc SMS, kiểm tra nhanh Sweet Points và tiến độ giao mẻ bánh nóng.
                      </p>
                    </div>
                  </div>

                  {!isOtpSent ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-label-md text-xs font-bold text-on-surface mb-2">
                          Số điện thoại thành viên
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
                            phone_iphone
                          </span>
                          <input
                            type="tel"
                            value={otpPhone}
                            onChange={(e) => setOtpPhone(e.target.value)}
                            placeholder="0905 xxx xxx"
                            className="w-full bg-surface-bright text-on-surface placeholder:text-outline font-body-md text-xs pl-12 pr-4 py-3.5 rounded-full border border-outline-variant/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all shadow-sm outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleSendOtp('Zalo')}
                          className="py-3 px-4 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs font-bold rounded-full border border-outline-variant/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                            Z
                          </span>
                          <span>Gửi mã qua Zalo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendOtp('SMS')}
                          className="py-3 px-4 bg-secondary text-on-secondary font-label-md text-xs font-bold rounded-full shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">sms</span>
                          <span>Gửi SMS OTP</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-label-sm text-xs font-semibold text-on-surface-variant">
                          Nhập 4 số mã xác nhận:
                        </span>
                        <button
                          type="button"
                          onClick={() => showToast('Đang gửi lại mã xác thực mới qua SMS/Zalo...', 'Gửi lại', 'info')}
                          className="font-label-sm text-xs font-bold text-primary hover:underline cursor-pointer"
                        >
                          Gửi lại (45s)
                        </button>
                      </div>

                      <div className="flex justify-center gap-4">
                        {[0, 1, 2, 3].map((idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={otpDigits[idx]}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            className="w-14 h-14 text-center text-2xl font-headline-md font-bold rounded-2xl bg-surface-container-low focus:bg-surface-bright focus:ring-2 focus:ring-secondary outline-none border border-outline-variant/40"
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="w-full bg-secondary text-on-secondary font-label-lg text-xs font-bold py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        <span>Xác Nhận &amp; Xem Điểm Thưởng</span>
                      </button>
                    </div>
                  )}

                  {isOtpVerified && (
                    <div className="bg-surface-container-lowest rounded-2xl p-4 space-y-3 shadow-md border border-outline-variant/40 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-wider">
                            Hội Viên Thân Thiết
                          </span>
                          <h4 className="font-headline-sm text-sm text-on-surface font-bold">Chào Lan Phương ✨</h4>
                        </div>
                        <div className="bg-primary-fixed text-primary px-3.5 py-1.5 rounded-full font-headline-sm text-xs font-bold">
                          380 Sweet Points
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-lg">moped</span>
                          <span className="font-medium text-on-surface">Đơn #DN-8842 đang nướng giòn</span>
                        </div>
                        <span className="text-secondary font-bold">Dự kiến 15 phút</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Social Quick Login */}
              {activeTab !== 'otp' && (
                <>
                  <div className="relative my-7 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-outline-variant/40"></div>
                    </div>
                    <span className="relative px-4 bg-surface-container-lowest font-body-sm text-xs text-outline font-medium">
                      Hoặc đăng nhập nhanh qua
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => showToast('Đang kết nối tài khoản Google...', 'Liên kết', 'info')}
                      className="flex items-center justify-center gap-2 py-3 px-3 bg-surface-container-low hover:bg-surface-container rounded-full text-xs font-label-md font-semibold text-on-surface border border-outline-variant/30 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.8 5 12 5z" fill="#EA4335"></path>
                        <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4"></path>
                        <path d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z" fill="#FBBC05"></path>
                        <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.4-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z" fill="#34A853"></path>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Đang mở xác thực Zalo Login...', 'Liên kết', 'info')}
                      className="flex items-center justify-center gap-2 py-3 px-3 bg-surface-container-low hover:bg-surface-container rounded-full text-xs font-label-md font-semibold text-on-surface border border-outline-variant/30 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                        Z
                      </span>
                      <span>Zalo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Đang xác thực qua Apple ID...', 'Liên kết', 'info')}
                      className="flex items-center justify-center gap-2 py-3 px-3 bg-surface-container-low hover:bg-surface-container rounded-full text-xs font-label-md font-semibold text-on-surface border border-outline-variant/30 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base shrink-0">phone_iphone</span>
                      <span>Apple ID</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Trust, Security & Fast Support Footer */}
            <div className="mt-8 pt-5 border-t border-outline-variant/30 space-y-2.5">
              <div className="flex items-center justify-center gap-2 text-on-surface-variant text-xs text-center font-medium">
                <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
                <span>Mã hoá 256-bit chuẩn PCI-DSS. Bảo mật tuyệt đối thông tin hội viên.</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-on-surface-variant">
                <span>
                  Hỗ trợ nhanh: <a className="text-primary hover:underline" href="tel:19008899">Hotline 1900 8899</a>
                </span>
                <span className="text-outline-variant">•</span>
                <a
                  className="text-secondary hover:underline cursor-pointer"
                  onClick={() => showToast('Đang kết nối tới Zalo CSKH Bloom Cake...', 'CSKH', 'info')}
                >
                  Zalo CSKH
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
