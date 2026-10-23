import React, { useState, useMemo } from 'react';
import { useCRM } from '../../context/CRMContext';
import { InventoryItem, InventoryGroupType, StockLedgerEntry } from '../../types/crm';
import { ReplenishmentModal } from '../../components/crm/ReplenishmentModal';
import {
  Boxes,
  AlertTriangle,
  PackagePlus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Plus,
  Minus,
  FileSpreadsheet,
  Download,
  Upload,
  Edit3,
  Eye,
  Lock,
  ShieldAlert,
  Sparkles,
  X,
  ChevronRight,
  Layers,
  Tag,
  Building2,
  Store,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  FileText,
  Check,
  ShieldCheck,
  Wrench,
  Coffee,
} from 'lucide-react';

const BRANCH_LIST = [
  '15 Hàm Nghi, Q. Thanh Khê',
  '45 Võ Văn Kiệt, Q. Sơn Trà',
  '242 Bạch Đằng, Q. Hải Châu',
  '88 Nguyễn Văn Thoại, Q. Ngũ Hành Sơn',
  '120 Pasteur, Q. Hải Châu',
  'Xưởng bánh trung tâm Bloom Bakery',
];

export const InventoryScreen: React.FC = () => {
  const {
    inventory,
    stockAlerts,
    replenishRequests,
    stockLedgers,
    adjustStock,
    activeStaff,
    quickSwitchRole,
    updateInventoryItem,
    importInventoryItems,
    activeBranch,
  } = useCRM();

  // Active view: Group raw materials vs Tools vs Stock Ledger
  const [activeGroup, setActiveGroup] = useState<InventoryGroupType | 'all' | 'ledger'>('raw_material');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [branchFilter, setBranchFilter] = useState<string>('all');

  // Modals state
  const [modalItem, setModalItem] = useState<InventoryItem | null>(null); // Replenishment request modal
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null); // Full item editor (Role-gated)
  const [adjustingItem, setAdjustingItem] = useState<InventoryItem | null>(null); // Quick delta adjuster
  const [adjustDelta, setAdjustDelta] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>('');

  // Import / Export state
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importCsvText, setImportCsvText] = useState<string>('');
  const [importFeedback, setImportFeedback] = useState<string | null>(null);
  const [editFeedback, setEditFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Stock ledger filters
  const [ledgerItemFilter, setLedgerItemFilter] = useState<string>('all');
  const [ledgerMethodFilter, setLedgerMethodFilter] = useState<string>('all');

  // Check RBAC permission for inventory editor: Only inventory (Thủ kho) or manager (Quản lý)
  const isInventoryManager = activeStaff.role === 'inventory' || activeStaff.role === 'manager';

  // Metrics
  const rawMaterialCount = inventory.filter((i) => i.groupType === 'raw_material').length;
  const toolEquipmentCount = inventory.filter((i) => i.groupType === 'tool_equipment').length;
  const lowStockItems = inventory.filter((i) => i.availableStock < i.lowStockThreshold);
  const overStockItems = inventory.filter(
    (i) => i.maxStockThreshold && i.availableStock > i.maxStockThreshold
  );

  // Filtered inventory items for display
  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      // Group check
      if (activeGroup === 'raw_material' && item.groupType !== 'raw_material') return false;
      if (activeGroup === 'tool_equipment' && item.groupType !== 'tool_equipment') return false;

      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Branch filter check
      if (branchFilter !== 'all') {
        const branches = item.applicableBranches || [item.branchId];
        const matchBranch = branches.some((b) => b.includes(branchFilter) || b.includes('Toàn bộ'));
        if (!matchBranch) return false;
      }

      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSku = item.sku.toLowerCase().includes(q);
        const matchName = item.name.toLowerCase().includes(q);
        const matchBrand = (item.brand || '').toLowerCase().includes(q);
        const matchLoc = (item.location || '').toLowerCase().includes(q);
        const matchDesc = (item.description || '').toLowerCase().includes(q);
        if (!matchSku && !matchName && !matchBrand && !matchLoc && !matchDesc) return false;
      }

      return true;
    });
  }, [inventory, activeGroup, selectedCategory, branchFilter, searchQuery]);

  // Filtered Stock Ledger entries
  const filteredLedgers = useMemo(() => {
    return stockLedgers.filter((ledger) => {
      if (ledgerItemFilter !== 'all' && ledger.itemId !== ledgerItemFilter) return false;
      if (ledgerMethodFilter !== 'all' && ledger.method !== ledgerMethodFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = ledger.id.toLowerCase().includes(q);
        const matchName = ledger.itemName.toLowerCase().includes(q);
        const matchSku = ledger.itemSku.toLowerCase().includes(q);
        const matchActor = ledger.actor.toLowerCase().includes(q);
        const matchNote = (ledger.note || '').toLowerCase().includes(q);
        if (!matchId && !matchName && !matchSku && !matchActor && !matchNote) return false;
      }
      return true;
    });
  }, [stockLedgers, ledgerItemFilter, ledgerMethodFilter, searchQuery]);

  // Quick adjust submit
  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingItem || adjustDelta === 0) return;
    adjustStock(adjustingItem.id, adjustDelta, adjustReason || 'Kiểm kê định kỳ');
    setAdjustingItem(null);
    setAdjustDelta(0);
    setAdjustReason('');
  };

  // Full item edit save (with permission check)
  const handleSaveItemEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const result = updateInventoryItem(editingItem);
    setEditFeedback(result);

    if (result.success) {
      setTimeout(() => {
        setEditingItem(null);
        setEditFeedback(null);
      }, 1200);
    }
  };

  // Toggle applicable branch in editing item
  const toggleBranch = (branchName: string) => {
    if (!editingItem) return;
    const current = editingItem.applicableBranches || [];
    const exists = current.includes(branchName);
    const updated = exists ? current.filter((b) => b !== branchName) : [...current, branchName];
    setEditingItem({
      ...editingItem,
      applicableBranches: updated,
    });
  };

  // Select all or clear branches
  const setAllBranches = (selectAll: boolean) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      applicableBranches: selectAll ? [...BRANCH_LIST] : [],
    });
  };

  // 1. Download Template CSV
  const handleDownloadTemplate = () => {
    const headers = [
      'Mã hàng (SKU)',
      'Tên hàng hóa',
      'Nhóm (raw_material / tool_equipment)',
      'Thương hiệu',
      'Danh mục (ingredient / packaging / tool / product / souvenir)',
      'Đơn vị tính',
      'Quy cách (Size S/M/L...)',
      'Giá vốn (VNĐ)',
      'Tồn thực tế',
      'Định mức tồn tối thiểu',
      'Định mức tồn tối đa',
      'Chi nhánh áp dụng',
      'Mô tả chi tiết',
    ];

    const sampleRows = [
      [
        'NL-TRA-DEN-01',
        'Trà đen Ceylon hảo hạng',
        'raw_material',
        'Dilmah Ceylon',
        'ingredient',
        'gram',
        'Túi 1kg (1.000g)',
        '380000',
        '5000',
        '1000',
        '15000',
        '15 Hàm Nghi; 45 Võ Văn Kiệt',
        'Lá trà đen ủ lên men vùng đồi Ceylon, hương hoa mật ong đặc trưng',
      ],
      [
        'BB-CUP-360',
        'Ly giấy Kraft Bloom 360ml',
        'raw_material',
        'Bao Bì Xanh Đà Nẵng',
        'packaging',
        'cái',
        'Size S (360ml)',
        '850',
        '450',
        '100',
        '2500',
        'Toàn bộ chi nhánh',
        'Ly giấy chịu nhiệt tráng sáp thực phẩm an toàn',
      ],
      [
        'CC-TAMPER-58',
        'Tamper nén cà phê đáy phẳng 58.5mm',
        'tool_equipment',
        'Barista Space',
        'tool',
        'chiếc',
        'Size 58.5mm',
        '450000',
        '6',
        '2',
        '12',
        '15 Hàm Nghi; 242 Bạch Đằng',
        'Tay nén trợ lực lò xo phản hồi chuẩn áp lực 30 lbs',
      ],
    ];

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...sampleRows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'mau_import_kho_summer_cafe.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 2. Export Current Inventory CSV
  const handleExportInventory = () => {
    const headers = [
      'Mã hàng (SKU)',
      'Tên hàng hóa',
      'Nhóm quản lý',
      'Thương hiệu',
      'Đơn vị tính',
      'Size / Quy cách',
      'Giá vốn (VNĐ)',
      'Tồn thực tế',
      'Tồn khả dụng',
      'Định mức tồn tối thiểu',
      'Định mức tồn tối đa',
      'Chi nhánh áp dụng',
      'Mô tả chi tiết',
    ];

    const rows = filteredItems.map((item) => [
      item.sku,
      item.name,
      item.groupType === 'raw_material' ? 'Nguyên vật liệu' : 'Công cụ dụng cụ',
      item.brand || '---',
      item.unit,
      item.unitSize || 'Tiêu chuẩn',
      item.costPerUnit,
      item.actualStock,
      item.availableStock,
      item.lowStockThreshold,
      item.maxStockThreshold || 1000,
      (item.applicableBranches || []).join('; ') || item.branchId,
      item.description || '',
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `danh_sach_kho_summer_cafe_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 3. Import parsed CSV
  const handleExecuteImport = () => {
    if (!importCsvText.trim()) {
      setImportFeedback('Vui lòng dán nội dung CSV hoặc chọn file.');
      return;
    }

    try {
      const lines = importCsvText.trim().split('\n');
      if (lines.length < 2) {
        setImportFeedback('Dữ liệu file không hợp lệ (cần ít nhất dòng tiêu đề và 1 dòng dữ liệu).');
        return;
      }

      const newItems: InventoryItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV splitter handling quotes
        const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
        const matches: string[] = [];
        let match;
        while ((match = regex.exec(line)) !== null && matches.length < 13) {
          let val = match[1] || '';
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1).replace(/""/g, '"');
          }
          matches.push(val.trim());
          if (regex.lastIndex >= line.length) break;
        }

        if (matches.length >= 4) {
          const sku = matches[0] || `SKU-${Date.now()}-${i}`;
          const name = matches[1] || `Hàng nhập ${i}`;
          const rawGroup = matches[2]?.toLowerCase() || '';
          const groupType: InventoryGroupType =
            rawGroup.includes('tool') || rawGroup.includes('công cụ') ? 'tool_equipment' : 'raw_material';
          const brand = matches[3] || 'Bloom Partner';
          const categoryRaw = matches[4]?.toLowerCase() || 'ingredient';
          const category = ['packaging', 'tool', 'product', 'souvenir'].includes(categoryRaw)
            ? (categoryRaw as any)
            : 'ingredient';
          const unit = matches[5] || 'cái';
          const unitSize = matches[6] || 'Tiêu chuẩn';
          const costPerUnit = Number(matches[7]) || 10000;
          const actualStock = Number(matches[8]) || 100;
          const lowStockThreshold = Number(matches[9]) || 50;
          const maxStockThreshold = Number(matches[10]) || 500;
          const branchesStr = matches[11] || '15 Hàm Nghi, Q. Thanh Khê';
          const description = matches[12] || 'Hàng nhập khẩu quản lý kho';

          newItems.push({
            id: 'inv-imp-' + Date.now() + '-' + i,
            sku,
            name,
            category,
            groupType,
            brand,
            unit,
            unitSize,
            standardUnit: unit,
            conversionFactor: 1,
            availableStock: actualStock,
            reservedStock: 0,
            actualStock,
            lowStockThreshold,
            maxStockThreshold,
            costPerUnit,
            supplier: brand,
            location: 'Kho tổng Chi nhánh',
            branchId: 'br-hamnghi',
            applicableBranches: branchesStr.split(';').map((s) => s.trim()),
            description,
          });
        }
      }

      if (newItems.length === 0) {
        setImportFeedback('Không đọc được dữ liệu mặt hàng hợp lệ từ nội dung cung cấp.');
        return;
      }

      const result = importInventoryItems(newItems);
      setImportFeedback(`Thành công! Đã thêm mới ${result.count} mặt hàng và cập nhật ${result.updated} mặt hàng.`);
      setTimeout(() => {
        setShowImportModal(false);
        setImportCsvText('');
        setImportFeedback(null);
      }, 1500);
    } catch (err: any) {
      setImportFeedback('Lỗi xử lý file: ' + (err.message || 'Cấu trúc CSV không đúng mẫu'));
    }
  };

  // Handle file input upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportCsvText(content || '');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Spec §16 & Warehouse Alerts: Low Stock & Overstock */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-500 text-white p-4 sm:p-5 rounded-2xl shadow-md space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wide flex items-center gap-2">
                  Cảnh Báo Tồn Kho Khả Dụng Dưới Ngưỡng An Toàn (Spec §16)
                  <span className="px-2 py-0.5 bg-red-600 text-white text-[11px] font-bold rounded-full">
                    {lowStockItems.length} mặt hàng
                  </span>
                </h3>
                <p className="text-xs text-amber-100">
                  Tồn khả dụng &lt; định mức tối thiểu. Đề nghị Thủ kho hoặc Quản lý lập phiếu đề xuất nhập hàng ngay.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveGroup('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              Xem toàn bộ mặt hàng thiếu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {lowStockItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-white line-clamp-1">{item.name}</div>
                  <div className="text-[11px] text-amber-100">
                    SKU: {item.sku} • Tồn: <strong className="text-white font-mono text-sm">{item.availableStock}</strong> / {item.lowStockThreshold} {item.unit}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/20 font-semibold inline-block">
                    {item.groupType === 'raw_material' ? 'Nguyên vật liệu' : 'Công cụ dụng cụ'}
                  </span>
                </div>

                <button
                  onClick={() => setModalItem(item)}
                  className="px-2.5 py-1.5 bg-white text-amber-900 hover:bg-amber-100 rounded-lg font-bold text-xs shrink-0 ml-2 shadow-xs transition-colors"
                >
                  Tạo Đề Nghị
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Primary Navigation & Warehouse Groups */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        {/* Top Header & Group Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-stone-900">
                  Quản Lý Kho, Phân Nhóm & Thẻ Kho Vật Tư
                </h2>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-stone-100 text-stone-700">
                  Chi nhánh: {activeBranch.split(',')[0]}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Phân loại Nguyên vật liệu & Công cụ dụng cụ • Quản lý giá vốn, size S/M/L, định mức min/max và Thẻ kho
              </p>
            </div>
          </div>

          {/* Action Buttons: Tải file mẫu, Xuất Excel/CSV, Import file */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadTemplate}
              title="Tải file mẫu CSV có sẵn cấu trúc cột để nhập liệu hàng loạt"
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Tải File Mẫu
            </button>

            <button
              onClick={handleExportInventory}
              title="Xuất danh sách tồn kho hiện tại ra file CSV"
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-primary" />
              Xuất File CSV
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              title="Nhập hàng loạt từ file CSV/Excel vào hệ thống"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <Upload className="w-4 h-4 text-white" />
              Import Dữ Liệu
            </button>
          </div>
        </div>

        {/* Group Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl">
            {/* Nguyên vật liệu */}
            <button
              onClick={() => {
                setActiveGroup('raw_material');
                setSelectedCategory('all');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeGroup === 'raw_material'
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Coffee className="w-4 h-4 text-amber-600" />
              <span>Nguyên Vật Liệu</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-stone-100 text-stone-800">
                {rawMaterialCount}
              </span>
            </button>

            {/* Công cụ dụng cụ */}
            <button
              onClick={() => {
                setActiveGroup('tool_equipment');
                setSelectedCategory('all');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeGroup === 'tool_equipment'
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Công Cụ Dụng Cụ</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-stone-100 text-stone-800">
                {toolEquipmentCount}
              </span>
            </button>

            {/* Thẻ kho */}
            <button
              onClick={() => setActiveGroup('ledger')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeGroup === 'ledger'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-4 h-4 text-stone-700" />
              <span>Thẻ Kho (Nhập/Xuất/Tồn Cuối)</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-stone-200 text-stone-700 font-mono">
                {stockLedgers.length}
              </span>
            </button>

            {/* Toàn bộ kho */}
            <button
              onClick={() => {
                setActiveGroup('all');
                setSelectedCategory('all');
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeGroup === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Tất cả ({inventory.length})
            </button>
          </div>

          {/* Role status pill with quick role toggle info */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 ${
                isInventoryManager
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              {isInventoryManager ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">Đủ quyền sửa kho:</span> {activeStaff.name} ({activeStaff.roleName})
                  </div>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold">Chỉ xem:</span> {activeStaff.roleName} (Chỉ Quản lý kho mới được sửa)
                  </div>
                  <button
                    onClick={() => quickSwitchRole('inventory')}
                    className="ml-1 underline font-bold hover:text-amber-950"
                  >
                    Chuyển sang Thủ kho
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search & Sub-category Filters (for inventory lists) */}
        {activeGroup !== 'ledger' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 text-xs">
            {/* Search input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm mã SKU, tên hàng, thương hiệu, vị trí kho..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-xl bg-stone-50 focus:bg-white focus:outline-hidden focus:border-primary text-xs"
              />
            </div>

            {/* Category tabs */}
            <div className="md:col-span-4 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Tất cả loại
              </button>
              {activeGroup === 'raw_material' ? (
                <>
                  <button
                    onClick={() => setSelectedCategory('ingredient')}
                    className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                      selectedCategory === 'ingredient'
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Nguyên liệu pha chế
                  </button>
                  <button
                    onClick={() => setSelectedCategory('packaging')}
                    className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                      selectedCategory === 'packaging'
                        ? 'bg-primary text-white font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Vật tư bao bì (Ly/Nắp/Túi)
                  </button>
                  <button
                    onClick={() => setSelectedCategory('product')}
                    className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                      selectedCategory === 'product'
                        ? 'bg-stone-800 text-white font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Bánh & Cốt bánh
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedCategory('tool')}
                    className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                      selectedCategory === 'tool'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Dụng cụ & Máy móc
                  </button>
                  <button
                    onClick={() => setSelectedCategory('souvenir')}
                    className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                      selectedCategory === 'souvenir'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Lưu niệm & Quà tặng
                  </button>
                </>
              )}
            </div>

            {/* Branch selector */}
            <div className="md:col-span-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-stone-400 shrink-0" />
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 border rounded-xl bg-stone-50 text-xs focus:outline-hidden focus:border-primary"
              >
                <option value="all">Tất cả chi nhánh</option>
                <option value="15 Hàm Nghi">15 Hàm Nghi (Thanh Khê)</option>
                <option value="45 Võ Văn Kiệt">45 Võ Văn Kiệt (Sơn Trà)</option>
                <option value="242 Bạch Đằng">242 Bạch Đằng (Hải Châu)</option>
                <option value="88 Nguyễn Văn Thoại">88 Nguyễn Văn Thoại</option>
                <option value="Xưởng bánh">Xưởng bánh trung tâm</option>
              </select>
            </div>
          </div>
        )}

        {/* Search for Thẻ Kho mode */}
        {activeGroup === 'ledger' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 text-xs">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm mã phiếu, tên hàng hóa, người lập phiếu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-xl bg-stone-50 focus:outline-hidden focus:border-primary text-xs"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={ledgerItemFilter}
                onChange={(e) => setLedgerItemFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-stone-50 text-xs focus:outline-hidden focus:border-primary"
              >
                <option value="all">Tất cả mặt hàng trong kho</option>
                {inventory.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    [{inv.sku}] {inv.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={ledgerMethodFilter}
                onChange={(e) => setLedgerMethodFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-stone-50 text-xs focus:outline-hidden focus:border-primary"
              >
                <option value="all">Tất cả phương thức</option>
                <option value="import_supplier">Nhập mua nhà cung cấp</option>
                <option value="export_production">Xuất quầy Bar / Bếp bánh</option>
                <option value="export_waste">Xuất hao hụt / Hỏng hóc</option>
                <option value="stock_take_adjust">Kiểm kê chênh lệch</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeGroup === 'ledger' ? (
        /* ==================== THẺ KHO (STOCK LEDGER) ==================== */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden space-y-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Sổ Thẻ Kho Điện Tử - Theo Dõi Chi Tiết Nhập, Xuất & Tồn Cuối
              </h3>
              <p className="text-xs text-stone-500">
                Hiển thị từng biến động theo mã phiếu, thời gian, giá vốn nhập vào, số lượng biến động và số tồn cuối sau phát sinh.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">
                Tìm thấy <strong>{filteredLedgers.length}</strong> chứng từ
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-3">Mã Phiếu</th>
                  <th className="py-3 px-3">Thời Gian</th>
                  <th className="py-3 px-3">Mặt Hàng (SKU & Tên)</th>
                  <th className="py-3 px-3">Phương Thức</th>
                  <th className="py-3 px-3 text-right">Giá Vốn Nhập</th>
                  <th className="py-3 px-3 text-right">Số Lượng</th>
                  <th className="py-3 px-3 text-right">Tồn Cuối (Sau giao dịch)</th>
                  <th className="py-3 px-3 text-center">ĐVT</th>
                  <th className="py-3 px-3">Chi Nhánh & Người Lập</th>
                  <th className="py-3 px-3">Ghi Chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-normal">
                {filteredLedgers.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-stone-400">
                      Không có lịch sử biến động kho nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredLedgers.map((entry) => {
                    const isPositive = entry.quantityDelta > 0;
                    return (
                      <tr key={entry.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-stone-900 whitespace-nowrap">
                          {entry.id}
                        </td>

                        <td className="py-3 px-3 text-stone-600 whitespace-nowrap">
                          {entry.timestamp}
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-bold text-stone-900">{entry.itemName}</div>
                          <div className="text-[10px] text-stone-500 font-mono">{entry.itemSku}</div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              entry.method === 'import_supplier'
                                ? 'bg-emerald-100 text-emerald-800'
                                : entry.method === 'export_production'
                                ? 'bg-blue-100 text-blue-800'
                                : entry.method === 'export_waste'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {entry.methodLabel}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right font-mono text-stone-700 whitespace-nowrap">
                          {entry.unitCost.toLocaleString('vi-VN')} đ
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-bold whitespace-nowrap">
                          <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
                            {isPositive ? `+${entry.quantityDelta}` : entry.quantityDelta}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-extrabold text-stone-900 bg-stone-50/50 whitespace-nowrap">
                          {entry.balanceAfter.toLocaleString('vi-VN')}
                        </td>

                        <td className="py-3 px-3 text-center text-stone-600 font-medium whitespace-nowrap">
                          {entry.unit}
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="text-stone-800 font-medium">{entry.actor}</div>
                          <div className="text-[10px] text-stone-400">{entry.branchName.split(',')[0]}</div>
                        </td>

                        <td className="py-3 px-3 text-stone-500 text-[11px] max-w-xs truncate" title={entry.note}>
                          {entry.note || '---'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ==================== DANH SÁCH MẶT HÀNG KHO ==================== */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Ảnh & Mã SKU</th>
                  <th className="py-3 px-4">Tên Hàng & Thương Hiệu</th>
                  <th className="py-3 px-4">Nhóm & Phân Loại</th>
                  <th className="py-3 px-4 text-center">Đơn Vị & Quy Cách</th>
                  <th className="py-3 px-4 text-right">Tồn Thực</th>
                  <th className="py-3 px-4 text-right">Tồn Khả Dụng</th>
                  <th className="py-3 px-4 text-center">Định Mức Min / Max</th>
                  <th className="py-3 px-4 text-right">Giá Vốn</th>
                  <th className="py-3 px-4">Chi Nhánh Áp Dụng</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-stone-400">
                      Không tìm thấy mặt hàng nào phù hợp với điều kiện tìm kiếm.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const isUnderMin = item.availableStock < item.lowStockThreshold;
                    const isOverMax = item.maxStockThreshold && item.availableStock > item.maxStockThreshold;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-stone-50/80 transition-colors ${
                          isUnderMin ? 'bg-amber-50/50' : ''
                        }`}
                      >
                        {/* Ảnh & SKU */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                item.image ||
                                'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&q=80'
                              }
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-100"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&q=80';
                              }}
                            />
                            <div>
                              <div className="font-mono font-bold text-stone-900">{item.sku}</div>
                              <div className="text-[10px] text-stone-400">{item.location}</div>
                            </div>
                          </div>
                        </td>

                        {/* Tên & Brand */}
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-bold text-stone-900 leading-tight line-clamp-1">{item.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Tag className="w-3 h-3 text-stone-400" />
                            <span className="text-[11px] font-semibold text-primary">
                              {item.brand || 'Bloom Cake & Coffe'}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5" title={item.description}>
                              {item.description}
                            </p>
                          )}
                        </td>

                        {/* Nhóm & Phân Loại */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.groupType === 'raw_material'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-blue-100 text-blue-900'
                              }`}
                            >
                              {item.groupType === 'raw_material' ? 'Nguyên vật liệu' : 'Công cụ dụng cụ'}
                            </span>
                            <div className="text-[10px] text-stone-500">
                              {item.category === 'packaging'
                                ? 'Bao bì (Ly/Nắp/Túi)'
                                : item.category === 'ingredient'
                                ? 'Nguyên liệu pha chế'
                                : item.category === 'product'
                                ? 'Bánh thành phẩm'
                                : item.category === 'tool'
                                ? 'Dụng cụ quầy'
                                : 'Hàng lưu niệm'}
                            </div>
                          </div>
                        </td>

                        {/* Đơn vị & Quy cách (Size S/M/L) */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="font-bold text-stone-800">{item.unit}</div>
                          <div className="text-[10px] text-stone-500 font-medium">
                            {item.unitSize || 'Tiêu chuẩn'}
                          </div>
                        </td>

                        {/* Tồn thực */}
                        <td className="py-3 px-4 text-right font-mono text-stone-600 whitespace-nowrap">
                          {item.actualStock.toLocaleString('vi-VN')}
                        </td>

                        {/* Tồn khả dụng */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div
                            className={`font-mono font-bold text-sm ${
                              isUnderMin ? 'text-rose-600' : 'text-emerald-700'
                            }`}
                          >
                            {item.availableStock.toLocaleString('vi-VN')}
                          </div>
                          {item.reservedStock > 0 && (
                            <div className="text-[10px] text-stone-400">
                              (giữ: {item.reservedStock})
                            </div>
                          )}
                        </td>

                        {/* Định mức Min / Max */}
                        <td className="py-3 px-4 text-center whitespace-nowrap font-mono text-stone-600">
                          <div className="text-xs">
                            <span className="font-semibold text-rose-700">{item.lowStockThreshold}</span>
                            {' / '}
                            <span className="text-stone-500">{item.maxStockThreshold || '---'}</span>
                          </div>
                          {isUnderMin && (
                            <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 bg-red-100 text-red-800 rounded">
                              DƯỚI MIN
                            </span>
                          )}
                          {isOverMax && (
                            <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                              VƯỢT MAX
                            </span>
                          )}
                        </td>

                        {/* Giá vốn */}
                        <td className="py-3 px-4 text-right font-mono font-medium text-stone-800 whitespace-nowrap">
                          {item.costPerUnit.toLocaleString('vi-VN')} đ
                        </td>

                        {/* Chi nhánh áp dụng */}
                        <td className="py-3 px-4 text-stone-600 max-w-xs">
                          <div className="text-[11px] line-clamp-1" title={(item.applicableBranches || []).join(', ')}>
                            {item.applicableBranches && item.applicableBranches.length > 0
                              ? item.applicableBranches.join(', ')
                              : 'Toàn bộ chi nhánh'}
                          </div>
                        </td>

                        {/* Thao tác */}
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          {/* Sửa thông tin hàng (Chỉ Quản lý kho mới được sửa) */}
                          <button
                            onClick={() => {
                              setEditingItem({ ...item });
                              setEditFeedback(null);
                            }}
                            title="Chỉnh sửa thông tin hàng, giá vốn, định mức tồn min/max, size và chi nhánh"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-stone-600" />
                            Sửa
                          </button>

                          {/* Chỉnh nhanh số lượng */}
                          <button
                            onClick={() => setAdjustingItem(item)}
                            className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs rounded-lg"
                            title="Điều chỉnh tăng/giảm tồn kho nhanh"
                          >
                            ± Tồn
                          </button>

                          {/* Đề nghị nhập */}
                          <button
                            onClick={() => setModalItem(item)}
                            className="px-2.5 py-1 bg-primary hover:bg-primary-dim text-white text-xs font-semibold rounded-lg shadow-2xs"
                          >
                            Nhập
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== PHIẾU ĐỀ NGHỊ NHẬP HÀNG GẦN ĐÂY ==================== */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Phiếu Đề Nghị Nhập Hàng Gần Đây ({replenishRequests.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b text-stone-500 text-[11px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Mã đề nghị</th>
                <th className="py-2.5 px-3">Mặt hàng</th>
                <th className="py-2.5 px-3 text-right">Số lượng</th>
                <th className="py-2.5 px-3">Người đề nghị</th>
                <th className="py-2.5 px-3">Thời gian</th>
                <th className="py-2.5 px-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {replenishRequests.map((req) => (
                <tr key={req.id}>
                  <td className="py-2.5 px-3 font-mono font-bold text-stone-900">{req.id}</td>
                  <td className="py-2.5 px-3 font-medium text-stone-800">{req.name}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-primary">
                    +{req.quantity} {req.unit}
                  </td>
                  <td className="py-2.5 px-3 text-stone-600">{req.requestedBy}</td>
                  <td className="py-2.5 px-3 text-stone-500">{req.createdAt}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                      Chờ duyệt nhập
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== MODAL CHỈNH SỬA NGUYÊN VẬT LIỆU / CÔNG CỤ (RBAC GATED) ==================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Edit3 className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Chỉnh Sửa Mặt Hàng Kho</h3>
                  <p className="text-xs text-stone-400">
                    Phần quyền hạn: Chỉ Quản lý kho / Thủ kho mới có quyền lưu chỉnh sửa
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Permission Banner Warning if unauthorized */}
            {!isInventoryManager && (
              <div className="p-4 bg-rose-50 border-b border-rose-200 flex items-start gap-3 text-xs text-rose-900">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Giới Hạn Quyền Hạn (RBAC): Bạn Không Thể Lưu Thay Đổi</div>
                  <p>
                    Bạn đang đăng nhập với tài khoản: <strong>{activeStaff.name}</strong> ({activeStaff.roleName}).
                    Theo quy chuẩn phân quyền, chỉ Quản lý kho (Lê Văn Khoa) hoặc Quản lý chi nhánh mới được phép sửa đổi danh mục, giá vốn và định mức tồn.
                  </p>
                  <button
                    type="button"
                    onClick={() => quickSwitchRole('inventory')}
                    className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Chuyển sang tài khoản Thủ Kho (Lê Văn Khoa)
                  </button>
                </div>
              </div>
            )}

            {/* Feedback alert */}
            {editFeedback && (
              <div
                className={`p-3 text-xs font-bold flex items-center gap-2 ${
                  editFeedback.success ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                }`}
              >
                {editFeedback.success ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {editFeedback.message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveItemEdit} className="p-4 sm:p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
              {/* Nhóm & Mã hàng & Tên hàng */}
              <div className="space-y-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  1. Thông tin định danh & Phân nhóm
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Nhóm quản lý: Nguyên vật liệu / Công cụ dụng cụ */}
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Nhóm quản lý: <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={editingItem.groupType}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          groupType: e.target.value as InventoryGroupType,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-xl bg-white font-bold"
                    >
                      <option value="raw_material">Nguyên vật liệu (Tiêu hao, đóng gói, chế biến)</option>
                      <option value="tool_equipment">Công cụ dụng cụ (Máy móc, ca đong, khuôn, dụng cụ)</option>
                    </select>
                  </div>

                  {/* Thuộc thương hiệu nào */}
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Thuộc thương hiệu / Hãng sản xuất: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingItem.brand || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, brand: e.target.value })}
                      placeholder="VD: Elle & Vire, Haru Uji, Sanremo, Dalat Milk, Bao Bì Xanh..."
                      className="w-full px-3 py-2 border rounded-xl bg-white"
                      required
                    />
                  </div>

                  {/* Mã hàng (SKU) */}
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Mã hàng (SKU): <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingItem.sku}
                      onChange={(e) => setEditingItem({ ...editingItem, sku: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold"
                      required
                    />
                  </div>

                  {/* Phân loại category */}
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Phân loại danh mục:
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-xl bg-white"
                    >
                      <option value="ingredient">Nguyên liệu pha chế & nấu nướng</option>
                      <option value="packaging">Bao bì vật tư (Ly, nắp, ống hút, túi)</option>
                      <option value="product">Thành phẩm bánh nướng & đồ uống</option>
                      <option value="tool">Dụng cụ & Thiết bị máy móc quầy Bar</option>
                      <option value="souvenir">Hàng lưu niệm & Merchandise</option>
                    </select>
                  </div>

                  {/* Tên hàng */}
                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 font-semibold mb-1">
                      Tên hàng hóa: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl bg-white font-bold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Giá vốn & Ảnh minh họa */}
              <div className="space-y-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  2. Giá vốn & Ảnh đại diện
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Giá vốn nhập vào (VNĐ): <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={editingItem.costPerUnit || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, costPerUnit: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold text-stone-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Vị trí lưu kho / Ngăn kệ:
                    </label>
                    <input
                      type="text"
                      value={editingItem.location || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                      placeholder="VD: Kệ A-01 Kho Chi Nhánh"
                      className="w-full px-3 py-2 border rounded-xl bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-3">
                    <img
                      src={
                        editingItem.image ||
                        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&q=80'
                      }
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-300 shrink-0 bg-stone-200"
                    />
                    <div className="grow">
                      <label className="block text-stone-700 font-semibold mb-1">
                        URL Ảnh minh họa:
                      </label>
                      <input
                        type="url"
                        value={editingItem.image || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 border rounded-xl bg-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quản lý Tồn của kho (đang tồn bao nhiêu, định mức tồn min/max) */}
              <div className="space-y-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
                  3. Quản lý tồn kho & Ngưỡng định mức cảnh báo
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Tồn thực tế hiện tại: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={editingItem.actualStock}
                      onChange={(e) => {
                        const val = Math.max(0, Number(e.target.value));
                        setEditingItem({
                          ...editingItem,
                          actualStock: val,
                          availableStock: Math.max(0, val - (editingItem.reservedStock || 0)),
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold text-stone-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Định mức tồn thấp nhất (Min): <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={editingItem.lowStockThreshold}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          lowStockThreshold: Math.max(0, Number(e.target.value)),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold text-rose-700"
                      required
                    />
                    <span className="text-[10px] text-stone-400">Cảnh báo nếu tồn &lt; số này</span>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Định mức tồn cao nhất (Max):
                    </label>
                    <input
                      type="number"
                      value={editingItem.maxStockThreshold || 1000}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          maxStockThreshold: Math.max(0, Number(e.target.value)),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold text-stone-800"
                    />
                    <span className="text-[10px] text-stone-400">Tránh tồn vượt sức chứa</span>
                  </div>
                </div>
              </div>

              {/* Quản lý theo đơn vị (size S/M/L, đơn vị cốc, set hay thùng/kg/gram) */}
              <div className="space-y-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  4. Quản lý theo Đơn vị tính & Size / Quy cách
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Đơn vị tính cơ sở: <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={editingItem.unit}
                      onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value, standardUnit: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl bg-white font-bold"
                    >
                      <option value="cốc">cốc / ly</option>
                      <option value="set">set / combo</option>
                      <option value="thùng">thùng</option>
                      <option value="kg">kg (kilogram)</option>
                      <option value="gram">gram (g)</option>
                      <option value="cái">cái / chiếc</option>
                      <option value="hộp">hộp / lon</option>
                      <option value="chai">chai / bình</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Size hoặc Quy cách đóng gói:
                    </label>
                    <input
                      type="text"
                      value={editingItem.unitSize || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, unitSize: e.target.value })}
                      placeholder="VD: Size S (360ml), Size M (500ml), Size L, Hộp 1kg..."
                      className="w-full px-3 py-2 border rounded-xl bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết nguyên vật liệu */}
              <div className="space-y-2 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <label className="block text-stone-900 font-bold text-xs uppercase tracking-wider">
                  5. Mô tả chi tiết nguyên vật liệu / công cụ
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Ghi rõ nguồn gốc xuất xứ, thông số kỹ thuật, quy trình bảo quản..."
                  className="w-full px-3 py-2 border rounded-xl bg-white text-xs"
                />
              </div>

              {/* Các chi nhánh sử dụng */}
              <div className="space-y-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-primary" />
                    6. Các chi nhánh sử dụng mặt hàng này
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAllBranches(true)}
                      className="text-[11px] text-primary hover:underline font-bold"
                    >
                      Chọn tất cả
                    </button>
                    <span className="text-stone-300">|</span>
                    <button
                      type="button"
                      onClick={() => setAllBranches(false)}
                      className="text-[11px] text-stone-500 hover:underline"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {BRANCH_LIST.map((branch) => {
                    const isChecked = (editingItem.applicableBranches || []).includes(branch);
                    return (
                      <label
                        key={branch}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-colors ${
                          isChecked ? 'bg-primary/5 border-primary/40 text-stone-900' : 'bg-white border-stone-200 text-stone-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBranch(branch)}
                          className="w-4 h-4 text-primary rounded-md"
                        />
                        <span className="text-xs font-medium">{branch}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border rounded-xl text-stone-600 hover:bg-stone-50 font-bold"
                >
                  Đóng
                </button>

                <button
                  type="submit"
                  disabled={!isInventoryManager}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white shadow-md transition-all flex items-center gap-2 ${
                    isInventoryManager
                      ? 'bg-primary hover:bg-primary-dim'
                      : 'bg-stone-300 cursor-not-allowed text-stone-500'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {isInventoryManager ? 'Lưu Thay Đổi Thông Số' : 'Khóa Quyền (Chỉ Thủ Kho)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL IMPORT DỮ LIỆU KHO ==================== */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base text-stone-900">
                  Import Dữ Liệu Kho Từ Bảng Tính (CSV/Excel)
                </h3>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Bạn có thể tải lên file .csv đã chỉnh sửa theo file mẫu của Bloom Cake &amp; Coffe, hoặc dán trực tiếp nội dung văn bản CSV vào ô bên dưới.
            </p>

            {/* File uploader */}
            <div className="p-4 border-2 border-dashed border-stone-300 hover:border-primary rounded-xl text-center space-y-2 bg-stone-50/50">
              <input
                type="file"
                accept=".csv,text/csv"
                id="csvFileInput"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="csvFileInput"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold rounded-xl shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Chọn File .CSV Từ Máy Tính
              </label>
              <div className="text-[11px] text-stone-400">Hỗ trợ file UTF-8 chuẩn định dạng dấu phẩy (,)</div>
            </div>

            {/* Direct Paste Area */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Hoặc dán nội dung CSV trực tiếp vào đây:
              </label>
              <textarea
                rows={6}
                value={importCsvText}
                onChange={(e) => setImportCsvText(e.target.value)}
                placeholder={`Mã hàng (SKU),Tên hàng hóa,Nhóm,Thương hiệu,Danh mục,Đơn vị,Quy cách,Giá vốn,Tồn thực tế,Min,Max,Chi nhánh,Mô tả\nNL-TRA-01,Trà Lài Bảo Lộc,raw_material,Bảo Lộc Farm,ingredient,kg,Gói 1kg,150000,20,5,50,Toàn bộ chi nhánh,Trà lài ướp bông tươi`}
                className="w-full p-3 border rounded-xl font-mono text-[11px] bg-stone-50 text-stone-800 focus:bg-white"
              />
            </div>

            {importFeedback && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold">
                {importFeedback}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                Chưa có mẫu? Tải file mẫu tại đây
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-3.5 py-2 text-stone-600 text-xs font-bold"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleExecuteImport}
                  className="px-5 py-2 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Xác Nhận Nạp Dữ Liệu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replenishment Modal */}
      {modalItem && <ReplenishmentModal item={modalItem} onClose={() => setModalItem(null)} />}

      {/* Stock Adjustment Modal */}
      {adjustingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-sm text-stone-900">Điều Chỉnh Tồn Kho Thủ Công</h3>
            <div className="text-xs text-stone-600">
              Mặt hàng: <strong>{adjustingItem.name}</strong> ({adjustingItem.unit}) • Tồn hiện tại:{' '}
              <span className="font-mono font-bold text-stone-900">{adjustingItem.availableStock}</span>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 font-semibold">
                  Số lượng thay đổi (+ để cộng thêm, - để trừ bớt):
                </label>
                <input
                  type="number"
                  value={adjustDelta || ''}
                  onChange={(e) => setAdjustDelta(Number(e.target.value))}
                  placeholder="VD: -5 hoặc +50"
                  className="w-full mt-1 px-3 py-2 border rounded-xl font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-stone-600 font-semibold">Lý do điều chỉnh (lưu Thẻ kho & Audit):</label>
                <input
                  type="text"
                  placeholder="Kiểm kê chênh lệch, đổ vỡ, điều chuyển..."
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAdjustingItem(null)}
                  className="px-3 py-1.5 text-stone-600 font-bold"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-1.5 bg-primary text-white font-bold rounded-xl shadow-xs">
                  Lưu & Ghi Thẻ Kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
