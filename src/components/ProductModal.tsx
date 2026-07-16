import { useState } from 'react';
import { X, Package, Stethoscope, ShoppingCart, Info, ZoomIn } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number, qty: number) => void;
}

const renderParagraphs = (text: string) => {
  return text.split('\n').map((para, i) => {
    const trimmed = para.trim();
    if (!trimmed) return null;
    
    // Ordered lists (e.g. "1. Cuci tangan...")
    if (/^\d+\.\s/.test(trimmed)) {
      const num = trimmed.match(/^(\d+)\.\s/)?.[1] || '';
      const rest = trimmed.replace(/^\d+\.\s/, '');
      return (
        <div key={i} className="flex gap-2.5 items-start mt-1.5 pl-1">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50 text-[0.62rem] font-black text-teal-800 dark:text-teal-300">
            {num}
          </span>
          <p className="text-xs sm:text-sm text-teal-900/80 dark:text-teal-100/80 font-medium leading-relaxed">
            {rest}
          </p>
        </div>
      );
    }
    
    // Bullet lists (e.g. "- Gunakan...")
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const rest = trimmed.replace(/^[-*]\s*/, '');
      return (
        <div key={i} className="flex gap-2 items-start mt-1 pl-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0 mt-2" />
          <p className="text-xs sm:text-sm text-teal-900/80 dark:text-teal-100/80 font-medium leading-relaxed">
            {rest}
          </p>
        </div>
      );
    }
    
    // Header labels (e.g. "[Petunjuk Langkah-Demi-Langkah]")
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return (
        <h5 key={i} className="text-[0.65rem] font-black text-teal-700 dark:text-teal-400 uppercase tracking-wider mt-3 mb-1 border-b border-teal-100/15 dark:border-teal-900/15 pb-0.5">
          {trimmed.substring(1, trimmed.length - 1)}
        </h5>
      );
    }
    
    // Plain paragraphs
    return (
      <p key={i} className="text-xs sm:text-sm text-teal-800 dark:text-teal-200 leading-relaxed font-semibold mt-1">
        {trimmed}
      </p>
    );
  });
};

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.harga);

  const getBadgeStyles = (category: Product['kategori']) => {
    switch (category) {
      case 'Acne':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/40 dark:border-rose-900/40';
      case 'Derma Medis':
        return 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200/40 dark:border-sky-900/40';
      default:
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-900/40';
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, qty);
    setQty(1);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white dark:bg-[#0E2421] border border-teal-100/50 dark:border-teal-900/50 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] transition-colors duration-300 overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-teal-50 dark:border-teal-950/50 flex justify-between items-center bg-teal-50/20 dark:bg-teal-950/20 shrink-0">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-black uppercase tracking-wider ${getBadgeStyles(
                product.kategori
              )}`}
            >
              {product.kategori}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-teal-600/70 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-5 space-y-5 flex-1 scrollbar">
            {/* Hero Image Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-teal-50 dark:bg-teal-950/50 border border-teal-100/50 dark:border-teal-900/30 group">
              <img
                src={product.gambar[0]}
                alt={product.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60';
                }}
              />
              
              {/* Zoom overlay trigger */}
              <button
                onClick={() => setLightboxImg(product.gambar[0])}
                className="absolute bottom-2.5 right-2.5 bg-black/60 hover:bg-black/85 text-white p-2 rounded-xl flex items-center gap-1 text-[0.62rem] font-bold tracking-wider cursor-pointer uppercase transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5 text-white" /> Zoom
              </button>

              {/* Prescription warning badge */}
              {product.isHardMedicine && (
                <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white font-extrabold text-[0.6rem] px-2.5 py-0.5 rounded-full tracking-wider shadow-sm select-none">
                  HARUS RESEP DOKTER
                </span>
              )}
            </div>

            {/* Product Title and Price */}
            <div>
              <h2 className="text-lg font-black tracking-tight text-teal-950 dark:text-teal-50">
                {product.nama}
              </h2>
              <p className="text-teal-600 dark:text-teal-400 font-black text-lg mt-0.5">
                {formattedPrice}
              </p>
              <p className="text-xs font-bold text-teal-600/70 dark:text-teal-400/60 mt-1 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-teal-500/70" />
                <span>Kemasan: {product.kemasan}</span>
              </p>
            </div>

            <div className="space-y-4">
              {/* Komposisi (Kandungan Aktif) */}
              <div className="bg-teal-50/20 dark:bg-teal-950/20 border border-teal-100/30 dark:border-teal-950/50 p-3 rounded-xl">
                <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-teal-500" /> Kandungan Aktif
                </h4>
                <p className="text-sm text-teal-900 dark:text-teal-100 leading-relaxed font-semibold">
                  {product.komposisi}
                </p>
              </div>

              {/* Cara Kerja (How it works) */}
              <div className="space-y-1.5 bg-teal-50/5 dark:bg-teal-950/10 border border-teal-100/20 dark:border-teal-900/15 p-3 rounded-xl">
                <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider border-b border-teal-100/30 dark:border-teal-900/20 pb-1 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-teal-500 rounded-full" /> Instruksi &amp; Cara Pakai
                </h4>
                <div className="space-y-1">
                  {renderParagraphs(product.caraKerja)}
                </div>
              </div>

              {/* Indikasi (Indications) */}
              <div className="space-y-1.5 bg-teal-50/5 dark:bg-teal-950/10 border border-teal-100/20 dark:border-teal-900/15 p-3 rounded-xl">
                <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider border-b border-teal-100/30 dark:border-teal-900/20 pb-1 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-teal-500 rounded-full" /> Deskripsi &amp; Indikasi Medis
                </h4>
                <div className="space-y-1">
                  {renderParagraphs(product.indikasi)}
                </div>
              </div>

              {/* Kasus Kulit (Skin concerns) */}
              {product.kasusKulit && (
                <div className="space-y-2 bg-teal-50/5 dark:bg-teal-950/10 border border-teal-100/20 dark:border-teal-900/15 p-3 rounded-xl">
                  <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider border-b border-teal-100/30 dark:border-teal-900/20 pb-1 mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-teal-500 rounded-full" /> Indikasi Kasus Kulit
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.kasusKulit.split(',').map((kc, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60 rounded-full px-2.5 py-1 text-xs font-bold text-teal-800 dark:text-teal-300"
                      >
                        <Stethoscope className="w-3.5 h-3.5 text-teal-500" />
                        <span>{kc.trim()}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sampel Kasus Kulit (Clinical detailing image) */}
              {product.gambarKasus && (
                <div className="space-y-3 border border-teal-100/40 dark:border-teal-900/30 rounded-xl p-3 bg-teal-50/10 dark:bg-teal-950/20">
                  <h4 className="text-xs font-extrabold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Sampel Kasus Kulit (Visual Detailing)</span>
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3.5 items-center">
                    <div className="w-full sm:w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-teal-50 dark:bg-teal-950/40 border border-teal-100/50 dark:border-teal-900/40 shadow-inner group/kasus relative">
                      <img
                        src={product.gambarKasus}
                        alt={`Sampel Kasus ${product.nama}`}
                        className="w-full h-full object-cover cursor-zoom-in"
                        referrerPolicy="no-referrer"
                        onClick={() => setLightboxImg(product.gambarKasus || null)}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=40';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover/kasus:bg-black/0 transition-all" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <p className="text-[0.62rem] font-bold text-teal-600/80 dark:text-teal-400/80 uppercase tracking-wider">
                        Sasaran Indikasi Klinis:
                      </p>
                      <p className="text-xs font-black text-teal-900 dark:text-teal-100">
                        {product.kasusKulit ? product.kasusKulit.split(',')[0].trim() : "Masalah Kulit Terkait"}
                      </p>
                      <p className="text-[0.68rem] text-teal-700/90 dark:text-teal-300/95 leading-relaxed font-semibold">
                        Sediaan obat ini diformulasikan khusus untuk sasaran klinis di atas. Gambar menunjukkan sampel kondisi kulit yang merespon secara aktif terhadap komposisi bahan aktif utama.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery thumbnails */}
              {product.gambar.length > 1 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                    Galeri Foto Produk
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {product.gambar.map((url, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImg(url)}
                        className="aspect-square rounded-lg overflow-hidden border border-teal-200/50 dark:border-teal-800 cursor-zoom-in bg-teal-50/50 dark:bg-teal-950/20"
                      >
                        <img
                          src={url}
                          alt={`${product.nama} - Foto ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="p-4 border-t border-teal-50 dark:border-teal-950/50 bg-teal-50/15 dark:bg-teal-950/15 flex items-center gap-3 shrink-0">
            <div className="flex items-center border border-teal-200 dark:border-teal-800 bg-white dark:bg-teal-950 rounded-xl overflow-hidden h-11 select-none">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="w-10 flex items-center justify-center text-teal-600 hover:bg-teal-100/30 dark:hover:bg-teal-900/30 font-bold cursor-pointer"
              >
                &minus;
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-10 border-none text-center bg-transparent focus:outline-none text-sm font-extrabold text-teal-950 dark:text-teal-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="w-10 flex items-center justify-center text-teal-600 hover:bg-teal-100/30 dark:hover:bg-teal-900/30 font-bold cursor-pointer"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 h-11 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-teal-600/10 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <span>Tambah Ke Keranjang</span>
            </button>
          </div>

        </div>
      </div>

      {/* Lightbox zoomed container */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out p-4"
        >
          <img
            src={lightboxImg}
            alt="Zoomed"
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-fade-in"
          />
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
