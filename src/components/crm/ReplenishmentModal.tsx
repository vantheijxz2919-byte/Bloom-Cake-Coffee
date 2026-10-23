import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { InventoryItem } from '../../types/crm';
import { PackagePlus, X, AlertCircle } from 'lucide-react';

interface Props {
  item: InventoryItem;
  onClose: () => void;
}

export const ReplenishmentModal: React.FC<Props> = ({ item, onClose }) => {
  const { createReplenishmentRequest } = useCRM();
  const [quantity, setQuantity] = useState<number>(500);
  const [notes, setNotes] = useState<string>('Yêu cầu nhập bổ sung khẩn cấp do tồn khả dụng dưới ngưỡng 100 đơn vị');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;
    createReplenishmentRequest(item.id, quantity, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl border border-outline-variant/30 max-w-md w-full overflow-hidden">
        <div className="bg-amber-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackagePlus className="w-5 h-5" />
            <h3 className="font-bold text-base">Tạo Đề Nghị Nhập Hàng</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Quy chuẩn Cảnh báo Tồn (Spec §16):</strong> Mã{' '}
              <span className="font-mono font-bold">{item.sku}</span> hiện chỉ còn{' '}
              <span className="font-bold text-red-600">
                {item.availableStock} {item.unit}
              </span>{' '}
              (ngưỡng báo động: &lt; {item.lowStockThreshold} {item.unit}).
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface">Mặt hàng cần nhập:</label>
            <div className="mt-1 p-2.5 bg-surface-container rounded-lg text-xs font-medium text-on-surface">
              {item.name} ({item.unit}) • NCC: {item.supplier}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface">Số lượng đề xuất nhập ({item.unit}):</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="mt-1 w-full px-3 py-2 text-sm border border-outline-variant rounded-lg focus:outline-hidden focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface">Ghi chú & Dự toán nhu cầu:</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full px-3 py-2 text-xs border border-outline-variant rounded-lg focus:outline-hidden focus:border-primary"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm"
            >
              Gửi Đề Nghị Nhập Hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
