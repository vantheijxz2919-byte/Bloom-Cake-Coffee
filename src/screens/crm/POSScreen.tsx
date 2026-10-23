import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { MENU_ITEMS } from '../../data/mockData';
import { CartItem } from '../../types';

const CATEGORIES = [
  { id: 'matcha', name: 'Matcha Uji' },
  { id: 'coffee', name: 'Cà phê & Trà' },
  { id: 'pastry', name: 'Bánh nướng' },
  { id: 'dessert', name: 'Bánh hũ lạnh' },
  { id: 'combo', name: 'Combo quà' },
];
import {
  Search,
  Plus,
  Minus,
  Trash2,
  User,
  Ticket,
  DollarSign,
  QrCode,
  CreditCard,
  Printer,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const POSScreen: React.FC = () => {
  const {
    posCart,
    addToPosCart,
    updatePosQty,
    removeFromPosCart,
    clearPosCart,
    posOrderType,
    setPosOrderType,
    posTableNo,
    setPosTableNo,
    posCustomerPhone,
    setPosCustomerPhone,
    posCustomerName,
    setPosCustomerName,
    posAppliedVoucher,
    setPosAppliedVoucher,
    posPaymentMethod,
    setPosPaymentMethod,
    posCashTendered,
    setPosCashTendered,
    posNotes,
    setPosNotes,
    checkoutPosOrder,
    members,
    vouchers,
    activeShift,
  } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [memberSearchResult, setMemberSearchResult] = useState<string | null>(null);

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  // Calculate totals
  const subTotal = posCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  if (posAppliedVoucher === 'DANANGSWEET' && subTotal >= 200000) discount = 30000;
  else if (posAppliedVoucher === 'MATCHAFRESH') discount = Math.round(subTotal * 0.15);
  else if (posAppliedVoucher === 'MERCH250' && subTotal >= 250000) discount = 35000;

  const shippingFee = posOrderType === 'delivery' ? 18000 : 0;
  const grandTotal = Math.max(0, subTotal + shippingFee - discount);
  const changeDue = posPaymentMethod === 'cash' ? Math.max(0, posCashTendered - grandTotal) : 0;

  const handlePhoneLookup = () => {
    const found = members.find((m) => m.phone.includes(posCustomerPhone.trim()) || m.code.includes(posCustomerPhone.trim()));
    if (found) {
      setPosCustomerName(`${found.name} (Hạng ${found.tier} • ${found.availablePoints} điểm)`);
      setMemberSearchResult(`Tìm thấy: ${found.name} • Hạng ${found.tier} • ${found.availablePoints} điểm khả dụng`);
    } else {
      setMemberSearchResult('Không tìm thấy hội viên. Đang để là khách vãng lai.');
    }
  };

  const handleQuickAdd = (menuItem: (typeof MENU_ITEMS)[0]) => {
    const cartItem: CartItem = {
      id: 'pos-' + Date.now(),
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: 1,
      selectedOption: menuItem.options ? menuItem.options[0] : undefined,
      image: menuItem.image,
    };
    addToPosCart(cartItem);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left 7 cols: Touch Catalog */}
      <div className="lg:col-span-7 space-y-4">
        {/* Search & Order Type Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-stone-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Order Type Toggle */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPosOrderType('dine_in')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  posOrderType === 'dine_in'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tại Bàn
              </button>
              <button
                type="button"
                onClick={() => setPosOrderType('takeaway')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  posOrderType === 'takeaway'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Mang Đi
              </button>
              <button
                type="button"
                onClick={() => setPosOrderType('delivery')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  posOrderType === 'delivery'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Giao Hàng (Ship)
              </button>
            </div>

            {posOrderType === 'dine_in' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-stone-500">Số bàn:</span>
                <input
                  type="text"
                  value={posTableNo}
                  onChange={(e) => setPosTableNo(e.target.value)}
                  className="w-24 px-2 py-1 text-xs border rounded-lg font-bold text-center bg-stone-50"
                  placeholder="Bàn 01"
                />
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên món, mã SKU (Cà phê muối, Cannelé, Matcha, Ly sứ...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-hidden focus:border-primary bg-stone-50/50"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCat === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Tất cả món ({MENU_ITEMS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCat === cat.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[620px] overflow-y-auto p-1">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleQuickAdd(item)}
              className="bg-white rounded-xl p-3 border border-stone-200 hover:border-primary hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-28 rounded-lg overflow-hidden mb-2 bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {item.badge && (
                    <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-xs text-stone-900 line-clamp-1 group-hover:text-primary">
                  {item.name}
                </h4>
                <p className="text-[10px] text-stone-500 line-clamp-1">{item.description}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="font-bold text-xs text-primary">{item.price.toLocaleString('vi-VN')} đ</span>
                <span className="p-1 rounded-lg bg-stone-100 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right 5 cols: Order Ticket & Checkout Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-4">
        {/* Ticket Header & Customer Lookup */}
        <div className="space-y-2 border-b border-stone-200 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              Đơn Hàng Hiện Tại
            </h3>
            {posCart.length > 0 && (
              <button
                onClick={clearPosCart}
                className="text-stone-400 hover:text-red-600 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa giỏ
              </button>
            )}
          </div>

          {/* Member Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <User className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tra cứu SĐT hoặc mã thẻ hội viên..."
                value={posCustomerPhone}
                onChange={(e) => setPosCustomerPhone(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePhoneLookup()}
                className="w-full pl-8 pr-2 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:border-primary bg-stone-50"
              />
            </div>
            <button
              type="button"
              onClick={handlePhoneLookup}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
            >
              Tìm
            </button>
          </div>
          {memberSearchResult && (
            <p className="text-[11px] text-emerald-700 font-medium bg-emerald-50 p-1.5 rounded-md">
              {memberSearchResult}
            </p>
          )}
        </div>

        {/* Cart Item List */}
        <div className="max-h-[220px] overflow-y-auto space-y-2 divide-y divide-stone-100">
          {posCart.length === 0 ? (
            <div className="py-8 text-center text-stone-400 text-xs space-y-1">
              <p>Chưa có món nào được chọn</p>
              <p className="text-[10px]">Chạm vào sản phẩm bên trái để thêm vào đơn</p>
            </div>
          ) : (
            posCart.map((item) => (
              <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2 text-xs">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-stone-800 truncate">{item.name}</div>
                  {item.selectedOption && (
                    <div className="text-[10px] text-stone-500 truncate">{item.selectedOption}</div>
                  )}
                  <div className="text-[11px] text-primary font-medium">
                    {item.price.toLocaleString('vi-VN')} đ
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updatePosQty(item.id, -1)}
                    className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center font-bold text-stone-800">{item.quantity}</span>
                  <button
                    onClick={() => updatePosQty(item.id, 1)}
                    className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right w-18 font-bold text-stone-900">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </div>

                <button
                  onClick={() => removeFromPosCart(item.id)}
                  className="p-1 text-stone-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Section 20.2: Ưu Đãi & Voucher block placed BEFORE grand total */}
        <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-amber-600" />
              Ưu đãi & Voucher của đơn (Spec §20)
            </span>
            {posAppliedVoucher && (
              <button
                onClick={() => setPosAppliedVoucher(null)}
                className="text-[11px] text-red-600 hover:underline"
              >
                Gỡ mã
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {vouchers.map((v) => {
              const isSelected = posAppliedVoucher === v.code;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setPosAppliedVoucher(isSelected ? null : v.code)}
                  className={`p-1.5 text-left rounded-lg text-[11px] border transition-colors ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 font-bold'
                      : 'bg-white text-stone-700 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div className="font-mono">{v.code}</div>
                  <div className="text-[10px] opacity-80 truncate">{v.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Totals & Calculations */}
        <div className="space-y-1.5 text-xs border-t border-stone-200 pt-3">
          <div className="flex justify-between text-stone-600">
            <span>Tạm tính tiền hàng:</span>
            <span>{subTotal.toLocaleString('vi-VN')} đ</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Giảm giá ({posAppliedVoucher}):</span>
              <span>-{discount.toLocaleString('vi-VN')} đ</span>
            </div>
          )}

          {shippingFee > 0 && (
            <div className="flex justify-between text-stone-600">
              <span>Phí vận chuyển giao hàng:</span>
              <span>+{shippingFee.toLocaleString('vi-VN')} đ</span>
            </div>
          )}

          <div className="flex justify-between text-base font-extrabold text-stone-900 pt-1.5 border-t border-stone-200">
            <span>Tổng thanh toán:</span>
            <span className="text-primary">{grandTotal.toLocaleString('vi-VN')} đ</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-700">Phương thức thanh toán:</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPosPaymentMethod('cash')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-semibold transition-all ${
                posPaymentMethod === 'cash'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Tiền mặt
            </button>
            <button
              type="button"
              onClick={() => setPosPaymentMethod('vietqr')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-semibold transition-all ${
                posPaymentMethod === 'vietqr'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <QrCode className="w-4 h-4" />
              VietQR Pro
            </button>
            <button
              type="button"
              onClick={() => setPosPaymentMethod('card')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-semibold transition-all ${
                posPaymentMethod === 'card'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Thẻ quẹt POS
            </button>
          </div>

          {/* Cash Tendered Input */}
          {posPaymentMethod === 'cash' && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-stone-700">Tiền khách đưa:</span>
                <input
                  type="number"
                  placeholder="VD: 200000"
                  value={posCashTendered || ''}
                  onChange={(e) => setPosCashTendered(Number(e.target.value))}
                  className="w-32 px-2 py-1 text-right font-mono font-bold text-xs border rounded-lg bg-white"
                />
              </div>

              {/* Quick Cash Buttons */}
              <div className="flex gap-1 justify-end">
                {[50000, 100000, 200000, 500000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPosCashTendered(amt)}
                    className="px-2 py-0.5 text-[10px] bg-stone-200 hover:bg-stone-300 rounded font-medium text-stone-700"
                  >
                    {(amt / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>

              {changeDue > 0 && (
                <div className="flex justify-between font-bold text-emerald-700 pt-1 border-t border-stone-200">
                  <span>Tiền thừa thối khách:</span>
                  <span className="font-mono text-sm">{changeDue.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <input
            type="text"
            placeholder="Ghi chú đơn (VD: Ít đá, mang đi, địa chỉ giao ship...)"
            value={posNotes}
            onChange={(e) => setPosNotes(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:outline-hidden focus:border-primary bg-stone-50"
          />
        </div>

        {/* Action Button: Chốt bill & In phiếu */}
        <button
          type="button"
          disabled={posCart.length === 0}
          onClick={checkoutPosOrder}
          className="w-full py-3.5 bg-primary hover:bg-primary-dim text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          <Printer className="w-4 h-4" />
          <span>CHỐT BILL & IN PHIẾU (Spec §10)</span>
        </button>

        <p className="text-[10px] text-stone-400 text-center">
          Nhấn Chốt bill sẽ khóa hóa đơn, phân tách phiếu trạm KDS và mở bản in để thu ngân kiểm tra.
        </p>
      </div>
    </div>
  );
};
