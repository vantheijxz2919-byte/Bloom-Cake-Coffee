import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { PromotionProgram } from '../../types/crm';
import {
  Tag,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Percent,
  CheckCircle2,
  X,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Play,
  Pause,
  Search,
  Filter,
  DollarSign,
  Gift,
  Clock,
  Layers,
} from 'lucide-react';

export const PromotionsScreen: React.FC = () => {
  const { promotions, togglePromotion, updatePromotion, createPromotion, deletePromotion } =
    useCRM();

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused'>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromotionProgram | null>(null);

  // Form State
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<'combo' | 'dish_discount' | 'tier_discount' | 'gift'>('combo');
  const [formDiscountType, setFormDiscountType] = useState<'percentage' | 'fixed_amount'>('percentage');
  const [formDiscountValue, setFormDiscountValue] = useState<number>(15);
  const [formConditions, setFormConditions] = useState('');
  const [formTarget, setFormTarget] = useState('Tất cả khách hàng');
  const [formBudgetTotal, setFormBudgetTotal] = useState<number>(10000000);
  const [formBudgetUsed, setFormBudgetUsed] = useState<number>(0);
  const [formStartDate, setFormStartDate] = useState('01/10/2026');
  const [formEndDate, setFormEndDate] = useState('31/10/2026');
  const [formIsActive, setFormIsActive] = useState<boolean>(true);
  const [formPriority, setFormPriority] = useState<number>(1);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Overview metrics
  const totalPromos = promotions.length;
  const activePromos = promotions.filter((p) => p.isActive).length;
  const pausedPromos = promotions.filter((p) => !p.isActive).length;
  const totalBudget = promotions.reduce((acc, p) => acc + (p.budgetTotal || 0), 0);
  const totalUsed = promotions.reduce((acc, p) => acc + (p.budgetUsed || 0), 0);
  const budgetUtilization = totalBudget > 0 ? Math.round((totalUsed / totalBudget) * 100) : 0;

  // Filtered promotions
  const filteredPromotions = promotions.filter((promo) => {
    const matchStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
        ? promo.isActive
        : !promo.isActive;

    const matchType = filterType === 'all' ? true : promo.type === filterType;

    const matchSearch =
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.conditions.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.target.toLowerCase().includes(searchTerm.toLowerCase());

    return matchStatus && matchType && matchSearch;
  });

  // Open Modal for New Promotion
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingPromo(null);
    setFormId('PROMO-' + Math.floor(10 + Math.random() * 90));
    setFormTitle('');
    setFormType('combo');
    setFormDiscountType('percentage');
    setFormDiscountValue(15);
    setFormConditions('Áp dụng khung giờ 07:00 - 10:30 toàn chi nhánh');
    setFormTarget('Tất cả khách hàng');
    setFormBudgetTotal(10000000);
    setFormBudgetUsed(0);
    setFormStartDate('22/10/2026');
    setFormEndDate('30/11/2026');
    setFormIsActive(true);
    setFormPriority(promotions.length + 1);
    setIsModalOpen(true);
  };

  // Open Modal for Editing (Running or Paused)
  const handleOpenEditModal = (promo: PromotionProgram) => {
    setIsEditing(true);
    setEditingPromo(promo);
    setFormId(promo.id);
    setFormTitle(promo.title);
    setFormType(promo.type);
    setFormDiscountType(promo.discountType);
    setFormDiscountValue(promo.discountValue);
    setFormConditions(promo.conditions);
    setFormTarget(promo.target);
    setFormBudgetTotal(promo.budgetTotal);
    setFormBudgetUsed(promo.budgetUsed || 0);
    setFormStartDate(promo.startDate);
    setFormEndDate(promo.endDate);
    setFormIsActive(promo.isActive);
    setFormPriority(promo.priority);
    setIsModalOpen(true);
  };

  // Handle Save
  const handleSavePromotion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Vui lòng nhập tên chương trình ưu đãi!');
      return;
    }

    if (isEditing && editingPromo) {
      const updated: PromotionProgram = {
        ...editingPromo,
        title: formTitle.trim(),
        type: formType,
        discountType: formDiscountType,
        discountValue: Number(formDiscountValue) || 0,
        conditions: formConditions.trim(),
        target: formTarget.trim(),
        budgetTotal: Number(formBudgetTotal) || 0,
        budgetUsed: Number(formBudgetUsed) || 0,
        startDate: formStartDate,
        endDate: formEndDate,
        isActive: formIsActive,
        priority: Number(formPriority) || 1,
      };

      updatePromotion(updated);
      setSaveSuccessMsg(`Đã cập nhật chương trình: "${updated.title}"!`);
    } else {
      createPromotion({
        title: formTitle.trim(),
        type: formType,
        discountType: formDiscountType,
        discountValue: Number(formDiscountValue) || 0,
        conditions: formConditions.trim(),
        target: formTarget.trim(),
        budgetTotal: Number(formBudgetTotal) || 0,
        startDate: formStartDate,
        endDate: formEndDate,
        isActive: formIsActive,
        priority: Number(formPriority) || 1,
      });
      setSaveSuccessMsg(`Đã tạo mới chương trình ưu đãi thành công!`);
    }

    setTimeout(() => {
      setSaveSuccessMsg('');
      setIsModalOpen(false);
    }, 1100);
  };

  // Delete promo
  const handleDeletePromo = (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa chương trình ưu đãi "${title}" không?`)) {
      deletePromotion(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-stone-900">
              Module Quản Lý Chương Trình Ưu Đãi Đang Chạy (Spec §18)
            </h2>
            <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sửa Trực Tiếp Khi Đang Chạy
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-3xl">
            Quản lý và chỉnh sửa theo thời gian thực các chương trình combo bánh nước, giờ vàng Teatime, ưu đãi hạng thẻ thành viên. Cập nhật tỷ lệ giảm giá và điều kiện áp dụng tức thì.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Chương Trình Ưu Đãi Mới</span>
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Tổng Chương Trình</div>
            <div className="text-lg font-bold text-stone-900 font-mono">{totalPromos} chiến dịch</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Play className="w-5 h-5 fill-emerald-600" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Đang Hoạt Động (Live)</div>
            <div className="text-lg font-bold text-emerald-700 font-mono">{activePromos} đang chạy</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Ngân Sách Đã Tiêu</div>
            <div className="text-lg font-bold text-stone-900 font-mono">
              {totalUsed.toLocaleString('vi-VN')} đ
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Hấp Thu Ngân Sách</div>
            <div className="text-lg font-bold text-purple-700 font-mono">
              {budgetUtilization}% / {(totalBudget / 1000000).toFixed(0)}M
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên ưu đãi, đối tượng áp dụng hoặc điều kiện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tất cả ({totalPromos})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'active'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-emerald-700'
            }`}
          >
            Đang chạy ({activePromos})
          </button>
          <button
            onClick={() => setFilterStatus('paused')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'paused'
                ? 'bg-stone-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tạm dừng ({pausedPromos})
          </button>
        </div>

        {/* Type Selector */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-primary"
          >
            <option value="all">Mọi hình thức</option>
            <option value="combo">Combo Bánh & Nước</option>
            <option value="dish_discount">Giảm giá món / Giờ vàng</option>
            <option value="tier_discount">Đặc quyền Hội viên</option>
            <option value="gift">Quà tặng tri ân</option>
          </select>
        </div>
      </div>

      {/* Promotions List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPromotions.map((promo) => {
          const budgetPct = Math.round(((promo.budgetUsed || 0) / (promo.budgetTotal || 1)) * 100);

          return (
            <div
              key={promo.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all hover:border-primary/50 relative group ${
                promo.isActive ? 'border-stone-200' : 'border-stone-200 bg-stone-50/70'
              }`}
            >
              <div className="space-y-3">
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      promo.type === 'combo'
                        ? 'bg-amber-100 text-amber-900'
                        : promo.type === 'tier_discount'
                        ? 'bg-purple-100 text-purple-900'
                        : promo.type === 'gift'
                        ? 'bg-pink-100 text-pink-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {promo.type === 'combo'
                      ? 'Combo Bánh & Nước'
                      : promo.type === 'tier_discount'
                      ? 'Đặc quyền Hội viên'
                      : promo.type === 'gift'
                      ? 'Quà tặng Tri ân'
                      : 'Món & Giờ vàng'}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-400">
                      Ưu tiên #{promo.priority}
                    </span>
                    {promo.isActive ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Đang Chạy
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
                        Tạm dừng
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-stone-900 leading-snug group-hover:text-primary transition-colors">
                  {promo.title}
                </h3>

                {/* Conditions & Target Box */}
                <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <div className="flex justify-between items-center pb-1 border-b border-stone-200/60">
                    <span className="text-stone-500">Mức ưu đãi:</span>
                    <span className="font-bold text-primary text-sm font-mono">
                      {promo.discountType === 'percentage'
                        ? `Giảm ${promo.discountValue}%`
                        : `Giảm ${promo.discountValue.toLocaleString('vi-VN')} đ`}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-600">
                    <strong className="text-stone-800">Điều kiện:</strong> {promo.conditions}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    <strong className="text-stone-800">Đối tượng:</strong> {promo.target}
                  </div>
                </div>

                {/* Budget Tracker */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-stone-500 text-[11px]">
                    <span>Ngân sách đã dùng:</span>
                    <span className="font-mono font-bold text-stone-800">
                      {(promo.budgetUsed || 0).toLocaleString('vi-VN')} /{' '}
                      {promo.budgetTotal.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        budgetPct > 80 ? 'bg-amber-500' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(100, budgetPct)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-stone-400 text-right">{budgetPct}% hạn mức</div>
                </div>
              </div>

              {/* Bottom Card Controls & Actions */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {promo.startDate} - {promo.endDate}
                    </span>
                  </div>

                  <button
                    onClick={() => togglePromotion(promo.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                      promo.isActive
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                    }`}
                  >
                    {promo.isActive ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Tạm dừng</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-stone-700" />
                        <span>Bật chạy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sửa chương trình & Xóa */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenEditModal(promo)}
                    className="flex-1 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Sửa Chương Trình Đang Chạy</span>
                  </button>

                  <button
                    onClick={() => handleDeletePromo(promo.id, promo.title)}
                    title="Xóa chương trình này"
                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPromotions.length === 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <Tag className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-700">Không tìm thấy chương trình ưu đãi nào</h3>
          <p className="text-xs text-stone-400">
            Thử thay đổi bộ lọc trạng thái hoặc từ khóa tìm kiếm.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dim transition-colors"
          >
            Tạo Ưu Đãi Mới
          </button>
        </div>
      )}

      {/* ================= MODAL CHỈNH SỬA / TẠO MỚI CHƯƠNG TRÌNH ƯU ĐÃI ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    {isEditing
                      ? 'Chỉnh Sửa Chương Trình Ưu Đãi Đang Chạy'
                      : 'Thiết Lập Chương Trình Ưu Đãi Mới'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isEditing
                      ? 'Cập nhật trực tiếp mức giảm giá, điều kiện, ngân sách và thời hạn áp dụng'
                      : 'Tạo chiến dịch ưu đãi mới áp dụng cho hệ thống Bloom Cake & Coffe'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePromotion} className="flex-1 overflow-y-auto p-6 space-y-4">
              {saveSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Tên Chương Trình Ưu Đãi *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="VD: Bloom Sweet Mornings: Giảm 15% Bánh nướng khi mua kèm Nước"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
                />
              </div>

              {/* Type and Discount Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Loại Hình Ưu Đãi
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary font-medium"
                  >
                    <option value="combo">Combo Bánh & Nước</option>
                    <option value="dish_discount">Giảm giá món / Giờ vàng</option>
                    <option value="tier_discount">Đặc quyền Hội viên</option>
                    <option value="gift">Quà tặng tri ân</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Hình Thức Giảm Giá
                  </label>
                  <select
                    value={formDiscountType}
                    onChange={(e) => setFormDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary font-medium"
                  >
                    <option value="percentage">Theo Phần Trăm (%)</option>
                    <option value="fixed_amount">Số Tiền Trực Tiếp (VNĐ)</option>
                  </select>
                </div>
              </div>

              {/* Discount Value & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mức Ưu Đãi ({formDiscountType === 'percentage' ? '%' : 'VNĐ'}) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step={formDiscountType === 'percentage' ? '1' : '1000'}
                      required
                      value={formDiscountValue}
                      onChange={(e) => setFormDiscountValue(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold text-primary focus:outline-none focus:border-primary"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-bold">
                      {formDiscountType === 'percentage' ? '%' : 'đ'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Thứ Tự Ưu Tiên Áp Dụng (1 là cao nhất)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={formPriority}
                    onChange={(e) => setFormPriority(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Conditions & Target */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Điều Kiện Kích Hoạt Áp Dụng
                  </label>
                  <input
                    type="text"
                    value={formConditions}
                    onChange={(e) => setFormConditions(e.target.value)}
                    placeholder="VD: Áp dụng khung giờ 07:00 - 10:30 toàn chi nhánh, đơn từ 120.000đ"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Đối Tượng Áp Dụng
                  </label>
                  <input
                    type="text"
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    placeholder="VD: Tất cả khách hàng / Hội viên Vàng & Kim Cương / Khách tại quầy"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Budget Total & Used */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Hạn Mức Ngân Sách Chiến Dịch (VNĐ)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="500000"
                      value={formBudgetTotal}
                      onChange={(e) => setFormBudgetTotal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-primary"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-bold">
                      đ
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ngân Sách Đã Hấp Thu (VNĐ)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="100000"
                      value={formBudgetUsed}
                      onChange={(e) => setFormBudgetUsed(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-primary"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-bold">
                      đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ngày Bắt Đầu
                  </label>
                  <input
                    type="text"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ngày Kết Thúc
                  </label>
                  <input
                    type="text"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div>
                  <div className="text-xs font-bold text-stone-800">
                    Trạng Thái Kích Hoạt Chiến Dịch
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Bật để chiến dịch áp dụng ngay trên POS và hệ thống bán lẻ.
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isEditing ? 'Lưu Thay Đổi Chương Trình Đang Chạy' : 'Tạo & Chạy Chương Trình'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
