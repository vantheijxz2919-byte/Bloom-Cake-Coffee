import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenName, CartItem, OrderDetails } from '../types';
import { useCRM } from './CRMContext';

interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

export interface CustomerMemberData {
  name: string;
  phone: string;
  points: number;
  tier: string;
  isLoggedIn: boolean;
  cycleStartDate?: string;
  cycleResetDate?: string;
  daysUntilReset?: number;
  smsNoticeSent?: boolean;
  smsNoticeDate?: string;
  lastSmsMessage?: string;
}

interface AppContextType {
  currentScreen: ScreenName;
  setCurrentScreen: (screen: ScreenName) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  subTotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  appliedVoucher: string | null;
  applyVoucher: (code: string) => boolean;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (message: string, title?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  orderMethod: 'pickup' | 'delivery';
  setOrderMethod: (method: 'pickup' | 'delivery') => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  currentOrder: OrderDetails | null;
  placeOrder: (customerData?: {
    name?: string;
    phone?: string;
    address?: string;
    notes?: string;
    method?: 'pickup' | 'delivery';
    pickupTime?: string;
    branch?: string;
  }) => void;
  memberData: CustomerMemberData;
  setMemberData: React.Dispatch<React.SetStateAction<CustomerMemberData>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    menuItemId: 'm1',
    name: 'Matcha Latte Cold Whisk',
    price: 69000,
    quantity: 1,
    selectedOption: 'Dalat Milk',
    sugarLevel: '50% Đường (Ngọt vừa)',
    iceLevel: '70% Đá (Ít đá)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4kD-LrAin-_Kt03-MVa77TPATWhrA39Vif-W5IbhEseYoC1pixR-mv1vosNc7i4VlwF17gJ0bU26A8uNaAkbiir9zvnfbAt8NcKQ89Gy7EH5EC3xEOUFgf7-RKgwyI6xAefiPogCSAqvre9RnFvrJd_1eMaqC6bF-Nu6hYrhj7ZMWnWhrCPoi0fLn7n4mF4KxpkPELBSR8S_nBGmeEFoh0Ss_gCZKqmNegWfpdyU-lhYCTlTWwss',
  },
  {
    id: 'cart-2',
    menuItemId: 'm19',
    name: 'Tiramisu in a Glass',
    price: 85000,
    quantity: 1,
    selectedOption: 'Thủ công trong ngày • Hũ lạnh',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK1PpSvKMxNEhljciI-Go3Yfo1W_qrwgJwpuDSFmOUCdpbzMJGvMJmAiaVDVMGqktXUJsrIsphZcEWeQOUxHeNFCUeEuXgq6xk03Ey6eXExKmMwwIRdhqder8Nbphrfh5OhFfKyNFtxk9cVFZK1sAkBQXtiE8SYaQi0iJ8qiVPSBcInjcYIQLlns7juxhx1BhdAmmh-_FbEItW8Wwdx2N308DicGfwOjOcp5o9NPfOgZiYbq8DQu8',
  },
  {
    id: 'cart-3',
    menuItemId: 'm22',
    name: 'Burnt Cheese Cake Basque',
    price: 55000,
    quantity: 1,
    selectedOption: 'Bơ Pháp Elle & Vire AOP',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAlk8k3MGIeaEjCUbiXJ2f8pMaFOjeN6ly1JukxVLzpxv7WYVWLMsKcxceHMAd0ffCQXJvl8a2EKdN_fnSYuGfB3PKHdEvi75HD4PMhQmTF_Z_keMXNfTL30DvWjRz1qO-xYU_J7ySAx43EIkW6NGJ0x_jfz6m995jvVTcmD9GWkrHRPnPdjEGSqdqOGIB5u9AWKxJXXUUDdWqd7ie_vMPxq4KaFRQw__89TZe3zN3veYf3sw90gA',
  },
  {
    id: 'cart-4',
    menuItemId: 'm9',
    name: 'Cà phê muối Đà Nẵng',
    price: 39000,
    quantity: 1,
    selectedOption: 'Kem muối béo mặn',
    sugarLevel: '70% Đường',
    iceLevel: '100% Đá (Chuẩn)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOVpKu1mrK5Pyowi4MVlDY6a5UeL5Gx5FbDMMEUfRFaUAIrrOu7IzOG1WXOd9jaTO_W8Rnli7rDrsydN4_vEcyrgshDRn_2aW2vl8yBw2d0Z29tsLmStGq-k9EzNpD-hxvW31eKUcQXhG9d5vQf-ffW159vwBxq4EGv9OyMMp8b9XslLN4gXgwGNf_qkiybZIQrg_4u5gyOOD-omcyGm8a_xRtiYS0e3BjQ-xMoDJ1ZiNpI6ONOak',
  },
];

const INITIAL_ORDER: OrderDetails = {
  orderId: 'SMC-DN-92841',
  createdAt: '10:45 Hôm nay',
  status: 'Đang chuẩn bị bánh tươi',
  step: 2,
  items: INITIAL_CART,
  subTotal: 248000,
  shippingFee: 15000,
  discount: 24000,
  total: 239000,
  orderMethod: 'delivery',
  pickupTime: '11:15',
  branchName: 'CN 45 Võ Văn Kiệt, Q. Sơn Trà',
  deliveryAddress: 'Khách sạn Sala Danang Beach, 36 Lâm Hoành, Phước Mỹ, Sơn Trà, Đà Nẵng',
  receiverName: 'Nguyễn Phương Linh',
  receiverPhone: '0918.452.xxx',
  customerNotes: 'Giao tại quầy lễ tân giúp mình nhé',
  shipperName: 'Nguyễn Văn Hưng',
  shipperPhone: '0905 789 123',
  shipperPlate: '43-D1 829.14',
  estimatedDeliveryTime: '11:15',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addNewOrderTickets, addAuditLog } = useCRM();
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>('DANANGSWEET');
  const [selectedBranch, setSelectedBranch] = useState<string>('15 Võ Văn Kiệt, Q. Sơn Trà');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(INITIAL_ORDER);

  const [memberData, setMemberData] = useState<CustomerMemberData>({
    name: 'Khách Hàng Thân Thiết (Phương Linh)',
    phone: '0918.452.889',
    points: 1820,
    tier: 'Matcha Bloom',
    isLoggedIn: true,
    cycleStartDate: '29/04/2026',
    cycleResetDate: '29/10/2026',
    daysUntilReset: 6, // Còn 6 ngày (trong tuần cuối trước khi reset về 0)
    smsNoticeSent: true,
    smsNoticeDate: '22/10/2026 09:00',
    lastSmsMessage:
      '[BLOOM CAFE] Chào bạn, 1.820 điểm Bloom Club của bạn sẽ hết hạn vào 29/10/2026 (còn 6 ngày). Hãy ghé Bloom Cake & Coffe đổi quà bánh ngọt hoặc đồ lưu niệm trước khi điểm reset về 0 nhé!',
  });

  const [orderMethod, setOrderMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupTime, setPickupTime] = useState<string>('Sẵn sàng sau 10-15 phút');

  // Calculate cart sums
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Pick-up (tới lấy) is always free shipping (0 đ); delivery is 15.000 đ or free > 250k
  const shippingFee = orderMethod === 'pickup' ? 0 : (subTotal > 250000 || appliedVoucher === 'SUMMERFREE' ? 0 : 15000);
  let discount = 0;
  if (appliedVoucher === 'DANANGSWEET' && subTotal >= 200000) {
    discount = 30000;
  } else if (appliedVoucher === 'MATCHAFRESH') {
    discount = Math.round(subTotal * 0.15);
  } else if (appliedVoucher === 'SUMMERFREE') {
    discount = 15000;
  }
  const finalTotal = Math.max(0, subTotal + shippingFee - discount);

  const showToast = (message: string, title?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    const qty = item.quantity || 1;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.name === item.name &&
          i.selectedOption === item.selectedOption &&
          i.sugarLevel === item.sugarLevel &&
          i.iceLevel === item.iceLevel
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += qty;
        return copy;
      }
      return [
        ...prev,
        {
          id: 'cart-' + Date.now() + Math.random().toString(),
          name: item.name,
          price: item.price,
          quantity: qty,
          selectedOption: item.selectedOption,
          sugarLevel: item.sugarLevel,
          iceLevel: item.iceLevel,
          specialNotes: item.specialNotes,
          image: item.image,
          menuItemId: item.menuItemId,
        },
      ];
    });

    const customizationNote = [item.sugarLevel, item.iceLevel].filter(Boolean).join(' • ');
    showToast(
      `Đã thêm "${item.name}"${customizationNote ? ` (${customizationNote})` : ''} vào khay bánh!`,
      'Thành công',
      'success'
    );
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyVoucher = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (['SUMMERFREE', 'DANANGSWEET', 'MATCHAFRESH'].includes(cleanCode)) {
      setAppliedVoucher(cleanCode);
      showToast(`Áp dụng mã ưu đãi ${cleanCode} thành công!`, 'Ưu đãi hợp lệ', 'success');
      return true;
    }
    showToast('Mã ưu đãi không hợp lệ hoặc đã hết lượt.', 'Thông báo', 'error');
    return false;
  };

  const placeOrder = (customerData?: {
    name?: string;
    phone?: string;
    address?: string;
    notes?: string;
    method?: 'pickup' | 'delivery';
    pickupTime?: string;
    branch?: string;
  }) => {
    if (cart.length === 0) {
      showToast('Khay bánh của bạn đang trống!', 'Thông báo', 'error');
      return;
    }

    const currentMethod = customerData?.method || orderMethod;
    const finalBranch = customerData?.branch || selectedBranch;
    const isPickup = currentMethod === 'pickup';
    const finalShippingFee = isPickup ? 0 : shippingFee;
    const orderTotal = Math.max(0, subTotal + finalShippingFee - discount);

    const newOrder: OrderDetails = {
      orderId: 'SMC-DN-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: 'Vừa xong',
      status: isPickup ? 'Tiếp nhận & sẵn sàng tại quầy chi nhánh' : 'Tiếp nhận & đang nướng mẻ mới',
      step: 2,
      items: [...cart],
      subTotal,
      shippingFee: finalShippingFee,
      discount,
      total: orderTotal,
      orderMethod: currentMethod,
      pickupTime: customerData?.pickupTime || pickupTime || 'Sau 10-15 phút',
      branchName: finalBranch,
      deliveryAddress: isPickup
        ? `Tự đến lấy tại quầy: ${finalBranch}`
        : (customerData?.address || 'Khách sạn Sala Danang Beach, 36 Lâm Hoành, Phước Mỹ, Sơn Trà'),
      receiverName: customerData?.name || 'Nguyễn Phương Linh',
      receiverPhone: customerData?.phone || '0918.452.xxx',
      customerNotes: customerData?.notes || '',
      shipperName: isPickup ? 'Nhân viên quầy Bloom' : 'Nguyễn Văn Hưng',
      shipperPhone: isPickup ? '0236 388 7844' : '0905 789 123',
      shipperPlate: isPickup ? 'Tại Quầy Thu Ngân' : '43-D1 829.14',
      estimatedDeliveryTime: isPickup ? (customerData?.pickupTime || '10-15 phút nữa') : '30 phút nữa',
    };

    setCurrentOrder(newOrder);
    addNewOrderTickets(newOrder.orderId, cart, isPickup ? 'pickup' : 'delivery');
    addAuditLog(
      'CUSTOMER_ORDER',
      'Order',
      newOrder.orderId,
      isPickup
        ? `Khách ${newOrder.receiverName} đặt tới lấy tại ${newOrder.branchName} (${newOrder.total.toLocaleString('vi-VN')}đ)`
        : `Khách ${newOrder.receiverName} đặt đơn ship ${newOrder.items.length} món (${newOrder.total.toLocaleString('vi-VN')}đ)`
    );
    setCart([]);
    setIsCartOpen(false);
    setCurrentScreen('order-tracking');
    showToast(
      isPickup
        ? 'Đặt hẹn tới lấy thành công! Quầy pha chế & bếp bánh đang chuẩn bị mẻ mới cho bạn.'
        : 'Đặt đơn ship thành công! Bếp nướng đang chuẩn bị bánh nóng cho bạn.',
      'Đơn hàng mới',
      'success'
    );
  };

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        subTotal,
        discount,
        shippingFee,
        finalTotal,
        appliedVoucher,
        applyVoucher,
        selectedBranch,
        setSelectedBranch,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        showToast,
        removeToast,
        orderMethod,
        setOrderMethod,
        pickupTime,
        setPickupTime,
        currentOrder,
        placeOrder,
        memberData,
        setMemberData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
