import React from 'react';
import { Stethoscope, ShoppingBasket } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (productId: number) => void;
}

export default function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
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

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.harga);

  // Shorten compositions for cards
  const briefComposition =
    product.komposisi.length > 30
      ? `${product.komposisi.substring(0, 30)}...`
      : product.komposisi;

  const skinCases = product.kasusKulit?.split(',').slice(0, 1) || [];

  return (
    <div
      onClick={() => onSelect(product)}
      className={`border rounded-2xl p-2.5 flex flex-col justify-between cursor-pointer select-none transition-all duration-350 bg-white dark:bg-[#0E2421] hover:-translate-y-1 hover:shadow-xl group relative ${
        product.isHardMedicine
          ? 'border-rose-300 dark:border-rose-950/60'
          : 'border-teal-100/60 dark:border-teal-900/30'
      }`}
    >
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-teal-50/40 dark:bg-teal-950/20 mb-2.5 border border-teal-100/10 dark:border-teal-900/10">
          <img
            src={product.gambar[0]}
            alt={product.nama}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=40';
            }}
          />
          
          {/* Medical prescription warning badge */}
          {product.isHardMedicine && (
            <span className="absolute top-2 right-2 bg-rose-600 text-white font-extrabold text-[0.55rem] px-2 py-0.5 rounded-full tracking-wider shadow-sm z-10">
              RESEP
            </span>
          )}

          {/* Category Badge */}
          <span
            className={`absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md text-[0.58rem] font-black tracking-wider uppercase ${getBadgeStyles(
              product.kategori
            )}`}
          >
            {product.kategori}
          </span>
        </div>

        {/* Info */}
        <h3 className="font-extrabold text-xs text-teal-950 dark:text-teal-50 leading-snug line-clamp-2" title={product.nama}>
          {product.nama}
        </h3>
        <p className="text-[0.65rem] font-bold text-teal-600/70 dark:text-teal-400/60 line-clamp-1 mt-0.5" title={product.komposisi}>
          {briefComposition}
        </p>

        {/* Skin cases indicator */}
        <div className="flex flex-wrap gap-1 mt-1.5 w-full min-h-[20px]">
          {skinCases.map((sc, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-0.5 bg-teal-50/50 dark:bg-teal-950/40 border border-teal-100/50 dark:border-teal-900/50 rounded-md px-1.5 py-0.5 text-[0.62rem] font-bold text-teal-700 dark:text-teal-400 truncate max-w-full"
            >
              <Stethoscope className="w-2.5 h-2.5 text-teal-500" />
              <span className="truncate">{sc.trim()}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Pricing & Add to Cart button */}
      <div className="flex items-center justify-between gap-1 mt-3">
        <span className="text-xs font-black text-teal-850 dark:text-teal-300">
          {formattedPrice}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product.id);
          }}
          className="w-7 h-7 rounded-lg bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shadow-teal-600/15 dark:shadow-none active:scale-95"
          aria-label={`Tambah ${product.nama} ke keranjang`}
        >
          <ShoppingBasket className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
