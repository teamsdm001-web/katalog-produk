import { FormEvent } from 'react';
import { ShoppingCart, X, Trash2, Truck, Building, FileText, MessageSquare, ShoppingBasket } from 'lucide-react';
import { CartItem, Product, Distributor } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  distributors: Record<string, Distributor>;
  onRemoveItem: (productId: number) => void;
  onAdjustQty: (productId: number, qty: number) => void;
  onSubmitOrder: (repKey: string, pharmacy: string, notes: string) => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  products,
  distributors,
  onRemoveItem,
  onAdjustQty,
  onSubmitOrder,
}: CartSidebarProps) {
  if (!isOpen) return null;

  const getProductData = (productId: number) => {
    return products.find((p) => p.id === productId);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const p = getProductData(item.productId);
      return sum + (p ? p.harga * item.qty : 0);
    }, 0);
  };

  const handleAdjustQty = (productId: number, amount: number) => {
    onAdjustQty(productId, amount);
  };

  const handleCheckoutSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const repKey = formData.get('repKey') as string;
    const pharmacy = formData.get('pharmacy') as string;
    const notes = formData.get('notes') as string;

    onSubmitOrder(repKey, pharmacy, notes);
  };

  const formatRp = (n: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);
  };

  return (
    <>
      {/* Background Dimmer overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-45 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Sidebar drawer panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#0E2421] shadow-2xl border-l border-teal-100/50 dark:border-teal-900/50 flex flex-col h-full transition-transform duration-300 transform translate-x-0">
        
        {/* Header */}
        <div className="p-4 border-b border-teal-50 dark:border-teal-950/50 flex justify-between items-center bg-teal-50/25 dark:bg-teal-950/25 shrink-0">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400">
            <ShoppingCart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-sm font-black tracking-tight uppercase">Keranjang Pesanan</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-teal-600/70 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
            <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600/60 dark:text-teal-500/50 mb-3">
              <ShoppingBasket className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-extrabold text-teal-950 dark:text-teal-100">
              Keranjang Masih Kosong
            </h3>
            <p className="text-xs text-teal-600/70 dark:text-teal-400/70 max-w-xs mt-1">
              Tambahkan beberapa produk medis atau skincare dari katalog untuk mulai memesan.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar">
              {cart.map((item) => {
                const p = getProductData(item.productId);
                if (!p) return null;

                return (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 bg-teal-50/10 dark:bg-teal-950/10 border border-teal-100/50 dark:border-teal-900/50 p-2.5 rounded-xl transition-colors"
                  >
                    {/* Product Thumbnail */}
                    <img
                      src={p.gambar[0]}
                      alt={p.nama}
                      className="w-11 h-11 rounded-lg object-cover bg-teal-100/20 dark:bg-teal-950/50 shrink-0 border border-teal-100/20"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=40';
                      }}
                    />

                    {/* Product quantity info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-teal-950 dark:text-teal-50 truncate">
                        {p.nama}
                      </h4>
                      <p className="text-[0.68rem] text-teal-600 dark:text-teal-400 font-bold">
                        {formatRp(p.harga)}
                      </p>

                      <div className="flex items-center justify-between gap-1 mt-1.5 select-none">
                        <div className="flex items-center border border-teal-200 dark:border-teal-800 bg-white dark:bg-teal-950 rounded-lg overflow-hidden scale-90 origin-left h-6">
                          <button
                            type="button"
                            onClick={() => handleAdjustQty(p.id, -1)}
                            className="w-7 flex items-center justify-center text-teal-600 dark:text-teal-400 font-black cursor-pointer hover:bg-teal-50/30"
                          >
                            &minus;
                          </button>
                          <span className="w-8 text-center text-xs font-black text-teal-900 dark:text-teal-50">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdjustQty(p.id, 1)}
                            className="w-7 flex items-center justify-center text-teal-600 dark:text-teal-400 font-black cursor-pointer hover:bg-teal-50/30"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-black text-teal-850 dark:text-teal-350">
                          {formatRp(p.harga * item.qty)}
                        </span>
                      </div>
                    </div>

                    {/* Trash remove item */}
                    <button
                      onClick={() => onRemoveItem(p.id)}
                      className="text-teal-600/50 hover:text-rose-500 cursor-pointer p-1 shrink-0 transition-colors"
                      title="Hapus produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Form & Checkout Area */}
            <form
              onSubmit={handleCheckoutSubmit}
              className="p-4 border-t border-teal-50 dark:border-teal-950/50 bg-teal-50/20 dark:bg-teal-950/25 space-y-4 shrink-0"
            >
              <div className="flex items-center justify-between font-black text-xs text-teal-950 dark:text-teal-50 uppercase tracking-wide">
                <span>Estimasi Total</span>
                <span className="text-teal-600 dark:text-teal-400 text-lg">
                  {formatRp(calculateTotal())}
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Rep Select Option */}
                <div>
                  <label className="block text-[0.68rem] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase mb-1.5 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-teal-500" />
                    <span>Sales Representative / Pengiriman *</span>
                  </label>
                  <select
                    name="repKey"
                    required
                    className="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50 font-bold transition-all cursor-pointer"
                  >
                    {Object.entries(distributors).map(([key, d]) => (
                      <option key={key} value={key}>
                        {d.nama} ({d.wa})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pharmacy / Doctor Name */}
                <div>
                  <label className="block text-[0.68rem] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-teal-500" />
                    <span>Nama Apotek / Dokter / Klinik *</span>
                  </label>
                  <input
                    type="text"
                    name="pharmacy"
                    required
                    placeholder="Contoh: Apotek Sehat Farma / Dr. Susan"
                    className="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50 font-semibold transition-all"
                  />
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-[0.68rem] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-500" />
                    <span>Catatan Manual (Opsional)</span>
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Tulis instruksi tambahan, diskon, atau memo khusus..."
                    className="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50 font-medium resize-none transition-all"
                  />
                </div>

                {/* Checkout Submit to WA */}
                <button
                  type="submit"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 active:scale-98"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-white" />
                  <span>Kirim Pesanan via WhatsApp</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
