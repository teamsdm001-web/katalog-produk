export interface Product {
  id: number;
  kategori: 'Acne' | 'Derma Medis' | 'Skincare';
  nama: string;
  komposisi: string;
  kemasan: string;
  caraKerja: string;
  indikasi: string;
  kasusKulit?: string;
  harga: number;
  gambar: string[];
  gambarKasus?: string; // Gambar sampel kasus kulit terkait (e.g. jerawat meradang, hiperpigmentasi, dsb.)
  isHardMedicine?: boolean; // Warning badge for medical prescription creams
}

export interface Distributor {
  nama: string;
  wa: string;
}

export interface CartItem {
  productId: number;
  qty: number;
}
