import { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Users,
  Github,
  Search,
  ArrowUpDown,
  ShoppingBasket,
  ChevronUp,
  Stethoscope,
  Code,
  CheckCircle,
} from 'lucide-react';

import { Product, Distributor, CartItem } from './types';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import DistributorSettings from './components/DistributorSettings';
import ExportHtmlModal from './components/ExportHtmlModal';

// Initial default distributors
const INITIAL_DISTRIBUTORS: Record<string, Distributor> = {
  A: { nama: 'REP PRIYO', wa: '628985862279' },
  B: { nama: 'Distributor Penta', wa: '628886650903' },
  C: { nama: 'Distributor SKS', wa: '628954148567032' },
  D: { nama: 'Distributor Sapta', wa: '6287872680058' },
};

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Products filtering & sorting
  const [category, setCategory] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('default');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDistributorOpen, setIsDistributorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Cart & settings state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [distributors, setDistributors] = useState<Record<string, Distributor>>(INITIAL_DISTRIBUTORS);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize theme, cart, and distributors from LocalStorage
  useEffect(() => {
    // Theme
    try {
      const savedTheme = localStorage.getItem('derma_theme') || 'light';
      setTheme(savedTheme as 'light' | 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }

    // Cart
    try {
      const savedCart = localStorage.getItem('derma_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error(e);
    }

    // Distributors
    try {
      const savedDist = localStorage.getItem('derma_distributors');
      if (savedDist) {
        setDistributors(JSON.parse(savedDist));
      }
    } catch (e) {
      console.error(e);
    }

    // Scroll Top listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state helpers
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('derma_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart Handlers
  const handleQuickAdd = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updated = [...prev, { productId, qty: 1 }];
      }
      localStorage.setItem('derma_cart', JSON.stringify(updated));
      return updated;
    });
    showToast('Ditambahkan ke keranjang!');
  };

  const handleModalAdd = (productId: number, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        updated = [...prev, { productId, qty }];
      }
      localStorage.setItem('derma_cart', JSON.stringify(updated));
      return updated;
    });
    showToast('Ditambahkan ke keranjang!');
  };

  const handleRemoveCartItem = (productId: number) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.productId !== productId);
      localStorage.setItem('derma_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAdjustCartQty = (productId: number, amount: number) => {
    setCart((prev) => {
      const updated = prev.map((item) => {
        if (item.productId === productId) {
          return { ...item, qty: Math.max(1, item.qty + amount) };
        }
        return item;
      });
      localStorage.setItem('derma_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveDistributors = (updated: Record<string, Distributor>) => {
    setDistributors(updated);
    localStorage.setItem('derma_distributors', JSON.stringify(updated));
    setIsDistributorOpen(false);
    showToast('Pengaturan representative berhasil disimpan!');
  };

  const handleOrderSubmit = (repKey: string, pharmacy: string, notes: string) => {
    const rep = distributors[repKey];
    if (!rep) return;

    // Build beautiful WhatsApp text template
    let msg = `Halo mas ${rep.nama}, saya dari * ${pharmacy} * ingin memesan produk berikut:\n\n`;

    cart.forEach((item, index) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        const itemTotal = prod.harga * item.qty;
        msg += `${index + 1}. *${prod.nama}*\n   Kemasan: ${prod.kemasan}\n   Jumlah: ${item.qty} pcs\n   Harga: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(itemTotal)}\n\n`;
      }
    });

    const total = cart.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.productId);
      return sum + (prod ? prod.harga * item.qty : 0);
    }, 0);

    msg += `*ESTIMASI TOTAL ORDER:* ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total)}\n`;

    if (notes.trim()) {
      msg += `Catatan: ${notes.trim()}\n`;
    }

    msg += `\nTerima kasih.`;

    // Direct WhatsApp send
    const waUrl = `https://wa.me/${rep.wa}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    // Reset checkout and empty cart
    setCart([]);
    localStorage.removeItem('derma_cart');
    setIsCartOpen(false);
    showToast('Pesanan diteruskan ke WhatsApp!');
  };

  // Filtered & Sorted products list
  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = category === 'Semua' || p.kategori === category;
      if (!matchesCategory) return false;

      const q = search.toLowerCase().trim();
      if (!q) return true;

      return (
        p.nama.toLowerCase().includes(q) ||
        p.komposisi.toLowerCase().includes(q) ||
        p.indikasi.toLowerCase().includes(q) ||
        p.kasusKulit?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === 'name-asc') {
        return a.nama.localeCompare(b.nama);
      }
      if (sort === 'price-asc') {
        return a.harga - b.harga;
      }
      if (sort === 'price-desc') {
        return b.harga - a.harga;
      }
      return a.id - b.id; // default ID
    });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen pb-16 bg-[#F4FAF8] dark:bg-[#071714] text-[#0C352F] dark:text-[#E2F2EE] transition-colors duration-300">
      
      {/* ===== FLOATING ACTION EXPORT BUTTON FOR GITHUB ===== */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-2 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white font-extrabold text-xs tracking-wider uppercase px-4 py-3 rounded-full shadow-lg shadow-teal-700/20 cursor-pointer transition-all active:scale-95 group"
        >
          <Code className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span>Ekspor Ke GitHub (HTML)</span>
        </button>
      </div>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30 border-b border-teal-100/60 dark:border-teal-950/40 bg-white/85 dark:bg-[#0E2421]/85 backdrop-blur-md transition-colors duration-300 py-3 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-md select-none shrink-0">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black text-teal-800 dark:text-teal-400 tracking-tight leading-tight">
                  DermaCatalog
                </h1>
                <p className="text-[0.65rem] font-black tracking-wider text-teal-600/80 dark:text-teal-500/80 uppercase">
                  Professional Detailing
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex items-center gap-2">
              {/* Theme Selector */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl border border-teal-200/50 dark:border-teal-800/50 bg-teal-50/50 dark:bg-teal-950/50 flex items-center justify-center text-teal-700 dark:text-teal-300 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer"
                title="Ganti Tema"
              >
                {theme === 'light' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              {/* Distributor settings */}
              <button
                onClick={() => setIsDistributorOpen(true)}
                className="w-9 h-9 rounded-xl border border-teal-200/50 dark:border-teal-800/50 bg-teal-50/50 dark:bg-teal-950/50 flex items-center justify-center text-teal-700 dark:text-teal-300 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer"
                title="Pengaturan Sales Representative"
              >
                <Users className="w-4.5 h-4.5" />
              </button>

              {/* Shopping Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-9 h-9 rounded-xl border border-teal-200/50 dark:border-teal-800/50 bg-teal-50/50 dark:bg-teal-950/50 flex items-center justify-center text-teal-700 dark:text-teal-300 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer"
                title="Buka Keranjang"
              >
                <ShoppingBasket className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white font-extrabold text-[0.65rem] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-teal-600/70 dark:text-teal-400/60" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama produk, kandungan aktif, indikasi..."
              className="w-full bg-teal-50/45 dark:bg-teal-950/45 border border-teal-100 dark:border-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-teal-950 dark:text-teal-50 placeholder-teal-600/50 dark:placeholder-teal-400/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-teal-600/60 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 select-none scrollbar-none">
            {['Semua', 'Acne', 'Derma Medis', 'Skincare'].map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border cursor-pointer shadow-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-600 dark:bg-teal-500 text-white border-teal-600 dark:border-teal-500'
                      : 'border-teal-100 dark:border-teal-900 bg-white dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 hover:border-teal-500'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* ===== MAIN GRID ===== */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-xs font-black text-teal-600 dark:text-teal-400/80 tracking-wide uppercase">
            {filteredProducts.length} Produk Ditemukan
          </p>

          {/* Sort Selection */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-teal-600" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs font-bold bg-transparent border-none focus:outline-none text-teal-800 dark:text-teal-300 cursor-pointer"
            >
              <option value="default">Default (ID)</option>
              <option value="name-asc">Nama (A-Z)</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-teal-50/20 dark:bg-teal-950/10 border border-dashed border-teal-200 dark:border-teal-900 rounded-3xl mt-4 select-none">
            <Search className="w-10 h-10 text-teal-600/50 mb-3" />
            <h3 className="text-sm font-extrabold text-teal-900 dark:text-teal-100">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-xs text-teal-600/70 dark:text-teal-400/70 max-w-xs mt-1">
              Coba sesuaikan kata kunci pencarian atau ganti kategori filter di atas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p: Product) => { setSelectedProduct(p); }}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        )}
      </main>

      {/* ===== OVERLAY MODALS ===== */}
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleModalAdd}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        distributors={distributors}
        onRemoveItem={handleRemoveCartItem}
        onAdjustQty={handleAdjustCartQty}
        onSubmitOrder={handleOrderSubmit}
      />

      <DistributorSettings
        isOpen={isDistributorOpen}
        onClose={() => setIsDistributorOpen(false)}
        distributors={distributors}
        onSave={handleSaveDistributors}
      />

      <ExportHtmlModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        products={products}
        distributors={distributors}
      />

      {/* ===== FLOATING TOAST NOTIFICATION ===== */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-teal-950 dark:bg-teal-900 border border-teal-800 dark:border-teal-700 text-teal-50 px-5 py-3 rounded-xl font-bold text-xs shadow-xl tracking-wide flex items-center gap-2 animate-fade-in pointer-events-none">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===== SCROLL TO TOP ===== */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-lg cursor-pointer transition-all active:scale-95 animate-fade-in"
          title="Kembali ke atas"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}

    </div>
  );
}
