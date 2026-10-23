import React, { useState } from 'react';
import { useCRM, CRMTab } from '../../context/CRMContext';
import { UserRole } from '../../types/crm';
import {
  Store,
  Monitor,
  Receipt,
  Truck,
  Boxes,
  Calculator,
  UtensilsCrossed,
  Tag,
  Ticket,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  AlertTriangle,
  ArrowLeft,
  CircleDollarSign,
  UserCheck,
  Building2,
  Clock,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  Coffee,
  Layers,
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const CRMLayout: React.FC<Props> = ({ children }) => {
  const {
    portalMode,
    setPortalMode,
    activeCrmTab,
    setActiveCrmTab,
    allStaffUsers,
    activeStaff,
    switchStaff,
    quickSwitchRole,
    activeBranch,
    setActiveBranch,
    activeShift,
    stockAlerts,
    tickets,
  } = useCRM();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const openAlertsCount = stockAlerts.filter((a) => a.status === 'open').length;
  const waitingTicketsCount = tickets.filter((t) => t.status === 'waiting' || t.status === 'preparing').length;

  interface NavItem {
    id: CRMTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    roles: UserRole[];
    badge?: number;
    badgeColor?: string;
  }

  // Grouped Navigation for modern CRM
  const navGroups: { title: string; items: NavItem[] }[] = [
    {
      title: 'VẬN HÀNH TẠI QUẦY & BẾP',
      items: [
        { id: 'pos', label: 'POS Bán Hàng', icon: Monitor, roles: ['cashier', 'manager'] },
        {
          id: 'kds',
          label: 'Bảng Trạm KDS',
          icon: UtensilsCrossed,
          roles: ['kitchen', 'manager'],
          badge: waitingTicketsCount,
          badgeColor: 'bg-amber-500 text-white',
        },
        { id: 'invoices', label: 'Hóa Đơn / Bill Ca', icon: Receipt, roles: ['cashier', 'manager'] },
      ],
    },
    {
      title: 'ĐIỀU PHỐI & KHO VẬN',
      items: [
        { id: 'deliveries', label: 'CRM Giao Hàng (Ship)', icon: Truck, roles: ['delivery', 'cashier', 'manager'] },
        {
          id: 'inventory',
          label: 'Kho & Cảnh Báo Tồn',
          icon: Boxes,
          roles: ['inventory', 'manager', 'cashier', 'kitchen', 'delivery'],
          badge: openAlertsCount,
          badgeColor: 'bg-red-500 text-white',
        },
      ],
    },
    {
      title: 'QUẢN TRỊ & KINH DOANH',
      items: [
        { id: 'costs', label: 'Định Mức & Cost Ly', icon: Calculator, roles: ['manager'] },
        { id: 'menu', label: 'Menu & Bảng Giá', icon: Store, roles: ['manager'] },
        { id: 'promotions', label: 'Chương Trình Ưu Đãi', icon: Tag, roles: ['manager'] },
        { id: 'vouchers', label: 'Ví & Quản Lý Voucher', icon: Ticket, roles: ['manager'] },
        { id: 'members', label: 'Hội Viên Bloom Club', icon: Users, roles: ['cashier', 'manager'] },
        { id: 'reports', label: 'Báo Cáo & Ca Tiền', icon: BarChart3, roles: ['cashier', 'manager'] },
        { id: 'settings', label: 'Phân Quyền & Test AC', icon: Settings, roles: ['manager'] },
      ],
    },
  ];

  const handleTabClick = (tabId: CRMTab) => {
    setActiveCrmTab(tabId);
    setIsMobileSidebarOpen(false);
  };

  const getTabTitle = (tab: CRMTab) => {
    switch (tab) {
      case 'pos':
        return 'Màn Hình Bán Hàng POS Thu Ngân';
      case 'kds':
        return 'Bảng Hàng Chờ Trạm KDS (Barista & Bếp Nướng)';
      case 'invoices':
        return 'Sổ Hóa Đơn Bán Hàng & In Bill Trong Ca';
      case 'deliveries':
        return 'CRM Quản Lý Giao Hàng & Đối Soát COD 2 Lớp';
      case 'inventory':
        return 'Quản Lý Tồn Kho & Cảnh Báo Ngưỡng < 100 Đơn Vị';
      case 'costs':
        return 'Bảng Tính Định Mức & Giá Vốn (Cost 3 Lớp)';
      case 'menu':
        return 'Danh Mục Menu & Phiên Bản Giá Bán';
      case 'promotions':
        return 'Chương Trình Khuyến Mãi Độc Lập';
      case 'vouchers':
        return 'Quản Lý Mã Voucher & Ví Khách Hàng';
      case 'members':
        return 'Hội Viên Bloom Club & Tích Điểm Tích Lũy';
      case 'reports':
        return 'Báo Cáo Hoạt Động & Quyết Toán Ca Tiền Mặt';
      case 'settings':
        return 'Ma Trận Quyền RBAC & Kiểm Định 38 Tiêu Chí Nghiệm Thu';
      default:
        return 'Cổng Quản Trị & Vận Hành CRM';
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex text-stone-800 font-sans antialiased">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-stone-900 text-stone-300 border-r border-stone-800 flex-shrink-0 sticky top-0 h-screen select-none">
        {/* Brand Header */}
        <div className="p-4 border-b border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setPortalMode('storefront')}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Xem Cửa hàng Khách</span>
            </button>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/20 text-primary-fixed border border-primary/30 font-bold">
              CRM v1.0
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/image_409_9964af08.png"
              alt="Bloom Cake & Coffe"
              className="w-9 h-9 rounded-full object-cover shadow-md ring-1 ring-white/20"
            />
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Bloom Cake &amp; Coffe CRM</h1>
              <p className="text-[11px] text-stone-400">Vận hành hợp nhất 27 spec</p>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin scrollbar-thumb-stone-800">
          {navGroups.map((group, gIdx) => {
            const filteredItems = group.items.filter((item) => item.roles.includes(activeStaff.role));
            if (filteredItems.length === 0) return null;

            return (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-stone-500">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeCrmTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-white font-bold shadow-sm'
                            : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                          <span>{item.label}</span>
                        </div>

                        {item.badge !== undefined && item.badge > 0 && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-white text-primary' : item.badgeColor || 'bg-stone-700 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Current User & Role Switcher */}
        <div className="p-3 border-t border-stone-800 bg-stone-950/60">
          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={activeStaff.avatar}
                alt={activeStaff.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/40 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{activeStaff.name}</div>
                <div className="text-[10px] text-amber-400 truncate">{activeStaff.roleName}</div>
              </div>
            </div>

            <button
              onClick={() => setShowRoleModal(true)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              title="Đổi vai trò nhân viên"
            >
              <Users className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Mobile hamburger & Page Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="min-w-0">
                <h2 className="text-base font-bold text-stone-900 truncate">
                  {getTabTitle(activeCrmTab)}
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-primary" />
                    <strong>{activeBranch}</strong>
                  </span>
                  <span>•</span>
                  <span>Mã ca: {activeShift.id.slice(-6)}</span>
                </div>
              </div>
            </div>

            {/* Right: Operational Status Badges & Actions */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              {/* Cash shift balance badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                <CircleDollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-stone-500 font-medium">Két ca:</span>
                <span className="font-bold font-mono text-emerald-800">
                  {activeShift.expectedCash.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {/* Role Switcher Pill */}
              <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs">
                <span className="text-[11px] font-bold text-stone-600 px-2 hidden md:inline">
                  Vai trò:
                </span>
                <select
                  value={activeStaff.id}
                  onChange={(e) => switchStaff(e.target.value)}
                  className="bg-white border border-stone-300 text-stone-800 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-hidden focus:border-primary shadow-2xs"
                >
                  {allStaffUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.roleName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Switch to customer store button */}
              <button
                onClick={() => setPortalMode('storefront')}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors"
                title="Quay lại giao diện website cho khách mua hàng"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Web Khách</span>
              </button>
            </div>
          </div>
        </header>

        {/* Current Role Banner Notification */}
        <div className="bg-amber-50/80 border-b border-amber-200/80 px-4 lg:px-6 py-2 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              Tài khoản hiện tại: <strong>{activeStaff.name}</strong> • Quyền:{' '}
              <span className="font-semibold text-amber-950 uppercase">{activeStaff.roleName}</span>.
              Hệ thống kích hoạt ma trận phân quyền RBAC và giới hạn chức năng tương ứng theo Spec §3.
            </span>
          </div>
          <span className="hidden xl:inline text-[11px] text-amber-700 font-mono">
            Ca mở lúc: {activeShift.startTime}
          </span>
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-stone-900 text-stone-300 flex flex-col h-full z-10 shadow-2xl">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/aistudio/image_409_9964af08.png"
                  alt="Bloom Cake & Coffe"
                  className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-white/20"
                />
                <span className="font-bold text-white text-sm">Bloom Cake &amp; Coffe CRM</span>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {navGroups.map((group, gIdx) => {
                const filtered = group.items.filter((i) => i.roles.includes(activeStaff.role));
                if (filtered.length === 0) return null;

                return (
                  <div key={gIdx} className="space-y-1">
                    <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      {group.title}
                    </div>
                    {filtered.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeCrmTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                            isActive ? 'bg-primary text-white' : 'text-stone-300 hover:bg-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-stone-800">
              <button
                onClick={() => {
                  setPortalMode('storefront');
                  setIsMobileSidebarOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Xem Cửa Hàng Khách</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Switcher Dialog */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Chuyển Đổi Nhanh Tài Khoản Thử Nghiệm RBAC
              </h3>
              <button onClick={() => setShowRoleModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Chọn tài khoản để kiểm thử phân quyền các màn hình và dữ liệu theo bảng ma trận Spec §3.2:
            </p>

            <div className="space-y-2">
              {allStaffUsers.map((user) => {
                const isSelected = activeStaff.id === user.id;

                return (
                  <div
                    key={user.id}
                    onClick={() => {
                      switchStaff(user.id);
                      setShowRoleModal(false);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-stone-200"
                      />
                      <div>
                        <div className="font-bold text-xs text-stone-900">{user.name}</div>
                        <div className="text-[11px] text-amber-700 font-medium">{user.roleName}</div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        isSelected ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {isSelected ? 'Đang chọn' : 'Chuyển'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
