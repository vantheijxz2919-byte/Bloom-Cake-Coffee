import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS, BRANCHES, SOUVENIRS, WORKSHOPS } from '../data/mockData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setCurrentScreen, addToCart } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredMenuItems = normalizedQuery
    ? MENU_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const filteredBranches = normalizedQuery
    ? BRANCHES.filter(
        (b) =>
          b.name.toLowerCase().includes(normalizedQuery) ||
          b.address.toLowerCase().includes(normalizedQuery) ||
          b.districtName.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const filteredSouvenirs = normalizedQuery
    ? SOUVENIRS.filter((s) => s.name.toLowerCase().includes(normalizedQuery))
    : [];

  const filteredWorkshops = normalizedQuery
    ? WORKSHOPS.filter((w) => w.title.toLowerCase().includes(normalizedQuery))
    : [];

  const totalResults =
    filteredMenuItems.length +
    filteredBranches.length +
    filteredSouvenirs.length +
    filteredWorkshops.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20">
        <div className="inline-block w-full max-w-2xl bg-surface-container-lowest rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all border border-outline-variant/30 relative z-10">
          {/* Search Header */}
          <div className="p-5 border-b border-surface-container flex items-center gap-3">
            <span className="material-symbols-outlined text-outline text-[24px]">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm bánh sừng bò, matcha latte, chi nhánh, workshop..."
              className="flex-1 bg-transparent border-none outline-none font-body-md text-base text-on-surface placeholder:text-outline"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-outline hover:text-on-surface p-1 text-sm font-bold"
              >
                Xóa
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Quick suggestions if query is empty */}
          {!query && (
            <div className="p-6 space-y-4">
              <span className="font-label-sm text-xs text-outline uppercase tracking-wider block font-bold">
                Gợi ý tìm kiếm phổ biến
              </span>
              <div className="flex flex-wrap gap-2">
                {['Croissant Lava', 'Matcha Uji', 'Cà phê muối', 'Bạch Đằng', 'Workshop Croissant', 'Hộp Quà 6 Vị'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-primary font-label-md text-xs transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {query && (
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-5">
              {totalResults === 0 ? (
                <div className="py-12 text-center text-outline space-y-2">
                  <span className="material-symbols-outlined text-[36px]">search_off</span>
                  <p className="font-body-md text-sm">Không tìm thấy kết quả nào cho "{query}"</p>
                </div>
              ) : (
                <>
                  {/* Menu Items */}
                  {filteredMenuItems.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="font-label-sm text-xs text-primary uppercase font-bold tracking-wider">
                        Thực đơn bánh &amp; đồ uống ({filteredMenuItems.length})
                      </h4>
                      <div className="space-y-2">
                        {filteredMenuItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="font-headline-sm text-sm text-on-surface truncate font-bold">
                                {item.name}
                              </h5>
                              <p className="font-body-sm text-xs text-on-surface-variant truncate">
                                {item.description}
                              </p>
                              <span className="font-label-md text-xs text-primary font-bold">
                                {item.price.toLocaleString('vi-VN')} đ
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                addToCart({
                                  name: item.name,
                                  price: item.price,
                                  image: item.image,
                                  menuItemId: item.id,
                                });
                                setIsSearchOpen(false);
                              }}
                              className="px-3.5 py-1.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:bg-primary-container shadow-sm transition-all shrink-0 cursor-pointer"
                            >
                              + Thêm
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Branches */}
                  {filteredBranches.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="font-label-sm text-xs text-secondary uppercase font-bold tracking-wider">
                        Chi nhánh ({filteredBranches.length})
                      </h4>
                      <div className="space-y-2">
                        {filteredBranches.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => {
                              setCurrentScreen('branches');
                              setIsSearchOpen(false);
                            }}
                            className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            <div className="min-w-0 flex-1">
                              <h5 className="font-headline-sm text-sm text-on-surface font-bold">
                                {b.number}. {b.name} ({b.districtName})
                              </h5>
                              <p className="font-body-sm text-xs text-on-surface-variant truncate">
                                {b.address}
                              </p>
                            </div>
                            <span className="text-primary text-xs font-bold">Xem vị trí →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Souvenirs */}
                  {filteredSouvenirs.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="font-label-sm text-xs text-tertiary uppercase font-bold tracking-wider">
                        Quà lưu niệm ({filteredSouvenirs.length})
                      </h4>
                      <div className="space-y-2">
                        {filteredSouvenirs.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface-container-low"
                          >
                            <div className="min-w-0 flex-1">
                              <h5 className="font-headline-sm text-sm text-on-surface font-bold truncate">
                                {s.name}
                              </h5>
                              <span className="font-label-md text-xs text-primary font-bold">
                                {s.price.toLocaleString('vi-VN')} đ
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                addToCart({
                                  name: s.name,
                                  price: s.price,
                                  image: s.image,
                                });
                                setIsSearchOpen(false);
                              }}
                              className="px-3.5 py-1.5 bg-secondary text-on-secondary rounded-full text-xs font-bold"
                            >
                              + Thêm
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Workshops */}
                  {filteredWorkshops.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="font-label-sm text-xs text-primary-container uppercase font-bold tracking-wider">
                        Khóa học Workshop ({filteredWorkshops.length})
                      </h4>
                      <div className="space-y-2">
                        {filteredWorkshops.map((w) => (
                          <button
                            key={w.id}
                            onClick={() => {
                              setCurrentScreen('souvenirs');
                              setIsSearchOpen(false);
                            }}
                            className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            <div className="min-w-0 flex-1">
                              <h5 className="font-headline-sm text-sm text-on-surface font-bold truncate">
                                {w.title}
                              </h5>
                              <p className="font-body-sm text-xs text-secondary font-semibold">
                                {w.duration} • {w.price.toLocaleString('vi-VN')} đ
                              </p>
                            </div>
                            <span className="text-primary text-xs font-bold">Đăng ký →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
