import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRANCHES } from '../data/mockData';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQty,
    clearCart,
    totalItems,
    subTotal,
    discount,
    shippingFee,
    finalTotal,
    appliedVoucher,
    applyVoucher,
    selectedBranch,
    setSelectedBranch,
    placeOrder,
    orderMethod,
    setOrderMethod,
    pickupTime,
    setPickupTime,
  } = useApp();

  const [voucherInput, setVoucherInput] = useState('');
  const [customerName, setCustomerName] = useState('Nguyễn Phương Linh');
  const [customerPhone, setCustomerPhone] = useState('0918 452 889');
  const [deliveryAddress, setDeliveryAddress] = useState('36 Lâm Hoành, P. Phước Mỹ, Q. Sơn Trà, TP. Đà Nẵng');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCartOpen) return null;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherInput) {
      applyVoucher(voucherInput);
      setVoucherInput('');
    }
  };

  const handleCheckout = () => {
    placeOrder({
      name: customerName,
      phone: customerPhone,
      address: orderMethod === 'pickup' ? `Nhận tại quầy: ${selectedBranch}` : deliveryAddress,
      notes: customerNotes,
      method: orderMethod,
      pickupTime: pickupTime,
      branch: selectedBranch,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-outline-variant/30 animate-slideLeft">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">Khay Món Của Bạn</h3>
                <span className="font-label-sm text-xs text-outline">
                  {totalItems > 0 ? `Đang có ${totalItems} món được chọn` : 'Khay trống'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-outline hover:text-primary transition-colors px-2 py-1"
                >
                  Làm mới
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* Body Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-3.5">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-outline space-y-3">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mx-auto text-primary">
                  <span className="material-symbols-outlined text-[36px]">bakery_dining</span>
                </div>
                <h4 className="font-headline-sm text-on-surface text-base">Khay bánh đang trống</h4>
                <p className="font-body-sm text-xs max-w-xs mx-auto">
                  Hãy ghé thăm thực đơn để chọn những mẻ bánh nướng bơ Pháp nóng hổi và trà Uji tươi mát nhé!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/30"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 bg-surface-container"
                    />
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="font-label-md text-xs font-bold text-on-surface truncate">{item.name}</h4>
                    {item.selectedOption && (
                      <p className="font-label-sm text-[11px] text-outline truncate">{item.selectedOption}</p>
                    )}

                    {/* Sugar & Ice tags */}
                    {(item.sugarLevel || item.iceLevel) && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {item.sugarLevel && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 text-[10px] font-bold">
                            <span className="material-symbols-outlined text-[11px]">water_drop</span>
                            <span>{item.sugarLevel}</span>
                          </span>
                        )}
                        {item.iceLevel && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-800 text-[10px] font-bold">
                            <span className="material-symbols-outlined text-[11px]">ac_unit</span>
                            <span>{item.iceLevel}</span>
                          </span>
                        )}
                      </div>
                    )}

                    {item.specialNotes && (
                      <p className="text-[10px] text-outline italic">"{item.specialNotes}"</p>
                    )}

                    <span className="font-label-md text-xs text-primary font-bold block pt-0.5">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                    <div className="flex items-center bg-surface-container-lowest rounded-full px-2 py-1 shadow-sm border border-outline-variant/30">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs hover:text-primary transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-label-sm text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs hover:text-primary transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Quick voucher selector */}
            {cart.length > 0 && (
              <div className="pt-2">
                <form onSubmit={handleApplyVoucher} className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="Nhập mã ưu đãi (ví dụ: DANANGSWEET)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-surface-container-low text-xs border border-outline-variant/40 focus:outline-none focus:border-primary uppercase font-bold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </form>
                {appliedVoucher && (
                  <div className="mt-2 text-xs flex items-center justify-between text-secondary bg-secondary-container/50 px-3 py-1.5 rounded-lg">
                    <span>Đang áp dụng: <strong>{appliedVoucher}</strong></span>
                    <button
                      onClick={() => applyVoucher('')}
                      className="text-outline hover:text-primary text-[10px] uppercase font-bold ml-2"
                    >
                      Bỏ mã
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Order Method Toggle in Drawer */}
            {cart.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                <div className="flex rounded-xl bg-surface-container p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderMethod('pickup')}
                    className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderMethod === 'pickup'
                        ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">storefront</span>
                    <span>Tới Lấy (0đ Ship)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderMethod('delivery')}
                    className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderMethod === 'delivery'
                        ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">moped</span>
                    <span>Ship Đi Tận Nơi</span>
                  </button>
                </div>

                {orderMethod === 'pickup' ? (
                  <div className="space-y-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30 text-xs">
                    <div>
                      <label className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider block font-bold mb-1">
                        Chi nhánh tới lấy:
                      </label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2.5 py-1.5 border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={`${b.name}, Q. ${b.districtName}`}>
                            {b.number}. {b.name}, Q. {b.districtName} ({b.hours})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider block font-bold mb-1">
                        Giờ hẹn tới lấy:
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2.5 py-1.5 border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Sẵn sàng sau 10-15 phút">Lấy ngay (sau 10-15 phút)</option>
                        <option value="Hẹn sau 30 phút">Hẹn sau 30 phút</option>
                        <option value="Hẹn sau 1 tiếng">Hẹn sau 1 tiếng</option>
                        <option value="Hẹn lúc 11:30 trưa nay">Hẹn lúc 11:30 trưa nay</option>
                        <option value="Hẹn lúc 15:00 chiều nay">Hẹn lúc 15:00 chiều nay</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Tên khách"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-surface-container-lowest text-xs border border-outline-variant/30"
                      />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="SĐT"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-surface-container-lowest text-xs border border-outline-variant/30"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30 text-xs">
                    <div>
                      <label className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider block font-bold mb-1">
                        Giao từ chi nhánh gần nhất:
                      </label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2.5 py-1.5 border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={`${b.name}, Q. ${b.districtName}`}>
                            {b.number}. {b.name}, Q. {b.districtName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Địa chỉ giao (KS / Resort / Nhà riêng tại Đà Nẵng)"
                      className="w-full px-2.5 py-1.5 rounded-xl bg-surface-container-lowest text-xs border border-outline-variant/30"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Họ tên người nhận"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-surface-container-lowest text-xs border border-outline-variant/30"
                      />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Số điện thoại"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-surface-container-lowest text-xs border border-outline-variant/30"
                      />
                    </div>

                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Ghi chú cho shipper (gửi lễ tân...)"
                      className="w-full px-2.5 py-1.5 rounded-xl bg-surface-container-lowest text-xs border border-outline-variant/30"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Total & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 space-y-3">
              <div className="space-y-1.5 text-xs font-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Tạm tính ({totalItems} món)</span>
                  <span className="font-semibold text-on-surface">{subTotal.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>{orderMethod === 'pickup' ? 'Phí tự đến lấy' : 'Phí giao hỏa tốc'}</span>
                  <span className="text-secondary font-semibold">
                    {shippingFee === 0 ? 'Miễn Phí (0 đ)' : `${shippingFee.toLocaleString('vi-VN')} đ`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary font-semibold">
                    <span>Ưu đãi voucher ({appliedVoucher})</span>
                    <span>-{discount.toLocaleString('vi-VN')} đ</span>
                  </div>
                )}
                <div className="pt-2 border-t border-outline-variant/30 flex items-baseline justify-between">
                  <div>
                    <span className="font-headline-sm text-sm text-on-surface block font-bold">Tổng Thanh Toán</span>
                    <span className="text-[10px] text-outline">
                      {orderMethod === 'pickup'
                        ? 'Tự đến nhận món tại quầy thu ngân'
                        : 'Đã bao gồm VAT & hộp giữ nhiệt'}
                    </span>
                  </div>
                  <span className="font-headline-md text-lg text-primary font-bold">
                    {finalTotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-5 rounded-full bg-primary text-on-primary font-label-md text-sm font-bold hover:bg-primary-container shadow-[0_8px_20px_rgba(255,51,102,0.24)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {orderMethod === 'pickup' ? 'storefront' : 'moped'}
                </span>
                <span>
                  {orderMethod === 'pickup'
                    ? 'Đặt Hẹn Tới Lấy • Sẵn Sàng 15P'
                    : 'Đặt Giao Ngay • 30 Phút Tới Nơi'}
                </span>
              </button>

              <p className="text-[11px] text-center text-outline flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                <span>
                  {orderMethod === 'pickup'
                    ? 'Đọc mã đơn hàng tại quầy để nhận ngay'
                    : 'Kiểm tra bánh tươi trước khi chuyển khoản / thanh toán'}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
