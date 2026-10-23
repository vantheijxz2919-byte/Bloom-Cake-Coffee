import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';

interface DrinkCustomizationModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customizedData: {
    menuItemId: string;
    name: string;
    price: number;
    selectedOption?: string;
    sugarLevel?: string;
    iceLevel?: string;
    specialNotes?: string;
    image?: string;
    quantity: number;
  }) => void;
}

const SUGAR_OPTIONS = [
  { value: '100% Đường', label: '100% Chuẩn', desc: 'Đậm đà tiêu chuẩn' },
  { value: '70% Đường', label: '70% Ít ngọt', desc: 'Thanh nhẹ dịu' },
  { value: '50% Đường', label: '50% Vừa ngọt', desc: 'Khuyên dùng ★', popular: true },
  { value: '30% Đường', label: '30% Rất ít', desc: 'Thơm rõ vị trà/cà phê' },
  { value: '0% Không đường', label: '0% Không đường', desc: 'Nguyên bản mộc mạc' },
];

const ICE_OPTIONS = [
  { value: '100% Đá', label: '100% Chuẩn đá', desc: 'Mát lạnh sảng khoái' },
  { value: '70% Đá', label: '70% Ít đá', desc: 'Mát nhẹ nhàng' },
  { value: '50% Đá', label: '50% Vừa đá', desc: 'Giữ trọn vị đậm' },
  { value: '30% Đá', label: '30% Rất ít đá', desc: 'Chỉ ướp lạnh' },
  { value: 'Không đá', label: 'Không đá (Đá riêng)', desc: 'Tách đá riêng túi zip' },
  { value: 'Uống nóng', label: 'Uống nóng', desc: 'Ấm áp bốc khói' },
];

export const DrinkCustomizationModal: React.FC<DrinkCustomizationModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [sugarLevel, setSugarLevel] = useState<string>('50% Đường');
  const [iceLevel, setIceLevel] = useState<string>('100% Đá');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (item) {
      setSelectedOption(item.options ? item.options[0] : '');
      setSugarLevel('50% Đường');
      setIceLevel('100% Đá');
      setSpecialNotes('');
      setQuantity(1);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const extraPrice = selectedOption && selectedOption.includes('+10k') ? 10000 : 0;
  const unitPrice = item.price + extraPrice;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart({
      menuItemId: item.id,
      name: item.name,
      price: unitPrice,
      selectedOption: selectedOption || undefined,
      sugarLevel,
      iceLevel,
      specialNotes: specialNotes.trim() || undefined,
      image: item.image,
      quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh] z-10 animate-scaleUp">
        {/* Modal Header */}
        <div className="relative bg-surface-container-low p-5 border-b border-surface-container flex items-start gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-2xl object-cover bg-surface-container shrink-0 border border-outline-variant/30 shadow-sm"
          />
          <div className="flex-1 min-w-0 pr-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold mb-1">
              <span className="material-symbols-outlined text-[14px]">local_cafe</span>
              <span>Tùy chỉnh thức uống</span>
            </div>
            <h3 className="font-headline-sm text-base lg:text-lg font-bold text-on-surface truncate">
              {item.name}
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant line-clamp-1 mt-0.5">
              {item.description}
            </p>
            <div className="font-headline-sm text-sm text-primary font-bold mt-1">
              {unitPrice.toLocaleString('vi-VN')} đ
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Options if available (e.g. Sữa Dalat Milk / Oatside) */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-2.5">
              <label className="font-label-md text-xs uppercase tracking-wider text-on-surface font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[16px]">egg_alt</span>
                <span>{item.optionsLabel || 'Lựa chọn cốt sữa / hương vị:'}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary'
                          : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="font-label-md text-xs font-bold">{opt}</span>
                      {opt.includes('+10k') && (
                        <span className="text-[10px] text-tertiary font-medium mt-1">+10.000 đ</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sugar level selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-label-md text-xs uppercase tracking-wider text-on-surface font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-[16px]">water_drop</span>
                <span>Chọn mức đường (Độ ngọt):</span>
              </label>
              <span className="text-[11px] font-bold text-primary bg-primary-fixed/50 px-2.5 py-0.5 rounded-full">
                {sugarLevel}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUGAR_OPTIONS.map((opt) => {
                const isSelected = sugarLevel === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSugarLevel(opt.value)}
                    className={`relative p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary bg-primary text-on-primary shadow-md'
                        : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold">{opt.label}</span>
                      {opt.popular && !isSelected && (
                        <span className="text-[9px] bg-secondary-fixed text-secondary px-1.5 py-0.5 rounded-md font-bold">
                          Gợi ý
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] mt-1 ${
                        isSelected ? 'text-on-primary/85' : 'text-outline'
                      }`}
                    >
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ice level / Temperature selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-label-md text-xs uppercase tracking-wider text-on-surface font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-cyan-600 text-[16px]">ac_unit</span>
                <span>Chọn lượng đá / Nhiệt độ:</span>
              </label>
              <span className="text-[11px] font-bold text-secondary bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full">
                {iceLevel}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ICE_OPTIONS.map((opt) => {
                const isSelected = iceLevel === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setIceLevel(opt.value)}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-secondary bg-secondary text-on-secondary shadow-md'
                        : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold">{opt.label}</span>
                    </div>
                    <span
                      className={`text-[10px] mt-1 ${
                        isSelected ? 'text-on-secondary/85' : 'text-outline'
                      }`}
                    >
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Barista Custom Notes */}
          <div className="space-y-2">
            <label className="font-label-md text-xs uppercase tracking-wider text-on-surface font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[16px]">edit_note</span>
              <span>Ghi chú riêng cho Barista (Tùy chọn):</span>
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="VD: Để riêng ly đá, không cho ống hút nhựa, pha đậm vị..."
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-xs rounded-2xl px-3.5 py-2.5 border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-surface-container-lowest rounded-full px-3 py-1.5 shadow-sm border border-outline-variant/30 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-6 h-6 flex items-center justify-center text-on-surface font-bold text-sm hover:text-primary transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="px-3 font-label-md text-sm font-bold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-6 h-6 flex items-center justify-center text-on-surface font-bold text-sm hover:text-primary transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 px-5 rounded-full bg-primary text-on-primary font-label-lg text-xs sm:text-sm font-bold hover:bg-primary-container shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Thêm Vào Khay • {totalPrice.toLocaleString('vi-VN')} đ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
