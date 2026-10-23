import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

import { OrderDetails } from '../types';

export const OrderTrackingScreen: React.FC = () => {
  const { currentOrder, setCurrentScreen, showToast } = useApp();
  const [showRouteDetail, setShowRouteDetail] = useState(true);

  const order: OrderDetails = currentOrder || {
    orderId: 'SMC-DN-92841',
    createdAt: '10:45 Hôm nay',
    status: 'Đã xác nhận • Đang chuẩn bị bánh tươi',
    step: 2,
    items: [],
    subTotal: 248000,
    shippingFee: 15000,
    discount: 24000,
    total: 239000,
    orderMethod: 'delivery',
    pickupTime: '11:15',
    customerNotes: 'Giao tại quầy lễ tân',
    branchName: 'CN 45 Võ Văn Kiệt',
    deliveryAddress: 'Khách sạn Sala Danang Beach, 36 Lâm Hoành, Phước Mỹ, Sơn Trà, Đà Nẵng',
    receiverName: 'Nguyễn Phương Linh',
    receiverPhone: '0918.452.xxx',
    shipperName: 'Nguyễn Văn Hưng',
    shipperPhone: '0905.789.xxx',
    shipperPlate: '43-D1 829.14',
    estimatedDeliveryTime: '11:15',
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Đã sao chép ${label}: ${text} vào bộ nhớ tạm!`, 'Sao chép', 'success');
      });
    } else {
      showToast(`Đã ghi nhớ ${label}: ${text}!`, 'Sao chép', 'success');
    }
  };

  const isPickup = order.orderMethod === 'pickup';

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden pb-16 pt-6">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-48 right-12 w-80 h-80 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          {/* BANNER CHÚC MỪNG GASTRO POP */}
          <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_-2px_rgba(39,24,20,0.06)] relative overflow-hidden border border-outline-variant/30">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 rounded-full bg-primary-fixed/40 pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start sm:items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-[0_8px_20px_rgba(59,105,52,0.18)]">
                    <span className="material-symbols-outlined text-[36px] sm:text-[44px]">
                      {isPickup ? 'storefront' : 'check_circle'}
                    </span>
                  </div>
                  <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold shadow-md rotate-6">
                    {isPickup ? 'Tới lấy' : 'Bếp nướng'}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">
                      {isPickup ? 'storefront' : 'celebration'}
                    </span>
                    <span>
                      {isPickup
                        ? `Đặt Hẹn Tới Lấy Tại Quầy • ${order.pickupTime || 'Sẵn sàng sau 10-15 phút'}`
                        : 'Tươi Nóng Ra Lò • Giao Trong 30 Phút'}
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-3xl sm:text-4xl text-on-surface font-bold">
                    <span className="font-script text-4xl sm:text-5xl text-black pr-2 font-normal">
                      Cảm ơn bạn!
                    </span>{' '}
                    <span className="font-display-custom">
                      {isPickup ? 'Hẹn Lấy Tại Quầy Thành Công' : 'Đặt Đơn Giao Thành Công'}
                    </span>
                  </h1>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                    {isPickup
                      ? `Đơn hàng của bạn đang được pha chế & nướng mẻ mới tại ${order.branchName}. Quý khách vui lòng ghé quầy thu ngân đọc mã đơn hoặc số điện thoại để nhận ngay nhé!`
                      : 'Cảm ơn bạn đã lựa chọn bánh ngọt thủ công & trà thanh mát từ Bloom Cake & Coffe Đà Nẵng. Mọi mẻ bánh đều được đóng gói tỉ mỉ bằng túi giữ nhiệt kép.'}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-2.5 bg-surface-container-low px-5 py-4 rounded-2xl border border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="font-script text-2xl text-black font-normal">Mã đơn</span>{' '}
                  <span className="font-display-custom text-lg text-primary tracking-wide font-bold">
                    #{order.orderId}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-outline font-body-sm text-xs">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>{order.createdAt} • {order.branchName}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-md text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  <span>{order.status}</span>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN GRID: TRACKING (LEFT) & VIETQR / SUMMARY (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: LIVE ORDER TRACKING (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(39,24,20,0.05)] space-y-8 border border-outline-variant/30">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">
                        {isPickup ? 'storefront' : 'route'}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-headline-md text-xl text-on-surface font-bold">
                        <span className="font-script text-2xl text-black pr-1 font-normal">
                          {isPickup ? 'Quầy nhận' : 'Hành trình'}
                        </span>{' '}
                        <span className="font-display-custom">
                          {isPickup ? 'Tiến Độ Chuẩn Bị & Nhận Món' : 'Theo Dõi Trực Tiếp'}
                        </span>
                      </h2>
                      <p className="font-body-sm text-xs text-outline">
                        {isPickup
                          ? `Địa điểm lấy: ${order.branchName}`
                          : 'Hành trình mẻ bánh từ lò nướng tới tay bạn'}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-xs text-primary font-bold">
                    <span className="material-symbols-outlined text-[16px]">alarm</span>
                    <span>
                      {isPickup ? `Hẹn lấy: ${order.pickupTime || '10-15 phút'}` : `Dự kiến đến: ${order.estimatedDeliveryTime}`}
                    </span>
                  </div>
                </div>

                {/* 4-STEP STEPPER */}
                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
                  {/* Step 1 */}
                  <div className="relative group">
                    <span className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[15px]">done</span>
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className="font-headline-sm text-sm text-on-surface font-bold">
                        {isPickup ? 'Tiếp nhận đơn hẹn lấy' : 'Tiếp nhận đơn hàng'}
                      </span>
                      <span className="font-label-sm text-xs text-outline font-semibold">Vừa xong • Hoàn tất</span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      {isPickup
                        ? `Quầy ${order.branchName} đã xác nhận đơn hẹn lấy và chuyển công thức pha chế tới Barista.`
                        : 'Hệ thống Bloom Cake đã xác thực đơn và tự động chuyển sang khu làm bánh lạnh.'}
                    </p>
                  </div>

                  {/* Step 2 (ACTIVE) */}
                  <div className="relative group">
                    <span className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_0_4px_rgba(255,51,102,0.18)]">
                      <span className="material-symbols-outlined text-[15px] animate-spin">sync</span>
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className="font-headline-sm text-sm text-primary font-bold">
                        Lò nướng &amp; Barista pha chế chuẩn vị
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-[11px] w-fit mt-1 sm:mt-0 font-bold">
                        Đang thực hiện
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface mt-1 leading-relaxed">
                      Barista đang pha đúng tỷ lệ đường đá yêu cầu, bếp trưởng nướng bánh bơ Pháp giòn rụm và đóng hộp giấy kraft thân thiện môi trường.
                    </p>
                    <div className="mt-3 p-3 rounded-2xl bg-surface-container-low flex items-center gap-3 border border-outline-variant/20">
                      <span className="material-symbols-outlined text-secondary text-[24px]">local_cafe</span>
                      <span className="font-body-sm text-xs text-on-surface-variant">
                        Đồ uống được pha chế riêng theo định mức giảm đường, đá để quý khách thưởng thức trọn vẹn nhất.
                      </span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative opacity-70">
                    <span className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full bg-surface-container-highest text-outline flex items-center justify-center">
                      <span className="material-symbols-outlined text-[15px]">
                        {isPickup ? 'inventory_2' : 'two_wheeler'}
                      </span>
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className="font-headline-sm text-sm text-on-surface font-bold">
                        {isPickup ? 'Sẵn sàng tại quầy chi nhánh' : 'Bloom Express giao hỏa tốc'}
                      </span>
                      <span className="font-label-sm text-xs text-outline">
                        {isPickup ? (order.pickupTime || 'Sau 10-15 phút') : 'Dự kiến 30 phút'}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      {isPickup
                        ? `Bánh và thức uống đã đóng gói sẵn sàng đặt tại quầy ${order.branchName}, giữ lạnh/nóng hoàn hảo.`
                        : 'Tài xế nhận thùng giữ nhiệt chuyên dụng từ bếp và di chuyển về phía điểm nhận.'}
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative opacity-60">
                    <span className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full bg-surface-container-highest text-outline flex items-center justify-center">
                      <span className="material-symbols-outlined text-[15px]">
                        {isPickup ? 'hail' : 'location_on'}
                      </span>
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className="font-headline-sm text-sm text-on-surface font-bold">
                        {isPickup ? 'Quý khách nhận tại quầy' : 'Giao tận tay bạn'}
                      </span>
                      <span className="font-label-sm text-xs text-outline">
                        {isPickup ? order.branchName : order.deliveryAddress.split(',')[0]}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      {isPickup
                        ? `Đọc mã #${order.orderId} hoặc SĐT ${order.receiverPhone} tại quầy thu ngân để nhận món.`
                        : 'Kiểm tra tem niêm phong màng nướng tươi trước khi nhận bánh.'}
                    </p>
                  </div>
                </div>

                {/* ROUTE / PICKUP DETAIL CARD */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowRouteDetail(!showRouteDetail)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-primary-fixed/40 hover:bg-primary-fixed text-primary transition-all duration-300 border border-primary-fixed cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[24px]">
                        {isPickup ? 'storefront' : 'navigation'}
                      </span>
                      <div className="text-left">
                        <span className="font-headline-sm text-sm font-bold block">
                          <span className="font-script text-xl text-black font-normal">
                            {isPickup ? 'Địa điểm' : 'Lộ trình'}
                          </span>{' '}
                          <span className="font-display-custom">
                            {isPickup ? 'Chi Nhánh Quý Khách Ghé Nhận Món' : 'Chi Tiết & Shipper Giao Hàng'}
                          </span>
                        </span>
                        <span className="font-body-sm text-xs text-on-surface-variant">
                          {isPickup
                            ? `Chi nhánh: ${order.branchName} • Giờ hẹn: ${order.pickupTime || '10-15 phút'}`
                            : 'Khoảng cách 1.2km • Dự kiến 8 phút nữa tới sảnh'}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[24px] transition-transform duration-300 ${
                        showRouteDetail ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                </div>

                {/* ROUTE DETAIL & MAP */}
                {showRouteDetail && (
                  <div className="space-y-4 pt-2 animate-fadeIn">
                    {/* Pickup Branch Card or Shipper Card */}
                    {isPickup ? (
                      <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-outline-variant/30">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-sm text-lg font-bold">
                            <span className="material-symbols-outlined text-[28px]">store</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                                {order.branchName}
                              </h4>
                              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold">
                                Điểm Nhận Món
                              </span>
                            </div>
                            <p className="font-body-sm text-xs text-on-surface-variant">
                              Hẹn lấy: <strong>{order.pickupTime || 'Sau 10-15 phút'}</strong>
                            </p>
                            <p className="font-body-sm text-xs text-primary font-bold">
                              Người nhận: {order.receiverName} ({order.receiverPhone})
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <a
                            href="tel:02363887844"
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary font-label-lg text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
                          >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            <span>Gọi Quầy: 0236 388 7844</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-outline-variant/30">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-sm text-lg font-bold">
                              NH
                            </div>
                            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary-fixed ring-2 ring-surface-container-lowest flex items-center justify-center">
                              <span className="material-symbols-outlined text-[10px] text-on-secondary-fixed-variant">
                                check
                              </span>
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                                {order.shipperName}
                              </h4>
                              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold">
                                Shipper Ruột 5.0★
                              </span>
                            </div>
                            <p className="font-body-sm text-xs text-on-surface-variant">
                              Xe Honda Wave • Biển số: {order.shipperPlate}
                            </p>
                            <p className="font-body-sm text-xs text-primary font-bold">
                              Túi giữ nhiệt đá khô số #04
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <a
                            href={`tel:${order.shipperPhone.replace(/\s+/g, '')}`}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary font-label-lg text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
                          >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            <span>{order.shipperPhone}</span>
                          </a>
                          <button
                            onClick={() => showToast(`Đang mở cổng chat với Shipper ${order.shipperName}...`, 'Chat', 'info')}
                            className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors border border-outline-variant/30 cursor-pointer"
                            title="Nhắn tin cho Shipper"
                          >
                            <span className="material-symbols-outlined text-[20px]">chat</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Coastal Route Map visual */}
                    <div className="relative rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
                      <div
                        className="w-full h-72 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCc64j7VTJPlom33On-QEGzZAqEbAoOYRNSmH6Ay8bnesEurc0WPVUzo3kmdV5hvUTdNFvk-WMcrdv1IXAKutuWIQ3Ri3yFaj1DF1zRIBTekyyBIUElwe5HZiQ8VvuWXhLyZgcEGCi52GQIeqkofMFHyxT41MAShTsViMwvVkYBlXDykeEqLx4pmaicaRaGZt0Ih4ti_8ubCZgWru61jSTOSu4j2c-BxoYhDqq5e2v4veeWCLUcCXE')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-primary-fixed font-bold">
                            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
                            <span>LỘ TRÌNH HỎA TỐC BIỂN MỸ KHÊ</span>
                          </div>
                          <p className="font-headline-sm text-sm font-bold text-white">
                            {order.branchName} → {order.deliveryAddress.split(',')[0]}
                          </p>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-on-surface/80 backdrop-blur-md font-label-md text-xs text-white flex items-center gap-1 font-bold">
                          <span className="material-symbols-outlined text-[16px] text-primary">moped</span>
                          <span>1.2 km • 8 phút</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TEMPERATURE & FRESHNESS GUARANTEE */}
              <div className="p-5 rounded-2xl bg-surface-container-low flex items-start gap-4 border border-outline-variant/30">
                <span className="material-symbols-outlined text-secondary text-[28px] shrink-0">verified</span>
                <div className="space-y-1">
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">Cam kết độ giòn bơ &amp; nhiệt độ lạnh</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Nếu lớp kem Tiramisu bị chảy hoặc hộp bánh sừng bò không còn hương bơ thơm ngậy, Bloom Cake &amp; Coffe hoàn tiền 100% hoặc đổi mới trong 20 phút qua hotline chi nhánh.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VIETQR PRO & ORDER SUMMARY (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              {/* VIETQR CARD */}
              <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(39,24,20,0.06)] relative overflow-hidden border border-outline-variant/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">qr_code_2</span>
                    <span className="font-headline-sm text-sm font-bold text-on-surface">Thanh Toán VietQR Pro</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold">
                    Quét Mọi App Ngân Hàng
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mb-5">
                  Hệ thống tự động kích hoạt bếp nướng ngay khi giao dịch thành công. Vui lòng giữ nguyên mã giao dịch.
                </p>

                {/* QR Display */}
                <div className="bg-surface-container-low p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 border border-outline-variant/20">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20">
                    <svg className="w-48 h-48" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <rect fill="#FFFFFF" height="200" rx="8" width="200"></rect>
                      {/* Position Markers */}
                      <rect fill="#B90040" height="40" rx="6" width="40" x="20" y="20"></rect>
                      <rect fill="#FFFFFF" height="24" rx="2" width="24" x="28" y="28"></rect>
                      <rect fill="#B90040" height="12" rx="2" width="12" x="34" y="34"></rect>

                      <rect fill="#B90040" height="40" rx="6" width="40" x="140" y="20"></rect>
                      <rect fill="#FFFFFF" height="24" rx="2" width="24" x="148" y="28"></rect>
                      <rect fill="#B90040" height="12" rx="2" width="12" x="154" y="34"></rect>

                      <rect fill="#B90040" height="40" rx="6" width="40" x="20" y="140"></rect>
                      <rect fill="#FFFFFF" height="24" rx="2" width="24" x="28" y="148"></rect>
                      <rect fill="#B90040" height="12" rx="2" width="12" x="34" y="154"></rect>

                      {/* Dots */}
                      <circle cx="75" cy="30" fill="#271814" r="4"></circle>
                      <circle cx="95" cy="30" fill="#3B6934" r="4"></circle>
                      <circle cx="115" cy="30" fill="#271814" r="4"></circle>
                      <circle cx="75" cy="50" fill="#3B6934" r="4"></circle>
                      <circle cx="95" cy="50" fill="#B90040" r="4"></circle>
                      <circle cx="115" cy="50" fill="#271814" r="4"></circle>
                      <circle cx="30" cy="75" fill="#271814" r="4"></circle>
                      <circle cx="50" cy="75" fill="#B90040" r="4"></circle>
                      <circle cx="70" cy="75" fill="#271814" r="4"></circle>
                      <circle cx="90" cy="75" fill="#3B6934" r="4"></circle>
                      <circle cx="110" cy="75" fill="#271814" r="4"></circle>
                      <circle cx="130" cy="75" fill="#3B6934" r="4"></circle>
                      <circle cx="150" cy="75" fill="#271814" r="4"></circle>
                      <circle cx="170" cy="75" fill="#B90040" r="4"></circle>

                      {/* Center Badge */}
                      <rect fill="#B90040" height="36" rx="8" width="36" x="82" y="82"></rect>
                      <path
                        d="M94 92C94 90.8954 94.8954 90 96 90H104C105.105 90 106 90.8954 106 92V102C106 103.105 105.105 104 104 104H96C94.8954 104 94 103.105 94 102V92Z"
                        fill="#FFF8F6"
                      ></path>
                      <circle cx="100" cy="97" fill="#B90040" r="3"></circle>

                      <circle cx="130" cy="95" fill="#271814" r="4"></circle>
                      <circle cx="150" cy="95" fill="#3B6934" r="4"></circle>
                      <circle cx="170" cy="95" fill="#271814" r="4"></circle>
                      <circle cx="70" cy="115" fill="#3B6934" r="4"></circle>
                      <circle cx="90" cy="115" fill="#271814" r="4"></circle>
                      <circle cx="110" cy="115" fill="#B90040" r="4"></circle>
                      <circle cx="130" cy="115" fill="#271814" r="4"></circle>
                      <circle cx="75" cy="145" fill="#271814" r="4"></circle>
                      <circle cx="95" cy="145" fill="#3B6934" r="4"></circle>
                      <circle cx="115" cy="145" fill="#271814" r="4"></circle>
                      <circle cx="135" cy="145" fill="#3B6934" r="4"></circle>
                      <circle cx="155" cy="145" fill="#271814" r="4"></circle>
                      <circle cx="175" cy="145" fill="#B90040" r="4"></circle>
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-body-sm text-xs text-outline">Số tiền thanh toán</span>
                    <p className="font-headline-lg text-2xl text-primary font-bold">
                      {order.total.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>
                </div>

                {/* Transfer Info with 1-click copy */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <div>
                      <span className="font-label-sm text-[10px] text-outline block font-bold">NGÂN HÀNG</span>
                      <span className="font-label-lg text-xs font-bold text-on-surface">
                        Vietcombank - CN Đà Nẵng
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-[10px] text-secondary font-bold">
                      VCB
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <div>
                      <span className="font-label-sm text-[10px] text-outline block font-bold">SỐ TÀI KHOẢN</span>
                      <span className="font-headline-sm text-sm text-on-surface tracking-wider font-bold">
                        1028 999 888
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('1028999888', 'Số tài khoản')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-lowest hover:bg-primary-fixed text-primary font-label-md text-xs font-bold shadow-sm transition-colors cursor-pointer border border-outline-variant/30"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      <span>Sao chép</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <div className="truncate pr-2">
                      <span className="font-label-sm text-[10px] text-outline block font-bold">CHỦ TÀI KHOẢN</span>
                      <span className="font-label-md text-xs text-on-surface truncate font-semibold">
                        CONG TY TNHH BLOOM CAKE &amp; COFFE DA NANG
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-primary-fixed/30 border border-primary-fixed">
                    <div>
                      <span className="font-label-sm text-[10px] text-primary block font-bold">
                        NỘI DUNG CHUYỂN KHOẢN
                      </span>
                      <span className="font-headline-sm text-base text-primary font-bold">
                        {order.orderId.replace(/[^a-zA-Z0-9]/g, '')}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(order.orderId.replace(/[^a-zA-Z0-9]/g, ''), 'Nội dung chuyển khoản')
                      }
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      <span>Sao chép</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(39,24,20,0.05)] space-y-5 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                    Món Trong Đơn ({order.items.length} món)
                  </h3>
                  <span className="font-label-sm text-[11px] text-secondary bg-secondary-container px-2.5 py-0.5 rounded-full font-bold">
                    Bếp Đang Làm
                  </span>
                </div>

                <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-xl object-cover shrink-0 bg-surface-container"
                          />
                        )}
                        <div className="min-w-0 space-y-0.5">
                          <p className="font-label-lg text-xs font-bold text-on-surface truncate">
                            {item.quantity} × {item.name}
                          </p>
                          {item.selectedOption && (
                            <p className="font-body-sm text-[11px] text-outline truncate">
                              {item.selectedOption}
                            </p>
                          )}
                          {(item.sugarLevel || item.iceLevel) && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                              {item.sugarLevel && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 text-[10px] font-bold">
                                  <span className="material-symbols-outlined text-[10px]">water_drop</span>
                                  <span>{item.sugarLevel}</span>
                                </span>
                              )}
                              {item.iceLevel && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-800 text-[10px] font-bold">
                                  <span className="material-symbols-outlined text-[10px]">ac_unit</span>
                                  <span>{item.iceLevel}</span>
                                </span>
                              )}
                            </div>
                          )}
                          {item.specialNotes && (
                            <p className="text-[10px] text-outline italic">"{item.specialNotes}"</p>
                          )}
                        </div>
                      </div>
                      <span className="font-label-lg text-xs text-on-surface shrink-0 font-bold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-4 space-y-2 font-body-sm text-xs bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
                  <div className="flex justify-between text-outline">
                    <span>Tạm tính bánh &amp; nước</span>
                    <span>{order.subTotal.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between text-outline">
                    <span>{isPickup ? 'Phí tự đến lấy' : 'Phí giao hàng hỏa tốc'}</span>
                    <span className="text-secondary font-semibold">
                      {isPickup || order.shippingFee === 0
                        ? 'Miễn phí (0 VNĐ)'
                        : `${order.shippingFee.toLocaleString('vi-VN')} VNĐ`}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-secondary font-semibold">
                      <span>Voucher du lịch Đà Nẵng</span>
                      <span>-{order.discount.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-baseline font-headline-sm text-sm text-on-surface font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary font-headline-md text-base">
                      {order.total.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                </div>

                {/* Delivery or Pickup Address Card */}
                <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-start gap-3 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    {isPickup ? 'storefront' : 'location_on'}
                  </span>
                  <div className="space-y-0.5">
                    <span className="font-label-md text-xs text-on-surface font-bold">
                      {isPickup ? `Điểm nhận món: ${order.branchName}` : `Địa chỉ giao: ${order.deliveryAddress.split(',')[0]}`}
                    </span>
                    <p className="font-body-sm text-[11px] text-on-surface-variant">
                      {isPickup
                        ? `Giờ hẹn lấy: ${order.pickupTime || 'Sau 10-15 phút'}`
                        : order.deliveryAddress}
                    </p>
                    <p className="font-body-sm text-[11px] text-outline">
                      {isPickup ? 'Khách hẹn lấy: ' : 'Người nhận: '}
                      {order.receiverName} • {order.receiverPhone}
                    </p>
                    {order.customerNotes && (
                      <p className="font-body-sm text-[11px] text-primary italic">
                        Ghi chú: "{order.customerNotes}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SUPPORT & NEXT ACTION STRIP */}
          <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-2px_rgba(39,24,20,0.04)] border border-outline-variant/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Bạn Cần Hỗ Trợ Đơn Hàng Hoặc Ghi Chú Riêng?
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Bếp nướng luôn lắng nghe: thêm đá riêng, dán thiệp chúc mừng sinh nhật, hoặc giao hẹn giờ chính xác.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => showToast('Đang kết nối tài khoản Zalo để theo dõi đơn hàng...', 'Zalo', 'info')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-secondary text-on-secondary font-label-lg text-xs font-bold hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">sms</span>
                  <span>Theo Dõi Qua Zalo / SMS</span>
                </button>
                <a
                  href="tel:02363911515"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-on-primary font-label-lg text-xs font-bold hover:bg-primary-container shadow-[0_8px_20px_rgba(255,51,102,0.24)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">phone</span>
                  <span>Hotline Chi Nhánh: 0236 391 1515</span>
                </a>
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-xs font-bold transition-colors cursor-pointer border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  <span>Tiếp Tục Dạo Thực Đơn</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
