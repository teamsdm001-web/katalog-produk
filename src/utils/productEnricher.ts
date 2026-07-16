import { Product } from '../types';

// High-quality, professional skin-detailing images from Unsplash
const IMAGE_MAPPING = {
  acneActive: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80', // Active acne / redness
  acneClogged: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80', // Clogged pores / blackheads / comedones
  drySkin: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80', // Dry, sensitive skin, scaling, xerosis
  eczemaGatal: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80', // Irritated skin, eczema, red patches
  pigmentation: 'https://images.unsplash.com/photo-1501514312696-73d7557e0bb3?w=600&auto=format&fit=crop&q=80', // Dark spots, sun spots, hyperpigmentation, melasma
  glassSkin: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80', // Clean skin barrier, glowing skincare
  matureSkin: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&auto=format&fit=crop&q=80', // Aging, lines, saggy skin
  bodySkin: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop&q=80', // Body treatment, backne, general dermatology
};

/**
 * Dynamically enriches any raw Product object with comprehensive clinical details,
 * professional usage steps, and appropriate high-quality clinical skin-concern sample images.
 */
export function enrichProduct(product: Product): Product {
  const comp = product.komposisi.toUpperCase();
  const name = product.nama.toUpperCase();
  const kat = product.kategori;

  let mappedImage = IMAGE_MAPPING.glassSkin;
  let customIndikasi = '';
  let customCaraKerja = '';

  // 1. CLINDAMYCIN (Antibiotic for pustular/inflammatory acne)
  if (comp.includes('CLINDAMYCIN') || comp.includes('KLINDAMISIN')) {
    mappedImage = IMAGE_MAPPING.acneActive;
    customIndikasi = 
      'Mengandung Clindamycin Phosphate 1.2%, suatu antibiotik lincosamide topikal semi-sintetik. ' +
      'Bekerja secara spesifik mengikat subunit ribosom 50S dari kuman Propionibacterium acnes (Cutibacterium acnes), ' +
      'menghambat sintesis protein dinding bakteri, sehingga menekan mediator radang yang memicu timbulnya jerawat nanah (pustula) ' +
      'dan nodul merah yang keras. Obat ini mencegah infeksi bakteri menyebar ke jaringan kelenjar sebasea tetangga.';
    customCaraKerja = 
      '1. Cuci tangan dan wajah secara menyeluruh dengan sabun pembersih wajah yang lembut (pH netral).\n' +
      '2. Keringkan kulit secara perlahan menggunakan handuk bersih/tisu bersih dengan cara ditepuk-tepuk halus.\n' +
      '3. Totolkan obat tipis-tipis secara presisi HANYA pada bagian jerawat yang sedang meradang (merah, bengkak, atau bernanah).\n' +
      '4. Gunakan secara teratur 2 kali sehari (pagi hari sebelum tabir surya dan malam hari sebelum tidur).\n' +
      '5. Lindungi kulit dari kekeringan dengan pelembap berbasis air (oil-free) dan wajib pakai tabir surya di pagi hari.';
  }
  // 2. BENZOYL PEROXIDE / BPO (Oxidizer for bacteria)
  else if (comp.includes('BENZOIL') || comp.includes('BENZOYL') || comp.includes('BPO')) {
    mappedImage = IMAGE_MAPPING.acneActive;
    customIndikasi = 
      'Mengandung Benzoyl Peroxide (BPO) aktif. Bekerja sebagai agen oksidasi kuat dengan melepas oksigen aktif ' +
      'ke dalam pori-pori yang tersumbat. Karena bakteri penyebab jerawat bersifat anaerob (sensitif terhadap oksigen), ' +
      'BPO membunuh kuman P. acnes secara langsung tanpa memicu resistensi antibiotik. Juga memiliki aksi keratolitik ringan ' +
      'yang melunakkan sumbatan keratin sel kulit mati di mulut folikel rambut, membantu komedo terangkat keluar.';
    customCaraKerja = 
      '1. Bersihkan wajah dan tunggu hingga kulit benar-benar kering sempurna (sekitar 10-15 menit).\n' +
      '2. Oleskan gel tipis-tipis HANYA pada area kulit yang berjerawat 1-2 kali sehari.\n' +
      '3. Hindari area sensitif seperti sudut bibir, lipatan hidung, serta kulit di dekat mata.\n' +
      '4. Gunakan pelembap berformula menenangkan (mengandung Ceramide atau Panthenol) sesudahnya untuk meredakan kemerahan.\n' +
      '5. Jika kulit mengelupas parah atau terasa terbakar, kurangi frekuensi penggunaan menjadi 2 hari sekali pada malam hari.';
  }
  // 3. RETINOIDS (Adapalene, Tretinoin - cell renewal)
  else if (comp.includes('ADAPALENE') || comp.includes('TRETINOIN') || comp.includes('RETINOAT') || comp.includes('RETIN-A')) {
    mappedImage = IMAGE_MAPPING.acneClogged;
    customIndikasi = 
      'Mengandung Retinoid topikal aktif (seperti Adapalene atau Tretinoin). Bekerja langsung pada reseptor asam retinoat nuklear (RAR) ' +
      'untuk menormalkan siklus diferensiasi dan regenerasi sel epitel folikel kulit. Hal ini mencegah sel kulit mati menumpuk ' +
      'dan lengket di dalam pori-pori (efek komedolitik kuat). Sangat efektif membersihkan komedo hitam (blackheads), ' +
      'komedo putih (whiteheads), serta menyamarkan bopeng bekas jerawat dengan cara merangsang produksi kolagen kulit.';
    customCaraKerja = 
      '1. Hanya gunakan pada MALAM HARI sebelum tidur.\n' +
      '2. Cuci wajah, keringkan sepenuhnya, dan tunggu 15-20 menit hingga kulit kering bebas kelembapan residual.\n' +
      '3. Ambil seukuran biji kacang polong (pea-sized) untuk seluruh wajah, totolkan secara merata, lalu ratakan dengan lembut.\n' +
      '4. Hindari area sensitif: sudut mata, bibir, dan sudut lubang hidung.\n' +
      '5. Di pagi hari, Anda WAJIB mengoleskan tabir surya SPF 30+ karena retinoid meningkatkan sensitivitas kulit terhadap sinar matahari.';
  }
  // 4. UREA (Xerosis & Hyperkeratosis)
  else if (comp.includes('UREA')) {
    mappedImage = IMAGE_MAPPING.drySkin;
    customIndikasi = 
      'Mengandung bahan aktif Urea medis. Urea berfungsi ganda: pada kadar sedang (10%) bertindak sebagai humektan alami kuat ' +
      'yang menarik air dari lapisan dermis dan lingkungan sekitar ke dalam stratum korneum untuk mengatasi kulit kering pecah-pecah. ' +
      'Pada kadar tinggi (20%), Urea memiliki sifat keratolitik yang memecah protein keratin yang mengeras, sehingga menipiskan kulit kapalan, ' +
      'siku bersisik, tumit pecah-pecah, serta meredakan rasa gatal hebat yang disebabkan oleh hilangnya lipid kulit.';
    customCaraKerja = 
      '1. Cuci area kulit yang bermasalah (seperti tumit, siku, tangan) lalu keringkan perlahan.\n' +
      '2. Oleskan krim secara merata dan tebal pada bagian kulit yang pecah-pecah atau bersisik kasar.\n' +
      '3. Gunakan secara rutin 2-3 kali sehari, terutama segera setelah mandi saat kulit masih menyimpan sisa hidrasi air.\n' +
      '4. Untuk penanganan tumit pecah-pecah parah di malam hari, oleskan krim tebal lalu tutupi dengan kaos kaki semalaman.';
  }
  // 5. CORTICOSTEROIDS (Desonide, Hydrocortisone, Betamethasone, Clobetasol)
  else if (
    comp.includes('DESONIDE') || 
    comp.includes('DESONID') || 
    comp.includes('HYDROCORTISONE') || 
    comp.includes('BETAMETHASONE') || 
    comp.includes('MOMETASONE') || 
    comp.includes('CLOBETASOL')
  ) {
    mappedImage = IMAGE_MAPPING.eczemaGatal;
    customIndikasi = 
      'Mengandung kortikosteroid topikal aktif. Bekerja sebagai anti-inflamasi kuat dengan menginduksi protein lipokortin ' +
      'untuk menghambat pelepasan asam arakidonat yang merupakan cikal bakal mediator radang (prostaglandin & leukotrien). ' +
      'Sangat efektif mengontrol dan meredakan reaksi alergi, gatal-gatal hebat, bengkak kemerahan, serta ruam kulit akibat ' +
      'dermatitis atopik (eksim), dermatitis kontak, psoriasis, maupun reaksi gigitan serangga.';
    customCaraKerja = 
      '1. Bersihkan kulit yang mengalami ruam atau gatal, keringkan secara higienis.\n' +
      '2. Oleskan krim/salep tipis-tipis secara merata HANYA pada bagian yang gatal/merah (tidak untuk seluruh wajah/tubuh).\n' +
      '3. Gunakan 2 kali sehari secara teratur (pagi dan malam).\n' +
      '4. Batasi durasi penggunaan maksimal 7-14 hari berturut-turut untuk mencegah efek samping penipisan kulit (atrofi).\n' +
      '5. Jangan diaplikasikan pada luka terbuka yang berair, infeksi bakteri bernanah aktif, atau area infeksi jamur.';
  }
  // 6. NIACINAMIDE (Skin barrier, Brightening, Sebum control)
  else if (comp.includes('NIACINAMIDE') || comp.includes('NIASINAMID') || comp.includes('VITAMIN B3') || comp.includes('VIT B3')) {
    mappedImage = IMAGE_MAPPING.glassSkin;
    customIndikasi = 
      'Mengandung Niacinamide (Vitamin B3) murni tingkat klinis. Berfungsi memicu sintesis lipid pelindung alami kulit ' +
      '(ceramide dan asam lemak bebas) di dalam stratum korneum untuk memperbaiki skin barrier yang rusak. Niacinamide juga ' +
      'bekerja menghambat transfer pigmen gelap (melanosom) dari melanosit ke sel-sel epitel terluar wajah, efektif mencerahkan kulit kusam, ' +
      'meredakan noda hitam bekas jerawat (PIH), menyamarkan noda kemerahan (PIE), serta membantu mengendalikan produksi sebum wajah.';
    customCaraKerja = 
      '1. Cuci wajah dengan pembersih lembut dan tepuk-tepuk dengan handuk hingga kering.\n' +
      '2. Ambil gel secukupnya di telapak tangan, ratakan ke seluruh area wajah dan leher secara lembut.\n' +
      '3. Gunakan rutin 2 kali sehari pada pagi dan malam hari sebagai pelembap harian utama.\n' +
      '4. Sangat baik digunakan sebagai penenang (barrier shield) sebelum Anda mengoleskan zat aktif yang lebih keras seperti retinol.';
  }
  // 7. GLYCOLIC ACID / AHA / LACTIC ACID (Exfoliation)
  else if (comp.includes('GLYCOLIC') || comp.includes('GLIKOLAT') || comp.includes('AHA') || comp.includes('LACTIC') || comp.includes('SALICYLIC') || comp.includes('SALISILAT')) {
    mappedImage = IMAGE_MAPPING.pigmentation;
    customIndikasi = 
      'Mengandung Asam Alfa-Hidroksi (AHA/Glycolic Acid) atau Asam Beta-Hidroksi (BHA/Salicylic Acid). ' +
      'Bekerja melonggarkan daya rekat antar sel kulit mati (korneosit) pada lapisan epidermis teratas, merangsang pengelupasan sel mati ' +
      'secara mikro (eksfoliasi kimiawi), sehingga membuka jalan bagi tumbuhnya sel kulit baru yang lebih cerah, halus, dan kenyal. ' +
      'Efektif melunakkan tekstur kulit kasar (gradakan), memudarkan hiperpigmentasi (flek hitam/melasma), serta membersihkan sumbatan pori.';
    customCaraKerja = 
      '1. Sebaiknya digunakan pada MALAM HARI saja.\n' +
      '2. Oleskan tipis-tipis secara merata pada seluruh wajah bersih yang kering. Hindari area dekat mata dan garis bibir.\n' +
      '3. Reaksi cekit-cekit ringan (tingling) saat awal pemakaian adalah normal karena penetrasi asam eksfoliasi ke pori.\n' +
      '4. Mulailah dengan frekuensi 2-3 kali seminggu, lalu tingkatkan bertahap jika kulit sudah beradaptasi dengan baik.\n' +
      '5. WAJIB menggunakan pelembap hidrasi tinggi sesudahnya, dan WAJIB menggunakan tabir surya di pagi hari.';
  }
  // 8. HYPERPIGMENTATION & HYDROQUINONE (Anti-melasma)
  else if (comp.includes('HYDROQUINONE') || comp.includes('HIDROKINON') || comp.includes('MEQUINOL') || comp.includes('MEKINOL')) {
    mappedImage = IMAGE_MAPPING.pigmentation;
    customIndikasi = 
      'Mengandung agen depigmentasi aktif (Hydroquinone atau Mequinol). Bekerja secara langsung menghambat aktivitas enzim tirosinase, ' +
      'yaitu enzim kunci yang mengkatalisis proses pembentukan pigmen melanin gelap di dalam kulit. Penggunaan secara teratur ' +
      'membantu memudarkan noda hitam pekat, melasma kronis akibat KB atau kehamilan, bintik hitam penuaan (solar lentigines), ' +
      'serta meratakan warna kulit yang belang akibat paparan matahari berlebih.';
    customCaraKerja = 
      '1. HANYA digunakan pada MALAM HARI secara presisi pada noda hitam saja (spot treatment).\n' +
      '2. Bersihkan wajah dan tunggu hingga kulit kering sempurna sebelum mengaplikasikan obat.\n' +
      '3. Totolkan obat menggunakan jari bersih atau cotton bud tipis-tipis hanya pada area flek hitam yang dituju.\n' +
      '4. Jangan dioleskan di seluruh wajah untuk menghindari reaksi iritasi dan pengelupasan area kulit yang normal.\n' +
      '5. Di siang hari, WAJIB menggunakan tabir surya SPF 30+ atau lebih karena sinar UV dapat memicu kembali aktivitas melanin.';
  }
  // 9. HEALING / ANTI-SCAR / EXTRACTS
  else if (comp.includes('CENTELLA') || comp.includes('ALOE') || comp.includes('PANTHENOL') || comp.includes('CERAMIDE')) {
    mappedImage = IMAGE_MAPPING.glassSkin;
    customIndikasi = 
      'Mengandung senyawa aktif pemulih barier kulit (seperti Centella Asiatica, Panthenol, Ceramide, atau Aloe Vera). ' +
      'Bekerja meningkatkan hidrasi mendalam, memicu pertumbuhan sel fibroblas untuk mensintesis kolagen baru, ' +
      'serta meredakan iritasi kemerahan akibat kulit terkelupas atau pasca-tindakan klinik. Membantu mempercepat ' +
      'pemulihan luka bekas jerawat dan menjaga kekenyalan struktural kulit.';
    customCaraKerja = 
      '1. Bersihkan wajah dan keringkan dengan lembut.\n' +
      '2. Oleskan krim/gel secara merata ke seluruh wajah dan leher.\n' +
      '3. Tepuk-tepuk perlahan hingga meresap sempurna.\n' +
      '4. Gunakan pagi dan malam hari. Dapat ditumpuk atau dilapis dengan produk perawatan kulit lainnya untuk hidrasi ekstra.';
  }
  // 10. Default General Category (Acne, Skincare, Derma)
  else {
    if (kat === 'Acne') {
      mappedImage = IMAGE_MAPPING.acneActive;
      customIndikasi = 
        'Diformulasikan secara khusus untuk menargetkan masalah jerawat dan pori-pori tersumbat. ' +
        'Mengandung kombinasi bahan anti-akne aktif yang bekerja menekan perkembangbiakan kuman penyebab jerawat, ' +
        'mengontrol minyak wajah yang berlebih, serta membersihkan pori dari tumpukan sel kulit mati agar kulit kembali bersih dan sehat.';
      customCaraKerja = 
        '1. Bersihkan kulit wajah secara lembut dengan sabun wajah, keringkan perlahan.\n' +
        '2. Oleskan tipis-tipis obat/krim secara merata pada area yang rentan berjerawat atau totolkan langsung pada jerawat aktif.\n' +
        '3. Gunakan secara teratur 1-2 kali sehari sesuai anjuran.\n' +
        '4. Selalu lengkapi perawatan siang hari dengan tabir surya non-komedogenik.';
    } else if (kat === 'Derma Medis') {
      mappedImage = IMAGE_MAPPING.bodySkin;
      customIndikasi = 
        'Sediaan dermatologi medis berkekuatan klinis untuk merawat kondisi kulit spesifik. ' +
        'Membantu memulihkan kelainan stratum korneum kulit, meredakan gatal alergi gatal kronis, ' +
        'memperbaiki area kulit yang mengeras atau bersisik, serta memulihkan kesehatan kulit di bawah pengawasan medis.';
      customCaraKerja = 
        '1. Bersihkan area kulit yang membutuhkan perhatian medis, lalu tepuk-tepuk kering.\n' +
        '2. Aplikasikan sediaan secara tipis namun merata pada area sasaran.\n' +
        '3. Gunakan rutin pagi dan malam hari (2 kali sehari) atau sesuai petunjuk spesifik.\n' +
        '4. Konsultasikan dengan tenaga medis jika keluhan gatal, merah, atau sisik kulit berlanjut.';
    } else {
      mappedImage = IMAGE_MAPPING.glassSkin;
      customIndikasi = 
        'Sediaan perawatan kulit (skincare) harian berpresisi tinggi. ' +
        'Bekerja memelihara kelembapan optimal kulit, meningkatkan elastisitas serat kolagen, ' +
        'mencegah dehidrasi trans-epidermal, serta melindungi permukaan kulit dari radikal bebas lingkungan sehingga kulit tampak cerah dan bugar.';
      customCaraKerja = 
        '1. Cuci wajah secara bersih pagi dan malam hari.\n' +
        '2. Aplikasikan merata ke seluruh kulit wajah hingga leher, pijat memutar ke arah atas secara lembut.\n' +
        '3. Gunakan pagi hari sebelum tabir surya dan malam hari sebagai rangkaian penutup perawatan kulit Anda.';
    }
  }

  // Preserve database-level details, but if they are simple or we want to enrich them, we merge or replace
  const finalIndikasi = product.indikasi.length > customIndikasi.length 
    ? product.indikasi 
    : `${product.indikasi} \n\n[Sifat Farmakologis & Klinis]:\n${customIndikasi}`;

  const finalCaraKerja = product.caraKerja.length > customCaraKerja.length 
    ? product.caraKerja 
    : `${product.caraKerja} \n\n[Petunjuk Langkah-Demi-Langkah]:\n${customCaraKerja}`;

  return {
    ...product,
    indikasi: finalIndikasi,
    caraKerja: finalCaraKerja,
    gambarKasus: mappedImage,
  };
}
