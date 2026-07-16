import { useState, useEffect } from 'react';
import { X, Copy, Download, Check, Code, FileCode, Github } from 'lucide-react';
import { Product, Distributor } from '../types';
import { generateSingleHtml } from '../utils/htmlGenerator';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  distributors: Record<string, Distributor>;
}

export default function ExportHtmlModal({
  isOpen,
  onClose,
  products,
  distributors,
}: ExportHtmlModalProps) {
  const [copied, setCopied] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      const compiled = generateSingleHtml(products, distributors);
      setHtmlContent(compiled);
    }
  }, [isOpen, products, distributors]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'index.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#112924] border border-teal-100/60 dark:border-teal-900/60 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh] transition-colors duration-300">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-teal-50 dark:border-teal-900/50 flex justify-between items-center bg-teal-50/20 dark:bg-teal-950/20">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400">
            <Github className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-black tracking-tight uppercase">Ekspor untuk GitHub Pages</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-teal-600/70 hover:bg-teal-100/40 dark:hover:bg-teal-900/40 transition-all cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <p className="text-xs text-teal-700 dark:text-teal-400 font-semibold leading-relaxed">
            Sesuai permintaan Anda, Anda dapat mengunduh aplikasi ini sebagai file <strong>HTML statis tunggal (single index.html)</strong>. File ini mengandung semua database obat, pencarian instan, filter kategori, keranjang belanja, integrasi WhatsApp, dan mode gelap.
          </p>

          <div className="p-4 bg-teal-50/20 dark:bg-teal-950/30 rounded-xl border border-teal-100/50 dark:border-teal-900/50 space-y-3">
            <h4 className="text-xs font-black text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-teal-600" /> Langkah Mengunggah ke GitHub:
            </h4>
            <ol className="text-xs text-teal-700/90 dark:text-teal-400/90 space-y-2 list-decimal list-inside pl-1 font-semibold leading-relaxed">
              <li>Klik tombol <strong>"Unduh index.html"</strong> di bawah ini.</li>
              <li>Buat repositori baru di GitHub Anda (misal: <code>dermacatalog</code>).</li>
              <li>Unggah file <code>index.html</code> tersebut langsung ke repositori Anda.</li>
              <li>Buka menu <strong>Settings &rarr; Pages</strong> di repositori Anda.</li>
              <li>Pilih source ke branch <strong>main/root</strong> dan klik Save!</li>
              <li>Aplikasi Anda akan live secara statis di GitHub Pages dengan tautan unik!</li>
            </ol>
          </div>

          <div className="relative border border-teal-200 dark:border-teal-800 rounded-xl overflow-hidden bg-teal-50/5 dark:bg-teal-950/20 h-40 flex flex-col">
            <div className="flex justify-between items-center bg-teal-50/40 dark:bg-teal-950/40 px-3 py-1.5 border-b border-teal-200 dark:border-teal-800 flex-shrink-0">
              <span className="text-[0.62rem] font-extrabold text-teal-600/80 uppercase flex items-center gap-1">
                <Code className="w-3.5 h-3.5" /> preview_compiled_index.html
              </span>
              <span className="text-[0.62rem] text-teal-600/70 font-bold">~150KB (Termasuk Database 127 Produk)</span>
            </div>
            <pre className="p-3 text-[0.68rem] text-teal-800/80 dark:text-teal-400/80 font-mono overflow-auto flex-1 select-all select-none">
              {htmlContent.substring(0, 500)}...{"\n"}
              {"\n"}/* --- DATABASE 127 PRODUK DISISIPKAN DI SINI SECARA OTOMATIS --- */{"\n"}
              {"\n"}...{htmlContent.substring(htmlContent.length - 300)}
            </pre>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="px-5 py-4 border-t border-teal-50 dark:border-teal-900/50 bg-teal-50/10 dark:bg-teal-950/10 flex justify-between gap-3 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-xs font-bold text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 rounded-xl hover:bg-teal-50/50 dark:hover:bg-teal-950/50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" /> Tersalin!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-teal-600" /> Salin Kode HTML
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-white" /> Unduh index.html
          </button>
        </div>

      </div>
    </div>
  );
}
