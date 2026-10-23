import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { MemberProfile } from '../../types/crm';
import {
  Users,
  Search,
  Plus,
  Award,
  Clock,
  DollarSign,
  TrendingUp,
  X,
  ShieldAlert,
  ArrowUpDown,
  MessageSquare,
  Send,
  AlertTriangle,
  Calendar,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export const MembersScreen: React.FC = () => {
  const { members, adjustMemberPoints, addNewMember, sendResetNoticeSMS, resetMemberCycle, activeStaff } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'expiring_7d' | 'sms_sent' | 'vip'>('all');
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(members[0] || null);

  // Points adjustment modal state
  const [showAdjustModal, setShowAdjustModal] = useState<boolean>(false);
  const [pointsDelta, setPointsDelta] = useState<number>(50);
  const [adjustReason, setAdjustReason] = useState<string>('');

  // New member modal
  const [showNewMemberModal, setShowNewMemberModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');

  // SMS Preview & Alert Modal
  const [showSmsModal, setShowSmsModal] = useState<boolean>(false);
  const [smsFeedback, setSmsFeedback] = useState<string | null>(null);

  // Filter members
  const expiring7dCount = members.filter((m) => m.daysUntilReset <= 7).length;

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery.trim()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'expiring_7d') return m.daysUntilReset <= 7;
    if (filterTab === 'sms_sent') return m.smsResetNoticeSent;
    if (filterTab === 'vip') return m.tier === 'Kim Cương' || m.tier === 'Vàng';
    return true;
  });

  const handleSendSms = (memberId: string) => {
    const res = sendResetNoticeSMS(memberId);
    if (res.success) {
      setSmsFeedback(res.message);
      setTimeout(() => setSmsFeedback(null), 4000);
      // update selectedMember ref
      const updated = members.find((m) => m.id === memberId);
      if (updated) setSelectedMember(updated);
    }
  };

  const handleSendBatchSms = () => {
    const targets = members.filter((m) => m.daysUntilReset <= 7 && !m.smsResetNoticeSent);
    if (targets.length === 0) {
      setSmsFeedback('Tất cả hội viên hết hạn trong 7 ngày đều đã được gửi SMS thông báo.');
      setTimeout(() => setSmsFeedback(null), 4000);
      return;
    }
    targets.forEach((t) => sendResetNoticeSMS(t.id));
    setSmsFeedback(`Đã gửi SMS cảnh báo reset điểm tự động tới ${targets.length} hội viên!`);
    setTimeout(() => setSmsFeedback(null), 4000);
  };

  const handleResetCycle = (memberId: string) => {
    if (!window.confirm('Xác nhận reset điểm khả dụng về 0 và bắt đầu chu kỳ 6 tháng mới cho hội viên này?')) {
      return;
    }
    resetMemberCycle(memberId);
    setSmsFeedback('Đã reset điểm khả dụng về 0 và mở chu kỳ tích lũy 6 tháng mới.');
    setTimeout(() => setSmsFeedback(null), 4000);
    const updated = members.find((m) => m.id === memberId);
    if (updated) setSelectedMember(updated);
  };

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || pointsDelta === 0 || !adjustReason.trim()) return;
    adjustMemberPoints(selectedMember.id, pointsDelta, adjustReason);
    setShowAdjustModal(false);
    setPointsDelta(50);
    setAdjustReason('');
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;
    const created = addNewMember(newName, newPhone);
    setSelectedMember(created);
    setShowNewMemberModal(false);
    setNewName('');
    setNewPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & 6-Month Loyalty Cycle Policy */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-stone-900">
                Quản Trị Hội Viên Bloom Club &amp; Chu Kỳ Reset Điểm 6 Tháng (Spec §17)
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              <strong>Quy tắc điểm:</strong> Điểm tích lũy đổi quà sẽ tự động reset về 0 sau mỗi chu kỳ <strong>6 tháng (180 ngày)</strong> kể từ lúc tạo tài khoản hoặc lần reset trước đó. Hệ thống tự động gửi tin nhắn <strong>SMS thông báo trước 1 tuần (7 ngày)</strong> qua số điện thoại để khách kịp đổi quà bánh tươi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {expiring7dCount > 0 && (
              <button
                onClick={handleSendBatchSms}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi SMS Hàng Loạt ({expiring7dCount} Khách)</span>
              </button>
            )}

            <button
              onClick={() => setShowNewMemberModal(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng Ký Hội Viên Mới</span>
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {smsFeedback && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{smsFeedback}</span>
          </div>
        )}
      </div>

      {/* Tier Policy Quick Reference Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
          <div className="font-bold text-amber-900 flex items-center justify-between">
            <span>Hạng Đồng</span>
            <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded">0–199 điểm</span>
          </div>
          <div className="text-amber-800 font-extrabold text-sm mt-1">Tích 5% giá trị đơn</div>
        </div>

        <div className="bg-stone-100 border border-stone-300 p-3 rounded-xl">
          <div className="font-bold text-stone-900 flex items-center justify-between">
            <span>Hạng Bạc</span>
            <span className="text-[10px] bg-stone-200 px-1.5 py-0.5 rounded">200–499 điểm</span>
          </div>
          <div className="text-stone-800 font-extrabold text-sm mt-1">Tích 8% giá trị đơn</div>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-xl">
          <div className="font-bold text-yellow-900 flex items-center justify-between">
            <span>Hạng Vàng</span>
            <span className="text-[10px] bg-yellow-200 px-1.5 py-0.5 rounded">500–999 điểm</span>
          </div>
          <div className="text-yellow-800 font-extrabold text-sm mt-1">Tích 10% giá trị đơn</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl">
          <div className="font-bold text-purple-950 flex items-center justify-between">
            <span>Hạng Kim Cương</span>
            <span className="text-[10px] bg-purple-200 px-1.5 py-0.5 rounded">&gt; 1.000 điểm</span>
          </div>
          <div className="text-purple-900 font-extrabold text-sm mt-1">Tích 15% + Quà VIP</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => setFilterTab('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
            filterTab === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          Tất cả thành viên ({members.length})
        </button>

        <button
          onClick={() => setFilterTab('expiring_7d')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
            filterTab === 'expiring_7d'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Hết hạn trong 7 ngày (Cần gửi SMS) ({expiring7dCount})</span>
        </button>

        <button
          onClick={() => setFilterTab('sms_sent')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
            filterTab === 'sms_sent'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-emerald-50 border border-emerald-300 text-emerald-900 hover:bg-emerald-100'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Đã gửi SMS nhắc nhở ({members.filter((m) => m.smsResetNoticeSent).length})</span>
        </button>

        <button
          onClick={() => setFilterTab('vip')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
            filterTab === 'vip'
              ? 'bg-purple-800 text-white shadow-xs'
              : 'bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100'
          }`}
        >
          Hội viên VIP (Vàng &amp; Kim Cương)
        </button>
      </div>

      {/* Main Grid: Left Member List (5 cols), Right Member Details & Ledger (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Members List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative text-xs">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo SĐT, họ tên, mã thẻ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border rounded-xl bg-white shadow-xs focus:outline-hidden focus:border-primary text-xs"
            />
          </div>

          <div className="space-y-2">
            {filteredMembers.map((mem) => {
              const isSelected = selectedMember?.id === mem.id;
              const isExpiringSoon = mem.daysUntilReset <= 7;

              return (
                <div
                  key={mem.id}
                  onClick={() => setSelectedMember(mem)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-primary shadow-xs ring-1 ring-primary/40'
                      : isExpiringSoon
                      ? 'bg-amber-50/30 border-amber-300 hover:border-amber-400'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">{mem.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        mem.tier === 'Kim Cương'
                          ? 'bg-purple-100 text-purple-900'
                          : mem.tier === 'Vàng'
                          ? 'bg-yellow-100 text-yellow-900'
                          : mem.tier === 'Bạc'
                          ? 'bg-stone-200 text-stone-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      Hạng {mem.tier}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1 font-mono">
                    <span>{mem.phone}</span>
                    <span>Mã: {mem.code}</span>
                  </div>

                  {/* 6-Month Cycle & SMS status pill */}
                  <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-1 text-[11px]">
                    <div className="flex items-center gap-1">
                      <span className="text-stone-400">Chu kỳ 6T:</span>
                      <span className="font-mono text-stone-700">{mem.cycleResetDate}</span>
                    </div>

                    {isExpiringSoon ? (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10px] flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5 text-red-600" />
                        <span>Còn {mem.daysUntilReset} ngày (Reset 0đ)</span>
                      </span>
                    ) : (
                      <span className="text-stone-500 font-mono text-[10px]">
                        Còn {mem.daysUntilReset} ngày
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[10px]">
                      {mem.smsResetNoticeSent ? (
                        <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>SMS: Đã gửi</span>
                        </span>
                      ) : isExpiringSoon ? (
                        <span className="text-amber-800 font-bold flex items-center gap-0.5">
                          <Send className="w-3 h-3 text-amber-700" />
                          <span>SMS: Chưa gửi (Cần gửi)</span>
                        </span>
                      ) : (
                        <span className="text-stone-400">SMS: Chưa gửi</span>
                      )}
                    </div>
                    <span className="font-bold text-primary font-mono">{mem.availablePoints} điểm</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Member Detail Panel */}
        {selectedMember && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
            {/* Top Member Card */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                  HỒ SƠ HỘI VIÊN SUMMER CLUB
                </span>
                <h3 className="text-lg font-bold text-stone-900">{selectedMember.name}</h3>
                <p className="text-xs text-stone-500 font-mono">
                  SĐT: {selectedMember.phone} • Thẻ: {selectedMember.code} • Ngày tạo: {selectedMember.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAdjustModal(true)}
                  className="px-3 py-2 bg-stone-900 hover:bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Điều Chỉnh Điểm</span>
                </button>
              </div>
            </div>

            {/* 6-MONTH LOYALTY CYCLE & 7-DAY SMS ALERT BOX */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                      Chu Kỳ Điểm 6 Tháng &amp; Cảnh Báo Reset Về 0
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Điểm tự động reset về 0 sau 180 ngày tính từ ngày tạo hoặc lần reset trước.
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    selectedMember.daysUntilReset <= 7
                      ? 'bg-red-200 text-red-900 animate-pulse'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {selectedMember.daysUntilReset <= 7
                    ? `SẮP RESET (CÒN ${selectedMember.daysUntilReset} NGÀY)`
                    : `Hạn: Còn ${selectedMember.daysUntilReset} ngày`}
                </span>
              </div>

              {/* 4-Stat Grid for Cycle */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-stone-500">Bắt đầu chu kỳ:</span>
                  <div className="font-mono font-bold text-stone-800 mt-0.5">
                    {selectedMember.cycleStartDate}
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-stone-500">Hạn reset điểm:</span>
                  <div className="font-mono font-bold text-amber-800 mt-0.5">
                    {selectedMember.cycleResetDate}
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-stone-500">Thời gian còn lại:</span>
                  <div
                    className={`font-mono font-bold mt-0.5 ${
                      selectedMember.daysUntilReset <= 7 ? 'text-red-600' : 'text-stone-800'
                    }`}
                  >
                    {selectedMember.daysUntilReset} ngày
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-stone-500">SMS trước 1 tuần:</span>
                  <div className="font-bold text-[11px] mt-0.5 flex items-center gap-1">
                    {selectedMember.smsResetNoticeSent ? (
                      <span className="text-emerald-700 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Đã gửi</span>
                      </span>
                    ) : (
                      <span className="text-amber-800">Chưa gửi</span>
                    )}
                  </div>
                </div>
              </div>

              {/* SMS Alert & Cycle Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/60">
                <button
                  type="button"
                  onClick={() => handleSendSms(selectedMember.id)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {selectedMember.smsResetNoticeSent
                      ? 'Gửi Lại SMS Nhắc Nhở'
                      : `Gửi SMS Báo Reset Điểm (SĐT: ${selectedMember.phone})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSmsModal(true)}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-stone-600" />
                  <span>Xem Tin Nhắn SMS Mẫu</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleResetCycle(selectedMember.id)}
                  className="px-3 py-1.5 bg-white border border-red-300 hover:bg-red-50 text-red-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                  <span>Reset Điểm Về 0 Ngay</span>
                </button>
              </div>
            </div>

            {/* Points Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500">Điểm đổi quà khả dụng:</span>
                <div className="text-xl font-bold font-mono text-primary mt-1">
                  {selectedMember.availablePoints}
                </div>
                <span className="text-[10px] text-stone-400">Reset sau 6 tháng</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500">Điểm xét hạng 12 tháng:</span>
                <div className="text-xl font-bold font-mono text-amber-700 mt-1">
                  {selectedMember.tierPoints}
                </div>
                <span className="text-[10px] text-stone-400">Không giảm khi đổi quà</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500">Tổng chi tiêu:</span>
                <div className="text-base font-bold font-mono text-stone-800 mt-1">
                  {selectedMember.totalSpent.toLocaleString('vi-VN')} đ
                </div>
                <span className="text-[10px] text-stone-400">{selectedMember.totalOrders} đơn hàng</span>
              </div>
            </div>

            {/* Point Ledger History (Spec 17.2) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-stone-500" />
                Sổ Nhật Ký Tích & Trừ Điểm (Point Ledger)
              </h4>

              <div className="space-y-2">
                {selectedMember.pointHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-800">{item.reason}</div>
                      <div className="text-[10px] text-stone-500">
                        Thực hiện: {item.actor} • {item.date}
                      </div>
                    </div>

                    <div
                      className={`font-mono font-bold text-sm ${
                        item.points > 0 ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {item.points > 0 ? `+${item.points}` : item.points} điểm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Adjust Points Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-sm text-stone-900">Điều Chỉnh Điểm Hội Viên</h3>
            <p className="text-xs text-stone-500">
              Thao tác trên hội viên <strong>{selectedMember?.name}</strong>.
            </p>

            <form onSubmit={handleAdjustSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 font-semibold">
                  Số điểm điều chỉnh (+ cộng thêm, - trừ bớt):
                </label>
                <input
                  type="number"
                  value={pointsDelta || ''}
                  onChange={(e) => setPointsDelta(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-lg font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-stone-600 font-semibold">Lý do điều chỉnh (bắt buộc audit):</label>
                <input
                  type="text"
                  placeholder="Bù điểm do lỗi POS, quà sinh nhật, đổi quà tại quầy..."
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="px-3 py-1.5 text-stone-600"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-1.5 bg-primary text-white font-bold rounded-lg">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Member Modal */}
      {showNewMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900">Đăng Ký Hội Viên Bloom Club Mới</h3>
              <button onClick={() => setShowNewMemberModal(false)} className="text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 font-semibold">Họ và tên khách hàng:</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-stone-600 font-semibold">Số điện thoại:</label>
                <input
                  type="text"
                  placeholder="0905 xxx xxx"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewMemberModal(false)}
                  className="px-3 py-1.5 text-stone-600"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-1.5 bg-primary text-white font-bold rounded-lg">
                  Tạo thẻ thành viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SMS Preview & Dispatch Modal in CRM */}
      {showSmsModal && selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">Nội Dung Tin Nhắn SMS Brandname</h3>
                  <p className="text-[11px] text-stone-500">Cảnh báo reset điểm chu kỳ 6 tháng trước 1 tuần</p>
                </div>
              </div>
              <button
                onClick={() => setShowSmsModal(false)}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px]">
                <div>
                  <span className="text-stone-500">Người nhận: </span>
                  <strong className="text-stone-900">{selectedMember.name}</strong>
                </div>
                <div>
                  <span className="text-stone-500">SĐT: </span>
                  <strong className="text-stone-900">{selectedMember.phone}</strong>
                </div>
              </div>

              {/* Simulated SMS Bubble */}
              <div className="p-4 rounded-xl bg-stone-900 text-stone-100 space-y-2 font-sans text-xs leading-relaxed shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono border-b border-stone-800 pb-1">
                  <span>Brandname: BLOOM CAFE</span>
                  <span>Tin dịch vụ CSKH</span>
                </div>
                <p>
                  [BLOOM CAFE] Chào {selectedMember.name}, bạn đang có{' '}
                  <strong className="text-amber-300 font-mono">
                    {selectedMember.availablePoints.toLocaleString('vi-VN')} điểm
                  </strong>{' '}
                  Bloom Club sắp hết hạn vào ngày{' '}
                  <strong className="text-amber-300 font-mono">{selectedMember.cycleResetDate}</strong> (còn{' '}
                  <strong className="text-red-400 font-bold">{selectedMember.daysUntilReset} ngày</strong> nữa).
                </p>
                <p className="text-[11px] text-stone-300">
                  Theo quy định chu kỳ 6 tháng, điểm sẽ tự động reset về 0. Hãy ghé các chi nhánh Bloom Cake &amp; Coffe hoặc đặt giao hàng online để đổi bánh tươi nóng hoặc ly giữ nhiệt nhé! Hotline hỗ trợ: 0236 388 7844.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 px-1 pt-1">
                <span>Trạng thái hiện tại:</span>
                <span className="font-bold text-stone-800">
                  {selectedMember.smsResetNoticeSent
                    ? `Đã gửi lúc ${selectedMember.smsResetNoticeDate || ''}`
                    : 'Chưa gửi'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowSmsModal(false)}
                className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 rounded-xl text-xs font-semibold"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSendSms(selectedMember.id);
                  setShowSmsModal(false);
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {selectedMember.smsResetNoticeSent
                    ? 'Gửi Lại Tin Nhắn SMS Này'
                    : 'Gửi SMS Đến Khách Hàng Ngay'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
