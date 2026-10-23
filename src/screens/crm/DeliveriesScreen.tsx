import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { DeliveryStatus, CODStatus, DeliveryNote } from '../../types/crm';
import {
  Truck,
  User,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Calendar,
  XCircle,
  UserCheck,
  ShieldAlert,
  RotateCcw,
  Plus,
} from 'lucide-react';

export const DeliveriesScreen: React.FC = () => {
  const {
    deliveries,
    assignShipper,
    updateDeliveryStatus,
    recordDeliveryAttempt,
    collectCODByShipper,
    settleCODWithStore,
    activeStaff,
  } = useCRM();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryNote | null>(deliveries[0] || null);

  // Modal states
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [shipperNameInput, setShipperNameInput] = useState<string>('Nguyễn Văn Hưng');
  const [shipperPhoneInput, setShipperPhoneInput] = useState<string>('0905 789 123');
  const [shipperPlateInput, setShipperPlateInput] = useState<string>('43-D1 829.14');

  const [showAttemptModal, setShowAttemptModal] = useState<boolean>(false);
  const [attemptStatus, setAttemptStatus] = useState<'delivered' | 'failed'>('delivered');
  const [attemptReason, setAttemptReason] = useState<string>('');

  // Filter deliveries
  const filteredDeliveries = deliveries.filter((del) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'cod_pending') return del.codStatus === 'collected_by_shipper';
    return del.status === activeTab;
  });

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDelivery) return;
    assignShipper(selectedDelivery.id, shipperNameInput, shipperPhoneInput, shipperPlateInput);
    setShowAssignModal(false);
  };

  const handleAttemptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDelivery) return;
    recordDeliveryAttempt(selectedDelivery.id, attemptStatus, attemptReason);
    setShowAttemptModal(false);
    setAttemptReason('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice from Spec 13 */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            CRM Quản Lý Giao Hàng & Phiếu Giao (Spec §13)
          </h2>
          <p className="text-xs text-stone-500">
            Dành riêng cho đơn ship ngoại tiệm. Theo dõi điều phối shipper, lần thử giao và đối soát COD hai lớp.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'all' ? 'bg-stone-900 text-white shadow-xs' : 'bg-stone-100 text-stone-600'
            }`}
          >
            Tất cả ({deliveries.length})
          </button>
          <button
            onClick={() => setActiveTab('waiting_handover')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'waiting_handover' ? 'bg-amber-600 text-white shadow-xs' : 'bg-stone-100 text-stone-600'
            }`}
          >
            Chờ bàn giao
          </button>
          <button
            onClick={() => setActiveTab('delivering')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'delivering' ? 'bg-blue-600 text-white shadow-xs' : 'bg-stone-100 text-stone-600'
            }`}
          >
            Đang giao
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'delivered' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-100 text-stone-600'
            }`}
          >
            Đã giao
          </button>
          <button
            onClick={() => setActiveTab('cod_pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'cod_pending' ? 'bg-purple-600 text-white shadow-xs' : 'bg-stone-100 text-stone-600'
            }`}
          >
            Chờ đối soát COD ({deliveries.filter((d) => d.codStatus === 'collected_by_shipper').length})
          </button>
        </div>
      </div>

      {/* Main Grid: Left List (5 cols), Right Detail View (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Deliveries List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredDeliveries.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center text-stone-400 text-xs">
              Không có phiếu giao nào trong trạng thái này.
            </div>
          ) : (
            filteredDeliveries.map((del) => {
              const isSelected = selectedDelivery?.id === del.id;
              const hasCOD = del.codAmount > 0;
              const isCODCollected = del.codStatus === 'collected_by_shipper';
              const isCODSettled = del.codStatus === 'settled_with_store';

              return (
                <div
                  key={del.id}
                  onClick={() => setSelectedDelivery(del)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/60 border-primary shadow-sm ring-1 ring-primary/40'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono font-bold text-stone-900">{del.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        del.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : del.status === 'delivering'
                          ? 'bg-blue-100 text-blue-800'
                          : del.status === 'waiting_handover'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {del.status === 'delivered'
                        ? 'Đã giao'
                        : del.status === 'delivering'
                        ? 'Đang giao'
                        : del.status === 'waiting_handover'
                        ? 'Chờ bàn giao'
                        : del.status}
                    </span>
                  </div>

                  <div className="font-bold text-xs text-stone-800">{del.customerName}</div>
                  <div className="text-[11px] text-stone-500 line-clamp-1">{del.deliveryAddress}</div>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-stone-600">
                      Shipper: <strong className="text-stone-800">{del.shipperName || 'Chưa gán'}</strong>
                    </div>

                    {hasCOD && (
                      <div className="text-right">
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                            isCODSettled
                              ? 'bg-emerald-100 text-emerald-800'
                              : isCODCollected
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          COD: {del.codAmount.toLocaleString('vi-VN')} đ (
                          {isCODSettled ? 'Đã nộp két' : isCODCollected ? 'Shipper giữ' : 'Chưa thu'})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Delivery Details Panel */}
        {selectedDelivery && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                  HỒ SƠ PHIẾU GIAO HÀNG
                </span>
                <h3 className="text-lg font-bold text-stone-900">{selectedDelivery.id}</h3>
                <p className="text-xs text-stone-500">
                  Liên kết Hóa đơn: <strong>{selectedDelivery.invoiceId}</strong> • Đơn:{' '}
                  <strong>{selectedDelivery.orderId}</strong>
                </p>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-white">
                  Trạng thái: {selectedDelivery.status}
                </span>
                <p className="text-[11px] text-stone-400 mt-1">Hẹn giao: {selectedDelivery.scheduledTime}</p>
              </div>
            </div>

            {/* Recipient Card */}
            <div className="p-4 bg-stone-50 rounded-xl space-y-2 text-xs border border-stone-200">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" />
                  {selectedDelivery.customerName}
                </span>
                <span className="flex items-center gap-1 font-mono text-stone-700">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  {selectedDelivery.customerPhone}
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-stone-600">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>{selectedDelivery.deliveryAddress}</span>
              </div>

              {selectedDelivery.notes && (
                <div className="text-stone-500 italic bg-white p-2 rounded-lg border border-stone-200">
                  Ghi chú giao: {selectedDelivery.notes}
                </div>
              )}
            </div>

            {/* Shipper & Handover Section */}
            <div className="p-4 rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-stone-600" />
                  Thông Tin Shipper & Bàn Giao
                </h4>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg"
                >
                  {selectedDelivery.shipperName ? 'Đổi Shipper' : 'Phân Công Shipper'}
                </button>
              </div>

              {selectedDelivery.shipperName ? (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500">Tài xế giao:</span>
                    <p className="font-bold text-stone-800">{selectedDelivery.shipperName}</p>
                    <p className="text-stone-500 font-mono">{selectedDelivery.shipperPhone}</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Biển số xe:</span>
                    <p className="font-mono font-bold text-stone-800">{selectedDelivery.shipperPlate}</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Đã cấp thùng giữ nhiệt</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-amber-600">⚠️ Chưa phân công tài xế cho đơn này.</p>
              )}
            </div>

            {/* COD Settlement Section (Spec 13.3) */}
            {selectedDelivery.codAmount > 0 && (
              <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-purple-950 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-purple-700" />
                      Quy Chuẩn Đối Soát COD Hai Lớp (Spec §13)
                    </h4>
                    <p className="text-[11px] text-purple-800">
                      Tách biệt: (1) Shipper đã thu từ khách vs (2) Tiệm đã nhận nộp két.
                    </p>
                  </div>
                  <div className="font-mono font-extrabold text-sm text-purple-900">
                    {selectedDelivery.codAmount.toLocaleString('vi-VN')} đ
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-purple-200">
                  {selectedDelivery.codStatus === 'uncollected' && (
                    <button
                      onClick={() => collectCODByShipper(selectedDelivery.id)}
                      className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Xác nhận Shipper đã thu COD từ khách
                    </button>
                  )}

                  {selectedDelivery.codStatus === 'collected_by_shipper' && (
                    <>
                      <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Tiền đang giữ bởi Shipper
                      </span>
                      <button
                        onClick={() => settleCODWithStore(selectedDelivery.id)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        Thu ngân nhận tiền & Nhập két ca ({selectedDelivery.codAmount.toLocaleString('vi-VN')} đ)
                      </button>
                    </>
                  )}

                  {selectedDelivery.codStatus === 'settled_with_store' && (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      Đã hoàn tất đối soát & nộp đủ vào két ca Hàm Nghi
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Attempts & Record Attempt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-800">Lịch Sử Các Lần Thử Giao</h4>
                <button
                  onClick={() => setShowAttemptModal(true)}
                  className="px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1 hover:bg-primary transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ghi nhận lần thử giao
                </button>
              </div>

              <div className="space-y-2">
                {selectedDelivery.attempts.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-stone-800">Lần {att.attemptNumber}: </span>
                      <span
                        className={`font-semibold ${
                          att.status === 'delivered' ? 'text-emerald-700' : 'text-red-600'
                        }`}
                      >
                        {att.status === 'delivered' ? 'Giao thành công' : 'Thất bại / Hẹn lại'}
                      </span>
                      {att.reason && <p className="text-[11px] text-stone-500 mt-0.5">{att.reason}</p>}
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">{att.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline View */}
            <div className="space-y-3 border-t border-stone-200 pt-4">
              <h4 className="text-xs font-bold text-stone-800">Nhật Ký Hành Trình (Timeline)</h4>
              <div className="space-y-3 pl-2 border-l-2 border-primary/40 text-xs">
                {selectedDelivery.timeline.map((step, idx) => (
                  <div key={idx} className="relative pl-4">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800">{step.status}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{step.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-stone-500">Thực hiện: {step.actor}</div>
                    {step.note && <div className="text-[11px] text-stone-600 italic mt-0.5">{step.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assign Shipper Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-sm text-stone-900">Phân Công Shipper</h3>
            <form onSubmit={handleAssignSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 font-semibold">Tên tài xế:</label>
                <input
                  type="text"
                  value={shipperNameInput}
                  onChange={(e) => setShipperNameInput(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-stone-600 font-semibold">Số điện thoại:</label>
                <input
                  type="text"
                  value={shipperPhoneInput}
                  onChange={(e) => setShipperPhoneInput(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-stone-600 font-semibold">Biển số xe:</label>
                <input
                  type="text"
                  value={shipperPlateInput}
                  onChange={(e) => setShipperPlateInput(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-3 py-1.5 text-stone-600"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-1.5 bg-primary text-white font-bold rounded-lg">
                  Lưu phân công
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Attempt Modal */}
      {showAttemptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-sm text-stone-900">Ghi Nhận Lần Thử Giao</h3>
            <form onSubmit={handleAttemptSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 font-semibold">Kết quả:</label>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setAttemptStatus('delivered')}
                    className={`flex-1 py-2 rounded-lg font-bold border ${
                      attemptStatus === 'delivered'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    Thành công
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttemptStatus('failed')}
                    className={`flex-1 py-2 rounded-lg font-bold border ${
                      attemptStatus === 'failed'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    Thất bại
                  </button>
                </div>
              </div>
              <div>
                <label className="text-stone-600 font-semibold">Chi tiết / Lý do (nếu thất bại):</label>
                <input
                  type="text"
                  placeholder="Khách không nghe máy, hẹn lại 14h, khách nhận lễ tân..."
                  value={attemptReason}
                  onChange={(e) => setAttemptReason(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAttemptModal(false)}
                  className="px-3 py-1.5 text-stone-600"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-1.5 bg-primary text-white font-bold rounded-lg">
                  Lưu kết quả
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
