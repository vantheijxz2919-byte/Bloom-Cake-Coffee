/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { InvoicePrintModal } from './components/crm/InvoicePrintModal';

// Customer Storefront Screens
import { HomeScreen } from './screens/HomeScreen';
import { MenuScreen } from './screens/MenuScreen';
import { DealsScreen } from './screens/DealsScreen';
import { SouvenirWorkshopScreen } from './screens/SouvenirWorkshopScreen';
import { BranchesScreen } from './screens/BranchesScreen';
import { LoyaltyScreen } from './screens/LoyaltyScreen';
import { AboutScreen } from './screens/AboutScreen';
import { AuthScreen } from './screens/AuthScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';

// Staff & CRM Operational Screens
import { CRMLayout } from './screens/crm/CRMLayout';
import { POSScreen } from './screens/crm/POSScreen';
import { KDSScreen } from './screens/crm/KDSScreen';
import { InvoicesScreen } from './screens/crm/InvoicesScreen';
import { DeliveriesScreen } from './screens/crm/DeliveriesScreen';
import { InventoryScreen } from './screens/crm/InventoryScreen';
import { RecipeCostScreen } from './screens/crm/RecipeCostScreen';
import { MenuScreenCRM } from './screens/crm/MenuScreenCRM';
import { PromotionsScreen } from './screens/crm/PromotionsScreen';
import { VouchersScreen } from './screens/crm/VouchersScreen';
import { MembersScreen } from './screens/crm/MembersScreen';
import { ReportsScreen } from './screens/crm/ReportsScreen';
import { SettingsScreen } from './screens/crm/SettingsScreen';
import { ShieldCheck } from 'lucide-react';

const CustomerStorefront: React.FC = () => {
  const { currentScreen } = useApp();
  const { setPortalMode, activeStaff } = useCRM();

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-primary relative">
      <Header />
      <main className="w-full pt-[112px] bg-surface min-h-[75vh] flex-1">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'menu' && <MenuScreen />}
        {currentScreen === 'deals' && <DealsScreen />}
        {currentScreen === 'souvenirs' && <SouvenirWorkshopScreen />}
        {currentScreen === 'branches' && <BranchesScreen />}
        {currentScreen === 'loyalty' && <LoyaltyScreen />}
        {currentScreen === 'about' && <AboutScreen />}
        {currentScreen === 'auth' && <AuthScreen />}
        {currentScreen === 'order-tracking' && <OrderTrackingScreen />}
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal />
      <Toast />

      {/* Floating CRM Access Bubble for quick testing */}
      <button
        onClick={() => setPortalMode('crm')}
        className="fixed bottom-6 right-6 z-40 bg-stone-900 hover:bg-stone-800 text-amber-300 px-4 py-2.5 rounded-full shadow-2xl border-2 border-amber-400/50 flex items-center gap-2 text-xs font-extrabold hover:scale-105 active:scale-95 transition-all group"
        title="Chuyển sang Cổng Quản Trị & Vận Hành CRM"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <ShieldCheck className="w-4 h-4 text-amber-400" />
        <span>Vào Cổng CRM ({activeStaff.roleName})</span>
      </button>
    </div>
  );
};

const CRMOperationalPortal: React.FC = () => {
  const { activeCrmTab } = useCRM();

  return (
    <CRMLayout>
      {activeCrmTab === 'pos' && <POSScreen />}
      {activeCrmTab === 'kds' && <KDSScreen />}
      {activeCrmTab === 'invoices' && <InvoicesScreen />}
      {activeCrmTab === 'deliveries' && <DeliveriesScreen />}
      {activeCrmTab === 'inventory' && <InventoryScreen />}
      {activeCrmTab === 'costs' && <RecipeCostScreen />}
      {activeCrmTab === 'menu' && <MenuScreenCRM />}
      {activeCrmTab === 'promotions' && <PromotionsScreen />}
      {activeCrmTab === 'vouchers' && <VouchersScreen />}
      {activeCrmTab === 'members' && <MembersScreen />}
      {activeCrmTab === 'reports' && <ReportsScreen />}
      {activeCrmTab === 'settings' && <SettingsScreen />}
    </CRMLayout>
  );
};

const AppShell: React.FC = () => {
  const { portalMode } = useCRM();

  return (
    <>
      {portalMode === 'crm' ? <CRMOperationalPortal /> : <CustomerStorefront />}
      <InvoicePrintModal />
    </>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </CRMProvider>
  );
}
