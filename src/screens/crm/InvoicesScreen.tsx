import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Receipt,
  Printer,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  User,
  ShieldAlert,
} from 'lucide-react';

export const InvoicesScreen: React.FC = () => {
  const { invoices, activeStaff, activeShift, printInvoice, cancelInvoice } = useCRM();

  const [searchCode, setSearchCode] = useState('');
  const [filterPrint, setFilterPrint] = useState<'all' | 'unprinted' | 'printed' | 'reprinted'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAllCashiers, setShowAllCashiers] = useState<boolean>(false);

  // Spec §11.2: Cashier only sees their own shift invoices by default
  const isManager = activeStaff.role === 'manager';

  const visibleInvoices = invoices.filter((inv) => {
    // If not manager or not explicitly showing all cashiers, scope strictly to cashier's own shift
    if (!isManager && !showAllCashiers) {
      if (inv.cashierId !== activeStaff.id || inv.cashShiftId !== activeShift.id) {
        return false;
      }
    }
    const matchesCode =
      inv.id.toLowerCase().includes(searchCode.toLowerCase()) ||
      inv.orderId.toLowerCase().includes(searchCode.toLowerCase()) ||
      (inv.customerName && inv.customerName.toLowerCase().includes(searchCode.toLowerCase()));

    const matchesPrint = filterPrint === 'all' || inv.printStatus === filterPrint;
    const matchesType = filterType === 'all' || inv.orderType === filterType;

    return matchesCode && matchesPrint && matchesType;
  });

  // Calculate shift metrics
  const totalBills = visibleInvoices.length;
  const totalRevenue = visibleInvoices.reduce((s, i) => s + (i.status !== 'cancelled' ? i.total : 0), 0);
  const totalCollected = visibleInvoices.reduce((s, i) => s + (i.status !== 'cancelled' ? i.paidAmount : 0), 0);
  const unprintedCount = visibleInvoices.filter((i) => i.printStatus === 'unprinted').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-stone-500">Số bill trong ca</p>
            <h3 className="text-xl font-bold text-stone-900 mt-1">{totalBills} hóa đơn</h3>
            <p className="text-[10px] text-stone-400">Ca: {activeShift.id.slice(-8)}</p>
          </div>
          <div className="p-3 bg-stone-100 rounded-xl text-stone-700">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-stone-500">Doanh thu bán ca này</p>
            <h3 className="text-xl font-bold text-primary mt-1">{totalRevenue.toLocaleString('vi-VN')} đ</h3>
            <p className="text-[10px] text-emerald-600 font-medium">Chỉ tính bill hợp lệ</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-primary">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-stone-500">Thực thu tiền mặt/QR</p>
            <h3 className="text-xl font-bold text-emerald-700 mt-1">
              {totalCollected.toLocaleString('vi-VN')} đ
            </h3>
            <p className="text-[10px] text-stone-400">Khớp dữ liệu két</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-stone-500">Bill chờ in / Chưa in</p>
            <h3 className="text-xl font-bold text-amber-600 mt-1">{unprintedCount} bill</h3>
            <p className="text-[10px] text-amber-700 font-medium">Cần in trước khi hoàn tất</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Printer className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Scope and Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-stone-900">
              Danh Sách Hóa Đơn Bán Hàng Trong Ca (Spec §11)
            </h2>
          </div>

          {/* Manager toggle to view other shifts */}
          {isManager && (
            <label className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showAllCashiers}
                onChange={(e) => setShowAllCashiers(e.target.checked)}
                className="rounded border-stone-300 text-primary"
              />
              <span>Quyền Quản lý: Xem tất cả ca & thu ngân khác</span>
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-5 relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo mã bill (INV-...), mã đơn, tên khách..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border rounded-xl bg-stone-50 focus:outline-hidden focus:border-primary"
            />
          </div>

          <div className="sm:col-span-4 flex items-center gap-1.5">
            <span className="text-stone-500 font-medium whitespace-nowrap">Trạng thái in:</span>
            <select
              value={filterPrint}
              onChange={(e) => setFilterPrint(e.target.value as any)}
              className="w-full px-2.5 py-2 border rounded-xl bg-stone-50 focus:outline-hidden focus:border-primary"
            >
              <option value="all">Tất cả trạng thái in</option>
              <option value="unprinted">Chưa in bill</option>
              <option value="printed">Đã in hợp lệ</option>
              <option value="reprinted">Đã in lại</option>
            </select>
          </div>

          <div className="sm:col-span-3 flex items-center gap-1.5">
            <span className="text-stone-500 font-medium whitespace-nowrap">Kênh:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-2.5 py-2 border rounded-xl bg-stone-50 focus:outline-hidden focus:border-primary"
            >
              <option value="all">Tất cả kênh</option>
              <option value="dine_in">Tại bàn</option>
              <option value="takeaway">Mang đi</option>
              <option value="delivery">Giao hàng (Ship)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Mã Bill / Đơn</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Hình thức</th>
                <th className="py-3 px-4 text-right">Tổng tiền</th>
                <th className="py-3 px-4 text-center">Thanh toán</th>
                <th className="py-3 px-4 text-center">Trạng thái In</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {visibleInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    Không tìm thấy hóa đơn nào trong ca hiện tại.
                  </td>
                </tr>
              ) : (
                visibleInvoices.map((inv) => {
                  const isPrinted = inv.printStatus === 'printed';
                  const isReprinted = inv.printStatus === 'reprinted';
                  const isUnprinted = inv.printStatus === 'unprinted';

                  return (
                    <tr key={inv.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-stone-900">{inv.id}</div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          {inv.orderId} • v{inv.version}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-600">
                        <div>{inv.createdAt.split(' ')[0]}</div>
                        <div className="text-[10px] text-stone-400">{inv.createdAt.split(' ')[1]}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-stone-900">{inv.customerName || 'Khách vãng lai'}</div>
                        {inv.customerPhone && (
                          <div className="text-[10px] text-stone-500 font-mono">{inv.customerPhone}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            inv.orderType === 'delivery'
                              ? 'bg-purple-100 text-purple-900'
                              : inv.orderType === 'dine_in'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-100 text-stone-800'
                          }`}
                        >
                          {inv.orderType === 'delivery'
                            ? 'Ship'
                            : inv.orderType === 'dine_in'
                            ? 'Tại bàn'
                            : 'Mang đi'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="font-bold text-stone-900">{inv.total.toLocaleString('vi-VN')} đ</div>
                        {inv.discount > 0 && (
                          <div className="text-[10px] text-emerald-600">
                            -{inv.discount.toLocaleString('vi-VN')} ({inv.voucherCode})
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase bg-emerald-100 text-emerald-800">
                          {inv.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isUnprinted && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            Chưa in bill
                          </span>
                        )}
                        {isPrinted && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-1 w-max mx-auto">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            Đã in ({inv.printCount})
                          </span>
                        )}
                        {isReprinted && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-900 border border-red-300">
                            In lại ({inv.printCount})
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => printInvoice(inv.id)}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-primary text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 ml-auto transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Xem & In bill</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
