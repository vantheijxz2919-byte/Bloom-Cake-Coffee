import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StaffUser,
  UserRole,
  CashShift,
  PreparationTicket,
  TicketStatus,
  Invoice,
  DeliveryNote,
  DeliveryStatus,
  InventoryItem,
  StockAlert,
  ReplenishmentRequest,
  StockLedgerEntry,
  RecipeCost,
  MemberProfile,
  PromotionProgram,
  VoucherRecord,
  AuditLogEntry,
  OrderType,
} from '../types/crm';
import { CartItem } from '../types';
import {
  INITIAL_STAFF_USERS,
  INITIAL_CASH_SHIFT,
  INITIAL_PREPARATION_TICKETS,
  INITIAL_INVOICES,
  INITIAL_DELIVERIES,
  INITIAL_INVENTORY,
  INITIAL_STOCK_ALERTS,
  INITIAL_STOCK_LEDGERS,
  INITIAL_REPLENISHMENT_REQUESTS,
  INITIAL_RECIPE_COSTS,
  INITIAL_MEMBERS,
  INITIAL_PROMOTIONS,
  INITIAL_VOUCHERS,
  INITIAL_AUDIT_LOGS,
} from '../data/crmMockData';

export type CRMTab =
  | 'pos'
  | 'kds'
  | 'invoices'
  | 'deliveries'
  | 'inventory'
  | 'costs'
  | 'menu'
  | 'promotions'
  | 'vouchers'
  | 'members'
  | 'reports'
  | 'settings';

interface CRMContextType {
  // Navigation & Role
  portalMode: 'storefront' | 'crm';
  setPortalMode: (mode: 'storefront' | 'crm') => void;
  activeCrmTab: CRMTab;
  setActiveCrmTab: (tab: CRMTab) => void;
  allStaffUsers: StaffUser[];
  activeStaff: StaffUser;
  switchStaff: (staffId: string) => void;
  quickSwitchRole: (role: UserRole) => void;
  activeBranch: string;
  setActiveBranch: (branch: string) => void;

  // Cash Shift
  activeShift: CashShift;
  recordCashMovement: (type: 'in' | 'out', amount: number, reason: string) => void;
  closeShift: (actualCash: number, notes?: string) => void;
  openNewShift: (openingCash: number, notes?: string) => void;

  // KDS Tickets
  tickets: PreparationTicket[];
  updateTicketStatus: (ticketId: string, status: TicketStatus, issueReason?: string) => void;
  toggleTicketLine: (ticketId: string, lineId: string) => void;
  reportTicketIssue: (ticketId: string, reason: string) => void;
  addNewOrderTickets: (orderId: string, items: CartItem[], orderType: OrderType, tableNo?: string) => void;

  // Invoices & Print Lifecycle
  invoices: Invoice[];
  activeModalInvoice: Invoice | null;
  setActiveModalInvoice: (inv: Invoice | null) => void;
  lockInvoice: (invoiceId: string) => void;
  printInvoice: (invoiceId: string) => void;
  confirmPrintInvoice: (invoiceId: string) => void;
  reprintInvoice: (invoiceId: string, reason: string) => void;
  cancelInvoice: (invoiceId: string, reason: string) => void;

  // Deliveries CRM
  deliveries: DeliveryNote[];
  assignShipper: (deliveryId: string, shipperName: string, shipperPhone: string, shipperPlate: string) => void;
  updateDeliveryStatus: (deliveryId: string, status: DeliveryStatus, note?: string) => void;
  recordDeliveryAttempt: (deliveryId: string, status: 'delivered' | 'failed', reason?: string) => void;
  collectCODByShipper: (deliveryId: string) => void;
  settleCODWithStore: (deliveryId: string) => void;

  // Inventory & Alerts & Stock Ledger
  inventory: InventoryItem[];
  stockAlerts: StockAlert[];
  replenishRequests: ReplenishmentRequest[];
  stockLedgers: StockLedgerEntry[];
  createReplenishmentRequest: (itemId: string, quantity: number, notes?: string) => void;
  adjustStock: (itemId: string, delta: number, reason: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  updateInventoryItem: (item: InventoryItem) => { success: boolean; message: string };
  importInventoryItems: (newItems: InventoryItem[]) => { count: number; updated: number };
  addStockLedgerEntry: (entry: Omit<StockLedgerEntry, 'id' | 'timestamp' | 'actor'>) => void;

  // Recipe Costs
  recipeCosts: RecipeCost[];
  addRecipeCost: (recipe: RecipeCost) => void;
  updateRecipeCost: (recipe: RecipeCost) => void;
  deleteRecipeCost: (productId: string) => void;

  // Members
  members: MemberProfile[];
  adjustMemberPoints: (memberId: string, pointsDelta: number, reason: string) => void;
  searchMember: (keyword: string) => MemberProfile | undefined;
  addNewMember: (name: string, phone: string, email?: string) => MemberProfile;
  sendResetNoticeSMS: (memberId: string) => { success: boolean; message: string; smsContent: string };
  resetMemberCycle: (memberId: string) => void;

  // Promotions & Vouchers
  promotions: PromotionProgram[];
  vouchers: VoucherRecord[];
  togglePromotion: (id: string) => void;
  updatePromotion: (promo: PromotionProgram) => void;
  createPromotion: (promo: Omit<PromotionProgram, 'id' | 'budgetUsed'>) => void;
  deletePromotion: (id: string) => void;
  toggleVoucher: (id: string) => void;
  createVoucher: (v: Omit<VoucherRecord, 'id' | 'usedCount'>) => void;

  // POS State
  posCart: CartItem[];
  addToPosCart: (item: CartItem) => void;
  updatePosQty: (id: string, delta: number) => void;
  removeFromPosCart: (id: string) => void;
  clearPosCart: () => void;
  posOrderType: OrderType;
  setPosOrderType: (t: OrderType) => void;
  posTableNo: string;
  setPosTableNo: (t: string) => void;
  posCustomerPhone: string;
  setPosCustomerPhone: (p: string) => void;
  posCustomerName: string;
  setPosCustomerName: (n: string) => void;
  posAppliedVoucher: string | null;
  setPosAppliedVoucher: (v: string | null) => void;
  posPaymentMethod: 'cash' | 'vietqr' | 'card';
  setPosPaymentMethod: (m: 'cash' | 'vietqr' | 'card') => void;
  posCashTendered: number;
  setPosCashTendered: (val: number) => void;
  posNotes: string;
  setPosNotes: (notes: string) => void;
  checkoutPosOrder: () => Invoice | null;

  // Audit Logs
  auditLogs: AuditLogEntry[];
  addAuditLog: (action: string, entity: string, id: string, details: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role
  const [portalMode, setPortalMode] = useState<'storefront' | 'crm'>('storefront');
  const [activeCrmTab, setActiveCrmTab] = useState<CRMTab>('pos');
  const [allStaffUsers] = useState<StaffUser[]>(INITIAL_STAFF_USERS);
  const [activeStaff, setActiveStaff] = useState<StaffUser>(INITIAL_STAFF_USERS[0]); // Default: Cashier Trịnh Thu Hà
  const [activeBranch, setActiveBranch] = useState<string>('15 Hàm Nghi, Q. Thanh Khê');

  // Operations Data
  const [activeShift, setActiveShift] = useState<CashShift>(INITIAL_CASH_SHIFT);
  const [tickets, setTickets] = useState<PreparationTicket[]>(INITIAL_PREPARATION_TICKETS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [activeModalInvoice, setActiveModalInvoice] = useState<Invoice | null>(null);
  const [deliveries, setDeliveries] = useState<DeliveryNote[]>(INITIAL_DELIVERIES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>(INITIAL_STOCK_ALERTS);
  const [stockLedgers, setStockLedgers] = useState<StockLedgerEntry[]>(INITIAL_STOCK_LEDGERS);
  const [replenishRequests, setReplenishRequests] = useState<ReplenishmentRequest[]>(INITIAL_REPLENISHMENT_REQUESTS);
  const [recipeCosts, setRecipeCosts] = useState<RecipeCost[]>(INITIAL_RECIPE_COSTS);
  const [members, setMembers] = useState<MemberProfile[]>(INITIAL_MEMBERS);
  const [promotions, setPromotions] = useState<PromotionProgram[]>(INITIAL_PROMOTIONS);
  const [vouchers, setVouchers] = useState<VoucherRecord[]>(INITIAL_VOUCHERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // POS State
  const [posCart, setPosCart] = useState<CartItem[]>([]);
  const [posOrderType, setPosOrderType] = useState<OrderType>('dine_in');
  const [posTableNo, setPosTableNo] = useState<string>('Bàn 01');
  const [posCustomerPhone, setPosCustomerPhone] = useState<string>('');
  const [posCustomerName, setPosCustomerName] = useState<string>('Khách vãng lai');
  const [posAppliedVoucher, setPosAppliedVoucher] = useState<string | null>(null);
  const [posPaymentMethod, setPosPaymentMethod] = useState<'cash' | 'vietqr' | 'card'>('cash');
  const [posCashTendered, setPosCashTendered] = useState<number>(0);
  const [posNotes, setPosNotes] = useState<string>('');

  const addAuditLog = (action: string, entity: string, id: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: 'LOG-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      actor: `${activeStaff.name} (${activeStaff.roleName})`,
      actorRole: activeStaff.role,
      action,
      targetEntity: entity,
      targetId: id,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchStaff = (staffId: string) => {
    const found = allStaffUsers.find((s) => s.id === staffId);
    if (found) {
      setActiveStaff(found);
      addAuditLog('SWITCH_STAFF', 'StaffUser', found.id, `Chuyển người dùng sang ${found.name} (${found.roleName})`);
      // Route user to appropriate module for role
      if (found.role === 'cashier') setActiveCrmTab('pos');
      else if (found.role === 'kitchen') setActiveCrmTab('kds');
      else if (found.role === 'inventory') setActiveCrmTab('inventory');
      else if (found.role === 'delivery') setActiveCrmTab('deliveries');
      else if (found.role === 'manager') setActiveCrmTab('reports');
    }
  };

  const quickSwitchRole = (role: UserRole) => {
    const target = allStaffUsers.find((s) => s.role === role);
    if (target) {
      switchStaff(target.id);
    }
  };

  // Cash shift management
  const recordCashMovement = (type: 'in' | 'out', amount: number, reason: string) => {
    setActiveShift((prev) => {
      const otherIncome = type === 'in' ? prev.otherIncome + amount : prev.otherIncome;
      const otherExpense = type === 'out' ? prev.otherExpense + amount : prev.otherExpense;
      const expectedCash = prev.openingCash + prev.cashSales - prev.cashRefunds + otherIncome - otherExpense;
      return {
        ...prev,
        otherIncome,
        otherExpense,
        expectedCash,
      };
    });
    addAuditLog('CASH_MOVEMENT', 'CashShift', activeShift.id, `${type === 'in' ? 'Thu' : 'Chi'} ${amount.toLocaleString('vi-VN')}đ: ${reason}`);
  };

  const closeShift = (actualCash: number, notes?: string) => {
    setActiveShift((prev) => ({
      ...prev,
      actualCountedCash: actualCash,
      discrepancy: actualCash - prev.expectedCash,
      isClosed: true,
      endTime: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      notes: notes || prev.notes,
    }));
    addAuditLog('CLOSE_SHIFT', 'CashShift', activeShift.id, `Đóng ca tiền. Thực đếm: ${actualCash.toLocaleString('vi-VN')}đ. Chênh lệch: ${(actualCash - activeShift.expectedCash).toLocaleString('vi-VN')}đ`);
  };

  const openNewShift = (openingCash: number, notes?: string) => {
    const newShift: CashShift = {
      id: 'shift-hn-' + Date.now(),
      cashierId: activeStaff.id,
      cashierName: activeStaff.name,
      branchId: 'br-hamnghi',
      branchName: activeBranch,
      counterId: 'POS-01 (Quầy chính)',
      startTime: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      openingCash,
      cashSales: 0,
      cashRefunds: 0,
      otherIncome: 0,
      otherExpense: 0,
      expectedCash: openingCash,
      isClosed: false,
      notes: notes || 'Mở ca mới thành công',
    };
    setActiveShift(newShift);
    addAuditLog('OPEN_SHIFT', 'CashShift', newShift.id, `Mở ca mới với tiền đầu ca: ${openingCash.toLocaleString('vi-VN')}đ`);
  };

  // KDS Tickets
  const updateTicketStatus = (ticketId: string, status: TicketStatus, issueReason?: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status,
            issueReason: issueReason || t.issueReason,
            startedAt: status === 'preparing' && !t.startedAt ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : t.startedAt,
            completedAt: status === 'ready' ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : t.completedAt,
          };
        }
        return t;
      })
    );
    addAuditLog('UPDATE_TICKET', 'PreparationTicket', ticketId, `Cập nhật trạng thái trạm: ${status} ${issueReason ? `(Lý do: ${issueReason})` : ''}`);
  };

  const toggleTicketLine = (ticketId: string, lineId: string) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          const updatedItems = ticket.items.map((item) =>
            item.id === lineId ? { ...item, isReady: !item.isReady } : item
          );
          const allReady = updatedItems.every((i) => i.isReady);
          return {
            ...ticket,
            items: updatedItems,
            status: allReady ? 'ready' : ticket.status === 'ready' ? 'preparing' : ticket.status,
            completedAt: allReady ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ticket.completedAt,
          };
        }
        return ticket;
      })
    );
  };

  const reportTicketIssue = (ticketId: string, reason: string) => {
    updateTicketStatus(ticketId, 'issue', reason);
  };

  // Automatically split order into station tickets
  const addNewOrderTickets = (orderId: string, items: CartItem[], orderType: OrderType, tableNo?: string) => {
    const bevItems: CartItem[] = [];
    const bakItems: CartItem[] = [];
    const packItems: CartItem[] = [];

    items.forEach((item) => {
      const lower = item.name.toLowerCase();
      if (lower.includes('latte') || lower.includes('brew') || lower.includes('cà phê') || lower.includes('trà') || lower.includes('nước') || lower.includes('matcha')) {
        bevItems.push(item);
      } else if (lower.includes('ly') || lower.includes('pin') || lower.includes('sticker') || lower.includes('nam châm') || lower.includes('túi kraft')) {
        packItems.push(item);
      } else {
        bakItems.push(item);
      }
    });

    const newTickets: PreparationTicket[] = [];

    if (bevItems.length > 0) {
      newTickets.push({
        id: 'TICK-BEV-' + Math.floor(100 + Math.random() * 900),
        orderId,
        station: 'beverage',
        stationName: 'Trạm Pha Chế Barista',
        branchId: 'br-hamnghi',
        orderType,
        tableNumber: tableNo,
        items: bevItems.map((i, idx) => {
          const customizations = [i.selectedOption, i.sugarLevel, i.iceLevel].filter(Boolean);
          return {
            id: `bev-line-${idx}`,
            name: i.name,
            variant: customizations.length > 0 ? customizations.join(' • ') : 'Tiêu chuẩn',
            quantity: i.quantity,
            isReady: false,
            notes: i.specialNotes,
          };
        }),
        status: 'waiting',
        priority: orderType === 'delivery' ? 'high' : 'normal',
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        waitingMinutes: 1,
      });
    }

    if (bakItems.length > 0) {
      newTickets.push({
        id: 'TICK-BAK-' + Math.floor(100 + Math.random() * 900),
        orderId,
        station: 'bakery',
        stationName: 'Trạm Bếp Nướng Bánh',
        branchId: 'br-hamnghi',
        orderType,
        tableNumber: tableNo,
        items: bakItems.map((i, idx) => ({
          id: `bak-line-${idx}`,
          name: i.name,
          variant: i.selectedOption || 'Bánh tươi trong ngày',
          quantity: i.quantity,
          isReady: false,
        })),
        status: 'waiting',
        priority: orderType === 'delivery' ? 'high' : 'normal',
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        waitingMinutes: 1,
      });
    }

    if (packItems.length > 0 || orderType === 'delivery') {
      newTickets.push({
        id: 'TICK-PAK-' + Math.floor(100 + Math.random() * 900),
        orderId,
        station: 'packing',
        stationName: 'Trạm Đóng Gói & Quà',
        branchId: 'br-hamnghi',
        orderType,
        tableNumber: tableNo,
        items: packItems.length > 0
          ? packItems.map((i, idx) => ({
              id: `pak-line-${idx}`,
              name: i.name,
              variant: i.selectedOption,
              quantity: i.quantity,
              isReady: false,
            }))
          : [
              {
                id: 'pak-def',
                name: 'Bộ đóng gói giao hàng (Túi quai + Card)',
                variant: 'Chuẩn ship',
                quantity: 1,
                isReady: false,
              },
            ],
        status: 'waiting',
        priority: 'normal',
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        waitingMinutes: 1,
      });
    }

    setTickets((prev) => [...newTickets, ...prev]);

    // Also deduct/reserve packaging: cups and bags
    setInventory((prev) =>
      prev.map((inv) => {
        if (inv.id === 'inv-cup-500' && bevItems.length > 0) {
          const newAvail = Math.max(0, inv.availableStock - bevItems.reduce((s, i) => s + i.quantity, 0));
          return { ...inv, availableStock: newAvail };
        }
        if (inv.id === 'inv-bag-kraft-order' && orderType !== 'dine_in') {
          return { ...inv, availableStock: Math.max(0, inv.availableStock - 1) };
        }
        return inv;
      })
    );
  };

  // Invoices & Bill Print Lifecycle
  const lockInvoice = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'locked' } : inv))
    );
    addAuditLog('LOCK_INVOICE', 'Invoice', invoiceId, 'Chốt bill nội bộ thành công');
  };

  const printInvoice = (invoiceId: string) => {
    const inv = invoices.find((i) => i.id === invoiceId);
    if (!inv) return;
    setActiveModalInvoice(inv);
    addAuditLog('SEND_PRINT_JOB', 'Invoice', invoiceId, 'Mở bản in bill và gửi lệnh in');
  };

  const confirmPrintInvoice = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const nextCount = inv.printCount + 1;
          return {
            ...inv,
            status: 'printed',
            printStatus: nextCount > 1 ? 'reprinted' : 'printed',
            printCount: nextCount,
            printedAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
            confirmedByCashier: true,
          };
        }
        return inv;
      })
    );
    setActiveModalInvoice(null);
    addAuditLog('CONFIRM_PRINT', 'Invoice', invoiceId, 'Thu ngân bấm [Xác nhận đã in bill thành công]');
  };

  const reprintInvoice = (invoiceId: string, reason: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const nextCount = inv.printCount + 1;
          return {
            ...inv,
            status: 'reprinted',
            printStatus: 'reprinted',
            printCount: nextCount,
            printedAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
            notes: `${inv.notes || ''} [In lại lần ${nextCount}: ${reason}]`,
          };
        }
        return inv;
      })
    );
    addAuditLog('REPRINT_INVOICE', 'Invoice', invoiceId, `In lại bill: ${reason}`);
  };

  const cancelInvoice = (invoiceId: string, reason: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'cancelled', notes: `Hủy: ${reason}` } : inv))
    );
    addAuditLog('CANCEL_INVOICE', 'Invoice', invoiceId, `Hủy hóa đơn: ${reason}`);
  };

  // Deliveries CRM
  const assignShipper = (deliveryId: string, shipperName: string, shipperPhone: string, shipperPlate: string) => {
    setDeliveries((prev) =>
      prev.map((del) => {
        if (del.id === deliveryId) {
          return {
            ...del,
            shipperName,
            shipperPhone,
            shipperPlate,
            status: 'assigned',
            timeline: [
              ...del.timeline,
              {
                status: 'Đã phân công shipper',
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                actor: `${activeStaff.name} (Điều phối)`,
                note: `Bàn giao đơn cho tài xế ${shipperName} (${shipperPlate})`,
                isPublic: true,
              },
            ],
          };
        }
        return del;
      })
    );
    addAuditLog('ASSIGN_SHIPPER', 'DeliveryNote', deliveryId, `Phân công shipper ${shipperName} (${shipperPhone})`);
  };

  const updateDeliveryStatus = (deliveryId: string, status: DeliveryStatus, note?: string) => {
    setDeliveries((prev) =>
      prev.map((del) => {
        if (del.id === deliveryId) {
          return {
            ...del,
            status,
            deliveredAt: status === 'delivered' ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : del.deliveredAt,
            handedOverAt: status === 'delivering' && !del.handedOverAt ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : del.handedOverAt,
            timeline: [
              ...del.timeline,
              {
                status: status === 'delivering' ? 'Shipper đang trên đường giao' : status === 'delivered' ? 'Đã giao thành công' : status === 'failed' ? 'Giao thất bại' : status,
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                actor: activeStaff.name,
                note: note || '',
                isPublic: true,
              },
            ],
          };
        }
        return del;
      })
    );
    addAuditLog('UPDATE_DELIVERY', 'DeliveryNote', deliveryId, `Chuyển trạng thái giao hàng: ${status} ${note ? `(${note})` : ''}`);
  };

  const recordDeliveryAttempt = (deliveryId: string, status: 'delivered' | 'failed', reason?: string) => {
    setDeliveries((prev) =>
      prev.map((del) => {
        if (del.id === deliveryId) {
          const attemptNum = del.attempts.length + 1;
          const newAttempt = {
            id: `att-${Date.now()}`,
            attemptNumber: attemptNum,
            timestamp: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
            status,
            reason,
          };
          return {
            ...del,
            status: status === 'delivered' ? 'delivered' : 'failed',
            attempts: [...del.attempts, newAttempt],
            timeline: [
              ...del.timeline,
              {
                status: status === 'delivered' ? `Giao thành công (Lần ${attemptNum})` : `Lần thử ${attemptNum} thất bại: ${reason}`,
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                actor: `${activeStaff.name} (Shipper/Điều phối)`,
                note: reason || 'Khách đã nhận đủ và ký nhận',
                isPublic: true,
              },
            ],
          };
        }
        return del;
      })
    );
    addAuditLog('RECORD_DELIVERY_ATTEMPT', 'DeliveryNote', deliveryId, `Ghi nhận lần thử giao: ${status} ${reason ? `(Lý do: ${reason})` : ''}`);
  };

  const collectCODByShipper = (deliveryId: string) => {
    setDeliveries((prev) =>
      prev.map((del) => {
        if (del.id === deliveryId) {
          return {
            ...del,
            codStatus: 'collected_by_shipper',
            timeline: [
              ...del.timeline,
              {
                status: 'Shipper đã thu COD',
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                actor: 'Shipper',
                note: `Đã thu ${del.codAmount.toLocaleString('vi-VN')}đ từ khách, chờ nộp két cửa hàng`,
                isPublic: false,
              },
            ],
          };
        }
        return del;
      })
    );
    addAuditLog('COLLECT_COD', 'DeliveryNote', deliveryId, 'Shipper đã thu tiền COD từ khách hàng');
  };

  const settleCODWithStore = (deliveryId: string) => {
    const target = deliveries.find((d) => d.id === deliveryId);
    if (!target) return;

    setDeliveries((prev) =>
      prev.map((del) => {
        if (del.id === deliveryId) {
          return {
            ...del,
            codStatus: 'settled_with_store',
            timeline: [
              ...del.timeline,
              {
                status: 'Đã đối soát & nộp tiền COD vào quỹ cửa hàng',
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                actor: `${activeStaff.name} (Thu ngân)`,
                note: `Đã nhập quỹ ca ${target.codAmount.toLocaleString('vi-VN')}đ`,
                isPublic: false,
              },
            ],
          };
        }
        return del;
      })
    );

    // Add to cashShift sales
    setActiveShift((prev) => ({
      ...prev,
      cashSales: prev.cashSales + target.codAmount,
      expectedCash: prev.expectedCash + target.codAmount,
    }));

    addAuditLog('SETTLE_COD', 'DeliveryNote', deliveryId, `Cửa hàng đã đối soát & nhận ${target.codAmount.toLocaleString('vi-VN')}đ COD vào két ca`);
  };

  // Inventory & Stock Alert management
  const createReplenishmentRequest = (itemId: string, quantity: number, notes?: string) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    const newReq: ReplenishmentRequest = {
      id: 'PO-REQ-' + Math.floor(100 + Math.random() * 900),
      itemId,
      sku: item.sku,
      name: item.name,
      quantity,
      unit: item.unit,
      requestedBy: `${activeStaff.name} (${activeStaff.roleName})`,
      branchId: 'br-hamnghi',
      status: 'pending',
      createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      notes,
    };

    setReplenishRequests((prev) => [newReq, ...prev]);
    addAuditLog('CREATE_REPLENISH_REQ', 'ReplenishmentRequest', newReq.id, `Tạo đề nghị nhập ${quantity} ${item.unit} ${item.name}`);
  };

  const addStockLedgerEntry = (entry: Omit<StockLedgerEntry, 'id' | 'timestamp' | 'actor'>) => {
    const newEntry: StockLedgerEntry = {
      ...entry,
      id: (entry.quantityDelta >= 0 ? 'NK-' : 'XK-') + Date.now().toString().slice(-6),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
      actor: `${activeStaff.name} (${activeStaff.roleName})`,
    };
    setStockLedgers((prev) => [newEntry, ...prev]);
  };

  const adjustStock = (itemId: string, delta: number, reason: string) => {
    let affectedItem: InventoryItem | undefined;
    let newBalance = 0;

    setInventory((prev) =>
      prev.map((inv) => {
        if (inv.id === itemId) {
          const newAvail = Math.max(0, inv.availableStock + delta);
          const newActual = Math.max(0, inv.actualStock + delta);
          affectedItem = inv;
          newBalance = newAvail;

          // Check if < lowStockThreshold
          if (newAvail < inv.lowStockThreshold) {
            setStockAlerts((alerts) => {
              const existing = alerts.find((a) => a.itemId === itemId && a.status === 'open');
              if (existing) {
                return alerts.map((a) => (a.id === existing.id ? { ...a, availableStock: newAvail } : a));
              }
              return [
                {
                  id: 'ALT-' + Date.now(),
                  itemId,
                  sku: inv.sku,
                  name: inv.name,
                  branchId: 'br-hamnghi',
                  branchName: activeBranch,
                  availableStock: newAvail,
                  threshold: inv.lowStockThreshold,
                  unit: inv.unit,
                  status: 'open',
                  createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
                },
                ...alerts,
              ];
            });
          } else {
            // If replenished back to >= lowStockThreshold, resolve open alerts (Spec 16.3)
            setStockAlerts((alerts) =>
              alerts.map((a) => (a.itemId === itemId && a.status === 'open' ? { ...a, status: 'resolved' } : a))
            );
          }

          return {
            ...inv,
            availableStock: newAvail,
            actualStock: newActual,
          };
        }
        return inv;
      })
    );

    if (affectedItem) {
      const isPositive = delta > 0;
      const ledger: StockLedgerEntry = {
        id: (isPositive ? 'NK-ADJ-' : 'XK-ADJ-') + Date.now().toString().slice(-6),
        itemId,
        itemSku: (affectedItem as InventoryItem).sku,
        itemName: (affectedItem as InventoryItem).name,
        method: isPositive ? 'stock_take_adjust' : 'export_waste',
        methodLabel: isPositive ? 'Kiểm kê tăng (Thủ kho)' : 'Kiểm kê hao hụt / Xuất điều chỉnh',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
        unitCost: (affectedItem as InventoryItem).costPerUnit,
        quantityDelta: delta,
        unit: (affectedItem as InventoryItem).unit,
        balanceAfter: newBalance,
        branchName: activeBranch,
        actor: `${activeStaff.name} (${activeStaff.roleName})`,
        note: reason,
      };
      setStockLedgers((prev) => [ledger, ...prev]);
    }

    addAuditLog('ADJUST_STOCK', 'InventoryItem', itemId, `Điều chỉnh tồn (${delta > 0 ? '+' : ''}${delta}): ${reason}`);
  };

  const updateInventoryItem = (updatedItem: InventoryItem): { success: boolean; message: string } => {
    // RBAC: "Mỗi nguyên vật liệu sẽ có mục chỉnh sửa (chỉ quản lý kho mới được sửa phần này)"
    const isAuthorized = activeStaff.role === 'inventory' || activeStaff.role === 'manager';
    if (!isAuthorized) {
      addAuditLog(
        'EDIT_INVENTORY_DENIED',
        'InventoryItem',
        updatedItem.id,
        `Từ chối quyền sửa: ${activeStaff.name} (${activeStaff.roleName}) không phải Quản lý kho.`
      );
      return {
        success: false,
        message: `Quyền truy cập bị từ chối: Chỉ Quản lý kho (Thủ kho) hoặc Quản lý chi nhánh mới có quyền chỉnh sửa thông tin nguyên vật liệu / công cụ. Hiện bạn đang là: ${activeStaff.name} (${activeStaff.roleName}).`,
      };
    }

    const prevItem = inventory.find((i) => i.id === updatedItem.id);
    if (!prevItem) {
      return { success: false, message: 'Không tìm thấy mặt hàng trong hệ thống.' };
    }

    // Check if stock quantity changed, write ledger entry
    if (updatedItem.actualStock !== prevItem.actualStock || updatedItem.availableStock !== prevItem.availableStock) {
      const delta = updatedItem.availableStock - prevItem.availableStock;
      const ledger: StockLedgerEntry = {
        id: 'DC-KHO-' + Date.now().toString().slice(-6),
        itemId: updatedItem.id,
        itemSku: updatedItem.sku,
        itemName: updatedItem.name,
        method: 'stock_take_adjust',
        methodLabel: 'Hiệu chỉnh thông tin kho',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
        unitCost: updatedItem.costPerUnit,
        quantityDelta: delta,
        unit: updatedItem.unit,
        balanceAfter: updatedItem.availableStock,
        branchName: activeBranch,
        actor: `${activeStaff.name} (${activeStaff.roleName})`,
        note: `Cập nhật tồn: Tồn cũ ${prevItem.availableStock} -> Tồn mới ${updatedItem.availableStock}`,
      };
      setStockLedgers((prev) => [ledger, ...prev]);
    }

    setInventory((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    // Update alert status based on new availableStock vs lowStockThreshold
    if (updatedItem.availableStock < updatedItem.lowStockThreshold) {
      setStockAlerts((alerts) => {
        const existing = alerts.find((a) => a.itemId === updatedItem.id && a.status === 'open');
        if (existing) {
          return alerts.map((a) =>
            a.id === existing.id
              ? { ...a, availableStock: updatedItem.availableStock, threshold: updatedItem.lowStockThreshold }
              : a
          );
        }
        return [
          {
            id: 'ALT-' + Date.now(),
            itemId: updatedItem.id,
            sku: updatedItem.sku,
            name: updatedItem.name,
            branchId: updatedItem.branchId || 'br-hamnghi',
            branchName: activeBranch,
            availableStock: updatedItem.availableStock,
            threshold: updatedItem.lowStockThreshold,
            unit: updatedItem.unit,
            status: 'open',
            createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
          },
          ...alerts,
        ];
      });
    } else {
      setStockAlerts((alerts) =>
        alerts.map((a) => (a.itemId === updatedItem.id && a.status === 'open' ? { ...a, status: 'resolved' } : a))
      );
    }

    addAuditLog(
      'UPDATE_INVENTORY_ITEM',
      'InventoryItem',
      updatedItem.id,
      `Chỉnh sửa thông số mặt hàng ${updatedItem.name} (${updatedItem.sku}) - Nhóm: ${updatedItem.groupType === 'raw_material' ? 'Nguyên vật liệu' : 'Công cụ dụng cụ'}`
    );

    return { success: true, message: 'Đã lưu chỉnh sửa thành công.' };
  };

  const importInventoryItems = (newItems: InventoryItem[]): { count: number; updated: number } => {
    let addedCount = 0;
    let updatedCount = 0;
    const nowTime =
      new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
      ' ' +
      new Date().toLocaleDateString('vi-VN');

    setInventory((prev) => {
      const next = [...prev];
      newItems.forEach((incoming) => {
        const existingIdx = next.findIndex(
          (i) => i.sku.toLowerCase() === incoming.sku.toLowerCase() || i.id === incoming.id
        );
        if (existingIdx >= 0) {
          next[existingIdx] = {
            ...next[existingIdx],
            ...incoming,
            id: next[existingIdx].id, // preserve ID
          };
          updatedCount++;
        } else {
          next.push(incoming);
          addedCount++;
        }
      });
      return next;
    });

    // Record stock ledger entries for imported batches
    const newLedgers: StockLedgerEntry[] = newItems.map((item, idx) => ({
      id: 'NK-IMP-' + (Date.now() + idx).toString().slice(-6),
      itemId: item.id,
      itemSku: item.sku,
      itemName: item.name,
      method: 'import_supplier',
      methodLabel: 'Import file bảng tính Excel/CSV',
      timestamp: nowTime,
      unitCost: item.costPerUnit,
      quantityDelta: item.actualStock,
      unit: item.unit,
      balanceAfter: item.availableStock,
      branchName: activeBranch,
      actor: `${activeStaff.name} (${activeStaff.roleName})`,
      note: `Import dữ liệu đợt: ${item.brand || 'Tổng kho'}`,
    }));
    setStockLedgers((prev) => [...newLedgers, ...prev]);

    addAuditLog(
      'IMPORT_INVENTORY_BATCH',
      'Inventory',
      'BATCH-' + Date.now(),
      `Nhập file thành công: Thêm mới ${addedCount} món, cập nhật ${updatedCount} món.`
    );

    return { count: addedCount, updated: updatedCount };
  };

  const acknowledgeAlert = (alertId: string) => {
    setStockAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'acknowledged' } : a))
    );
  };

  // Members
  const adjustMemberPoints = (memberId: string, pointsDelta: number, reason: string) => {
    setMembers((prev) =>
      prev.map((mem) => {
        if (mem.id === memberId) {
          const newAvail = Math.max(0, mem.availablePoints + pointsDelta);
          const newTierPts = pointsDelta > 0 ? mem.tierPoints + pointsDelta : mem.tierPoints;
          const historyEntry = {
            id: 'pts-' + Date.now(),
            date: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
            type: (pointsDelta > 0 ? 'manual_adjust' : 'redeem') as any,
            points: pointsDelta,
            reason,
            actor: `${activeStaff.name} (${activeStaff.roleName})`,
          };
          return {
            ...mem,
            availablePoints: newAvail,
            tierPoints: newTierPts,
            pointHistory: [historyEntry, ...mem.pointHistory],
          };
        }
        return mem;
      })
    );
    addAuditLog('ADJUST_MEMBER_POINTS', 'MemberProfile', memberId, `Điều chỉnh điểm (${pointsDelta > 0 ? '+' : ''}${pointsDelta}đ): ${reason}`);
  };

  const searchMember = (keyword: string) => {
    const clean = keyword.trim().toLowerCase();
    if (!clean) return undefined;
    return members.find(
      (m) =>
        m.phone.toLowerCase().includes(clean) ||
        m.name.toLowerCase().includes(clean) ||
        m.code.toLowerCase().includes(clean)
    );
  };

  const addNewMember = (name: string, phone: string, email?: string) => {
    const now = new Date();
    const todayStr = now.toLocaleDateString('vi-VN');
    const futureDate = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
    const resetDateStr = futureDate.toLocaleDateString('vi-VN');

    const newMem: MemberProfile = {
      id: 'MEM-' + Math.floor(100 + Math.random() * 900),
      code: 'SMC-BRZ-' + Math.floor(100 + Math.random() * 900),
      name,
      phone,
      email,
      tier: 'Đồng',
      tierPoints: 0,
      availablePoints: 0,
      totalSpent: 0,
      totalOrders: 0,
      createdAt: todayStr,
      cycleStartDate: todayStr,
      cycleResetDate: resetDateStr,
      daysUntilReset: 180,
      smsResetNoticeSent: false,
      status: 'active',
      pointHistory: [],
    };
    setMembers((prev) => [newMem, ...prev]);
    addAuditLog(
      'ADD_MEMBER',
      'MemberProfile',
      newMem.id,
      `Đăng ký hội viên mới: ${name} (${phone}) - Bắt đầu chu kỳ tích điểm 6 tháng (Hạn reset: ${resetDateStr})`
    );
    return newMem;
  };

  const sendResetNoticeSMS = (memberId: string): { success: boolean; message: string; smsContent: string } => {
    const member = members.find((m) => m.id === memberId);
    if (!member) {
      return { success: false, message: 'Không tìm thấy thông tin hội viên.', smsContent: '' };
    }

    const smsText = `[BLOOM CAFE] Chào ${member.name}, bạn đang có ${member.availablePoints} điểm Bloom Club sắp hết hạn vào ngày ${member.cycleResetDate} (còn ${member.daysUntilReset} ngày). Hãy ghé Bloom Cake & Coffe đổi quà bánh ngọt hoặc đồ lưu niệm trước khi điểm reset về 0 nhé! Hotline hỗ trợ: 0236 388 7844.`;
    const sendTime =
      new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
      ' ' +
      new Date().toLocaleDateString('vi-VN');

    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              smsResetNoticeSent: true,
              smsResetNoticeDate: sendTime,
              lastSmsContent: smsText,
            }
          : m
      )
    );

    addAuditLog(
      'SEND_SMS_RESET_NOTICE',
      'MemberProfile',
      memberId,
      `Gửi tin nhắn SMS cảnh báo reset điểm tới SĐT ${member.phone} (Còn ${member.daysUntilReset} ngày): "${smsText}"`
    );

    return {
      success: true,
      message: `Đã gửi thành công SMS nhắc nhở reset điểm trước 1 tuần tới số ${member.phone}!`,
      smsContent: smsText,
    };
  };

  const resetMemberCycle = (memberId: string) => {
    const target = members.find((m) => m.id === memberId);
    if (!target) return;

    const oldPoints = target.availablePoints;
    const now = new Date();
    const todayStr = now.toLocaleDateString('vi-VN');
    const futureDate = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
    const nextResetStr = futureDate.toLocaleDateString('vi-VN');

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const resetEntry = {
            id: 'pts-reset-' + Date.now(),
            date: new Date().toLocaleTimeString('vi-VN') + ' ' + todayStr,
            type: 'cycle_reset' as const,
            points: -oldPoints,
            reason: `Chu kỳ 6 tháng hoàn tất: Tự động reset ${oldPoints} điểm khả dụng về 0 để mở chu kỳ mới`,
            actor: `${activeStaff.name} (${activeStaff.roleName})`,
          };
          return {
            ...m,
            availablePoints: 0,
            cycleStartDate: todayStr,
            cycleResetDate: nextResetStr,
            daysUntilReset: 180,
            smsResetNoticeSent: false,
            smsResetNoticeDate: undefined,
            pointHistory: [resetEntry, ...m.pointHistory],
          };
        }
        return m;
      })
    );

    addAuditLog(
      'RESET_MEMBER_CYCLE',
      'MemberProfile',
      memberId,
      `Reset điểm chu kỳ 6 tháng cho ${target.name} (${target.phone}): Reset ${oldPoints} điểm khả dụng về 0. Bắt đầu chu kỳ mới từ ${todayStr} đến ${nextResetStr}.`
    );
  };

  // Recipe Costs Operations (Định Mức & Cost Từng Món)
  const recalculateRecipe = (recipe: RecipeCost): RecipeCost => {
    const ingredientsCost = (recipe.ingredients || []).reduce((acc, ing) => acc + (Number(ing.cost) || 0), 0);
    const packagingCost = (recipe.perItemPackaging || []).reduce((acc, pkg) => acc + (Number(pkg.cost) || 0), 0);
    const directCost = ingredientsCost + packagingCost;
    const orderPackagingShare = Number(recipe.orderPackagingShare) || 0;
    const totalCostWithPackaging = directCost + orderPackagingShare;
    const sellingPrice = Number(recipe.sellingPrice) || 0;
    const grossProfit = Math.max(0, sellingPrice - totalCostWithPackaging);
    const profitMarginPercent = sellingPrice > 0 ? Number(((grossProfit / sellingPrice) * 100).toFixed(1)) : 0;

    return {
      ...recipe,
      directCost,
      totalCostWithPackaging,
      grossProfit,
      profitMarginPercent,
      updatedAt:
        new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
        ' ' +
        new Date().toLocaleDateString('vi-VN'),
    };
  };

  const addRecipeCost = (recipe: RecipeCost) => {
    const calculated = recalculateRecipe(recipe);
    setRecipeCosts((prev) => [calculated, ...prev]);
    addAuditLog(
      'ADD_RECIPE_COST',
      'RecipeCost',
      calculated.productId,
      `Thêm công thức định mức món mới: ${calculated.productName} (${calculated.variant}) - Giá bán: ${calculated.sellingPrice.toLocaleString('vi-VN')}đ, Giá vốn: ${calculated.totalCostWithPackaging.toLocaleString('vi-VN')}đ (Biên lãi: ${calculated.profitMarginPercent}%)`
    );
  };

  const updateRecipeCost = (updated: RecipeCost) => {
    const calculated = recalculateRecipe(updated);
    setRecipeCosts((prev) =>
      prev.map((r) => (r.productId === updated.productId ? calculated : r))
    );
    addAuditLog(
      'UPDATE_RECIPE_COST',
      'RecipeCost',
      calculated.productId,
      `Cập nhật định mức & cost món: ${calculated.productName} (${calculated.variant}) - Giá vốn: ${calculated.totalCostWithPackaging.toLocaleString('vi-VN')}đ (Biên lãi: ${calculated.profitMarginPercent}%)`
    );
  };

  const deleteRecipeCost = (productId: string) => {
    const found = recipeCosts.find((r) => r.productId === productId);
    setRecipeCosts((prev) => prev.filter((r) => r.productId !== productId));
    if (found) {
      addAuditLog(
        'DELETE_RECIPE_COST',
        'RecipeCost',
        productId,
        `Xóa công thức định mức món: ${found.productName} (${found.variant})`
      );
    }
  };

  // Promotions & Vouchers
  const togglePromotion = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isActive;
          addAuditLog(
            'TOGGLE_PROMOTION',
            'PromotionProgram',
            id,
            `${nextState ? 'Kích hoạt chạy' : 'Tạm dừng'} chương trình ưu đãi: ${p.title}`
          );
          return { ...p, isActive: nextState };
        }
        return p;
      })
    );
  };

  const updatePromotion = (updated: PromotionProgram) => {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? {
              ...updated,
              updatedAt:
                new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
                ' ' +
                new Date().toLocaleDateString('vi-VN'),
            }
          : p
      )
    );
    addAuditLog(
      'UPDATE_PROMOTION',
      'PromotionProgram',
      updated.id,
      `Cập nhật chương trình ưu đãi ${updated.title} - Giảm: ${
        updated.discountType === 'percentage'
          ? `${updated.discountValue}%`
          : `${updated.discountValue.toLocaleString('vi-VN')}đ`
      }, Trạng thái: ${updated.isActive ? 'Đang chạy' : 'Tạm dừng'}`
    );
  };

  const createPromotion = (promo: Omit<PromotionProgram, 'id' | 'budgetUsed'>) => {
    const newPromo: PromotionProgram = {
      ...promo,
      id: 'PROMO-' + Math.floor(10 + Math.random() * 90),
      budgetUsed: 0,
      updatedAt:
        new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
        ' ' +
        new Date().toLocaleDateString('vi-VN'),
    };
    setPromotions((prev) => [newPromo, ...prev]);
    addAuditLog(
      'CREATE_PROMOTION',
      'PromotionProgram',
      newPromo.id,
      `Tạo mới chương trình ưu đãi: ${newPromo.title} - Ngân sách: ${newPromo.budgetTotal.toLocaleString('vi-VN')}đ`
    );
  };

  const deletePromotion = (id: string) => {
    const found = promotions.find((p) => p.id === id);
    setPromotions((prev) => prev.filter((p) => p.id !== id));
    if (found) {
      addAuditLog(
        'DELETE_PROMOTION',
        'PromotionProgram',
        id,
        `Xóa chương trình ưu đãi: ${found.title}`
      );
    }
  };

  const toggleVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: v.status === 'active' ? 'paused' : 'active' } : v))
    );
  };

  const createVoucher = (v: Omit<VoucherRecord, 'id' | 'usedCount'>) => {
    const newV: VoucherRecord = {
      ...v,
      id: 'VOUCHER-' + Math.floor(10 + Math.random() * 90),
      usedCount: 0,
    };
    setVouchers((prev) => [newV, ...prev]);
    addAuditLog('CREATE_VOUCHER', 'VoucherRecord', newV.id, `Tạo mã voucher mới ${newV.code} (${newV.title})`);
  };

  // POS Operations
  const addToPosCart = (item: CartItem) => {
    setPosCart((prev) => {
      const idx = prev.findIndex((i) => i.name === item.name && i.selectedOption === item.selectedOption);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += item.quantity || 1;
        return copy;
      }
      return [
        ...prev,
        {
          id: 'pos-' + Date.now() + Math.random().toString(),
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          selectedOption: item.selectedOption,
          image: item.image,
        },
      ];
    });
  };

  const updatePosQty = (id: string, delta: number) => {
    setPosCart((prev) =>
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

  const removeFromPosCart = (id: string) => {
    setPosCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearPosCart = () => {
    setPosCart([]);
  };

  const checkoutPosOrder = (): Invoice | null => {
    if (posCart.length === 0) return null;

    const subTotal = posCart.reduce((s, i) => s + i.price * i.quantity, 0);
    let discount = 0;
    if (posAppliedVoucher === 'DANANGSWEET' && subTotal >= 200000) discount = 30000;
    else if (posAppliedVoucher === 'MATCHAFRESH') discount = Math.round(subTotal * 0.15);

    const shippingFee = posOrderType === 'delivery' ? 18000 : 0;
    const total = Math.max(0, subTotal + shippingFee - discount);
    const paidAmount = posPaymentMethod === 'cash' ? Math.max(total, posCashTendered) : total;
    const changeAmount = posPaymentMethod === 'cash' ? Math.max(0, posCashTendered - total) : 0;

    const orderId = 'SMC-DN-' + Math.floor(10000 + Math.random() * 90000);
    const invoiceId = 'INV-HN-' + Math.floor(1000 + Math.random() * 9000);

    const newInvoice: Invoice = {
      id: invoiceId,
      orderId,
      version: 1,
      cashShiftId: activeShift.id,
      cashierId: activeStaff.id,
      cashierName: activeStaff.name,
      branchId: 'br-hamnghi',
      branchName: activeBranch,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
      orderType: posOrderType,
      customerName: posCustomerName,
      customerPhone: posCustomerPhone || undefined,
      items: [...posCart],
      subTotal,
      discount,
      voucherCode: posAppliedVoucher || undefined,
      shippingFee,
      total,
      paidAmount: total,
      changeAmount,
      paymentMethod: posPaymentMethod,
      status: 'locked', // Chốt bill first (spec section 10)
      printStatus: 'unprinted',
      printCount: 0,
      confirmedByCashier: false,
      notes: posNotes,
    };

    setInvoices((prev) => [newInvoice, ...prev]);

    // Send tickets to KDS stations
    addNewOrderTickets(orderId, posCart, posOrderType, posOrderType === 'dine_in' ? posTableNo : undefined);

    // If delivery, create delivery note
    if (posOrderType === 'delivery') {
      const newDel: DeliveryNote = {
        id: 'DEL-2026-' + orderId.split('-')[2],
        orderId,
        invoiceId,
        branchId: 'br-hamnghi',
        branchName: activeBranch,
        customerName: posCustomerName,
        customerPhone: posCustomerPhone,
        deliveryAddress: posNotes || 'Địa chỉ khách hàng cung cấp qua điện thoại',
        notes: posNotes,
        scheduledTime: '30 phút nữa',
        packageCount: 1,
        items: [...posCart],
        coordinatorId: 'staff-delivery-1',
        coordinatorName: 'Trần Văn Hưng',
        shippingFeePaidByCustomer: shippingFee,
        paidAmount: posPaymentMethod !== 'cash' ? total : 0,
        codAmount: posPaymentMethod === 'cash' ? total : 0,
        codStatus: posPaymentMethod === 'cash' ? 'uncollected' : 'no_cod',
        status: 'waiting_prep',
        createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
        attempts: [],
        timeline: [
          {
            status: 'Tạo đơn tại quầy POS',
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            actor: activeStaff.name,
            note: 'Chờ trạm chuẩn bị xong để in bill và bàn giao shipper',
            isPublic: true,
          },
        ],
      };
      setDeliveries((prev) => [newDel, ...prev]);
    }

    // Update Cash shift if cash
    if (posPaymentMethod === 'cash') {
      setActiveShift((prev) => ({
        ...prev,
        cashSales: prev.cashSales + total,
        expectedCash: prev.expectedCash + total,
      }));
    }

    addAuditLog('CHECKOUT_POS', 'Invoice', invoiceId, `Tạo đơn và chốt bill ${invoiceId} cho ${posCustomerName}: ${total.toLocaleString('vi-VN')}đ`);

    // Reset POS form
    setPosCart([]);
    setPosNotes('');
    setPosCashTendered(0);
    setPosAppliedVoucher(null);

    // Open bill preview modal for printing flow
    setActiveModalInvoice(newInvoice);

    return newInvoice;
  };

  // Monitor stock < 100 on mount and state changes
  useEffect(() => {
    inventory.forEach((item) => {
      if (item.availableStock < item.lowStockThreshold) {
        setStockAlerts((alerts) => {
          if (!alerts.some((a) => a.itemId === item.id && a.status === 'open')) {
            return [
              {
                id: 'ALT-' + Date.now() + Math.random().toString(),
                itemId: item.id,
                sku: item.sku,
                name: item.name,
                branchId: 'br-hamnghi',
                branchName: activeBranch,
                availableStock: item.availableStock,
                threshold: item.lowStockThreshold,
                unit: item.unit,
                status: 'open',
                createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
              },
              ...alerts,
            ];
          }
          return alerts;
        });
      }
    });
  }, [inventory, activeBranch]);

  return (
    <CRMContext.Provider
      value={{
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
        recordCashMovement,
        closeShift,
        openNewShift,
        tickets,
        updateTicketStatus,
        toggleTicketLine,
        reportTicketIssue,
        addNewOrderTickets,
        invoices,
        activeModalInvoice,
        setActiveModalInvoice,
        lockInvoice,
        printInvoice,
        confirmPrintInvoice,
        reprintInvoice,
        cancelInvoice,
        deliveries,
        assignShipper,
        updateDeliveryStatus,
        recordDeliveryAttempt,
        collectCODByShipper,
        settleCODWithStore,
        inventory,
        stockAlerts,
        replenishRequests,
        stockLedgers,
        createReplenishmentRequest,
        adjustStock,
        acknowledgeAlert,
        updateInventoryItem,
        importInventoryItems,
        addStockLedgerEntry,
        recipeCosts,
        addRecipeCost,
        updateRecipeCost,
        deleteRecipeCost,
        members,
        adjustMemberPoints,
        searchMember,
        addNewMember,
        sendResetNoticeSMS,
        resetMemberCycle,
        promotions,
        vouchers,
        togglePromotion,
        updatePromotion,
        createPromotion,
        deletePromotion,
        toggleVoucher,
        createVoucher,
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
        auditLogs,
        addAuditLog,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
