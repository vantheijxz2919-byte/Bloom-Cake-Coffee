import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { MENU_ITEMS } from '../../data/mockData';
import { Store, Tag, Plus, CheckCircle, Search, Edit3, Eye, DollarSign } from 'lucide-react';

export const MenuScreenCRM: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    return matchName && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-stone-900">
              Module Menu & Quản Lý Giá Bán (Spec §6)
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Phiên bản hóa danh mục và bảng giá. Lưu snapshot khi đơn đặt hàng phát sinh để giá cũ không bị ảnh hưởng.
          </p>
        </div>

        <button className="px-4 py-2 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Thêm Sản Phẩm Mới (Bản Nháp)</span>
        </button>
      </div>

      {/* Menu Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm món, mã SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-xl bg-stone-50 focus:outline-hidden focus:border-primary"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {['all', 'matcha', 'coffee', 'pastry', 'glass'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[11px] transition-colors ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'all'
                ? 'Tất cả'
                : cat === 'matcha'
                ? 'Matcha Uji'
                : cat === 'coffee'
                ? 'Cà phê'
                : cat === 'pastry'
                ? 'Bánh nướng'
                : 'Bánh hũ & Quà'}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Hình ảnh</th>
                <th className="py-3 px-4">Tên sản phẩm</th>
                <th className="py-3 px-4">Nhóm món</th>
                <th className="py-3 px-4 text-right">Giá niêm yết</th>
                <th className="py-3 px-4 text-center">Trạm phân công</th>
                <th className="py-3 px-4 text-center">Phiên bản giá</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-2 px-4 w-14">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900">{item.name}</div>
                    <div className="text-[10px] text-stone-400 font-mono">ID: {item.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-stone-900">
                    {item.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      {item.category === 'matcha' || item.category === 'coffee' || item.category === 'tea'
                        ? 'Trạm Barista'
                        : item.category === 'glass'
                        ? 'Trạm Đóng Gói'
                        : 'Trạm Bếp Bánh'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[11px] text-stone-500">
                    v2.4 (22/10)
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Đang bán
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-2.5 py-1 text-xs text-primary hover:bg-primary/10 rounded-lg font-semibold transition-colors">
                      Sửa giá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
