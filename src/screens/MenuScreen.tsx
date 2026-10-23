import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS, BRANCHES } from '../data/mockData';
import { MenuItem } from '../types';
import { DrinkCustomizationModal } from '../components/DrinkCustomizationModal';

export const MenuScreen: React.FC = () => {
  const {
    cart,
    addToCart,
    updateQty,
    clearCart,
    totalItems,
    subTotal,
    discount,
    shippingFee,
    finalTotal,
    appliedVoucher,
    selectedBranch,
    setSelectedBranch,
    placeOrder,
    orderMethod,
    setOrderMethod,
    pickupTime,
    setPickupTime,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    m1: 'Dalat Milk',
    m2: 'Dalat Milk',
    m3: 'Dalat Milk',
    m4: 'Dalat Milk',
    m6: 'Vị Chanh Tươi',
    m8: 'Bạc Xỉu Thường',
    m10: 'Cà Phê Sữa Đá',
    m11: 'Việt Quất',
    m24: 'Mứt Dâu Nhà Làm',
  });

  // Modal customization state
  const [customizingDrink, setCustomizingDrink] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Customer form details in sidebar
  const [customerName, setCustomerName] = useState('Nguyễn Phương Linh');
  const [customerPhone, setCustomerPhone] = useState('0918 452 889');
  const [deliveryAddress, setDeliveryAddress] = useState('36 Lâm Hoành, P. Phước Mỹ, Q. Sơn Trà, TP. Đà Nẵng');
  const [customerNotes, setCustomerNotes] = useState('');

  const isDrinkItem = (item: MenuItem): boolean => {
    return (
      ['matcha', 'coffee', 'tea', 'yogurt'].includes(item.category) ||
      item.name.toLowerCase().includes('latte') ||
      item.name.toLowerCase().includes('cà phê') ||
      item.name.toLowerCase().includes('trà') ||
      item.name.toLowerCase().includes('cold brew') ||
      item.name.toLowerCase().includes('machiato') ||
      item.name.toLowerCase().includes('yogurt')
    );
  };

  const categories = [
    { key: 'all', label: 'Tất Cả Món', count: 28, icon: 'restaurant_menu' },
    { key: 'matcha', label: 'Matcha & Bailey', count: 5, icon: 'spa' },
    { key: 'coffee', label: 'Cà Phê Thủ Công', count: 5, icon: 'coffee' },
    { key: 'tea', label: 'Trà & Kombucha', count: 5, icon: 'local_cafe' },
    { key: 'yogurt', label: 'Sữa Chua & Cacao', count: 3, icon: 'icecream' },
    { key: 'glass', label: 'Bánh Trong Ly', count: 3, icon: 'glass_cup' },
    { key: 'pastry', label: 'Bánh Ngọt & Bánh Nướng', count: 10, icon: 'bakery_dining' },
  ];

  const handleOptionChange = (itemId: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [itemId]: option }));
  };

  const handleOpenDrinkCustomization = (item: MenuItem) => {
    setCustomizingDrink(item);
    setIsModalOpen(true);
  };

  const handleAddItem = (item: MenuItem) => {
    if (isDrinkItem(item)) {
      handleOpenDrinkCustomization(item);
      return;
    }

    const selectedOpt = selectedOptions[item.id] || (item.options ? item.options[0] : undefined);
    const extraPrice = selectedOpt && selectedOpt.includes('+10k') ? 10000 : 0;
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: item.price + extraPrice,
      selectedOption: selectedOpt,
      image: item.image,
    });
  };

  const handleCustomizedDrinkAdd = (data: {
    menuItemId: string;
    name: string;
    price: number;
    selectedOption?: string;
    sugarLevel?: string;
    iceLevel?: string;
    specialNotes?: string;
    image?: string;
    quantity: number;
  }) => {
    addToCart(data);
  };

  const handleCheckoutSubmit = () => {
    placeOrder({
      name: customerName,
      phone: customerPhone,
      address: orderMethod === 'pickup' ? `Nhận tại quầy: ${selectedBranch}` : deliveryAddress,
      notes: customerNotes,
      method: orderMethod,
      pickupTime: pickupTime,
      branch: selectedBranch,
    });
  };

  const displayedItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col w-full">
      {/* Top Marquee Ticker */}
      <div className="w-full bg-primary text-on-primary py-2 px-4 overflow-hidden shadow-sm">
        <div className="max-w-[1340px] mx-auto flex items-center justify-between font-label-md text-xs tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
            <span>Lò nướng mẻ mới 06:30 &amp; 14:00 hàng ngày</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>Bơ Pháp Elle &amp; Vire AOP</span>
            <span>•</span>
            <span>Matcha Uji Hái Tay Kyoto</span>
            <span>•</span>
            <span>Giao nhanh 6 quận Đà Nẵng trong 30 phút</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span className="font-bold">Hotline: 1900 8899</span>
          </div>
        </div>
      </div>

      {/* Hero Editorial Banner */}
      <section className="relative w-full bg-surface-container-low overflow-hidden py-10 lg:py-16">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-secondary-fixed/50 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1340px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-bold shadow-sm">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Bảng Thực Đơn Thủ Công Gốc • Đà Nẵng 2025</span>
              </div>
              <h1 className="font-headline-lg text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">
                <span className="font-script text-5xl lg:text-6xl font-normal text-black inline-block mr-2">
                  we are
                </span>
                <span className="font-display-custom text-primary font-bold">Thủ Công.</span>
                <br className="hidden sm:inline" />
                <span className="font-display-custom text-on-surface block sm:inline mt-1 sm:mt-0 underline decoration-secondary-fixed decoration-wavy decoration-2 text-2xl lg:text-3xl tracking-wide">
                  Bloom Cake &amp; Coffe
                </span>
              </h1>
              <p className="font-body-lg text-base text-on-surface-variant max-w-2xl leading-relaxed">
                Hương thơm quyến rũ của bột mì hữu cơ &amp; bơ lạt nguyên chất nướng mẻ mới mỗi bình minh, hòa quyện trọn vẹn cùng bột Matcha Uji Nhật Bản nguyên bản và nét đậm đà lắng sâu của cà phê xứ biển miền Trung.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">eco</span>
                  <span className="font-label-md text-xs font-bold">100% Matcha Uji 4g Cold Whisk</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_fire_department</span>
                  <span className="font-label-md text-xs font-bold">Nướng Bơ Pháp Tươi Mỗi Sáng</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface shadow-sm">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">pin_drop</span>
                  <span className="font-label-md text-xs font-bold">6 Cơ Sở Trung Tâm Đà Nẵng</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover"
                    alt="Khay bánh nướng và ly matcha latte Uji thơm ngon"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1_jRKaC3Of51D_DEu4jWYWJWEAsZEDUV04riHbm5EGrph_9-154bNS2k7sR4OV5riyqApEfYsV37gYrxGtaAvxmLrMqFlBNO9bCRBLEMcSvfuH27mMQMyoPurC-EkEOWPSyPCtaKMo5YTOuBSvHu2AHWxp59bRi8FU3jTxygH3AF4K08sz81H7nxijfHaq5WLmNriwzl4kun3YscaF77JJkpm9wrp2yT9sSN-iqc7bgDwsLtoHr4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-on-primary flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-[10px] uppercase tracking-widest text-secondary-fixed font-bold">
                        Món Đặc Biệt Trong Ngày
                      </span>
                      <p className="font-headline-sm text-sm font-bold text-on-primary">
                        Bailey Matcha &amp; Burnt Cheese Cake
                      </p>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold">
                      Gastro Pop
                    </div>
                  </div>
                </div>

                {/* Floating Sticker Badge */}
                <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-surface-container-lowest p-3.5 rounded-2xl shadow-xl flex items-center gap-3 transform rotate-2 border border-outline-variant/30">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[26px]">bakery_dining</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block font-bold">
                      Giao Ngay Tận Nơi
                    </span>
                    <span className="font-headline-sm text-sm font-bold text-primary">Nóng Giòn 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Fast Category Pills */}
      <div className="sticky top-20 z-40 bg-surface/95 backdrop-blur-md py-4 shadow-sm border-b border-outline-variant/20">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full font-label-md text-xs font-bold transition-all shadow-sm cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isActive
                        ? 'bg-surface-container-lowest text-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Layout with Food Grid & Persistent Sticky Cart Drawer */}
      <div className="max-w-[1340px] mx-auto px-6 lg:px-8 py-8 w-full">
        {/* PROMINENT ORDER METHOD SELECTION BANNER */}
        <div className="mb-8 bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-[0_4px_24px_-2px_rgba(39,24,20,0.06)] border border-outline-variant/30">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-surface-container">
            <div>
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-primary font-bold">
                Phương thức nhận hàng Bloom Cake &amp; Coffe Đà Nẵng
              </span>
              <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold mt-0.5">
                Bạn Muốn Nhận Món Như Thế Nào Hôm Nay?
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Linh hoạt lựa chọn: Tự ghé quầy chi nhánh lấy nhanh hoặc Shipper giao tận nơi trong 30 phút.
              </p>
            </div>

            {/* Segmented Control */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setOrderMethod('pickup')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  orderMethod === 'pickup'
                    ? 'bg-primary text-on-primary shadow-md scale-100'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">storefront</span>
                <span>Đặt Món Tới Lấy</span>
                <span className="text-[10px] bg-secondary-fixed text-secondary px-1.5 py-0.5 rounded-md font-bold">
                  0đ Ship
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrderMethod('delivery')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  orderMethod === 'delivery'
                    ? 'bg-primary text-on-primary shadow-md scale-100'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">moped</span>
                <span>Đặt Đơn Ship Đi</span>
                <span className="text-[10px] bg-primary-fixed text-primary px-1.5 py-0.5 rounded-md font-bold">
                  30 Phút
                </span>
              </button>
            </div>
          </div>

          {/* Context sub-strip depending on method */}
          {orderMethod === 'pickup' ? (
            <div className="pt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-body-sm">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="font-semibold">
                  Tới lấy tại quầy chi nhánh: <strong>{selectedBranch}</strong> • Sẵn sàng sau 10-15 phút.
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>
                <span>Hẹn giờ lấy: <strong>{pickupTime}</strong></span>
              </div>
            </div>
          ) : (
            <div className="pt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-body-sm">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                <span className="font-semibold">
                  Giao nhanh 6 quận Đà Nẵng từ: <strong>{selectedBranch}</strong> • Đóng túi giữ nhiệt kép.
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                <span>Miễn phí giao hàng cho hóa đơn từ 250.000 đ</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Catalog Column (8 cols on XL) */}
          <div className="xl:col-span-8 flex flex-col gap-10">
            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayedItems.map((item) => {
                const itemIsDrink = isDrinkItem(item);
                return (
                  <div
                    key={item.id}
                    className="bg-surface-container-lowest rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(39,24,20,0.05)] border border-outline-variant/30 flex flex-col justify-between group hover:shadow-lg transition-all"
                  >
                    <div className="space-y-4">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={item.name}
                          src={item.image}
                        />
                        {item.badge && (
                          <span
                            className={`absolute top-3 left-3 px-3 py-1 rounded-full font-label-sm text-[10px] font-bold shadow-sm ${
                              item.badgeColor || 'bg-secondary-container text-on-secondary-container'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Drink Customization Pill Indicator */}
                        {itemIsDrink && (
                          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-[10px] font-bold shadow-sm flex items-center gap-1 border border-outline-variant/20">
                            <span className="material-symbols-outlined text-secondary text-[14px]">water_drop</span>
                            <span>Giảm đường &amp; đá tùy thích</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-headline-sm text-base text-on-surface font-bold group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <span className="font-headline-sm text-sm text-primary font-bold shrink-0">
                            {item.price.toLocaleString('vi-VN')} đ
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Options if available */}
                      {item.options && !itemIsDrink && (
                        <div className="space-y-2 pt-1">
                          <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider block font-bold">
                            {item.optionsLabel || 'Lựa chọn:'}
                          </span>
                          <div className="flex gap-2">
                            {item.options.map((opt) => {
                              const isSelected = selectedOptions[item.id] === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleOptionChange(item.id, opt)}
                                  className={`flex-1 text-center py-1.5 px-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'bg-secondary text-on-secondary shadow-sm'
                                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 mt-2">
                      {itemIsDrink ? (
                        <button
                          type="button"
                          onClick={() => handleOpenDrinkCustomization(item)}
                          className="w-full py-2.5 px-4 rounded-full bg-primary text-on-primary font-label-lg text-xs font-bold hover:bg-primary-container shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                          <span>Tùy Chỉnh Đường &amp; Đá • Thêm Món</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddItem(item)}
                          className="w-full py-2.5 px-4 rounded-full bg-primary text-on-primary font-label-lg text-xs font-bold hover:bg-primary-container shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                          <span>{item.dineInOnly ? 'Gọi Món Tại Bàn' : 'Thêm Vào Giỏ'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footnote & Disclaimer Note */}
            <div className="p-6 rounded-3xl bg-surface-container-low text-on-surface-variant space-y-2 border border-outline-variant/30">
              <div className="flex items-center gap-2 text-primary font-headline-sm text-sm font-bold">
                <span className="material-symbols-outlined text-[20px]">info</span>
                <span>Ghi chú từ bếp bánh Bloom Cake &amp; Coffe:</span>
              </div>
              <p className="font-body-sm text-xs leading-relaxed">
                • Giá trên bảng thực đơn tính theo tiền đồng Việt Nam (VNĐ) và đã bao gồm thuế tiêu chuẩn.<br />
                • Hình ảnh món ăn mang tính chất minh họa trình bày nghệ thuật của đầu bếp; cấu trúc ly hoặc đĩa có thể linh hoạt theo lượt phục vụ tại chỗ hoặc mang về.<br />
                • Các món có nhãn <span className="text-error font-semibold">[Chỉ phục vụ tại chỗ]</span> được tinh chỉnh để thưởng thức ngay ở nhiệt độ lý tưởng nhất nhằm bảo toàn cấu trúc sốt và kem tươi.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar "Khay Bánh Của Bạn" (4 cols on XL) */}
          <div className="xl:col-span-4 sticky top-36 flex flex-col gap-5">
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-xl space-y-6 border border-outline-variant/30">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-base text-on-surface font-bold">Khay Món Của Bạn</h3>
                    <span className="font-label-sm text-xs text-outline">
                      {totalItems > 0 ? `Đang có ${totalItems} món được chọn` : 'Khay bánh đang trống'}
                    </span>
                  </div>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-outline hover:text-primary transition-colors font-label-sm text-xs cursor-pointer"
                  >
                    Làm mới
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-outline space-y-2">
                    <span className="material-symbols-outlined text-[36px]">bakery_dining</span>
                    <p className="font-body-sm text-xs">Khay bánh đang trống.<br />Hãy chọn một món bánh ngon nướng mới nhé!</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <h4 className="font-label-lg text-xs font-bold text-on-surface truncate">{item.name}</h4>
                        {item.selectedOption && (
                          <p className="font-label-sm text-[11px] text-outline truncate">{item.selectedOption}</p>
                        )}

                        {/* Customized Sugar & Ice Badges */}
                        {(item.sugarLevel || item.iceLevel) && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {item.sugarLevel && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 font-label-sm text-[10px] font-bold">
                                <span className="material-symbols-outlined text-[12px]">water_drop</span>
                                <span>{item.sugarLevel}</span>
                              </span>
                            )}
                            {item.iceLevel && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-800 font-label-sm text-[10px] font-bold">
                                <span className="material-symbols-outlined text-[12px]">ac_unit</span>
                                <span>{item.iceLevel}</span>
                              </span>
                            )}
                          </div>
                        )}

                        {item.specialNotes && (
                          <p className="text-[10px] text-outline italic">"{item.specialNotes}"</p>
                        )}

                        <span className="font-label-md text-xs text-primary font-bold block pt-0.5">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        <div className="flex items-center bg-surface-container-lowest rounded-full px-2 py-1 shadow-sm border border-outline-variant/20">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs hover:text-primary transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 font-label-sm text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs hover:text-primary transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Order Mode Toggle in Sidebar */}
              {cart.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-surface-container">
                  <div className="flex rounded-xl bg-surface-container p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setOrderMethod('pickup')}
                      className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        orderMethod === 'pickup'
                          ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">storefront</span>
                      <span>Tới Lấy (0đ Ship)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderMethod('delivery')}
                      className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        orderMethod === 'delivery'
                          ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">moped</span>
                      <span>Ship Đi Tận Nơi</span>
                    </button>
                  </div>

                  {/* Pick-up specifics */}
                  {orderMethod === 'pickup' ? (
                    <div className="space-y-2.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 text-xs">
                      <div>
                        <label className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider block font-bold mb-1">
                          Chi nhánh nhận món:
                        </label>
                        <select
                          value={selectedBranch}
                          onChange={(e) => setSelectedBranch(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-xs rounded-xl px-3 py-2 border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {BRANCHES.map((b) => (
                            <option key={b.id} value={`${b.name}, Q. ${b.districtName}`}>
                              {b.number}. {b.name}, Q. {b.districtName} ({b.hours})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider block font-bold mb-1">
                          Thời gian tới lấy:
                        </label>
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-xs rounded-xl px-3 py-2 border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="Sẵn sàng sau 10-15 phút">Lấy ngay (sau 10-15 phút)</option>
                          <option value="Hẹn sau 30 phút">Hẹn sau 30 phút</option>
                          <option value="Hẹn sau 1 tiếng">Hẹn sau 1 tiếng</option>
                          <option value="Hẹn lúc 11:30 trưa nay">Hẹn lúc 11:30 trưa nay</option>
                          <option value="Hẹn lúc 15:00 chiều nay">Hẹn lúc 15:00 chiều nay</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="font-label-sm text-[10px] text-outline block font-bold mb-0.5">
                            Tên người lấy:
                          </label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Tên khách"
                            className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2.5 py-1.5 border border-outline-variant/30"
                          />
                        </div>
                        <div>
                          <label className="font-label-sm text-[10px] text-outline block font-bold mb-0.5">
                            Số điện thoại:
                          </label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="SĐT"
                            className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2.5 py-1.5 border border-outline-variant/30"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Delivery specifics */
                    <div className="space-y-2.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 text-xs">
                      <div>
                        <label className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider block font-bold mb-1">
                          Giao từ chi nhánh gần nhất:
                        </label>
                        <select
                          value={selectedBranch}
                          onChange={(e) => setSelectedBranch(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-xs rounded-xl px-3 py-2 border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {BRANCHES.map((b) => (
                            <option key={b.id} value={`${b.name}, Q. ${b.districtName}`}>
                              {b.number}. {b.name}, Q. {b.districtName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider block font-bold mb-1">
                          Địa chỉ giao hàng tại Đà Nẵng:
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Số nhà, đường, KS/resort, quận..."
                          className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-3 py-2 border border-outline-variant/30"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-label-sm text-[10px] text-outline block font-bold mb-0.5">
                            Người nhận:
                          </label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Tên khách"
                            className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2.5 py-1.5 border border-outline-variant/30"
                          />
                        </div>
                        <div>
                          <label className="font-label-sm text-[10px] text-outline block font-bold mb-0.5">
                            Số điện thoại:
                          </label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="SĐT"
                            className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2.5 py-1.5 border border-outline-variant/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-label-sm text-[10px] text-outline block font-bold mb-0.5">
                          Ghi chú cho shipper:
                        </label>
                        <input
                          type="text"
                          value={customerNotes}
                          onChange={(e) => setCustomerNotes(e.target.value)}
                          placeholder="VD: Gửi lễ tân khách sạn, bấm chuông cổng..."
                          className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl px-3 py-1.5 border border-outline-variant/30"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bill Summary */}
              {cart.length > 0 && (
                <div className="space-y-2 pt-1 font-body-sm text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Tạm tính ({totalItems} món)</span>
                    <span className="font-semibold text-on-surface">{subTotal.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>
                      {orderMethod === 'pickup' ? 'Phí dịch vụ tự đến lấy' : 'Phí giao hỏa tốc 30p'}
                    </span>
                    <span className="text-secondary font-semibold">
                      {shippingFee === 0 ? 'Miễn Phí (0 đ)' : `${shippingFee.toLocaleString('vi-VN')} đ`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary font-semibold">
                      <span>Khuyến mãi thẻ Bloom ({appliedVoucher})</span>
                      <span>-{discount.toLocaleString('vi-VN')} đ</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-surface-container flex items-baseline justify-between">
                    <div>
                      <span className="font-headline-sm text-sm text-on-surface block font-bold">Tổng Thanh Toán</span>
                      <span className="font-label-sm text-[10px] text-outline">
                        {orderMethod === 'pickup'
                          ? 'Nhận món trực tiếp tại quầy thu ngân'
                          : 'Đã bao gồm VAT & bao bì hộp giữ nhiệt'}
                      </span>
                    </div>
                    <span className="font-headline-lg text-lg text-primary font-bold">
                      {finalTotal.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>
              )}

              {/* Checkout CTA */}
              {cart.length > 0 && (
                <div className="space-y-2.5">
                  <button
                    onClick={handleCheckoutSubmit}
                    className="w-full py-3.5 px-6 rounded-full bg-primary text-on-primary font-label-lg text-xs font-bold hover:bg-primary-container shadow-[0_8px_20px_rgba(255,51,102,0.24)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {orderMethod === 'pickup' ? 'storefront' : 'moped'}
                    </span>
                    <span>
                      {orderMethod === 'pickup'
                        ? 'Xác Nhận Đặt Tới Lấy • Sẵn Sàng 15P'
                        : 'Đặt Giao Ngay • 30 Phút Tới Nơi'}
                    </span>
                  </button>
                  <div className="flex items-center justify-center gap-2 font-label-sm text-[10px] text-outline">
                    <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                    <span>
                      {orderMethod === 'pickup'
                        ? 'Đọc mã đơn hàng tại quầy để nhận ngay'
                        : 'Mở hộp kiểm tra bánh nướng trước khi thanh toán'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Loyalty Mini Perk Banner */}
            <div className="p-4 rounded-3xl bg-secondary-container/50 border border-outline-variant/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">stars</span>
              </div>
              <div>
                <span className="font-label-md text-xs text-on-secondary-container font-bold block">
                  Tích Điểm Thành Viên Bloom
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Mỗi 10.000 đ tích 1 Hạt Mầm để đổi bánh sừng bò miễn phí.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drink Customization Modal */}
      <DrinkCustomizationModal
        item={customizingDrink}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleCustomizedDrinkAdd}
      />
    </div>
  );
};
