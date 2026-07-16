import { Product, Distributor } from '../types';

export function generateSingleHtml(products: Product[], distributors: Record<string, Distributor>): string {
  const productsJson = JSON.stringify(products, null, 2);
  const distributorsJson = JSON.stringify(distributors, null, 2);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.5, maximum-scale=5.0">
  <title>DermaCatalog Pro - Professional Detailing</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
          }
        }
      }
    }
  </script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons via Unpkg -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    :root {
      --bg: #F4FAF8;
      --bg-card: #FFFFFF;
      --bg-secondary: #E6F4F0;
      --text-primary: #0C352F;
      --text-secondary: #426963;
      --border: #C8E3DE;
      --primary: #0D9488;
      --primary-light: #14B8A6;
      --primary-dark: #0F766E;
      --accent: #EA580C;
      --accent-light: #F97316;
      --dot: rgba(13, 148, 136, 0.05);
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
      --shadow: 0 4px 16px -1px rgba(12, 53, 47, 0.08);
      --shadow-lg: 0 12px 32px -4px rgba(12, 53, 47, 0.15);
    }
    .dark {
      --bg: #071714;
      --bg-card: #0E2421;
      --bg-secondary: #122F2A;
      --text-primary: #E2F2EE;
      --text-secondary: #7DA69E;
      --border: #1B453E;
      --primary: #14B8A6;
      --primary-light: #2DD4BF;
      --primary-dark: #0D9488;
      --accent: #F97316;
      --accent-light: #FB923C;
      --dot: rgba(20, 184, 166, 0.03);
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
      --shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 16px 40px -4px rgba(0, 0, 0, 0.5);
    }
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text-primary);
      transition: background 0.3s, color 0.3s;
      background-image: radial-gradient(circle, var(--dot) 1.5px, transparent 1.5px);
      background-size: 24px 24px;
    }
    
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--primary);
    }

    .glass {
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.85);
      border-color: var(--border);
    }
    .dark .glass {
      background: rgba(14, 36, 33, 0.85);
      border-color: var(--border);
    }
    
    /* Product card transition */
    .product-card {
      background: var(--bg-card);
      border-color: var(--border);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .product-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary-light);
      box-shadow: var(--shadow-lg);
    }
  </style>
</head>
<body class="min-height-screen pb-16">

  <!-- ===== HEADER ===== -->
  <header class="sticky top-0 z-40 border-b border-teal-100 dark:border-teal-950/40 glass py-3 px-4">
    <div class="max-w-4xl mx-auto flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-md">
            <i data-lucide="shield-alert" class="w-5 h-5 text-white"></i>
          </div>
          <div>
            <h1 class="text-lg font-extrabold text-teal-800 dark:text-teal-400 tracking-tight leading-tight">DermaCatalog Pro</h1>
            <p class="text-[0.68rem] font-bold tracking-wider text-teal-600/80 dark:text-teal-500/80 uppercase">Professional Medical Detailing</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <button onclick="toggleTheme()" class="w-9 h-9 rounded-xl border border-teal-200/60 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/50 flex items-center justify-center text-teal-700 dark:text-teal-300 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer" aria-label="Toggle tema">
            <i id="themeIcon" data-lucide="sun" class="w-4.5 h-4.5"></i>
          </button>
          
          <!-- Distributor Manager Toggle -->
          <button onclick="toggleDistributorModal()" class="w-9 h-9 rounded-xl border border-teal-200/60 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/50 flex items-center justify-center text-teal-700 dark:text-teal-300 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer" title="Kelola Representative WA">
            <i data-lucide="users" class="w-4.5 h-4.5"></i>
          </button>
          
          <!-- Cart button -->
          <button onclick="toggleCart(true)" class="relative w-9 h-9 rounded-xl border border-teal-200/60 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/50 flex items-center justify-center text-teal-700 dark:text-teal-300 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer" aria-label="Buka Keranjang">
            <i data-lucide="shopping-basket" class="w-4.5 h-4.5"></i>
            <span id="cartCountBadge" class="absolute -top-1.5 -right-1.5 bg-orange-600 text-white font-extrabold text-[0.65rem] w-5 h-5 rounded-full flex items-center justify-center shadow-md scale-0 transition-transform duration-200">0</span>
          </button>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="relative">
        <i data-lucide="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600/70 dark:text-teal-400/60"></i>
        <input type="text" id="searchInput" oninput="handleSearch(this.value)" placeholder="Cari nama obat, indikasi klinis, komposisi..." class="w-full bg-teal-50/40 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-teal-950 dark:text-teal-50 placeholder-teal-600/50 dark:placeholder-teal-400/50 transition-all">
        <button id="clearSearchBtn" onclick="clearSearch()" class="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600/50 hover:text-teal-600 transition-all hidden">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- Category Tabs -->
      <div class="flex gap-1.5 overflow-x-auto pb-1 select-none">
        <button onclick="selectCategory('Semua')" id="tab-Semua" class="cat-tab px-4 py-1.5 rounded-full text-xs font-bold border border-teal-200/50 dark:border-teal-900 bg-white dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 hover:border-teal-500 transition-all cursor-pointer shadow-sm">Semua</button>
        <button onclick="selectCategory('Acne')" id="tab-Acne" class="cat-tab px-4 py-1.5 rounded-full text-xs font-bold border border-teal-200/50 dark:border-teal-900 bg-white dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 hover:border-teal-500 transition-all cursor-pointer shadow-sm">Acne</button>
        <button onclick="selectCategory('Derma Medis')" id="tab-DermaMedis" class="cat-tab px-4 py-1.5 rounded-full text-xs font-bold border border-teal-200/50 dark:border-teal-900 bg-white dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 hover:border-teal-500 transition-all cursor-pointer shadow-sm">Derma Medis</button>
        <button onclick="selectCategory('Skincare')" id="tab-Skincare" class="cat-tab px-4 py-1.5 rounded-full text-xs font-bold border border-teal-200/50 dark:border-teal-900 bg-white dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 hover:border-teal-500 transition-all cursor-pointer shadow-sm">Skincare</button>
      </div>
    </div>
  </header>

  <!-- ===== MAIN GRID ===== -->
  <main class="max-w-4xl mx-auto px-4 mt-6">
    <div class="flex items-center justify-between mb-4 px-1">
      <p id="productCountText" class="text-xs font-bold text-teal-600 dark:text-teal-400/80 tracking-wide uppercase">Memuat produk...</p>
      
      <!-- Sort selection -->
      <div class="flex items-center gap-1.5">
        <i data-lucide="arrow-up-down" class="w-3.5 h-3.5 text-teal-600/80"></i>
        <select id="sortSelect" onchange="handleSort(this.value)" class="text-xs font-bold bg-transparent border-none focus:outline-none text-teal-800 dark:text-teal-300 cursor-pointer">
          <option value="default" class="bg-white dark:bg-teal-950">Default (ID)</option>
          <option value="name-asc" class="bg-white dark:bg-teal-950">Nama (A-Z)</option>
          <option value="price-asc" class="bg-white dark:bg-teal-950">Harga Terendah</option>
          <option value="price-desc" class="bg-white dark:bg-teal-950">Harga Tertinggi</option>
        </select>
      </div>
    </div>

    <!-- Products Grid -->
    <div id="productsGrid" class="grid grid-cols-2 md:grid-cols-3 gap-3"></div>

    <!-- Empty State -->
    <div id="emptyState" class="hidden flex-col items-center justify-center text-center py-16 px-4 bg-teal-50/20 dark:bg-teal-950/10 border border-dashed border-teal-200 dark:border-teal-900 rounded-3xl mt-4">
      <div class="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600 mb-3">
        <i data-lucide="package-open" class="w-6 h-6"></i>
      </div>
      <h3 class="text-sm font-extrabold text-teal-900 dark:text-teal-100">Produk Tidak Ditemukan</h3>
      <p class="text-xs text-teal-600/70 dark:text-teal-400/70 max-w-xs mt-1">Coba sesuaikan kata kunci pencarian atau ganti kategori filter di atas.</p>
    </div>
  </main>

  <!-- ===== PRODUCT DETAILS MODAL ===== -->
  <div id="productModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white dark:bg-[#0E2421] w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] transition-all overflow-hidden border border-teal-100/50 dark:border-teal-900/50">
      <div class="p-4 border-b border-teal-50 dark:border-teal-950/50 flex justify-between items-center bg-teal-50/25 dark:bg-teal-950/25 flex-shrink-0">
        <span id="modalCategoryBadge" class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-black uppercase tracking-wider">Kategori</span>
        <button onclick="closeProductModal()" class="w-8 h-8 rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      
      <div class="overflow-y-auto p-5 flex-1 space-y-5">
        <!-- Hero Image -->
        <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-teal-50 dark:bg-teal-950/50 border border-teal-100/50 dark:border-teal-900/30 group">
          <img id="modalProductImage" src="" alt="" class="w-full h-full object-cover">
          <div id="modalHardMedicineBadge" class="absolute top-2.5 right-2.5 bg-rose-600 text-white font-extrabold text-[0.6rem] px-2 py-0.5 rounded-full tracking-wider shadow-sm hidden">HARUS RESEP DOKTER</div>
        </div>

        <div>
          <h2 id="modalProductName" class="text-lg font-black tracking-tight text-teal-950 dark:text-teal-50">Nama Produk</h2>
          <p id="modalProductPrice" class="text-teal-600 dark:text-teal-400 font-black text-lg mt-0.5">Rp 0</p>
          <p id="modalProductPackaging" class="text-xs font-bold text-teal-600/70 dark:text-teal-400/60 mt-1 flex items-center gap-1.5">
            <i data-lucide="package" class="w-3.5 h-3.5"></i> <span id="modalProductPackagingText">Kemasan</span>
          </p>
        </div>

        <div class="space-y-4">
          <!-- Komposisi -->
          <div class="bg-teal-50/30 dark:bg-teal-950/30 border border-teal-100/30 dark:border-teal-950/50 p-3 rounded-xl">
            <h4 class="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">Kandungan Aktif</h4>
            <p id="modalProductComposition" class="text-sm text-teal-900 dark:text-teal-100 leading-relaxed font-semibold">Komposisi</p>
          </div>

          <!-- Cara Kerja -->
          <div class="space-y-1.5 bg-teal-50/5 dark:bg-teal-950/10 border border-teal-100/20 dark:border-teal-900/15 p-3 rounded-xl">
            <h4 class="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider border-b border-teal-100/30 dark:border-teal-900/20 pb-1 mb-1.5 flex items-center gap-1.5">
              <span class="w-1.5 h-3 bg-teal-500 rounded-full"></span> Instruksi &amp; Cara Pakai
            </h4>
            <div id="modalProductUsage" class="space-y-1"></div>
          </div>

          <!-- Indikasi -->
          <div class="space-y-1.5 bg-teal-50/5 dark:bg-teal-950/10 border border-teal-100/20 dark:border-teal-900/15 p-3 rounded-xl">
            <h4 class="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider border-b border-teal-100/30 dark:border-teal-900/20 pb-1 mb-1.5 flex items-center gap-1.5">
              <span class="w-1.5 h-3 bg-teal-500 rounded-full"></span> Deskripsi &amp; Indikasi Medis
            </h4>
            <div id="modalProductIndication" class="space-y-1"></div>
          </div>

          <!-- Kasus Kulit -->
          <div id="modalSkinCaseContainer" class="hidden space-y-2 bg-teal-50/5 dark:bg-teal-950/10 border border-teal-100/20 dark:border-teal-900/15 p-3 rounded-xl">
            <h4 class="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider border-b border-teal-100/30 dark:border-teal-900/20 pb-1 mb-1.5 flex items-center gap-1.5">
              <span class="w-1.5 h-3 bg-teal-500 rounded-full"></span> Indikasi Kasus Kulit
            </h4>
            <div id="modalProductSkinCases" class="flex flex-wrap gap-1.5 pt-1"></div>
          </div>

          <!-- Sampel Kasus Kulit (Clinical detailing image) -->
          <div id="modalClinicalImageContainer" class="hidden space-y-3 border border-teal-100/40 dark:border-teal-900/30 rounded-xl p-3 bg-teal-50/10 dark:bg-teal-950/20">
            <h4 class="text-xs font-extrabold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="stethoscope" class="w-4 h-4 text-teal-600 dark:text-teal-400"></i>
              <span>Sampel Kasus Kulit (Visual Detailing)</span>
            </h4>
            <div class="flex flex-col sm:flex-row gap-3.5 items-center">
              <div class="w-full sm:w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-teal-50 dark:bg-teal-950/40 border border-teal-100/50 dark:border-teal-900/40 shadow-inner relative">
                <img id="modalClinicalImage" src="" alt="Sampel Kasus" class="w-full h-full object-cover">
              </div>
              <div class="space-y-1.5 flex-1">
                <p class="text-[0.62rem] font-bold text-teal-600/80 dark:text-teal-400/80 uppercase tracking-wider">Sasaran Indikasi Klinis:</p>
                <p id="modalClinicalTarget" class="text-xs font-black text-teal-900 dark:text-teal-100">Masalah Kulit</p>
                <p class="text-[0.68rem] text-teal-700/90 dark:text-teal-300/95 leading-relaxed font-semibold">Sediaan obat ini diformulasikan khusus untuk sasaran klinis di atas. Gambar menunjukkan sampel kondisi kulit yang merespon secara aktif terhadap komposisi bahan aktif utama.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-4 border-t border-teal-50 dark:border-teal-950/50 bg-teal-50/15 dark:bg-teal-950/15 flex items-center gap-3 flex-shrink-0">
        <div class="flex items-center border border-teal-200 dark:border-teal-800 bg-white dark:bg-teal-950 rounded-xl overflow-hidden h-11">
          <button onclick="adjustModalQty(-1)" class="w-10 flex items-center justify-center text-teal-600 hover:bg-teal-100/30 dark:hover:bg-teal-900/30 font-bold cursor-pointer">&minus;</button>
          <input type="number" id="modalQtyInput" value="1" min="1" class="w-10 border-none text-center bg-transparent focus:outline-none text-sm font-extrabold text-teal-950 dark:text-teal-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
          <button onclick="adjustModalQty(1)" class="w-10 flex items-center justify-center text-teal-600 hover:bg-teal-100/30 dark:hover:bg-teal-900/30 font-bold cursor-pointer">+</button>
        </div>
        <button onclick="addFromModal()" class="flex-1 h-11 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-teal-600/10 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer">
          <i data-lucide="shopping-cart" class="w-4 h-4"></i> Tambah Ke Keranjang
        </button>
      </div>
    </div>
  </div>

  <!-- ===== SHOPPING CART SIDEBAR ===== -->
  <div id="cartSidebar" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#0E2421] shadow-2xl border-l border-teal-100/50 dark:border-teal-900/50 flex flex-col h-full transform translate-x-full transition-transform duration-300">
    <div class="p-4 border-b border-teal-50 dark:border-teal-950/50 flex justify-between items-center bg-teal-50/25 dark:bg-teal-950/25 flex-shrink-0">
      <div class="flex items-center gap-2 text-teal-800 dark:text-teal-400">
        <i data-lucide="shopping-cart" class="w-5 h-5"></i>
        <h2 class="text-sm font-black tracking-tight uppercase">Keranjang Pesanan</h2>
      </div>
      <button onclick="toggleCart(false)" class="w-8 h-8 rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>
    
    <!-- Cart Items list -->
    <div id="cartItemsContainer" class="flex-1 overflow-y-auto p-4 space-y-3"></div>

    <!-- Empty Cart state -->
    <div id="cartEmptyState" class="hidden flex-1 flex-col items-center justify-center text-center p-8">
      <div class="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600/60 dark:text-teal-500/50 mb-3">
        <i data-lucide="shopping-basket" class="w-7 h-7"></i>
      </div>
      <h3 class="text-sm font-extrabold text-teal-950 dark:text-teal-100">Keranjang Masih Kosong</h3>
      <p class="text-xs text-teal-600/70 dark:text-teal-400/70 max-w-xs mt-1">Tambahkan beberapa produk medis atau perawatan kulit yang ingin dipesan terlebih dahulu.</p>
    </div>

    <!-- Checkout Form (only shown if cart not empty) -->
    <div id="cartCheckoutArea" class="p-4 border-t border-teal-50 dark:border-teal-950/50 bg-teal-50/20 dark:bg-teal-950/20 space-y-4 flex-shrink-0">
      <div class="flex items-center justify-between font-black text-sm text-teal-950 dark:text-teal-50">
        <span>ESTIMASI TOTAL</span>
        <span id="cartTotalText" class="text-teal-600 dark:text-teal-400 text-lg">Rp 0</span>
      </div>

      <div class="space-y-3">
        <!-- Distributor rep selector -->
        <div>
          <label class="block text-[0.68rem] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase mb-1 flex items-center gap-1.5">
            <i data-lucide="truck" class="w-3.5 h-3.5"></i> Sales Representative / Pengiriman
          </label>
          <select id="checkoutDistributor" class="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50 font-semibold">
            <!-- Filled dynamically -->
          </select>
        </div>

        <!-- Pharmacy name / Doctor name -->
        <div>
          <label class="block text-[0.68rem] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase mb-1 flex items-center gap-1.5">
            <i data-lucide="building" class="w-3.5 h-3.5"></i> Nama Apotek / Dokter / Klinik *
          </label>
          <input type="text" id="checkoutPharmacy" placeholder="Contoh: Apotek Sehat / Dr. Sarah" class="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50">
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-[0.68rem] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase mb-1 flex items-center gap-1.5">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Catatan Manual (Opsional)
          </label>
          <textarea id="checkoutNotes" rows="2" placeholder="Tulis instruksi pengiriman khusus, dll..." class="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50 resize-none"></textarea>
        </div>

        <button onclick="submitOrder()" class="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2">
          <i data-lucide="message-square" class="w-4 h-4 text-white"></i> Kirim Pesanan via WhatsApp
        </button>
      </div>
    </div>
  </div>

  <!-- ===== DISTRIBUTOR SETTINGS MODAL ===== -->
  <div id="distributorModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-[#0E2421] w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[85vh] transition-all overflow-hidden border border-teal-100/50 dark:border-teal-900/50">
      <div class="p-4 border-b border-teal-50 dark:border-teal-950/50 flex justify-between items-center bg-teal-50/25 dark:bg-teal-950/25">
        <div class="flex items-center gap-2 text-teal-800 dark:text-teal-400">
          <i data-lucide="users" class="w-5 h-5"></i>
          <h2 class="text-sm font-black uppercase">Pengaturan Sales / WA</h2>
        </div>
        <button onclick="toggleDistributorModal()" class="w-8 h-8 rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition-all cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      
      <div class="overflow-y-auto p-5 flex-1 space-y-4">
        <p class="text-xs text-teal-600 dark:text-teal-400 leading-relaxed font-semibold">Tentukan sales rep beserta nomor WhatsApp di bawah. Nomor harus diawali kode negara (628...), tanpa spasi atau tanda strip (-). Pengaturan disimpan secara lokal di browser Anda.</p>
        
        <div id="distributorsFormContainer" class="space-y-4 pt-1">
          <!-- Form fields filled dynamically -->
        </div>
      </div>
      
      <div class="p-4 border-t border-teal-50 dark:border-teal-950/50 bg-teal-50/15 dark:bg-teal-950/15 flex justify-end gap-3">
        <button onclick="toggleDistributorModal()" class="px-4 h-10 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 rounded-xl font-bold text-xs cursor-pointer">Batal</button>
        <button onclick="saveDistributors()" class="px-5 h-10 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white rounded-xl font-bold text-xs shadow-md cursor-pointer">Simpan Perubahan</button>
      </div>
    </div>
  </div>

  <!-- ===== FLOATING TOAST ===== -->
  <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-teal-950 dark:bg-teal-900 border border-teal-800 dark:border-teal-700 text-teal-50 px-5 py-3 rounded-xl font-bold text-xs shadow-xl tracking-wide flex items-center gap-2 opacity-0 translate-y-12 transition-all duration-300 pointer-events-none">
    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
    <span id="toastText">Pesan pemberitahuan</span>
  </div>

  <!-- ===== EMBEDDED DATABASES (PARSED VIA JAVASCRIPT) ===== -->
  <script id="productsData" type="application/json">${productsJson}</script>
  <script id="distributorsData" type="application/json">${distributorsJson}</script>

  <!-- ===== APPLICATION LOGIC ===== -->
  <script>
    // Load embedded databases
    let products = [];
    let distributors = {};
    let cart = [];
    let currentCategory = "Semua";
    let searchQuery = "";
    let activeSort = "default";
    
    // Active states
    let selectedProductId = null;
    let modalQty = 1;

    // Initialize application
    document.addEventListener("DOMContentLoaded", () => {
      try {
        products = JSON.parse(document.getElementById("productsData").textContent);
        
        // Load distributors from localStorage, or fall back to embedded data
        const savedDist = localStorage.getItem("derma_distributors");
        if (savedDist) {
          distributors = JSON.parse(savedDist);
        } else {
          distributors = JSON.parse(document.getElementById("distributorsData").textContent);
        }
        
        // Load cart from localStorage
        const savedCart = localStorage.getItem("derma_cart");
        if (savedCart) {
          cart = JSON.parse(savedCart);
        }
        
        // Init theme from localStorage
        const savedTheme = localStorage.getItem("derma_theme") || "light";
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
          updateThemeIcon("dark");
        } else {
          document.documentElement.classList.remove("dark");
          updateThemeIcon("light");
        }
        
        lucide.createIcons();
        renderProducts();
        updateCartBadge();
        fillDistributorOptions();
        fillDistributorSettingsForm();
      } catch (err) {
        console.error("Gagal menginisialisasi katalog:", err);
      }
    });

    // Theme toggle
    function toggleTheme() {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("derma_theme", isDark ? "dark" : "light");
      updateThemeIcon(isDark ? "dark" : "light");
    }

    function updateThemeIcon(theme) {
      const btn = document.getElementById("themeIcon");
      if (!btn) return;
      if (theme === "dark") {
        btn.setAttribute("data-lucide", "moon");
      } else {
        btn.setAttribute("data-lucide", "sun");
      }
      lucide.createIcons();
    }

    // Category filter
    function selectCategory(cat) {
      currentCategory = cat;
      document.querySelectorAll(".cat-tab").forEach(tab => {
        tab.classList.remove("bg-teal-600", "dark:bg-teal-500", "text-white", "border-teal-600");
        tab.classList.add("bg-white", "dark:bg-teal-950/60", "text-teal-700", "dark:text-teal-400");
      });
      
      const activeTabId = cat === "Semua" ? "tab-Semua" : "tab-" + cat.replace(/\s+/g, '');
      const activeTab = document.getElementById(activeTabId);
      if (activeTab) {
        activeTab.classList.remove("bg-white", "dark:bg-teal-950/60", "text-teal-700", "dark:text-teal-400");
        activeTab.classList.add("bg-teal-600", "dark:bg-teal-500", "text-white", "border-teal-600");
      }
      
      renderProducts();
    }

    // Search logic
    function handleSearch(val) {
      searchQuery = val;
      const clearBtn = document.getElementById("clearSearchBtn");
      if (val.trim() !== "") {
        clearBtn.classList.remove("hidden");
      } else {
        clearBtn.classList.add("hidden");
      }
      renderProducts();
    }

    function clearSearch() {
      document.getElementById("searchInput").value = "";
      searchQuery = "";
      document.getElementById("clearSearchBtn").classAdd = "hidden";
      renderProducts();
    }

    // Sort logic
    function handleSort(val) {
      activeSort = val;
      renderProducts();
    }

    // Formatting utils
    function formatRp(n) {
      return "Rp " + n.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
    }

    function getBadgeClass(kat) {
      if (kat === 'Acne') return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50';
      if (kat === 'Derma Medis') return 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200/50 dark:border-sky-900/50';
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50';
    }

    // Render products list
    function renderProducts() {
      const grid = document.getElementById("productsGrid");
      const emptyState = document.getElementById("emptyState");
      const countText = document.getElementById("productCountText");
      
      if (!grid) return;
      
      const q = searchQuery.toLowerCase().trim();
      
      // Filter list
      let filtered = products.filter(p => {
        const matchesCategory = currentCategory === "Semua" || p.kategori === currentCategory;
        if (!matchesCategory) return false;
        
        if (q === "") return true;
        
        return p.nama.toLowerCase().includes(q) ||
               p.komposisi.toLowerCase().includes(q) ||
               p.indikasi.toLowerCase().includes(q) ||
               (p.kasusKulit && p.kasusKulit.toLowerCase().includes(q));
      });
      
      // Sort list
      if (activeSort === "name-asc") {
        filtered.sort((a, b) => a.nama.localeCompare(b.nama));
      } else if (activeSort === "price-asc") {
        filtered.sort((a, b) => a.harga - b.harga);
      } else if (activeSort === "price-desc") {
        filtered.sort((a, b) => b.harga - a.harga);
      } else {
        filtered.sort((a, b) => a.id - b.id);
      }
      
      countText.textContent = filtered.length + " produk ditemukan";
      
      if (filtered.length === 0) {
        grid.innerHTML = "";
        emptyState.classList.remove("hidden");
        return;
      }
      
      emptyState.classList.add("hidden");
      
      grid.innerHTML = filtered.map(p => {
        const isHard = p.isHardMedicine ? 'border-rose-300 dark:border-rose-950' : '';
        const warnTag = p.isHardMedicine ? '<span class="absolute top-2 right-2 bg-rose-600 text-white font-extrabold text-[0.55rem] px-1.5 py-0.5 rounded-full tracking-wider shadow-sm">RESEP</span>' : '';
        const briefComp = p.komposisi.length > 32 ? p.komposisi.substring(0, 32) + "..." : p.komposisi;
        
        const cases = p.kasusKulit 
          ? p.kasusKulit.split(',').slice(0, 1).map(c => \`<span class="inline-block bg-teal-50 dark:bg-teal-950 border border-teal-100 dark:border-teal-900 rounded-md px-1.5 py-0.5 text-[0.62rem] font-bold text-teal-700 dark:text-teal-400 mt-1 truncate max-w-full">🩺 \${c.trim()}</span>\`).join('')
          : '';

        return \`
          <div onclick="openProductModal(\${p.id})" class="product-card border p-2.5 rounded-2xl flex flex-col justify-between cursor-pointer select-none relative \${isHard}">
            <div>
              <div class="relative aspect-square w-full rounded-xl overflow-hidden bg-teal-50/50 dark:bg-teal-950/20 mb-2.5 border border-teal-100/10">
                <img src="\${p.gambar[0]}" alt="\${p.nama}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=40'">
                \${warnTag}
                <span class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md text-[0.58rem] font-black tracking-wider uppercase \${getBadgeClass(p.kategori)}">\${p.kategori}</span>
              </div>
              <h3 class="font-extrabold text-xs text-teal-950 dark:text-teal-50 leading-snug line-clamp-2" title="\${p.nama}">\${p.nama}</h3>
              <p class="text-[0.65rem] font-semibold text-teal-600/70 dark:text-teal-400/60 line-clamp-1 mt-0.5">\${briefComp}</p>
              <div class="w-full flex">\${cases}</div>
            </div>
            
            <div class="flex items-center justify-between gap-1 mt-3">
              <span class="text-xs font-black text-teal-750 dark:text-teal-350">\${formatRp(p.harga)}</span>
              <button onclick="event.stopPropagation(); quickAddToCart(\${p.id})" class="w-7 h-7 rounded-lg bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shadow-teal-600/10 dark:shadow-none" aria-label="Tambah \${p.nama} ke keranjang">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        \`;
      }).join("");
      
      lucide.createIcons();
    }

    // Modal Details Logic
    function renderFormattedParagraphs(text) {
      if (!text) return "";
      return text.split("\n").map(para => {
        const trimmed = para.trim();
        if (!trimmed) return "";
        
        // Ordered lists (e.g. 1. Cuci...)
        if (/^\d+\.\s/.test(trimmed)) {
          const num = trimmed.match(/^(\d+)\.\s/)?.[1] || "";
          const rest = trimmed.replace(/^\d+\.\s/, "");
          return \`
            <div class="flex gap-2.5 items-start mt-1.5 pl-1">
              <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50 text-[0.62rem] font-black text-teal-800 dark:text-teal-300">
                \${num}
              </span>
              <p class="text-xs text-teal-900/80 dark:text-teal-100/80 font-bold leading-relaxed">
                \${rest}
              </p>
            </div>
          \`;
        }
        
        // Bullet lists
        if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          const rest = trimmed.replace(/^[-*]\s*/, "");
          return \`
            <div class="flex gap-2 items-start mt-1 pl-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0 mt-2"></span>
              <p class="text-xs text-teal-900/80 dark:text-teal-100/80 font-bold leading-relaxed">
                \${rest}
              </p>
            </div>
          \`;
        }
        
        // Header labels (e.g. [Petunjuk Langkah-Demi-Langkah])
        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
          return \`
            <h5 class="text-[0.65rem] font-black text-teal-700 dark:text-teal-400 uppercase tracking-wider mt-3 mb-1 border-b border-teal-100/15 dark:border-teal-900/15 pb-0.5">
              \${trimmed.substring(1, trimmed.length - 1)}
            </h5>
          \`;
        }
        
        // Plain paragraphs
        return \`
          <p class="text-xs text-teal-850 dark:text-teal-150 leading-relaxed font-semibold mt-1">
            \${trimmed}
          </p>
        \`;
      }).join("");
    }

    function openProductModal(id) {
      const p = products.find(x => x.id === id);
      if (!p) return;
      
      selectedProductId = id;
      modalQty = 1;
      document.getElementById("modalQtyInput").value = 1;
      
      const badge = document.getElementById("modalCategoryBadge");
      badge.className = "px-2.5 py-0.5 rounded-full text-[0.65rem] font-black uppercase tracking-wider " + getBadgeClass(p.kategori);
      badge.textContent = p.kategori;
      
      document.getElementById("modalProductImage").src = p.gambar[0];
      
      if (p.isHardMedicine) {
        document.getElementById("modalHardMedicineBadge").classList.remove("hidden");
      } else {
        document.getElementById("modalHardMedicineBadge").classList.add("hidden");
      }
      
      document.getElementById("modalProductName").textContent = p.nama;
      document.getElementById("modalProductPrice").textContent = formatRp(p.harga);
      document.getElementById("modalProductPackagingText").textContent = p.kemasan;
      document.getElementById("modalProductComposition").textContent = p.komposisi;
      
      document.getElementById("modalProductUsage").innerHTML = renderFormattedParagraphs(p.caraKerja);
      document.getElementById("modalProductIndication").innerHTML = renderFormattedParagraphs(p.indikasi);
      
      const caseContainer = document.getElementById("modalSkinCaseContainer");
      const casesGrid = document.getElementById("modalProductSkinCases");
      if (p.kasusKulit) {
        casesGrid.innerHTML = p.kasusKulit.split(",").map(c => \`
          <span class="inline-flex items-center gap-1 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 rounded-full px-2.5 py-1 text-xs font-bold text-teal-800 dark:text-teal-400">
            🩺 \${c.trim()}
          </span>
        \`).join("");
        caseContainer.classList.remove("hidden");
      } else {
        casesGrid.innerHTML = "";
        caseContainer.classList.add("hidden");
      }

      // Handle Clinical Detailing Image (gambarKasus)
      const clinicalContainer = document.getElementById("modalClinicalImageContainer");
      if (p.gambarKasus) {
        document.getElementById("modalClinicalImage").src = p.gambarKasus;
        document.getElementById("modalClinicalTarget").textContent = p.kasusKulit ? p.kasusKulit.split(",")[0].trim() : "Masalah Kulit";
        clinicalContainer.classList.remove("hidden");
      } else {
        clinicalContainer.classList.add("hidden");
      }
      
      document.getElementById("productModal").classList.remove("hidden");
      document.getElementById("productModal").classList.add("flex");
      document.body.style.overflow = "hidden";
      lucide.createIcons();
    }

    function closeProductModal() {
      document.getElementById("productModal").classList.add("hidden");
      document.getElementById("productModal").classList.remove("flex");
      document.body.style.overflow = "";
      selectedProductId = null;
    }

    function adjustModalQty(v) {
      modalQty = Math.max(1, modalQty + v);
      document.getElementById("modalQtyInput").value = modalQty;
    }

    function addFromModal() {
      if (selectedProductId) {
        addToCart(selectedProductId, modalQty);
        closeProductModal();
      }
    }

    // Shopping Cart Logic
    function toggleCart(open) {
      const el = document.getElementById("cartSidebar");
      if (open) {
        renderCart();
        el.classList.remove("translate-x-full");
        document.body.style.overflow = "hidden";
      } else {
        el.classList.add("translate-x-full");
        document.body.style.overflow = "";
      }
    }

    function quickAddToCart(id) {
      addToCart(id, 1);
    }

    function addToCart(id, qty) {
      const existing = cart.find(x => x.productId === id);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ productId: id, qty });
      }
      
      saveCart();
      updateCartBadge();
      showToast("Ditambahkan ke keranjang!");
    }

    function removeFromCart(id) {
      cart = cart.filter(x => x.productId !== id);
      saveCart();
      updateCartBadge();
      renderCart();
    }

    function adjustCartItemQty(id, v) {
      const item = cart.find(x => x.productId === id);
      if (!item) return;
      
      item.qty = Math.max(1, item.qty + v);
      saveCart();
      updateCartBadge();
      
      // Update totals in real-time
      const itemTotalEl = document.getElementById("itemTotal-" + id);
      const prod = products.find(p => p.id === id);
      if (itemTotalEl && prod) {
        itemTotalEl.textContent = formatRp(prod.harga * item.qty);
      }
      
      document.getElementById("cartTotalText").textContent = formatRp(getCartTotal());
    }

    function saveCart() {
      localStorage.setItem("derma_cart", JSON.stringify(cart));
    }

    function updateCartBadge() {
      const badge = document.getElementById("cartCountBadge");
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove("scale-0");
        badge.classList.add("scale-100");
      } else {
        badge.classList.remove("scale-100");
        badge.classList.add("scale-0");
      }
    }

    function getCartTotal() {
      return cart.reduce((sum, item) => {
        const p = products.find(x => x.id === item.productId);
        return sum + (p ? p.harga * item.qty : 0);
      }, 0);
    }

    function renderCart() {
      const container = document.getElementById("cartItemsContainer");
      const emptyState = document.getElementById("cartEmptyState");
      const checkoutArea = document.getElementById("cartCheckoutArea");
      
      if (cart.length === 0) {
        container.innerHTML = "";
        emptyState.classList.remove("hidden");
        checkoutArea.classList.add("hidden");
        return;
      }
      
      emptyState.classList.add("hidden");
      checkoutArea.classList.remove("hidden");
      document.getElementById("cartTotalText").textContent = formatRp(getCartTotal());
      
      container.innerHTML = cart.map(item => {
        const p = products.find(x => x.id === item.productId);
        if (!p) return "";
        
        return \`
          <div class="flex items-center gap-3 bg-teal-50/10 dark:bg-teal-950/20 border border-teal-100/50 dark:border-teal-900/50 p-2.5 rounded-xl">
            <img src="\${p.gambar[0]}" alt="\${p.nama}" class="w-11 h-11 rounded-lg object-cover bg-teal-100/25" onerror="this.src='https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=40'">
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-black text-teal-950 dark:text-teal-50 truncate">\${p.nama}</h4>
              <p class="text-[0.68rem] text-teal-600 dark:text-teal-400 font-bold">\${formatRp(p.harga)}</p>
              
              <div class="flex items-center justify-between gap-1 mt-1.5">
                <div class="flex items-center border border-teal-200 dark:border-teal-800 bg-white dark:bg-teal-950 rounded-lg overflow-hidden scale-90 origin-left">
                  <button onclick="adjustCartItemQty(\${p.id}, -1)" class="w-7 h-6 flex items-center justify-center text-teal-600 font-black cursor-pointer">&minus;</button>
                  <span class="w-8 text-center text-xs font-black text-teal-900 dark:text-teal-50">\${item.qty}</span>
                  <button onclick="adjustCartItemQty(\${p.id}, 1)" class="w-7 h-6 flex items-center justify-center text-teal-600 font-black cursor-pointer">+</button>
                </div>
                <span id="itemTotal-\${p.id}" class="text-xs font-black text-teal-850 dark:text-teal-350">\${formatRp(p.harga * item.qty)}</span>
              </div>
            </div>
            <button onclick="removeFromCart(\&apos;\${p.id}\&apos;)" class="text-teal-600/50 hover:text-rose-500 cursor-pointer self-start p-1" title="Hapus item">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        \`;
      }).join("");
      
      lucide.createIcons();
    }

    // Distributor Rep Select logic
    function fillDistributorOptions() {
      const select = document.getElementById("checkoutDistributor");
      if (!select) return;
      
      select.innerHTML = Object.entries(distributors).map(([key, d]) => \`
        <option value="\${key}">\${d.nama} (\${d.wa})</option>
      \`).join("");
    }

    // Distributor Manager Modal
    function toggleDistributorModal() {
      const el = document.getElementById("distributorModal");
      const isHidden = el.classList.contains("hidden");
      
      if (isHidden) {
        fillDistributorSettingsForm();
        el.classList.remove("hidden");
        el.classList.add("flex");
        document.body.style.overflow = "hidden";
      } else {
        el.classList.add("hidden");
        el.classList.remove("flex");
        document.body.style.overflow = "";
      }
    }

    function fillDistributorSettingsForm() {
      const container = document.getElementById("distributorsFormContainer");
      if (!container) return;
      
      container.innerHTML = Object.entries(distributors).map(([key, d]) => \`
        <div class="space-y-1.5 border border-teal-100/60 dark:border-teal-900/40 p-3 rounded-xl bg-teal-50/10">
          <span class="text-[0.62rem] font-bold text-teal-600 uppercase tracking-wider">Representative \${key}</span>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[0.6rem] text-teal-600/70 font-semibold">Nama Sales</label>
              <input type="text" id="editDistName-\${key}" value="\${d.nama}" class="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg px-2.5 py-1.5 text-xs text-teal-900 dark:text-teal-100">
            </div>
            <div>
              <label class="text-[0.6rem] text-teal-600/70 font-semibold">WhatsApp (628...)</label>
              <input type="text" id="editDistWa-\${key}" value="\${d.wa}" class="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg px-2.5 py-1.5 text-xs text-teal-900 dark:text-teal-100">
            </div>
          </div>
        </div>
      \`).join("");
    }

    function saveDistributors() {
      try {
        const updated = {};
        for (const key of Object.keys(distributors)) {
          const nameInput = document.getElementById("editDistName-" + key);
          const waInput = document.getElementById("editDistWa-" + key);
          
          if (nameInput && waInput) {
            let wa = waInput.value.replace(/[^0-9]/g, "");
            if (wa.startsWith("0")) {
              wa = "62" + wa.substring(1);
            }
            updated[key] = {
              nama: nameInput.value.trim(),
              wa: wa
            };
          }
        }
        
        distributors = updated;
        localStorage.setItem("derma_distributors", JSON.stringify(updated));
        fillDistributorOptions();
        toggleDistributorModal();
        showToast("Pengaturan perwakilan disimpan!");
      } catch (err) {
        showToast("Gagal menyimpan pengaturan.");
      }
    }

    // Submit Order to WhatsApp
    function submitOrder() {
      const distKey = document.getElementById("checkoutDistributor").value;
      const pharmacy = document.getElementById("checkoutPharmacy").value.trim();
      const notes = document.getElementById("checkoutNotes").value.trim();
      
      if (cart.length === 0) {
        showToast("Keranjang Anda masih kosong.");
        return;
      }
      if (!distKey) {
        showToast("Silakan pilih representative pengiriman.");
        return;
      }
      if (!pharmacy) {
        showToast("Nama Apotek / Dokter wajib diisi.");
        document.getElementById("checkoutPharmacy").focus();
        return;
      }
      
      const rep = distributors[distKey];
      
      // WhatsApp message formatting
      let msg = "Halo mas " + rep.nama + ", saya dari * " + pharmacy + " * ingin memesan produk berikut:\\n\\n";
      
      cart.forEach((item, index) => {
        const p = products.find(x => x.id === item.productId);
        if (p) {
          msg += (index + 1) + ". *" + p.nama + "*\\n" +
                 "   Kemasan: " + p.kemasan + "\\n" +
                 "   Jumlah: " + item.qty + " pcs\\n" +
                 "   Harga: " + formatRp(p.harga * item.qty) + "\\n\\n";
        }
      });
      
      msg += "*ESTIMASI TOTAL ORDER:* " + formatRp(getCartTotal()) + "\\n";
      
      if (notes !== "") {
        msg += "Catatan: " + notes + "\\n";
      }
      
      msg += "\\nTerima kasih.";
      
      const waUrl = "https://wa.me/" + rep.wa + "?text=" + encodeURIComponent(msg);
      window.open(waUrl, "_blank");
      
      // Clear cart
      cart = [];
      saveCart();
      updateCartBadge();
      toggleCart(false);
      
      document.getElementById("checkoutPharmacy").value = "";
      document.getElementById("checkoutNotes").value = "";
      
      showToast("Pesanan diteruskan ke WhatsApp!");
    }

    // Toast Notification
    let toastTimer = null;
    function showToast(msg) {
      const el = document.getElementById("toast");
      const text = document.getElementById("toastText");
      
      text.textContent = msg;
      el.classList.remove("opacity-0", "translate-y-12");
      el.classList.add("opacity-100", "translate-y-0");
      
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        el.classList.add("opacity-0", "translate-y-12");
        el.classList.remove("opacity-100", "translate-y-0");
      }, 2500);
    }
  </script>
</body>
</html>`;
}
