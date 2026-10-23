import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Printer, CheckCircle, AlertTriangle, X, RefreshCw, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export const InvoicePrintModal: React.FC = () => {
  const { activeModalInvoice, setActiveModalInvoice, confirmPrintInvoice, reprintInvoice } = useCRM();
  const [reprintReason, setReprintReason] = useState<string>('');
  const [showReprintInput, setShowReprintInput] = useState<boolean>(false);

  if (!activeModalInvoice) return null;

  const inv = activeModalInvoice;
  const isReprint = inv.printCount > 0;

  const handleTriggerPrint = () => {
    // In iframe or web environment, we trigger browser print or simulated POS print
    window.print();
  };

  const handleConfirmSuccess = () => {
    confirmPrintInvoice(inv.id);
  };

  const handleReprintSubmit = () => {
    if (!reprintReason.trim()) return;
    reprintInvoice(inv.id, reprintReason);
    setShowReprintInput(false);
    setReprintReason('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-primary px-6 py-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-base">Phiếu Thanh Toán / Hóa Đơn Nội Bộ</h3>
              <p className="text-xs text-primary-fixed/80">
                Mã bill: {inv.id} • Phiên bản: v{inv.version}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModalInvoice(null)}
            className="p-1 rounded-full hover:bg-white/20 text-on-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice from Spec 10: Explicit print confirmation */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Quy chuẩn bắt buộc (Spec §10):</strong> Đóng hộp thoại in trình duyệt KHÔNG tự động coi là đã in. Thu ngân phải kiểm tra giấy ra khỏi máy in và nhấn <strong>"Xác nhận đã in bill"</strong> bên dưới.
          </span>
        </div>

        {/* Thermal Receipt Visual Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-surface-container-low font-mono text-xs">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-outline-variant/30 text-stone-900 relative">
            {/* Watermark if reprint */}
            {isReprint && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
                <span className="text-4xl font-extrabold uppercase border-4 border-red-600 text-red-600 px-6 py-2 rotate-[-25deg]">
                  Bản In Lại (Lần {inv.printCount})
                </span>
              </div>
            )}

            {/* Receipt Header */}
            <div className="text-center border-b border-dashed border-stone-300 pb-3 mb-3">
              <img
                src="/assets/aistudio/image_409_9964af08.png"
                alt="Bloom Cake & Coffe"
                className="w-12 h-12 rounded-full mx-auto mb-2 object-cover border border-stone-200 shadow-xs"
              />
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary">
                BLOOM CAKE &amp; COFFE
              </h4>
              <p className="text-[11px] text-stone-600">{inv.branchName}</p>
              <p className="text-[10px] text-stone-500">Hotline: 0236 388 9999 • Hotline góp ý: 1900 8888</p>
              <div className="mt-2 text-[11px] flex justify-between text-stone-600">
                <span>Số: <strong>{inv.id}</strong></span>
                <span>Ca: {inv.cashShiftId.slice(-6)}</span>
              </div>
              <div className="text-[11px] flex justify-between text-stone-600">
                <span>Thu ngân: {inv.cashierName}</span>
                <span>{inv.createdAt}</span>
              </div>
              <div className="text-[11px] flex justify-between text-stone-700 font-bold mt-1">
                <span>Loại đơn: {inv.orderType === 'dine_in' ? 'Tại bàn' : inv.orderType === 'takeaway' ? 'Mang đi' : 'Giao hàng (Ship)'}</span>
                <span>{inv.customerName || 'Khách vãng lai'}</span>
              </div>
            </div>

            {/* Receipt Items */}
            <table className="w-full text-left border-b border-dashed border-stone-300 pb-3 mb-3">
              <thead>
                <tr className="text-stone-500 border-b border-stone-200">
                  <th className="py-1">Món</th>
                  <th className="py-1 text-center">SL</th>
                  <th className="py-1 text-right">Đơn giá</th>
                  <th className="py-1 text-right">T.Tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {inv.items.map((item, idx) => (
                  <tr key={idx} className="align-top">
                    <td className="py-1.5 pr-2">
                      <div className="font-medium text-stone-800">{item.name}</div>
                      {item.selectedOption && (
                        <div className="text-[10px] text-stone-500">{item.selectedOption}</div>
                      )}
                    </td>
                    <td className="py-1.5 text-center">{item.quantity}</td>
                    <td className="py-1.5 text-right">{item.price.toLocaleString('vi-VN')}</td>
                    <td className="py-1.5 text-right font-medium">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculations */}
            <div className="space-y-1 text-[11px] border-b border-dashed border-stone-300 pb-3 mb-3">
              <div className="flex justify-between text-stone-600">
                <span>Tạm tính tiền hàng:</span>
                <span>{inv.subTotal.toLocaleString('vi-VN')} đ</span>
              </div>
              {inv.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Ưu đãi {inv.voucherCode ? `(${inv.voucherCode})` : ''}:</span>
                  <span>-{inv.discount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              {inv.shippingFee > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Phí giao hàng:</span>
                  <span>+{inv.shippingFee.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-1 border-t border-stone-200">
                <span>TỔNG CỘNG THANH TOÁN:</span>
                <span className="text-primary">{inv.total.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-1 text-[11px] border-b border-dashed border-stone-300 pb-3 mb-3">
              <div className="flex justify-between">
                <span>Hình thức:</span>
                <span className="font-semibold uppercase text-stone-800">
                  {inv.paymentMethod === 'cash' ? 'Tiền mặt' : inv.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : 'Thẻ POS'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Khách đưa / Thanh toán:</span>
                <span>{inv.paidAmount.toLocaleString('vi-VN')} đ</span>
              </div>
              {inv.changeAmount > 0 && (
                <div className="flex justify-between font-bold text-emerald-700">
                  <span>Tiền thừa trả khách:</span>
                  <span>{inv.changeAmount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
            </div>

            {/* Receipt Footer */}
            <div className="text-center text-[10px] text-stone-500 space-y-0.5">
              <p>Mật khẩu Wifi: <strong>bloomcake2026</strong></p>
              <p>Tích điểm Bloom Club: Tra cứu bằng SĐT trên hoá đơn</p>
              <p className="italic">Cảm ơn quý khách và hẹn gặp lại!</p>
              {inv.printCount > 0 && (
                <p className="text-red-600 font-bold mt-1">
                  ĐÃ IN {inv.printCount} LẦN (Lần cuối: {inv.printedAt})
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-surface-container p-4 border-t border-outline-variant/20 flex flex-col gap-3">
          {showReprintInput ? (
            <div className="bg-white p-3 rounded-lg border border-outline-variant space-y-2">
              <label className="text-xs font-semibold text-on-surface">Lý do in lại hóa đơn (bắt buộc theo quy định):</label>
              <input
                type="text"
                placeholder="VD: Khách làm mất bill, kẹt giấy, đổi thông tin..."
                value={reprintReason}
                onChange={(e) => setReprintReason(e.target.value)}
                className="w-full text-xs px-3 py-2 border rounded-md focus:outline-hidden focus:border-primary"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReprintInput(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-md"
                >
                  Hủy
                </button>
                <button
                  onClick={handleReprintSubmit}
                  disabled={!reprintReason.trim()}
                  className="px-3 py-1.5 text-xs bg-primary text-white rounded-md font-semibold disabled:opacity-50"
                >
                  Xác nhận in lại
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerPrint}
                  className="px-4 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-outline-variant/30"
                >
                  <Printer className="w-4 h-4 text-primary" />
                  Gửi lệnh in ra máy
                </button>

                {inv.printCount > 0 && (
                  <button
                    onClick={() => setShowReprintInput(true)}
                    className="px-3 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    In lại bill
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalInvoice(null)}
                  className="px-3 py-2.5 text-xs text-stone-600 hover:bg-stone-200/50 rounded-xl"
                >
                  Đóng
                </button>
                <button
                  onClick={handleConfirmSuccess}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Xác nhận đã in bill thành công
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
