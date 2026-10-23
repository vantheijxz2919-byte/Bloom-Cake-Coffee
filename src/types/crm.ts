import { CartItem } from './index';

export type UserRole =
  | 'customer'
  | 'cashier'
  | 'kitchen'
  | 'inventory'
  | 'delivery'
  | 'manager';

export interface StaffUser {
  id: string;
  name: string;
  role: UserRole;
  roleName: string;
  avatar: string;
  branchId: string;
  branchName: string;
  permissions: string[];
}

export type OrderType = 'dine_in' | 'takeaway' | 'pickup' | 'delivery';

export type OrderStatus =
  | 'pending_payment'
  | 'pending_confirmation'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'shipping'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'unpaid'
  | 'processing'
  | 'paid'
  | 'partially_refunded'
  | 'refunded'
  | 'failed';

export type StationType = 'beverage' | 'bakery' | 'packing';

export type TicketStatus =
  | 'waiting'
  | 'received'
  | 'preparing'
  | 'ready'
  | 'handed_over'
  | 'issue'
  | 'cancelled';

export interface PreparationTicketLine {
  id: string;
  name: string;
  variant?: string;
  quantity: number;
  options?: string[];
  notes?: string;
  isReady: boolean;
}

export interface PreparationTicket {
  id: string;
  orderId: string;
  station: StationType;
  stationName: string;
  branchId: string;
  orderType: OrderType;
  tableNumber?: string;
  items: PreparationTicketLine[];
  status: TicketStatus;
  priority: 'normal' | 'high' | 'urgent';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  assignedStaff?: string;
  allergenWarning?: string;
  issueReason?: string;
  waitingMinutes: number;
}

export type InvoiceStatus =
  | 'draft'
  | 'locked'
  | 'printed'
  | 'reprinted'
  | 'cancelled'
  | 'refunded';

export interface Invoice {
  id: string;
  orderId: string;
  version: number;
  cashShiftId: string;
  cashierId: string;
  cashierName: string;
  branchId: string;
  branchName: string;
  createdAt: string;
  orderType: OrderType;
  customerName?: string;
  customerPhone?: string;
  items: CartItem[];
  subTotal: number;
  discount: number;
  voucherCode?: string;
  shippingFee: number;
  total: number;
  paidAmount: number;
  changeAmount: number;
  paymentMethod: 'cash' | 'vietqr' | 'card';
  status: InvoiceStatus;
  printStatus: 'unprinted' | 'printed' | 'reprinted';
  printCount: number;
  printedAt?: string;
  confirmedByCashier: boolean;
  notes?: string;
}

export type DeliveryStatus =
  | 'waiting_prep'
  | 'waiting_handover'
  | 'assigned'
  | 'delivering'
  | 'delivered'
  | 'failed';

export type CODStatus =
  | 'no_cod'
  | 'uncollected'
  | 'collected_by_shipper'
  | 'settled_with_store';

export interface DeliveryAttempt {
  id: string;
  attemptNumber: number;
  timestamp: string;
  status: 'delivered' | 'failed';
  reason?: string;
  note?: string;
}

export interface DeliveryNote {
  id: string;
  orderId: string;
  invoiceId: string;
  branchId: string;
  branchName: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
  scheduledTime: string;
  packageCount: number;
  items: CartItem[];
  coordinatorId: string;
  coordinatorName: string;
  shipperId?: string;
  shipperName?: string;
  shipperPhone?: string;
  shipperPlate?: string;
  shippingFeePaidByCustomer: number;
  paidAmount: number;
  codAmount: number;
  codStatus: CODStatus;
  status: DeliveryStatus;
  createdAt: string;
  handedOverAt?: string;
  deliveredAt?: string;
  attempts: DeliveryAttempt[];
  timeline: {
    status: string;
    timestamp: string;
    actor: string;
    note?: string;
    isPublic: boolean;
  }[];
}

export type InventoryGroupType = 'raw_material' | 'tool_equipment';

export interface StockLedgerEntry {
  id: string; // Mã phiếu / Mã giao dịch
  itemId: string;
  itemSku: string;
  itemName: string;
  method: 'import_supplier' | 'export_production' | 'export_waste' | 'stock_take_adjust' | 'transfer';
  methodLabel: string; // "Nhập mua NCC", "Xuất pha chế", "Xuất bếp bánh", "Xuất hao hụt", "Kiểm kê chênh lệch", "Chuyển chi nhánh"
  timestamp: string; // Thời gian
  unitCost: number; // Giá vốn nhập vào
  quantityDelta: number; // Số lượng nhập (+) hoặc xuất (-)
  unit: string;
  balanceAfter: number; // Tồn cuối (tồn sau khi nhập hoặc loại)
  branchName: string;
  actor: string; // Người thực hiện
  note?: string; // Ghi chú
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'ingredient' | 'product' | 'souvenir' | 'packaging' | 'tool';
  groupType: InventoryGroupType; // 'raw_material' (Nguyên vật liệu) | 'tool_equipment' (Công cụ dụng cụ)
  brand: string; // Thuộc thương hiệu nào (Elle & Vire, Haru Uji, Sanremo, Dalat Milk, v.v.)
  image?: string; // Ảnh minh họa
  description?: string; // Mô tả chi tiết nguyên vật liệu / công cụ
  unit: string; // Đơn vị: cốc/ly, set, thùng, kg, gram, cái, hộp...
  unitSize?: string; // Size S / M / L hoặc Quy cách
  standardUnit: string;
  conversionFactor: number; // e.g. 1 can = 1000ml, 1 thùng = 24 hộp
  availableStock: number; // Đang tồn bao nhiêu (tồn khả dụng)
  reservedStock: number;
  actualStock: number; // Tồn thực tế
  lowStockThreshold: number; // Định mức tồn thấp nhất (Spec alert < 100 hoặc min)
  maxStockThreshold?: number; // Định mức tồn cao nhất
  costPerUnit: number; // Giá vốn
  supplier: string;
  location: string;
  branchId: string;
  applicableBranches?: string[]; // Các chi nhánh sử dụng (Hàm Nghi, Võ Văn Kiệt, Bạch Đằng...)
  expiryDate?: string;
  lotNumber?: string;
}

export interface StockAlert {
  id: string;
  itemId: string;
  sku: string;
  name: string;
  branchId: string;
  branchName: string;
  availableStock: number;
  threshold: number;
  unit: string;
  status: 'open' | 'acknowledged' | 'resolved';
  createdAt: string;
}

export interface ReplenishmentRequest {
  id: string;
  alertId?: string;
  itemId: string;
  sku: string;
  name: string;
  quantity: number;
  unit: string;
  requestedBy: string;
  branchId: string;
  status: 'pending' | 'approved' | 'received';
  createdAt: string;
  notes?: string;
}

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  cost: number;
  inventoryItemId?: string; // ID nguyên vật liệu trong kho nếu liên kết
}

export interface RecipePackagingItem {
  name: string;
  quantity: number;
  cost: number;
  inventoryItemId?: string; // ID bao bì trong kho nếu liên kết
}

export interface RecipeCost {
  productId: string;
  productName: string;
  category: string;
  variant: string;
  sellingPrice: number;
  ingredients: RecipeIngredient[];
  perItemPackaging: RecipePackagingItem[];
  orderPackagingShare: number; // Share of bag, card, sticker per item
  directCost: number; // Ingredients + per-item packaging
  totalCostWithPackaging: number; // directCost + orderPackagingShare
  grossProfit: number;
  profitMarginPercent: number;
  notes?: string;
  updatedAt?: string;
}

export interface CashShift {
  id: string;
  cashierId: string;
  cashierName: string;
  branchId: string;
  branchName: string;
  counterId: string;
  startTime: string;
  endTime?: string;
  openingCash: number;
  cashSales: number;
  cashRefunds: number;
  otherIncome: number;
  otherExpense: number;
  expectedCash: number;
  actualCountedCash?: number;
  discrepancy?: number;
  isClosed: boolean;
  notes?: string;
}

export interface MemberProfile {
  id: string;
  code: string;
  name: string;
  phone: string;
  email?: string;
  dob?: string;
  tier: 'Đồng' | 'Bạc' | 'Vàng' | 'Kim Cương';
  tierPoints: number; // Điểm xét hạng tích lũy 12 tháng
  availablePoints: number; // Điểm khả dụng để đổi quà (reset về 0 sau 6 tháng)
  totalSpent: number;
  totalOrders: number;
  createdAt: string; // Ngày tạo tài khoản
  cycleStartDate: string; // Ngày bắt đầu chu kỳ 6 tháng hiện tại (ngày tạo hoặc ngày reset gần nhất)
  cycleResetDate: string; // Ngày reset điểm về 0 tiếp theo (sau 6 tháng / 180 ngày)
  daysUntilReset: number; // Số ngày còn lại trước khi reset về 0
  smsResetNoticeSent: boolean; // Trạng thái gửi SMS thông báo trước 1 tuần (7 ngày)
  smsResetNoticeDate?: string; // Thời gian đã gửi SMS nhắc nhở
  lastSmsContent?: string; // Nội dung SMS đã gửi
  status: 'active' | 'locked';
  pointHistory: {
    id: string;
    date: string;
    type: 'earn' | 'redeem' | 'refund_deduct' | 'manual_adjust' | 'cycle_reset';
    points: number;
    orderId?: string;
    reason: string;
    actor: string;
  }[];
}

export interface PromotionProgram {
  id: string;
  code?: string;
  title: string;
  type: 'dish_discount' | 'combo' | 'tier_discount' | 'gift';
  conditions: string;
  target: string;
  discountType: 'percentage' | 'fixed_amount';
  discountValue: number;
  minOrderValue?: number;
  applicableBranch?: string;
  budgetTotal: number;
  budgetUsed: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  priority: number;
  updatedAt?: string;
}

export interface VoucherRecord {
  id: string;
  code: string;
  title: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  applicableBranch: string;
  totalQuota: number;
  usedCount: number;
  expiresAt: string;
  status: 'active' | 'paused' | 'expired';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  targetEntity: string;
  targetId: string;
  details: string;
}
