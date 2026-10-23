import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LoyaltyScreen: React.FC = () => {
  const { memberData, setMemberData, showToast } = useApp();
  const [phoneSearch, setPhoneSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSmsModal, setShowSmsModal] = useState<boolean>(false);
  const [smsTestSent, setSmsTestSent] = useState<boolean>(false);

  const daysUntilReset = memberData.daysUntilReset ?? 6;
  const cycleResetDate = memberData.cycleResetDate || '29/10/2026';
  const cycleStartDate = memberData.cycleStartDate || '29/04/2026';

  const handleSearchLoyalty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneSearch.trim()) return;

    setMemberData({
      name: 'Hồng Anh (Bloom Lover)',
      phone: phoneSearch,
      points: 2450,
      tier: 'Matcha Bloom',
      isLoggedIn: true,
      cycleStartDate: '29/04/2026',
      cycleResetDate: '29/10/2026',
      daysUntilReset: 6,
      smsNoticeSent: true,
      smsNoticeDate: '22/10/2026 09:00',
      lastSmsMessage: `[BLOOM CAFE] Chào Hồng Anh, bạn đang có 2.450 điểm Bloom Club sắp hết hạn vào ngày 29/10/2026 (còn 6 ngày). Hãy ghé Bloom Cake & Coffe đổi quà bánh ngọt trước khi điểm reset về 0 nhé! Hotline: 0236 388 7844.`,
    });

    showToast('Đã cập nhật số dư điểm & quyền lợi thành viên của bạn!', 'Tra cứu thành công', 'success');
  };

  const handleTriggerTestSms = () => {
    setSmsTestSent(true);
    showToast(
      `Đã phát lệnh gửi SMS nhắc nhở reset điểm chu kỳ 6 tháng tới SĐT ${memberData.phone}!`,
      'SMS Brandname đã gửi',
      'success'
    );
  };

  const handleRedeem = (item: string, pts: number) => {
    if (memberData.points < pts) {
      showToast(`Bạn cần thêm ${pts - memberData.points} điểm để đổi ${item}`, 'Chưa đủ điểm', 'error');
      return;
    }

    setMemberData((prev) => ({
      ...prev,
      points: prev.points - pts,
    }));

    showToast(`Đã trừ ${pts} Pts. Đưa mã xác nhận tại quầy để nhận "${item}" nhé!`, 'Đổi quà thành công', 'success');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO BANNER: GASTRO POP CANDY AESTHETIC */}
      <section className="relative overflow-hidden bg-surface-container-high py-16 px-4 md:px-8 lg:px-12">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary-fixed/60 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-secondary-fixed/50 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-on-primary shadow-sm -rotate-1 font-bold">
              <span className="material-symbols-outlined text-[18px]">loyalty</span>
              <span className="font-label-sm text-xs uppercase tracking-wider">Bloom Club Privilege Pass</span>
            </div>
            <h1 className="font-headline-lg text-4xl lg:text-5xl text-on-surface leading-tight">
              <span className="font-display-custom font-bold">Tích Điểm </span>
              <span className="font-script text-black text-5xl lg:text-6xl font-normal inline-block align-middle px-1">
                Ngọt Ngào,
              </span>
              <br />
              <span className="font-script text-black inline-block text-5xl lg:text-6xl font-normal mr-2">
                Nhận Ngàn
              </span>
              <span className="font-display-custom font-bold text-primary-container">Quà Tặng!</span>
            </h1>
            <p className="font-body-lg text-base text-on-surface-variant max-w-xl leading-relaxed">
              Tham gia cộng đồng người yêu bánh ngọt &amp; cafe ven biển miền Trung. Tích lũy{' '}
              <span className="font-bold text-primary">5% - 10%</span> giá trị mọi hóa đơn tại trọn bộ 6 chi nhánh Đà Nẵng và hệ thống đặt hỏa tốc trực tuyến.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#lookup-section"
                className="px-7 py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                <span>Tra Cứu / Mở Thẻ Ngay</span>
              </a>
              <a
                href="#reward-store"
                className="px-7 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-xs font-bold shadow-sm hover:bg-surface-container transition-all flex items-center gap-2 cursor-pointer border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[20px]">redeem</span>
                <span>Kho Đổi Thưởng</span>
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm text-center border border-outline-variant/20">
                <span className="font-headline-md text-xl text-primary font-bold">6 C/S</span>
                <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Tích điểm tức thì</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm text-center border border-outline-variant/20">
                <span className="font-headline-md text-xl text-secondary font-bold">1đ = 1 Điểm</span>
                <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Tỷ lệ quy đổi thực</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm text-center border border-outline-variant/20">
                <span className="font-headline-md text-xl text-primary-container font-bold">Chu kỳ 6T</span>
                <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Reset &amp; SMS báo trước 7 ngày</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl p-6 bg-gradient-to-tr from-primary via-primary-container to-inverse-primary text-on-primary shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/aistudio/image_409_9964af08.png"
                    alt="Bloom Cake & Coffe"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50 shadow-md"
                  />
                  <div>
                    <p className="font-headline-sm text-base leading-none font-bold">Bloom Pass</p>
                    <p className="font-label-sm text-[10px] opacity-80 mt-1">Đà Nẵng Coastal Bakery</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-white font-label-sm text-[10px] backdrop-blur-md uppercase font-bold tracking-wide">
                  VIP GASTRO
                </span>
              </div>
              <div className="my-6 space-y-1">
                <p className="font-label-sm text-[10px] tracking-widest uppercase opacity-75">Chủ thẻ thành viên</p>
                <p className="font-headline-md text-lg tracking-wider font-bold">NGUYEN HOANG YEN</p>
                <p className="font-body-sm text-xs opacity-85">
                  Điểm khả dụng: <span className="font-bold text-white text-base">4.850 Pts</span>
                </p>
              </div>
              <div className="flex items-end justify-between pt-4 border-t border-white/20">
                <div>
                  <p className="font-label-sm text-[10px] opacity-70">Thành viên từ</p>
                  <p className="font-label-md text-xs font-bold">06 / 2023</p>
                </div>
                <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center">
                  <svg className="w-full h-full text-on-surface fill-current" viewBox="0 0 24 24">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10-2h4v2h-4v-2zm4 2h4v2h-4v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v4h-2v-4z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-on-secondary px-5 py-3 rounded-2xl shadow-lg -rotate-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">cake</span>
              <span className="font-label-md text-xs font-bold">Tặng Bánh Sinh Nhật &amp; Trà Uji</span>
            </div>
          </div>
        </div>
      </section>

      {/* FORM TRA CỨU ĐIỂM & ĐĂNG KÝ NHANH */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-16 -mt-8 relative z-20" id="lookup-section">
        <div className="bg-surface-container-lowest rounded-3xl shadow-xl p-6 md:p-10 border border-outline-variant/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs uppercase font-bold">
                <span className="material-symbols-outlined text-[16px]">touch_app</span>
                Tra Cứu Siêu Tốc
              </div>
              <h2 className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold">
                Kiểm Tra Điểm &amp; Quét QR Tại Quầy
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Nhập số điện thoại đăng ký mua bánh tại quầy hoặc ứng dụng giao hàng để xem ngay số điểm khả dụng, voucher đặc quyền và mã barcode quét thanh toán.
              </p>
              <form className="space-y-4 pt-2" onSubmit={handleSearchLoyalty}>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                  </span>
                  <input
                    type="tel"
                    value={phoneSearch}
                    onChange={(e) => setPhoneSearch(e.target.value)}
                    placeholder="Nhập số điện thoại (ví dụ: 0905 123 456)"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-xs placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-outline-variant/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-xs font-bold shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  <span>Tra Cứu Quyền Lợi &amp; Điểm Thưởng</span>
                </button>
              </form>
              <div className="flex items-center gap-2 pt-2 text-on-surface-variant font-label-sm text-[11px]">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                <span>Chưa từng đăng ký? Hệ thống tự động kích hoạt tài khoản ngay lần tra cứu đầu tiên!</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 md:p-8 rounded-3xl bg-surface-container-low transition-all duration-300 border border-outline-variant/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-surface-container-high">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md text-xl font-bold shadow-inner">
                      8%
                    </div>
                    <div>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <h3 className="font-headline-md text-lg text-on-surface font-bold">{memberData.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold">
                          {memberData.tier}
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        SĐT: {memberData.phone} • Chi nhánh quen: 242 Bạch Đằng
                      </p>
                    </div>
                  </div>
                  {/* QR Code */}
                  <div className="bg-surface-container-lowest p-3 rounded-2xl text-center shadow-sm flex flex-col items-center border border-outline-variant/20">
                    <div className="w-20 h-20 bg-surface-container-high rounded-xl p-1 flex items-center justify-center">
                      <svg className="w-full h-full text-on-surface fill-current" viewBox="0 0 100 100">
                        <rect height="30" rx="3" width="30" x="5" y="5"></rect>
                        <rect fill="#fff" height="20" width="20" x="10" y="10"></rect>
                        <rect height="10" width="10" x="15" y="15"></rect>
                        <rect height="30" rx="3" width="30" x="65" y="5"></rect>
                        <rect fill="#fff" height="20" width="20" x="70" y="10"></rect>
                        <rect height="10" width="10" x="75" y="15"></rect>
                        <rect height="30" rx="3" width="30" x="5" y="65"></rect>
                        <rect fill="#fff" height="20" width="20" x="10" y="70"></rect>
                        <rect height="10" width="10" x="15" y="75"></rect>
                        <rect height="10" width="10" x="45" y="10"></rect>
                        <rect height="20" width="10" x="45" y="30"></rect>
                        <rect height="10" width="20" x="65" y="45"></rect>
                        <rect height="15" width="15" x="45" y="65"></rect>
                        <rect height="15" width="15" x="75" y="75"></rect>
                        <rect height="10" width="8" x="65" y="85"></rect>
                      </svg>
                    </div>
                    <span className="font-label-sm text-[10px] text-on-surface-variant mt-1 uppercase font-bold tracking-wider">
                      Mã Quét Thu Ngân
                    </span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20">
                    <span className="font-label-sm text-[10px] uppercase text-outline font-bold">Điểm khả dụng</span>
                    <p className="font-headline-lg text-2xl text-primary font-bold mt-1">
                      {memberData.points.toLocaleString('vi-VN')} P
                    </p>
                    <span className="font-label-sm text-[11px] text-secondary font-semibold">
                      Tương đương {(memberData.points * 100).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20">
                    <span className="font-label-sm text-[10px] uppercase text-outline font-bold">Chu kỳ 6 tháng</span>
                    <p className="font-headline-lg text-xl text-amber-700 font-bold mt-1 flex items-center gap-1.5">
                      <span>Còn {daysUntilReset} ngày</span>
                      {daysUntilReset <= 7 && (
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                      )}
                    </p>
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
                      Reset ngày: {cycleResetDate}
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20">
                    <span className="font-label-sm text-[10px] uppercase text-outline font-bold">Lên hạng Gastro Pop</span>
                    <div className="w-full bg-surface-container-high h-2.5 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-medium mt-1 inline-block">
                      Cần chi thêm 420.000đ
                    </span>
                  </div>
                </div>

                {/* 6-MONTH POINTS RESET & 7-DAY SMS ALERT BANNER */}
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 text-on-surface shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-700 text-[24px]">schedule</span>
                      <div>
                        <h4 className="font-headline-sm text-xs font-bold text-amber-950 uppercase tracking-wide">
                          Chu Kỳ Tích Điểm 6 Tháng &amp; Cảnh Báo Reset Điểm Về 0
                        </h4>
                        <p className="font-body-sm text-[11px] text-amber-900 mt-0.5">
                          Bắt đầu: <strong>{cycleStartDate}</strong> • Hết hạn: <strong>{cycleResetDate}</strong> (Còn <strong>{daysUntilReset} ngày</strong>)
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 font-label-sm text-[10px] font-bold self-start sm:self-center">
                      Quy Tắc: 6 Tháng Reset Về 0
                    </span>
                  </div>

                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600">sms</span>
                        <span>SMS thông báo trước 1 tuần tới SĐT {memberData.phone}:</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {memberData.smsNoticeSent ? '✓ Đã Gửi SMS Trước 7 Ngày' : 'Chờ Tự Động Gửi'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 italic">
                      "{memberData.lastSmsMessage || `[SUMMER CAFE] Chào bạn, ${memberData.points} điểm của bạn sẽ hết hạn vào ${cycleResetDate} (còn ${daysUntilReset} ngày)...`}"
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSmsModal(true)}
                      className="px-3.5 py-1.5 bg-amber-900 hover:bg-stone-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Xem Tin Nhắn SMS Mẫu</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleTriggerTestSms}
                      className="px-3.5 py-1.5 bg-white border border-amber-400 hover:bg-amber-100 text-amber-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">send</span>
                      <span>{smsTestSent ? 'Đã Gửi Lại SMS' : 'Gửi Thử SMS Đến Số Này'}</span>
                    </button>

                    <a
                      href="#reward-store"
                      className="px-3.5 py-1.5 bg-primary text-on-primary hover:bg-primary-container rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                    >
                      <span className="material-symbols-outlined text-[16px]">redeem</span>
                      <span>Đổi Quà Trước Khi Reset Điểm</span>
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-primary-fixed/40 p-3.5 rounded-2xl border border-primary-fixed">
                  <div className="flex items-center gap-2 text-on-primary-fixed">
                    <span className="material-symbols-outlined text-[20px] text-primary">cake</span>
                    <span className="font-body-sm text-xs font-semibold">
                      Ưu đãi sinh nhật: Đã sẵn sàng kích hoạt vào tháng này!
                    </span>
                  </div>
                  <button
                    onClick={() => showToast('Voucher sinh nhật giảm 50k đã lưu trong ví của bạn!', 'Sinh nhật vui vẻ', 'info')}
                    className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold shadow hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Xem Voucher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 HẠNG THÀNH VIÊN ĐỘC QUYỀN */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs uppercase font-bold">
            <span className="material-symbols-outlined text-[16px]">military_tech</span>
            Bảng Nâng Cấp Quyền Lợi
          </div>
          <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface">
            <span className="font-display-custom font-bold">3 Hạng Thẻ </span>
            <span className="font-script text-black text-4xl lg:text-5xl font-normal inline-block mx-1">
              Đặc Quyền
            </span>{' '}
            <span className="font-display-custom font-bold">Bloom Club</span>
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant">
            Mỗi lần thưởng thức croissant bơ Pháp hay ly cold brew kem cheese tại Đà Nẵng, bạn đều đang tích lũy những đặc quyền ẩm thực ngọt ngào.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1: BUTTER SUN */}
          <div className="bg-surface-container-lowest rounded-3xl shadow-md p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group border border-outline-variant/30">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-full bg-surface-container-high text-primary">
                  <span className="material-symbols-outlined text-[28px]">wb_sunny</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-xs font-bold uppercase">
                  Tân Binh
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-on-surface font-bold">Butter Sun</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">Dành cho mọi thành viên vừa đăng ký</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low text-on-surface border border-outline-variant/20">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline font-bold">
                  Tích Lũy Hóa Đơn
                </span>
                <div className="font-display-lg text-3xl text-primary font-bold">5%</div>
                <p className="font-body-sm text-xs text-on-surface-variant">Chi tiêu 100k nhận ngay 5.000 điểm</p>
              </div>
              <div className="space-y-3.5 pt-2">
                <p className="font-label-md text-xs text-on-surface font-bold uppercase tracking-wider">
                  Đặc quyền bao gồm:
                </p>
                <ul className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>
                      <strong className="text-on-surface">Voucher giảm 20%</strong> áp dụng ngay cho lần ghé đầu tiên.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>
                      Tặng set <strong>nến sinh nhật pastel Pháp</strong> độc quyền mùa sinh nhật.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>Nhận thông báo mẻ bánh nướng nóng sáng sớm qua Zalo/SMS.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8">
              <button
                onClick={() => {
                  setMemberData((prev) => ({ ...prev, tier: 'Butter Sun' }));
                  showToast('Đã chuyển sang gói hội viên Butter Sun!', 'Kích hoạt', 'info');
                }}
                className="w-full py-3 rounded-full bg-surface-container-high text-on-surface font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                Kích Hoạt Miễn Phí
              </button>
            </div>
          </div>

          {/* TIER 2: MATCHA BLOOM */}
          <div className="bg-surface-container-lowest rounded-3xl shadow-xl p-7 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group scale-105 z-10 border-2 border-secondary">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-xs uppercase font-bold shadow-md">
              Được Yêu Thích Nhất
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-full bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined text-[28px]">spa</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold uppercase">
                  Tích lũy &gt; 1.5M
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-secondary font-bold">Matcha Bloom</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">Hội viên sành vị trà Uji &amp; bánh ngọt</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary-container/40 text-on-surface border border-secondary/20">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline font-bold">
                  Tích Lũy Hóa Đơn
                </span>
                <div className="font-display-lg text-3xl text-secondary font-bold">8%</div>
                <p className="font-body-sm text-xs text-on-surface-variant">Chi tiêu 100k nhận ngay 8.000 điểm</p>
              </div>
              <div className="space-y-3.5 pt-2">
                <p className="font-label-md text-xs text-on-surface font-bold uppercase tracking-wider">
                  Đặc quyền nâng cấp:
                </p>
                <ul className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>
                      <strong>Miễn phí nâng size Matcha</strong> toàn bộ menu vào thứ Ba hàng tuần.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>
                      Tặng <strong>Hộp bánh cookies souvenir Đà Nẵng</strong> vào tháng sinh nhật.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>Ưu tiên giữ chỗ Workshop làm bánh Pastry cuối tuần cùng bếp trưởng.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8">
              <button
                onClick={() => {
                  setMemberData((prev) => ({ ...prev, tier: 'Matcha Bloom' }));
                  showToast('Đã nâng hạng thành công lên Matcha Bloom!', 'Hội viên ưu tiên', 'success');
                }}
                className="w-full py-3.5 rounded-full bg-secondary text-on-secondary font-label-md text-xs font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                Nâng Hạng Chi Tiêu
              </button>
            </div>
          </div>

          {/* TIER 3: GASTRO POP VIP */}
          <div className="bg-surface-container-lowest rounded-3xl shadow-md p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group border border-outline-variant/30">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-full bg-primary-fixed text-on-primary-fixed">
                  <span className="material-symbols-outlined text-[28px]">stars</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-bold uppercase">
                  Tích lũy &gt; 3.5M
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-primary-container font-bold">Gastro Pop VIP</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">Thượng lưu ẩm thực &amp; đối tác thân thiết</p>
              </div>
              <div className="p-4 rounded-2xl bg-primary-fixed/50 text-on-surface border border-primary-fixed">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline font-bold">
                  Tích Lũy Tối Đa
                </span>
                <div className="font-display-lg text-3xl text-primary font-bold">10%</div>
                <p className="font-body-sm text-xs text-on-surface-variant">Chi tiêu 100k nhận 10.000 điểm trọn đời</p>
              </div>
              <div className="space-y-3.5 pt-2">
                <p className="font-label-md text-xs text-on-surface font-bold uppercase tracking-wider">
                  Đặc quyền thượng đỉnh:
                </p>
                <ul className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>
                      <strong>Freeship không giới hạn</strong> toàn TP. Đà Nẵng (áp dụng cả resort biển Sơn Trà / Non Nước).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>
                      Tặng <strong>Khăn lụa Furoshiki thiết kế độc bản</strong> gói quà tặng bánh sang trọng.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span>Vé mời VIP Secret Tasting: Trải nghiệm menu bánh mẻ mới trước khi mở bán.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8">
              <button
                onClick={() => {
                  setMemberData((prev) => ({ ...prev, tier: 'Gastro Pop VIP' }));
                  showToast('Chào mừng VIP! Bạn đã mở khóa toàn bộ đặc quyền thượng đỉnh.', 'VIP Pass', 'success');
                }}
                className="w-full py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold hover:scale-105 transition-all shadow cursor-pointer"
              >
                Khám Phá VIP Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KHO ĐỔI THƯỞNG */}
      <section className="bg-surface-container py-16 px-4 md:px-8" id="reward-store">
        <div className="max-w-[1280px] mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs uppercase font-bold mb-2">
                <span className="material-symbols-outlined text-[16px]">redeem</span>
                Bloom Rewards Catalogs
              </div>
              <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Kho Đổi Thưởng Sweet Point</h2>
              <p className="font-body-md text-sm text-on-surface-variant">
                Dùng điểm tích lũy đổi trực tiếp quà lưu niệm độc bản &amp; bánh nướng tươi ngon
              </p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold whitespace-nowrap shadow-sm">
                Tất cả quà tặng
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* REWARD 1 */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-outline-variant/30">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Voucher 50.000đ trừ hóa đơn"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX70xEGglm8Ez_dHKDOAO416Wv-qncJJJ2Vc8cKwsqjvYtgGUW0KOThR0eY02P_LmsGYaxzyxvYZb_AHOyxHTDZHre5SO5kY4Dtwi9UkrcJKCUUzoppPScZSNUw5eeHLuOF4pl4l4DtWPpq9zidL8Rnhf0IvQRMbaAUKKqicEY1hBeW3sAQPLRWVUO_WP7xp6Me9Gk4lvRgBa7Z1KLkOrbhlHfZ9nvbptOi5qUXZUtP3wXjzUDps4"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-on-primary px-2.5 py-1 rounded-full font-label-sm text-[10px] font-bold shadow">
                    E-VOUCHER
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  Voucher 50.000đ Trừ Hóa Đơn
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                  Áp dụng trực tiếp tại quầy thu ngân 6 chi nhánh hoặc đơn đặt giao hỏa tốc.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[10px] text-outline">Cần đổi</span>
                  <p className="font-headline-sm text-base text-primary font-bold">500 Pts</p>
                </div>
                <button
                  onClick={() => handleRedeem('Voucher 50.000đ', 500)}
                  className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-xs font-bold transition-all cursor-pointer"
                >
                  Đổi Ngay
                </button>
              </div>
            </div>

            {/* REWARD 2 */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-outline-variant/30">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Bánh Croissant bơ Pháp nóng"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJFGxeeQwyaxevw3_ElP3sm6g0cFbSX1XPwuSdAwLdUijeDervjO3BuhWoAltaQHwdtkTslvF3nuKRQGBpPV4-92ShAcU0pmNjPY0WKMorCNdbeKkwDIOAWoJhkvSmPF8merT_vqydWsKxT_phG-7fsSbUgJmR9R5NxFydZCTYkLSvTeJXL_sbF9V0c3ZgVC6cIOpkubPtFzV_klipvj2CTFPOgV330qn7xWMRsOwL8AvZzqOlimY"
                  />
                  <span className="absolute top-3 left-3 bg-secondary text-on-secondary px-2.5 py-1 rounded-full font-label-sm text-[10px] font-bold shadow">
                    BAKED FRESH
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  Bánh Croissant Bơ Pháp Nóng
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                  100% bơ Elle &amp; Vire nhập khẩu, cán ngàn lớp giòn rụm thơm lừng mỗi sáng.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[10px] text-outline">Cần đổi</span>
                  <p className="font-headline-sm text-base text-secondary font-bold">350 Pts</p>
                </div>
                <button
                  onClick={() => handleRedeem('Croissant Bơ Pháp', 350)}
                  className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-xs font-bold transition-all cursor-pointer"
                >
                  Đổi Ngay
                </button>
              </div>
            </div>

            {/* REWARD 3 */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-outline-variant/30">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Ly giữ nhiệt Gastro Pop"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh8FNgJpV_DL8Nj04mrPhy7WPmAoNyMpLsesIN1v94G9sNsha3oZ8BP1LO9DG_uVfyzZkJ6PO5oC3cDk3Yc6goULdfS96jtWyisbyCBCCEA4PrM7c4gIUyd8pO88YReI10njtIXQg7Z-KRErUpJwYRDUpBeflMBhuR7LKVD8G5_KJ7xYWqeunidsVdhejhjv9kfF7ddAz71bDeu5N_faIIGbV07VvsI0W61qvq1ZbH4EAcfvtSzgU"
                  />
                  <span className="absolute top-3 left-3 bg-primary-container text-on-primary-container px-2.5 py-1 rounded-full font-label-sm text-[10px] font-bold shadow">
                    MERCHANDISE
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  Ly Giữ Nhiệt Gastro Pop 500ml
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                  Chất liệu inox 316 giữ đá mát 18 tiếng, thiết kế Pop pastel độc quyền mang biển về nhà.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[10px] text-outline">Cần đổi</span>
                  <p className="font-headline-sm text-base text-primary font-bold">1.200 Pts</p>
                </div>
                <button
                  onClick={() => handleRedeem('Ly Giữ Nhiệt Gastro Pop', 1200)}
                  className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-xs font-bold transition-all cursor-pointer"
                >
                  Đổi Ngay
                </button>
              </div>
            </div>

            {/* REWARD 4 */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-outline-variant/30">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Hộp trà Uji Kyoto"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQNINjYdL3G0w1ucWST-9x6XjsJyWOgbZYEPDfkAp2yefsO5IofPcgitZTlqCQ1wxgGq1epjP5U2ObPV8I46dpmv5AfNRPYRfUlX16JWRuw8ZCTThLqybWWc2ZDzAX10Cf1p0srZnL-NZ55a6uD7dxiN-qa-TGtViJMRPzL62v_kV7GAoAWS4wQZNMVFxYUjxYEpzpq_MdPB6yyhk2hsW1DAC_Riw2JN2ifvg2a1ep5Y4rrIX-y_E"
                  />
                  <span className="absolute top-3 left-3 bg-secondary text-on-secondary px-2.5 py-1 rounded-full font-label-sm text-[10px] font-bold shadow">
                    SOUVENIR TEA
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  Hộp Trà Du Lịch Uji Kyoto 50g
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                  Matcha thượng hạng tuyển chọn từ vùng Uji danh tiếng, kèm công thức pha chuẩn tiệm.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[10px] text-outline">Cần đổi</span>
                  <p className="font-headline-sm text-base text-secondary font-bold">1.800 Pts</p>
                </div>
                <button
                  onClick={() => handleRedeem('Hộp Trà Uji Kyoto', 1800)}
                  className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-xs font-bold transition-all cursor-pointer"
                >
                  Đổi Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 BƯỚC TÍCH ĐIỂM */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-16">
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-sm border border-outline-variant/30">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold">
              3 Bước Tích Điểm Thảnh Thơi
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant mt-2">
              Dễ dàng, không cần tải thêm ứng dụng rườm rà
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md text-lg font-bold mx-auto md:mx-0 shadow-sm">
                1
              </div>
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Đọc Số Điện Thoại</h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Khi order tại 6 cửa hàng Đà Nẵng hoặc nhập số điện thoại tại cổng đặt giao online, điểm tự động cộng dồn sau 3 giây.
              </p>
            </div>
            <div className="space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-md text-lg font-bold mx-auto md:mx-0 shadow-sm">
                2
              </div>
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Tích Lũy 5 - 10%</h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Hạng thành viên tự động nâng cấp theo tổng tích lũy, mở khóa mức hoàn điểm cao hơn và các đặc quyền phục vụ VIP.
              </p>
            </div>
            <div className="space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-lg font-bold mx-auto md:mx-0 shadow-sm">
                3
              </div>
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Trừ Trực Tiếp &amp; Đổi Quà</h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Bạn có thể dùng điểm trừ tiền mặt bất cứ hóa đơn nào hoặc yêu cầu nhân viên đổi ly giữ nhiệt, bánh ngon mang về.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHÍNH SÁCH ĐẶC QUYỀN: CHU KỲ TÍCH ĐIỂM 6 THÁNG & THÔNG BÁO SMS TRƯỚC 1 TUẦN */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-10">
        <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-primary-fixed/30 rounded-3xl p-8 md:p-12 border-2 border-amber-300 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-amber-200/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-label-sm text-xs uppercase font-bold">
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
              Chính Sách Điểm Thưởng Minh Bạch
            </div>
            <h2 className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold">
              Quy Định Chu Kỳ 6 Tháng &amp; Tự Động Báo SMS Trước 1 Tuần
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Nhằm đảm bảo trải nghiệm quà tặng tươi mới theo mùa và sự công bằng cho cộng đồng khách hàng, Bloom Cake &amp; Coffe áp dụng chính sách quản lý điểm thưởng chu kỳ 6 tháng có thông báo SMS tự động.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
            <div className="p-5 rounded-2xl bg-white/95 shadow-sm border border-amber-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">history_toggle_off</span>
              </div>
              <h3 className="font-headline-sm text-sm font-bold text-stone-900">Chu Kỳ 6 Tháng (180 Ngày)</h3>
              <p className="font-body-sm text-xs text-stone-600 leading-relaxed">
                Điểm thành viên sẽ reset về 0 sau mỗi 6 tháng tính từ lúc bắt đầu tạo tài khoản hoặc lần reset trước đó. Chu kỳ mới mở ra cơ hội tích lũy bộ sưu tập quà mới.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/95 shadow-sm border border-amber-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">sms</span>
              </div>
              <h3 className="font-headline-sm text-sm font-bold text-stone-900">SMS Báo Trước 1 Tuần (7 Ngày)</h3>
              <p className="font-body-sm text-xs text-stone-600 leading-relaxed">
                Hệ thống tự động gửi tin nhắn SMS đến số điện thoại của bạn trước 7 ngày, thông báo chính xác số điểm sắp hết hạn để bạn không bỏ lỡ quyền lợi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/95 shadow-sm border border-amber-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">redeem</span>
              </div>
              <h3 className="font-headline-sm text-sm font-bold text-stone-900">Đổi Quà &amp; Trừ Tiền Thỏa Thích</h3>
              <p className="font-body-sm text-xs text-stone-600 leading-relaxed">
                Trong 7 ngày này, bạn có thể dễ dàng đổi lấy bánh sừng bò giòn, ly giữ nhiệt Gastro Pop hoặc trừ tiền trực tiếp trên hóa đơn tại cả 6 chi nhánh Đà Nẵng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS ACCORDION */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-8 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold">
              Giải Đáp Thắc Mắc Về Bloom Club
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Mọi điều bạn cần biết về điểm thưởng và chính sách sử dụng
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Điểm tích lũy có thời hạn sử dụng trong bao lâu và khi nào reset về 0?',
                a: 'Toàn bộ điểm tích lũy của hội viên Bloom Club có chu kỳ hiệu lực là 6 tháng (180 ngày) kể từ ngày tạo tài khoản hoặc ngày reset điểm gần nhất. Khi thời gian đủ 6 tháng, số điểm khả dụng sẽ tự động reset về 0 để bắt đầu một chu kỳ tích điểm mới. Điểm xét hạng tích lũy 12 tháng không bị ảnh hưởng.',
              },
              {
                q: 'Hệ thống có thông báo trước cho tôi qua số điện thoại khi sắp reset điểm không?',
                a: 'Có! Hệ thống tổng đài SMS Brandname Bloom Cafe sẽ tự động gửi tin nhắn đến số điện thoại đăng ký của bạn trước đúng 1 tuần (7 ngày) trước khi điểm reset về 0. Tin nhắn nêu rõ số điểm khả dụng, ngày hết hạn và gợi ý bạn đổi quà hoặc trừ tiền trực tiếp.',
              },
              {
                q: 'Tôi có thể dùng chung điểm tại 6 chi nhánh và đặt giao hàng online không?',
                a: 'Có! Hệ thống Bloom Club đồng bộ thời gian thực trên toàn bộ 6 chi nhánh (Bạch Đằng, Hàm Nghi, Võ Văn Kiệt, Võ Nguyên Giáp, Phan Châu Trinh, Nguyễn Văn Thoại) và website đặt hàng. Bạn tích điểm ở tiệm này có thể đổi thưởng hoặc trừ tiền ở bất kỳ cơ sở nào.',
              },
              {
                q: 'Làm thế nào để nhận quà tặng sinh nhật (Bánh, nến pastel, hộp cookies)?',
                a: 'Vào ngày đầu tiên của tháng sinh nhật đã khai báo, hệ thống sẽ tự động gửi thông báo kèm voucher quà tặng sinh nhật tương ứng với hạng thành viên vào tài khoản của bạn. Bạn chỉ cần đưa mã voucher hoặc số điện thoại cho thu ngân trong suốt tháng đó.',
              },
              {
                q: 'Tôi có cần xuất trình thẻ cứng khi thanh toán không?',
                a: 'Hoàn toàn không cần thẻ cứng rườm rà. Bạn chỉ cần đọc số điện thoại hoặc mở mã QR điện tử trên trang tra cứu này cho bạn nhân viên quét bằng máy POS trong 1 giây là hoàn tất!',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-headline-sm text-base text-on-surface font-bold cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[24px] text-outline transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-primary' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="mt-3 pt-3 border-t border-surface-container font-body-md text-xs text-on-surface-variant leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMS PREVIEW MODAL */}
      {showSmsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl p-4 max-w-sm w-full shadow-2xl border-4 border-stone-700 space-y-4">
            {/* Phone Top Notch */}
            <div className="flex items-center justify-between px-3 text-[11px] text-stone-400 font-mono">
              <span>09:00</span>
              <div className="w-16 h-3 bg-stone-800 rounded-full"></div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
                <span className="material-symbols-outlined text-[13px]">wifi</span>
                <span className="material-symbols-outlined text-[13px]">battery_full</span>
              </div>
            </div>

            {/* SMS Header */}
            <div className="bg-stone-800 rounded-2xl p-3 text-center border border-stone-700">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-1.5 font-bold shadow">
                <span className="material-symbols-outlined text-[22px]">storefront</span>
              </div>
              <h3 className="text-white text-xs font-bold">BLOOM CAFE</h3>
              <p className="text-[10px] text-stone-400">Tin nhắn Brandname viễn thông</p>
            </div>

            {/* SMS Chat Body */}
            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3 min-h-[160px] flex flex-col justify-end">
              <div className="text-center text-[10px] text-stone-500 font-mono">
                {memberData.smsNoticeDate || 'Hôm nay, 09:00'} • Gửi tới {memberData.phone}
              </div>

              <div className="bg-stone-800 text-stone-100 p-3.5 rounded-2xl rounded-bl-xs text-xs leading-relaxed space-y-2 border border-stone-700">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">timer</span>
                  <span>THÔNG BÁO RESET ĐIỂM CHU KỲ 6 THÁNG</span>
                </div>
                <p>
                  [BLOOM CAFE] Chào {memberData.name}, bạn đang có{' '}
                  <strong className="text-amber-300 font-mono">{memberData.points.toLocaleString('vi-VN')} điểm</strong>{' '}
                  Bloom Club sắp hết hạn vào ngày{' '}
                  <strong className="text-amber-300 font-mono">{cycleResetDate}</strong> (còn{' '}
                  <strong className="text-red-400 font-bold">{daysUntilReset} ngày</strong> nữa).
                </p>
                <p className="text-stone-300 text-[11px]">
                  Theo quy định, điểm tích lũy sẽ reset về 0 sau 6 tháng. Hãy ghé 6 chi nhánh Bloom Cake &amp; Coffe hoặc đặt giao hàng online để đổi bánh croissant tươi nóng hoặc ly giữ nhiệt nhé!
                </p>
                <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-700/60 flex items-center justify-between">
                  <span>Hotline: 0236 388 7844</span>
                  <span>Mã: SMC-REMIND</span>
                </div>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleTriggerTestSms}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Gửi Lại Thử SMS
              </button>
              <button
                type="button"
                onClick={() => setShowSmsModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-colors cursor-pointer shadow"
              >
                Đóng Xem Thử
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
