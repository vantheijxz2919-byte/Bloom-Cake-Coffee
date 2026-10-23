import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Ticket, Plus, CheckCircle2, Clock, X, Calendar, Percent, DollarSign } from 'lucide-react';

export const VouchersScreen: React.FC = () => {
  const { vouchers, toggleVoucher, createVoucher } = useCRM();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed');
  const [discountValue, setDiscountValue] = useState<number>(20000);
  const [minOrder, setMinOrder] = useState<number>(150000);
  const [quota, setQuota] = useState<number>(300);
  const [expiresAt, setExpiresAt] = useState<string>('31/12/2026');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    createVoucher({
      code: newCode.trim().toUpperCase(),
      title: newTitle,
      discountType,
      discountValue,
      minOrderValue: minOrder,
      applicableBranch: 'Toàn bộ chi nhánh Đà Nẵng',
      totalQuota: quota,
      expiresAt,
      status: 'active',
    });

    setShowCreateModal(false);
    setNewCode('');
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-stone-900">
              Module Quản Lý Mã Voucher & Ví Khách Hàng (Spec §19)
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Tách biệt độc lập khỏi cài đặt chung. Quản lý lượt phát hành, điều kiện đơn tối thiểu và lượt đổi mã.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Mã Voucher Mới</span>
        </button>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vouchers.map((v) => {
          const usedPct = Math.round((v.usedCount / v.totalQuota) * 100);
          const isActive = v.status === 'active';

          return (
            <div
              key={v.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-sm text-primary tracking-wider bg-primary/10 px-2.5 py-1 rounded-lg">
                    {v.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {isActive ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </div>

                <h3 className="font-bold text-xs text-stone-800">{v.title}</h3>

                <div className="space-y-1 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Giảm giá:</span>
                    <span className="font-bold text-primary">
                      {v.discountType === 'percent'
                        ? `${v.discountValue}%`
                        : `${v.discountValue.toLocaleString('vi-VN')} đ`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Đơn tối thiểu:</span>
                    <span>{v.minOrderValue.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-400">
                    <span>Hạn dùng:</span>
                    <span>{v.expiresAt}</span>
                  </div>
                </div>

                {/* Quota Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Đã dùng:</span>
                    <span className="font-mono font-bold text-stone-800">
                      {v.usedCount} / {v.totalQuota} lượt ({usedPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${Math.min(100, usedPct)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400">{v.applicableBranch}</span>
                <button
                  onClick={() => toggleVoucher(v.id)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                >
                  {isActive ? 'Tạm dừng' : 'Kích hoạt'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Voucher Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900">Tạo Mã Voucher Ưu Đãi Mới</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 font-semibold">Mã code (viết hoa không dấu):</label>
                <input
                  type="text"
                  placeholder="VD: AUTUMN20, TEATIME30..."
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full mt-1 px-3 py-2 border rounded-lg font-mono font-bold uppercase"
                  required
                />
              </div>

              <div>
                <label className="text-stone-600 font-semibold">Tên tiêu đề hiển thị:</label>
                <input
                  type="text"
                  placeholder="VD: Giảm 20.000đ cho đơn từ 150.000đ"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-600 font-semibold">Hình thức giảm:</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                  >
                    <option value="fixed">Số tiền cố định (đ)</option>
                    <option value="percent">Phần trăm (%)</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-600 font-semibold">Mức giảm:</label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border rounded-lg font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-600 font-semibold">Đơn tối thiểu (đ):</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-stone-600 font-semibold">Tổng lượt phát hành:</label>
                  <input
                    type="number"
                    value={quota}
                    onChange={(e) => setQuota(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border rounded-lg font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-600 font-semibold">Hạn sử dụng:</label>
                <input
                  type="text"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-stone-600"
                >
                  Hủy
                </button>
                <button type="submit" className="px-5 py-2 bg-primary text-white font-bold rounded-lg">
                  Lưu & Phát hành
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
