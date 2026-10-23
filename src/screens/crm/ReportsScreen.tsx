import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  BarChart3,
  CircleDollarSign,
  Receipt,
  UtensilsCrossed,
  Truck,
  Boxes,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
} from 'lucide-react';

export const ReportsScreen: React.FC = () => {
  const {
    activeShift,
    recordCashMovement,
    closeShift,
    openNewShift,
    invoices,
    tickets,
    deliveries,
    inventory,
    stockAlerts,
  } = useCRM();

  // Cash shift state
  const [actualCashInput, setActualCashInput] = useState<number>(activeShift.expectedCash);
  const [closeShiftNotes, setCloseShiftNotes] = useState<string>('');
  const [showExpenseModal, setShowExpenseModal] = useState<boolean>(false);
  const [expenseAmount, setExpenseAmount] = useState<number>(50000);
  const [expenseReason, setExpenseReason] = useState<string>('');

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expenseAmount <= 0 || !expenseReason.trim()) return;
    recordCashMovement('out', expenseAmount, expenseReason);
    setShowExpenseModal(false);
    setExpenseReason('');
  };

  const handleCloseShift = () => {
    closeShift(actualCashInput, closeShiftNotes);
  };

  const handleReopen = () => {
    openNewShift(1500000, 'Mở ca tiếp theo');
  };

  const completedTickets = tickets.filter((t) => t.status === 'ready');
  const avgWaitTime =
    tickets.length > 0 ? (tickets.reduce((s, t) => s + t.waitingMinutes, 0) / tickets.length).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-stone-900">
              Báo Cáo Hoạt Động & Quyết Toán Ca Tiền Mặt (Spec §9.4 & §22)
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Đối soát két tiền ca thu ngân, đo lường tốc độ trạm KDS và hiệu suất giao hàng chi nhánh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!activeShift.isClosed && (
            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <ArrowDownRight className="w-4 h-4 text-rose-600" />
              <span>Ghi nhận chi quỹ ngoài bán</span>
            </button>
          )}
        </div>
      </div>

      {/* Cash Shift Reconciliation Card (Spec 9.4) */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
              ĐỐI SOÁT KÉT TIỀN CA THU NGÂN
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              Ca: {activeShift.counterId} • Thu ngân: {activeShift.cashierName}
            </h3>
            <p className="text-xs text-stone-500 font-mono">
              Bắt đầu: {activeShift.startTime} {activeShift.endTime ? `• Đóng: ${activeShift.endTime}` : ''}
            </p>
          </div>

          <div>
            {activeShift.isClosed ? (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-stone-800 text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                ĐÃ KHÓA CA
              </span>
            ) : (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                CA ĐANG HOẠT ĐỘNG
              </span>
            )}
          </div>
        </div>

        {/* Cash Formula Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500">1. Tiền đầu ca:</span>
            <div className="text-base font-bold font-mono text-stone-900 mt-1">
              +{activeShift.openingCash.toLocaleString('vi-VN')} đ
            </div>
            <span className="text-[10px] text-stone-400">Tiền lẻ chuẩn bị</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500">2. Thu bán tiền mặt:</span>
            <div className="text-base font-bold font-mono text-emerald-700 mt-1">
              +{activeShift.cashSales.toLocaleString('vi-VN')} đ
            </div>
            <span className="text-[10px] text-stone-400">Hóa đơn tiền mặt</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500">3. Chi quỹ phát sinh:</span>
            <div className="text-base font-bold font-mono text-rose-600 mt-1">
              -{activeShift.otherExpense.toLocaleString('vi-VN')} đ
            </div>
            <span className="text-[10px] text-stone-400">Chi khẩn cấp/mua đá</span>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-amber-800 font-bold">4. Tiền kỳ vọng trong két:</span>
            <div className="text-lg font-extrabold font-mono text-primary mt-1">
              {activeShift.expectedCash.toLocaleString('vi-VN')} đ
            </div>
            <span className="text-[10px] text-amber-700">(1 + 2 - 3)</span>
          </div>

          <div className="p-3 bg-stone-100 rounded-xl border border-stone-300">
            <span className="text-stone-700 font-bold">5. Tiền thực đếm cuối ca:</span>
            <div className="text-lg font-extrabold font-mono text-stone-900 mt-1">
              {activeShift.isClosed && activeShift.actualCountedCash !== undefined
                ? `${activeShift.actualCountedCash.toLocaleString('vi-VN')} đ`
                : 'Đang mở'}
            </div>
            {activeShift.discrepancy !== undefined && (
              <span
                className={`text-[10px] font-bold ${
                  activeShift.discrepancy === 0 ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                Chênh lệch: {activeShift.discrepancy.toLocaleString('vi-VN')} đ
              </span>
            )}
          </div>
        </div>

        {/* Shift Closing Controls */}
        {!activeShift.isClosed ? (
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
            <h4 className="font-bold text-stone-800">Quyết Toán & Đóng Ca Làm Việc</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-stone-600 font-semibold">Nhập tổng tiền thực đếm trong két (VND):</label>
                <input
                  type="number"
                  value={actualCashInput}
                  onChange={(e) => setActualCashInput(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-lg font-mono font-bold bg-white"
                />
              </div>
              <div>
                <label className="text-stone-600 font-semibold">Ghi chú đóng ca:</label>
                <input
                  type="text"
                  placeholder="Tiền két khớp hoàn toàn, bàn giao cho ca chiều..."
                  value={closeShiftNotes}
                  onChange={(e) => setCloseShiftNotes(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCloseShift}
                className="px-5 py-2.5 bg-stone-900 hover:bg-primary text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Xác Nhận Kiểm Đếm & Đóng Ca Tiền
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <div className="text-emerald-900">
              <strong>Ca đã đóng thành công lúc {activeShift.endTime}.</strong> Toàn bộ dữ liệu doanh thu và tiền mặt đã được lưu vết kiểm toán.
            </div>
            <button
              onClick={handleReopen}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
            >
              Mở Ca Mới
            </button>
          </div>
        )}
      </div>

      {/* Operational Metrics (KDS & Deliveries) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-sm text-stone-900">Hiệu Suất Trạm KDS</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Thời gian chế biến trung bình:</span>
              <span className="font-bold font-mono text-stone-900">{avgWaitTime} phút/phiếu</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Phiếu trạm hoàn thành:</span>
              <span className="font-bold font-mono text-emerald-700">
                {completedTickets.length} / {tickets.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-stone-900">Hiệu Suất Giao Hàng</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Tổng số đơn ship:</span>
              <span className="font-bold font-mono text-stone-900">{deliveries.length} đơn</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Đơn giao thành công:</span>
              <span className="font-bold font-mono text-emerald-700">
                {deliveries.filter((d) => d.status === 'delivered').length} đơn
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Tiền COD đang đối soát:</span>
              <span className="font-bold font-mono text-purple-700">
                {deliveries
                  .filter((d) => d.codStatus === 'collected_by_shipper')
                  .reduce((s, d) => s + d.codAmount, 0)
                  .toLocaleString('vi-VN')}{' '}
                đ
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-stone-900">Cảnh Báo Tồn Kho</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Mặt hàng &lt; 100 đơn vị:</span>
              <span className="font-bold font-mono text-red-600">
                {inventory.filter((i) => i.availableStock < i.lowStockThreshold).length} mã
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Cảnh báo đang mở:</span>
              <span className="font-bold font-mono text-amber-700">
                {stockAlerts.filter((a) => a.status === 'open').length} cảnh báo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-sm text-stone-900">Ghi Nhận Khoản Chi Quỹ Ngoài Bán</h3>
            <form onSubmit={handleExpenseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 font-semibold">Số tiền chi (VND):</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-lg font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-stone-600 font-semibold">Lý do chi quỹ (bắt buộc audit):</label>
                <input
                  type="text"
                  placeholder="VD: Mua đá bi bổ sung 50k, mua giấy in bill 80k..."
                  value={expenseReason}
                  onChange={(e) => setExpenseReason(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-3 py-1.5 text-stone-600"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-1.5 bg-rose-600 text-white font-bold rounded-lg">
                  Lưu khoản chi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
