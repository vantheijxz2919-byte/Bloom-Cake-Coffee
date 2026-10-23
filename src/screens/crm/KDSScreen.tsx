import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { StationType, TicketStatus } from '../../types/crm';
import {
  UtensilsCrossed,
  Coffee,
  Cake,
  Gift,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Check,
  Building,
} from 'lucide-react';

export const KDSScreen: React.FC = () => {
  const { tickets, updateTicketStatus, toggleTicketLine, reportTicketIssue, activeStaff } = useCRM();

  const [selectedStation, setSelectedStation] = useState<StationType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | 'all'>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reportingTicketId, setReportingTicketId] = useState<string | null>(null);
  const [issueReasonInput, setIssueReasonInput] = useState<string>('');

  const filteredTickets = tickets.filter((t) => {
    const matchesStation = selectedStation === 'all' || t.station === selectedStation;
    const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
    return matchesStation && matchesStatus;
  });

  const handleIssueSubmit = (ticketId: string) => {
    if (!issueReasonInput.trim()) return;
    reportTicketIssue(ticketId, issueReasonInput);
    setReportingTicketId(null);
    setIssueReasonInput('');
  };

  return (
    <div className="space-y-4">
      {/* KDS Header Controls */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-stone-200 flex flex-wrap items-center justify-between gap-4">
        {/* Station Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedStation('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedStation === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            Tất Cả Trạm ({tickets.length})
          </button>
          <button
            onClick={() => setSelectedStation('beverage')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedStation === 'beverage'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Coffee className="w-4 h-4" />
            Pha Chế Barista ({tickets.filter((t) => t.station === 'beverage').length})
          </button>
          <button
            onClick={() => setSelectedStation('bakery')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedStation === 'bakery'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Cake className="w-4 h-4" />
            Bếp Bánh Nướng ({tickets.filter((t) => t.station === 'bakery').length})
          </button>
          <button
            onClick={() => setSelectedStation('packing')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedStation === 'packing'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Gift className="w-4 h-4" />
            Đóng Gói & Quà ({tickets.filter((t) => t.station === 'packing').length})
          </button>
        </div>

        {/* Status Filter & Sound Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold ${
                selectedStatus === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedStatus('waiting')}
              className={`px-2.5 py-1 rounded-lg font-semibold ${
                selectedStatus === 'waiting' ? 'bg-amber-500 text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              Chờ làm
            </button>
            <button
              onClick={() => setSelectedStatus('preparing')}
              className={`px-2.5 py-1 rounded-lg font-semibold ${
                selectedStatus === 'preparing' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              Đang làm
            </button>
            <button
              onClick={() => setSelectedStatus('ready')}
              className={`px-2.5 py-1 rounded-lg font-semibold ${
                selectedStatus === 'ready' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              Sẵn sàng
            </button>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-stone-100 border-stone-200 text-stone-500'
            }`}
            title="Bật/Tắt chuông báo đơn mới KDS"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-medium">{soundEnabled ? 'Chuông: Bật' : 'Chuông: Tắt'}</span>
          </button>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTickets.length === 0 ? (
          <div className="col-span-full py-16 bg-white rounded-2xl border border-stone-200 text-center text-stone-400">
            <UtensilsCrossed className="w-10 h-10 mx-auto mb-2 text-stone-300" />
            <p className="font-semibold text-sm">Hàng chờ trạm đang trống</p>
            <p className="text-xs">Chưa có phiếu chế biến nào theo bộ lọc đã chọn</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isWaiting = ticket.status === 'waiting';
            const isPreparing = ticket.status === 'preparing';
            const isReady = ticket.status === 'ready';
            const isIssue = ticket.status === 'issue';

            return (
              <div
                key={ticket.id}
                className={`bg-white rounded-2xl border shadow-xs overflow-hidden flex flex-col justify-between transition-all ${
                  isIssue
                    ? 'border-red-400 ring-2 ring-red-100'
                    : isReady
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isPreparing
                    ? 'border-blue-400 ring-2 ring-blue-50'
                    : 'border-stone-200'
                }`}
              >
                {/* Ticket Top Banner */}
                <div
                  className={`px-4 py-2.5 flex items-center justify-between text-xs font-bold border-b ${
                    isIssue
                      ? 'bg-red-500 text-white'
                      : isReady
                      ? 'bg-emerald-600 text-white'
                      : isPreparing
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-800 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{ticket.id}</span>
                    <span className="text-[10px] font-normal opacity-85">({ticket.orderId})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{ticket.waitingMinutes} phút</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                        ticket.orderType === 'delivery'
                          ? 'bg-purple-100 text-purple-900'
                          : ticket.orderType === 'pickup'
                          ? 'bg-blue-100 text-blue-900'
                          : ticket.orderType === 'dine_in'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-white text-stone-900'
                      }`}
                    >
                      {ticket.orderType === 'delivery'
                        ? 'Giao hàng'
                        : ticket.orderType === 'pickup'
                        ? 'Tới lấy quầy'
                        : ticket.orderType === 'dine_in'
                        ? ticket.tableNumber || 'Tại bàn'
                        : 'Mang đi'}
                    </span>
                  </div>
                </div>

                {/* Ticket Info & Items */}
                <div className="p-4 space-y-3 flex-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-stone-800 flex items-center gap-1">
                      {ticket.station === 'beverage' ? (
                        <Coffee className="w-3.5 h-3.5 text-amber-600" />
                      ) : ticket.station === 'bakery' ? (
                        <Cake className="w-3.5 h-3.5 text-amber-700" />
                      ) : (
                        <Gift className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      {ticket.stationName}
                    </span>
                    <span>Tạo lúc: {ticket.createdAt}</span>
                  </div>

                  {/* Allergen Warning if present */}
                  {ticket.allergenWarning && (
                    <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>
                        <strong>Cảnh báo dị ứng:</strong> {ticket.allergenWarning}
                      </span>
                    </div>
                  )}

                  {/* Issue Banner if reported */}
                  {isIssue && (
                    <div className="p-2 bg-red-100 border border-red-300 rounded-lg text-xs text-red-900 font-medium">
                      ⚠️ Sự cố: {ticket.issueReason}
                    </div>
                  )}

                  {/* Checklist of Ticket Lines */}
                  <div className="space-y-2 border-t border-stone-100 pt-2">
                    {ticket.items.map((line) => (
                      <div
                        key={line.id}
                        onClick={() => toggleTicketLine(ticket.id, line.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          line.isReady
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 line-through opacity-70'
                            : 'bg-stone-50 border-stone-200 text-stone-900 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                              line.isReady
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-white border-stone-300'
                            }`}
                          >
                            {line.isReady && <Check className="w-3.5 h-3.5" />}
                          </div>

                          <div>
                            <div className="font-bold text-xs">
                              <span className="font-mono text-primary font-extrabold mr-1.5">
                                x{line.quantity}
                              </span>
                              {line.name}
                            </div>
                            {line.variant && (
                              <div className="text-[11px] text-stone-500 font-normal">{line.variant}</div>
                            )}
                            {line.options && line.options.length > 0 && (
                              <div className="text-[10px] text-amber-700 font-medium">
                                {line.options.join(' • ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ticket Actions */}
                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                  {reportingTicketId === ticket.id ? (
                    <div className="w-full space-y-2">
                      <input
                        type="text"
                        placeholder="Nhập lý do sự cố (hết sữa, máy lỗi, làm lại)..."
                        value={issueReasonInput}
                        onChange={(e) => setIssueReasonInput(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 border border-red-300 rounded-lg bg-white"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setReportingTicketId(null)}
                          className="px-2.5 py-1 text-xs text-stone-600"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={() => handleIssueSubmit(ticket.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Báo sự cố
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setReportingTicketId(ticket.id)}
                        className="px-2.5 py-1.5 text-stone-500 hover:text-red-600 text-xs font-medium rounded-lg flex items-center gap-1"
                        title="Báo cáo thiếu nguyên liệu hoặc sự cố máy"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Báo sự cố
                      </button>

                      <div className="flex items-center gap-1.5">
                        {isWaiting && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'preparing')}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
                          >
                            <Play className="w-3.5 h-3.5" />
                            Bắt đầu làm
                          </button>
                        )}

                        {isPreparing && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'ready')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Báo hoàn thành
                          </button>
                        )}

                        {isReady && (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Đã sẵn sàng
                          </span>
                        )}

                        {isIssue && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'preparing')}
                            className="px-3 py-1.5 bg-stone-700 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Khắc phục & Làm lại
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
