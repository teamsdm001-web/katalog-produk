# Folder Gambar Produk

Letakkan file gambar produk Anda di folder ini (misalnya `benzolaccl.jpg`, `erymedgel.jpg`, dsb.) menggunakan pengelola file atau unggah langsung. 

File yang Anda taruh di sini akan otomatis dapat diakses oleh aplikasi melalui jalur `/produk/nama_file.jpg`.

## Contoh:
Jika Anda mengunggah gambar dengan nama `benzolaccl.jpg` ke folder ini, maka di dalam file database produk Anda (`src/data/acneProducts.ts`), Anda bisa mendefinisikannya seperti ini:
```typescript
gambar: ['/produk/benzolaccl.jpg']
```

## Menggunakan Link Internet (Alternatif):
Jika Anda tidak ingin mengunggah file gambar ke folder ini, Anda juga bisa langsung menggunakan tautan URL gambar dari internet (misal: `https://images.unsplash.com/...` atau link web lainnya) di dalam database produk Anda. Contoh:
```typescript
gambar: ['https://nama-website.com/gambar-obat.jpg']
```
