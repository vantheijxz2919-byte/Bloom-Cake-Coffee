import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { RecipeCost, RecipeIngredient, RecipePackagingItem } from '../../types/crm';
import {
  Calculator,
  Plus,
  Edit3,
  Trash2,
  Layers,
  PackageCheck,
  Search,
  Filter,
  CheckCircle2,
  X,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Percent,
  Warehouse,
  Info,
} from 'lucide-react';

export const RecipeCostScreen: React.FC = () => {
  const { recipeCosts, addRecipeCost, updateRecipeCost, deleteRecipeCost, inventory, activeStaff } = useCRM();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<RecipeCost | null>(null);

  // Form State
  const [formProductId, setFormProductId] = useState('');
  const [formProductName, setFormProductName] = useState('');
  const [formCategory, setFormCategory] = useState('Đồ uống pha chế');
  const [formVariant, setFormVariant] = useState('Size Tiêu chuẩn');
  const [formSellingPrice, setFormSellingPrice] = useState<number>(55000);
  const [formIngredients, setFormIngredients] = useState<RecipeIngredient[]>([]);
  const [formPackaging, setFormPackaging] = useState<RecipePackagingItem[]>([]);
  const [formOrderPackagingShare, setFormOrderPackagingShare] = useState<number>(1100);
  const [formNotes, setFormNotes] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Extract raw materials & packaging from inventory
  const rawMaterials = inventory.filter(
    (i) => i.groupType === 'raw_material' || i.category === 'ingredient'
  );
  const packagingMaterials = inventory.filter(
    (i) => i.category === 'packaging' || i.sku.startsWith('BB-')
  );

  // Categories list
  const categories = ['all', ...Array.from(new Set(recipeCosts.map((r) => r.category)))];

  // Filtered recipe list
  const filteredRecipes = recipeCosts.filter((r) => {
    const matchCat = selectedCategory === 'all' || r.category === selectedCategory;
    const matchSearch =
      r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.variant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.ingredients.some((ing) => ing.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Overview Metrics
  const totalRecipes = recipeCosts.length;
  const avgMargin =
    totalRecipes > 0
      ? (recipeCosts.reduce((acc, r) => acc + r.profitMarginPercent, 0) / totalRecipes).toFixed(1)
      : '0';
  const avgTotalCost =
    totalRecipes > 0
      ? Math.round(recipeCosts.reduce((acc, r) => acc + r.totalCostWithPackaging, 0) / totalRecipes)
      : 0;
  const avgFoodCost =
    totalRecipes > 0
      ? (
          recipeCosts.reduce((acc, r) => acc + (r.directCost / (r.sellingPrice || 1)) * 100, 0) /
          totalRecipes
        ).toFixed(1)
      : '0';

  // Open Modal for New Recipe
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setActiveRecipe(null);
    setFormProductId('prod-' + Date.now());
    setFormProductName('');
    setFormCategory('Đồ uống pha chế');
    setFormVariant('Size M (500ml)');
    setFormSellingPrice(45000);
    setFormIngredients([
      { name: 'Sữa tươi Dalat Milk', amount: 120, unit: 'ml', cost: 3600, inventoryItemId: 'inv-ing-milk-dalat' },
      { name: 'Cà phê Robusta mộc', amount: 20, unit: 'g', cost: 2400, inventoryItemId: 'inv-ing-coffee-salt' },
    ]);
    setFormPackaging([
      { name: 'Ly giấy Kraft tráng PE 500ml', quantity: 1, cost: 1000, inventoryItemId: 'inv-cup-500' },
      { name: 'Nắp nhựa PP 500ml', quantity: 1, cost: 300 },
      { name: 'Ống hút giấy / gạo', quantity: 1, cost: 200 },
    ]);
    setFormOrderPackagingShare(1100);
    setFormNotes('');
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleOpenEditModal = (recipe: RecipeCost) => {
    setIsEditing(true);
    setActiveRecipe(recipe);
    setFormProductId(recipe.productId);
    setFormProductName(recipe.productName);
    setFormCategory(recipe.category);
    setFormVariant(recipe.variant);
    setFormSellingPrice(recipe.sellingPrice);
    setFormIngredients(JSON.parse(JSON.stringify(recipe.ingredients || [])));
    setFormPackaging(JSON.parse(JSON.stringify(recipe.perItemPackaging || [])));
    setFormOrderPackagingShare(recipe.orderPackagingShare || 1100);
    setFormNotes(recipe.notes || '');
    setIsModalOpen(true);
  };

  // Ingredient Helpers
  const handleAddIngredientRow = () => {
    setFormIngredients((prev) => [
      ...prev,
      { name: '', amount: 10, unit: 'ml', cost: 1000 },
    ]);
  };

  const handleUpdateIngredient = (index: number, field: keyof RecipeIngredient, value: any) => {
    setFormIngredients((prev) => {
      const copy = [...prev];
      const target = { ...copy[index], [field]: value };

      // If amount or unit changed and linked to warehouse item, recalculate cost automatically
      if (field === 'amount' && target.inventoryItemId) {
        const item = inventory.find((i) => i.id === target.inventoryItemId);
        if (item && item.costPerUnit) {
          target.cost = Math.round(Number(value) * item.costPerUnit);
        }
      }

      copy[index] = target;
      return copy;
    });
  };

  // Swap / Select ingredient from Inventory
  const handleSelectWarehouseIngredient = (index: number, itemId: string) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    setFormIngredients((prev) => {
      const copy = [...prev];
      const currentAmount = copy[index].amount > 0 ? copy[index].amount : 20;
      const calculatedCost = Math.round(currentAmount * item.costPerUnit);

      copy[index] = {
        name: item.name,
        amount: currentAmount,
        unit: item.unit,
        cost: calculatedCost,
        inventoryItemId: item.id,
      };
      return copy;
    });
  };

  const handleRemoveIngredientRow = (index: number) => {
    setFormIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Packaging Helpers
  const handleAddPackagingRow = () => {
    setFormPackaging((prev) => [
      ...prev,
      { name: 'Vật tư đóng gói mới', quantity: 1, cost: 500 },
    ]);
  };

  const handleUpdatePackaging = (index: number, field: keyof RecipePackagingItem, value: any) => {
    setFormPackaging((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSelectWarehousePackaging = (index: number, itemId: string) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    setFormPackaging((prev) => {
      const copy = [...prev];
      const qty = copy[index].quantity > 0 ? copy[index].quantity : 1;
      copy[index] = {
        name: item.name,
        quantity: qty,
        cost: Math.round(qty * item.costPerUnit),
        inventoryItemId: item.id,
      };
      return copy;
    });
  };

  const handleRemovePackagingRow = (index: number) => {
    setFormPackaging((prev) => prev.filter((_, i) => i !== index));
  };

  // Real-time calculations inside modal
  const modalIngredientsCost = formIngredients.reduce((s, i) => s + (Number(i.cost) || 0), 0);
  const modalPackagingCost = formPackaging.reduce((s, p) => s + (Number(p.cost) || 0), 0);
  const modalDirectCost = modalIngredientsCost + modalPackagingCost;
  const modalTotalCost = modalDirectCost + (Number(formOrderPackagingShare) || 0);
  const modalGrossProfit = Math.max(0, formSellingPrice - modalTotalCost);
  const modalProfitMargin =
    formSellingPrice > 0 ? ((modalGrossProfit / formSellingPrice) * 100).toFixed(1) : '0';
  const modalFoodCostPct =
    formSellingPrice > 0 ? ((modalDirectCost / formSellingPrice) * 100).toFixed(1) : '0';

  // Save Recipe
  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProductName.trim()) {
      alert('Vui lòng nhập tên món / sản phẩm!');
      return;
    }

    const payload: RecipeCost = {
      productId: formProductId || 'prod-' + Date.now(),
      productName: formProductName.trim(),
      category: formCategory,
      variant: formVariant.trim() || 'Tiêu chuẩn',
      sellingPrice: Number(formSellingPrice) || 0,
      ingredients: formIngredients,
      perItemPackaging: formPackaging,
      orderPackagingShare: Number(formOrderPackagingShare) || 0,
      directCost: modalDirectCost,
      totalCostWithPackaging: modalTotalCost,
      grossProfit: modalGrossProfit,
      profitMarginPercent: Number(modalProfitMargin),
      notes: formNotes,
    };

    if (isEditing) {
      updateRecipeCost(payload);
      setSaveSuccessMsg(`Đã cập nhật định mức & cost cho ${payload.productName}!`);
    } else {
      addRecipeCost(payload);
      setSaveSuccessMsg(`Đã thêm mới công thức món ${payload.productName}!`);
    }

    setTimeout(() => {
      setSaveSuccessMsg('');
      setIsModalOpen(false);
    }, 1200);
  };

  // Delete Recipe
  const handleDeleteRecipe = (productId: string, productName: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa định mức công thức của món "${productName}" không?`)) {
      deleteRecipeCost(productId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-stone-900">
              Định Mức & Cost Từng Món / Từng Ly (Spec §15)
            </h2>
            <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Chỉnh sửa & Thay thế linh hoạt
            </span>
          </div>
          <p className="text-xs text-stone-500 max-w-4xl">
            Mô hình cost 3 lớp chuẩn hóa: (1) Nguyên liệu chế biến tiêu hao trực tiếp + (2) Bao bì riêng theo ly + (3) Phân bổ bao bì đơn (túi Kraft/tem/card). Cho phép đổi nguyên liệu kho tức thì khi hết hàng hoặc tinh chỉnh ml/gram và biên lãi.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Món / Công Thức Mới</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Tổng Món Định Mức</div>
            <div className="text-lg font-bold text-stone-900 font-mono">{totalRecipes} món</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Biên Lãi Trung Bình</div>
            <div className="text-lg font-bold text-emerald-700 font-mono">{avgMargin}%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Giá Vốn TB / Ly</div>
            <div className="text-lg font-bold text-stone-900 font-mono">{avgTotalCost.toLocaleString('vi-VN')} đ</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Tỷ Lệ Food Cost TB</div>
            <div className="text-lg font-bold text-purple-700 font-mono">{avgFoodCost}%</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên món, size, hoặc nguyên liệu (Matcha, Sữa, Cà phê...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-xs text-stone-500 font-medium">Danh mục:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-primary"
          >
            <option value="all">Tất cả danh mục ({recipeCosts.length})</option>
            {categories
              .filter((c) => c !== 'all')
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Cards Grid of Recipe Costs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.productId}
            className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                    {recipe.category}
                  </span>
                  <h3 className="font-bold text-sm text-stone-900 group-hover:text-primary transition-colors">
                    {recipe.productName}
                  </h3>
                  <p className="text-[11px] text-stone-500">{recipe.variant}</p>
                </div>

                <div className="text-right">
                  <div className="text-base font-bold text-stone-900 font-mono">
                    {recipe.sellingPrice.toLocaleString('vi-VN')} đ
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block border border-emerald-200">
                    Biên lãi: {recipe.profitMarginPercent}%
                  </div>
                </div>
              </div>

              {/* 1. Direct Ingredients */}
              <div className="space-y-1.5 pt-3">
                <div className="text-xs font-bold text-stone-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    1. Nguyên Liệu Chế Biến:
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {(recipe.ingredients || []).length} thành phần
                  </span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl space-y-1.5 text-xs border border-stone-100">
                  {(recipe.ingredients || []).map((ing, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-600 text-[11px]">
                      <span className="truncate pr-2">
                        • {ing.name}{' '}
                        <span className="text-stone-400 font-medium">
                          ({ing.amount} {ing.unit})
                        </span>
                      </span>
                      <span className="font-mono font-medium text-stone-700 shrink-0">
                        {ing.cost.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Per-Item Packaging */}
              <div className="space-y-1.5 pt-3">
                <div className="text-xs font-bold text-stone-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <PackageCheck className="w-3.5 h-3.5 text-primary" />
                    2. Bao Bì Riêng Cho Ly / Phần:
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {(recipe.perItemPackaging || []).length} món
                  </span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl space-y-1.5 text-xs border border-stone-100">
                  {(recipe.perItemPackaging || []).map((pack, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-600 text-[11px]">
                      <span className="truncate pr-2">
                        • {pack.name} <span className="text-stone-400">(x{pack.quantity})</span>
                      </span>
                      <span className="font-mono font-medium text-stone-700 shrink-0">
                        {pack.cost.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Order-level Packaging Share */}
              <div className="space-y-1 pt-3">
                <div className="flex justify-between text-xs font-bold text-stone-800">
                  <span>3. Phân bổ túi & card cấp đơn:</span>
                  <span className="font-mono text-primary">
                    +{(recipe.orderPackagingShare || 0).toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 italic">
                  (Chia đều túi kraft + card cảm ơn + tem niêm phong trên từng ly)
                </p>
              </div>
            </div>

            {/* Total Cost & Profit Summary + Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="bg-stone-900 text-white p-3.5 rounded-xl space-y-1.5 text-xs shadow-xs">
                <div className="flex justify-between text-stone-300 text-[11px]">
                  <span>Cost trực tiếp 1 ly:</span>
                  <span className="font-mono">{recipe.directCost.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-stone-300 border-b border-stone-800 pb-1.5 text-[11px]">
                  <span>Tổng giá vốn (gồm bao bì):</span>
                  <span className="font-mono font-bold text-amber-300">
                    {recipe.totalCostWithPackaging.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between text-xs font-extrabold pt-0.5">
                  <span className="text-emerald-400">Lãi gộp ước tính:</span>
                  <span className="text-emerald-400 font-mono">
                    +{recipe.grossProfit.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleOpenEditModal(recipe)}
                  className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-primary" />
                  <span>Sửa Định Mức & Cost</span>
                </button>

                <button
                  onClick={() => handleDeleteRecipe(recipe.productId, recipe.productName)}
                  title="Xóa công thức này"
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <Calculator className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-700">Không tìm thấy công thức định mức phù hợp</h3>
          <p className="text-xs text-stone-400">
            Thử tìm kiếm với từ khóa khác hoặc nhấn "Thêm Món / Công Thức Mới" để tạo mới.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dim transition-colors"
          >
            Tạo Công Thức Mới
          </button>
        </div>
      )}

      {/* ================= MODAL CHỈNH SỬA / THÊM MỚI CÔNG THỨC ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    {isEditing ? 'Chỉnh Sửa Định Mức & Cost Ly' : 'Thêm Món / Công Thức Định Mức Mới'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isEditing
                      ? `Cập nhật thành phần nguyên liệu, đổi ml/gram hoặc thay nguyên liệu kho`
                      : 'Thiết lập định mức 3 lớp, tự động tính giá vốn và biên lãi'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <form onSubmit={handleSaveRecipe} className="flex-1 overflow-y-auto p-6 space-y-6">
              {saveSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* 1. Basic Product Info */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Thông Tin Món & Giá Bán
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Tên Sản Phẩm / Món *
                    </label>
                    <input
                      type="text"
                      required
                      value={formProductName}
                      onChange={(e) => setFormProductName(e.target.value)}
                      placeholder="VD: Matcha Latte Cold Whisk"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Danh Mục Món
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                    >
                      <option value="Đồ uống pha chế">Đồ uống pha chế</option>
                      <option value="Cà phê truyền thống">Cà phê truyền thống</option>
                      <option value="Trà Trái Cây & Cold Brew">Trà Trái Cây & Cold Brew</option>
                      <option value="Trà Sữa & Đá Xay">Trà Sữa & Đá Xay</option>
                      <option value="Bánh nướng">Bánh nướng</option>
                      <option value="Quà tặng & Lưu niệm">Quà tặng & Lưu niệm</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Biến Thể / Size
                    </label>
                    <input
                      type="text"
                      value={formVariant}
                      onChange={(e) => setFormVariant(e.target.value)}
                      placeholder="VD: Size M (500ml), Size L..."
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Giá Bán Niêm Yết (VNĐ) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        required
                        value={formSellingPrice}
                        onChange={(e) => setFormSellingPrice(Number(e.target.value))}
                        className="w-full pl-3 pr-8 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-primary text-stone-900"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-stone-400 font-bold">
                        đ
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Ghi chú / Khẩu vị chuẩn
                    </label>
                    <input
                      type="text"
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="VD: Đánh whisk bọt lạnh, 70% đá, ít ngọt..."
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Direct Ingredients Editor */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-amber-600" />
                      1. Định Mức Nguyên Liệu Chế Biến (Tùy biến ml/gram & Đổi nguyên liệu)
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Nếu nguyên liệu cũ hết hàng, chọn "Đổi từ kho" để thế loại khác hoặc thay đổi số ml/gram tương ứng.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddIngredientRow}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold rounded-xl flex items-center gap-1 border border-amber-200 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Nguyên Liệu</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formIngredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2 hover:border-amber-300 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                        {/* Ingredient Name */}
                        <div className="md:col-span-4">
                          <label className="block text-[10px] text-stone-400 font-medium mb-0.5">
                            Tên Nguyên Liệu #{idx + 1}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Tên nguyên liệu..."
                            value={ing.name}
                            onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:border-primary"
                          />
                        </div>

                        {/* Amount */}
                        <div className="md:col-span-2">
                          <label className="block text-[10px] text-stone-400 font-medium mb-0.5">
                            Định Mức (Số lượng)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={ing.amount}
                            onChange={(e) =>
                              handleUpdateIngredient(idx, 'amount', Number(e.target.value))
                            }
                            className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono font-bold focus:outline-none focus:border-primary"
                          />
                        </div>

                        {/* Unit */}
                        <div className="md:col-span-2">
                          <label className="block text-[10px] text-stone-400 font-medium mb-0.5">
                            Đơn Vị
                          </label>
                          <select
                            value={ing.unit}
                            onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                            className="w-full px-2 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-primary"
                          >
                            <option value="ml">ml (Milit)</option>
                            <option value="g">g (Gram)</option>
                            <option value="shot">shot (Espresso)</option>
                            <option value="cái">cái / quả</option>
                            <option value="muỗng">muỗng / pump</option>
                            <option value="phần">phần</option>
                          </select>
                        </div>

                        {/* Cost */}
                        <div className="md:col-span-3">
                          <label className="block text-[10px] text-stone-400 font-medium mb-0.5">
                            Thành Tiền Vốn (đ)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="100"
                              value={ing.cost}
                              onChange={(e) =>
                                handleUpdateIngredient(idx, 'cost', Number(e.target.value))
                              }
                              className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono font-bold text-stone-800 focus:outline-none focus:border-primary"
                            />
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 font-bold">
                              đ
                            </span>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="md:col-span-1 flex justify-end pt-3 md:pt-0">
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredientRow(idx)}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Xóa thành phần này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Warehouse Selector & Link */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100 text-[11px]">
                        <div className="flex items-center gap-1.5 text-stone-500">
                          <Warehouse className="w-3.5 h-3.5 text-primary" />
                          <span>Đổi / Lấy nguyên liệu từ Kho:</span>
                          <select
                            value={ing.inventoryItemId || ''}
                            onChange={(e) => handleSelectWarehouseIngredient(idx, e.target.value)}
                            className="bg-stone-100 border border-stone-200 rounded-lg px-2 py-0.5 text-[11px] font-medium text-stone-700 focus:outline-none focus:border-primary max-w-xs"
                          >
                            <option value="">-- Chọn nguyên liệu kho thay thế --</option>
                            {rawMaterials.map((mat) => (
                              <option key={mat.id} value={mat.id}>
                                {mat.name} ({mat.costPerUnit.toLocaleString('vi-VN')}đ/{mat.unit} - Còn {mat.availableStock} {mat.unit})
                              </option>
                            ))}
                          </select>
                        </div>

                        {ing.inventoryItemId && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Đã liên kết Kho (tự tính {ing.cost.toLocaleString('vi-VN')} đ)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {formIngredients.length === 0 && (
                    <div className="p-4 border border-dashed border-stone-200 rounded-2xl text-center text-xs text-stone-400">
                      Chưa có nguyên liệu nào. Nhấn "+ Thêm Nguyên Liệu" ở trên.
                    </div>
                  )}
                </div>

                <div className="text-right text-xs font-bold text-stone-700">
                  Tổng cost nguyên liệu: <span className="font-mono text-amber-700">{modalIngredientsCost.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              {/* 3. Per-Item Packaging Editor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <PackageCheck className="w-4 h-4 text-primary" />
                      2. Vật Tư Bao Bì Riêng Cho Ly / Phần
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Bao gồm ly giấy, nắp đậy, ống hút, hộp đựng bánh riêng của từng món bán ra.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddPackagingRow}
                    className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold rounded-xl flex items-center gap-1 border border-primary/20 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Bao Bì Riêng</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formPackaging.map((pack, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2 hover:border-primary/40 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                        <div className="md:col-span-5">
                          <label className="block text-[10px] text-stone-400 font-medium mb-0.5">
                            Tên Vật Tư Bao Bì
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ly giấy, nắp, ống hút..."
                            value={pack.name}
                            onChange={(e) => handleUpdatePackaging(idx, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-[10px] text-stone-400 font-medium mb-0.5">
                            Số Lượng
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={pack.quantity}
                            onChange={(e) =>
                              handleUpdatePackaging(idx, 'quantity', Number(e.target.value))
                            }
                            className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono font-bold focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-[10px] text-stone-400 font-medium mb-0.5">
                            Chi Phí (VNĐ)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="50"
                              value={pack.cost}
                              onChange={(e) =>
                                handleUpdatePackaging(idx, 'cost', Number(e.target.value))
                              }
                              className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono font-bold text-stone-800 focus:outline-none focus:border-primary"
                            />
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 font-bold">
                              đ
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-1 flex justify-end pt-3 md:pt-0">
                          <button
                            type="button"
                            onClick={() => handleRemovePackagingRow(idx)}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100 text-[11px]">
                        <div className="flex items-center gap-1.5 text-stone-500">
                          <Warehouse className="w-3.5 h-3.5 text-primary" />
                          <span>Lấy nhanh từ bao bì Kho:</span>
                          <select
                            value={pack.inventoryItemId || ''}
                            onChange={(e) => handleSelectWarehousePackaging(idx, e.target.value)}
                            className="bg-stone-100 border border-stone-200 rounded-lg px-2 py-0.5 text-[11px] font-medium text-stone-700 focus:outline-none focus:border-primary max-w-xs"
                          >
                            <option value="">-- Chọn bao bì kho --</option>
                            {packagingMaterials.map((mat) => (
                              <option key={mat.id} value={mat.id}>
                                {mat.name} ({mat.costPerUnit.toLocaleString('vi-VN')} đ/{mat.unit})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right text-xs font-bold text-stone-700">
                  Tổng bao bì riêng ly: <span className="font-mono text-primary">{modalPackagingCost.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              {/* 4. Order Packaging Share */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-600" />
                    3. Phân Bổ Bao Bì Cấp Đơn Hàng (Túi kraft, Thank-you card, Tem)
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[500, 1100, 1500, 2000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setFormOrderPackagingShare(preset)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          formOrderPackagingShare === preset
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {preset.toLocaleString('vi-VN')} đ
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <div className="md:col-span-2 text-xs text-stone-500">
                    Quy tắc Spec §15: Đơn mang đi trung bình gồm 2 ly dùng 1 túi Kraft lớn (2.000đ) + 1 Thank-you Card (200đ) = 2.200đ / 2 ly = <strong>1.100 đ/ly</strong>. Kho chỉ xuất 1 túi cho đơn 2 ly mà không nhân đôi chi phí thực tế.
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Mức phân bổ chia sẻ / ly (VNĐ)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={formOrderPackagingShare}
                        onChange={(e) => setFormOrderPackagingShare(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-primary"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-stone-400 font-bold">
                        đ/ly
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Real-time Calculation Summary Box */}
              <div className="bg-stone-900 text-white p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Bảng Tính Giá Vốn & Biên Lãi Tức Thì
                  </span>
                  <span className="text-xs text-stone-400">
                    Giá bán: <strong>{formSellingPrice.toLocaleString('vi-VN')} đ</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-stone-400 text-[11px]">Cost Trực Tiếp 1 Ly:</div>
                    <div className="text-base font-bold font-mono text-stone-100">
                      {modalDirectCost.toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-[10px] text-stone-500">
                      (NL: {modalIngredientsCost.toLocaleString('vi-VN')}đ + Bao bì: {modalPackagingCost.toLocaleString('vi-VN')}đ)
                    </div>
                  </div>

                  <div>
                    <div className="text-stone-400 text-[11px]">Tổng Giá Vốn Đầy Đủ:</div>
                    <div className="text-base font-bold font-mono text-amber-300">
                      {modalTotalCost.toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-[10px] text-stone-500">
                      (+{formOrderPackagingShare.toLocaleString('vi-VN')}đ bao bì đơn)
                    </div>
                  </div>

                  <div>
                    <div className="text-stone-400 text-[11px]">Lãi Gộp Thu Về:</div>
                    <div className="text-base font-bold font-mono text-emerald-400">
                      +{modalGrossProfit.toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-[10px] text-stone-500">trên mỗi ly bán ra</div>
                  </div>

                  <div>
                    <div className="text-stone-400 text-[11px]">Biên Lãi Gộp (Margin):</div>
                    <div className="text-base font-bold font-mono text-emerald-400">
                      {modalProfitMargin}%
                    </div>
                    <div className="text-[10px] text-stone-500">
                      Food Cost: <strong>{modalFoodCostPct}%</strong>
                    </div>
                  </div>
                </div>

                {Number(modalProfitMargin) < 60 && (
                  <div className="bg-amber-950/60 border border-amber-800 text-amber-300 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Cảnh báo: Biên lãi {modalProfitMargin}% thấp hơn mức chuẩn 65% của mô hình cà phê specialty. Cân nhắc tăng giá bán hoặc giảm cost nguyên liệu.
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dim text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEditing ? 'Lưu Thay Đổi Định Mức' : 'Tạo Món & Lưu Định Mức'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
