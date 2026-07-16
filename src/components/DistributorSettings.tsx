import { useState, useEffect } from 'react';
import { Settings, Users, X, Info } from 'lucide-react';
import { Distributor } from '../types';

interface DistributorSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  distributors: Record<string, Distributor>;
  onSave: (updated: Record<string, Distributor>) => void;
}

export default function DistributorSettings({
  isOpen,
  onClose,
  distributors,
  onSave,
}: DistributorSettingsProps) {
  const [localDistributors, setLocalDistributors] = useState<Record<string, Distributor>>({});

  useEffect(() => {
    if (isOpen) {
      setLocalDistributors(JSON.parse(JSON.stringify(distributors))); // deep clone
    }
  }, [isOpen, distributors]);

  if (!isOpen) return null;

  const handleFieldChange = (key: string, field: keyof Distributor, value: string) => {
    setLocalDistributors((prev) => {
      const updatedItem = { ...prev[key], [field]: value };
      return { ...prev, [key]: updatedItem };
    });
  };

  const handleSave = () => {
    // Basic validation / sanitization of WhatsApp numbers
    const sanitized: Record<string, Distributor> = {};
    for (const [key, value] of Object.entries(localDistributors)) {
      const dist = value as Distributor;
      let waNum = dist.wa.replace(/[^0-9]/g, ''); // keep only numbers
      if (waNum.startsWith('0')) {
        waNum = '62' + waNum.substring(1);
      }
      sanitized[key] = {
        nama: dist.nama.trim() || `Sales ${key}`,
        wa: waNum || '628985862279',
      };
    }
    onSave(sanitized);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#112924] border border-teal-100/60 dark:border-teal-900/60 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[85vh] transition-colors duration-300">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-teal-50 dark:border-teal-900/50 flex justify-between items-center bg-teal-50/20 dark:bg-teal-950/20">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400">
            <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-black tracking-tight uppercase">Pengaturan Sales & WA</h3>
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
          <div className="flex gap-2 p-3 bg-teal-50/30 dark:bg-teal-950/30 border border-teal-100/40 dark:border-teal-900/40 rounded-xl">
            <Info className="w-4.5 h-4.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <p className="text-[0.7rem] text-teal-700/90 dark:text-teal-400/90 leading-relaxed font-semibold">
              Tentukan sales rep beserta nomor WhatsApp di bawah. Nomor WA harus menggunakan kode negara (contoh: <strong>628...</strong> tanpa spasi atau tanda hubung). Pengaturan disimpan secara lokal di browser Anda.
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(localDistributors).map(([key, item]) => {
              const d = item as Distributor;
              return (
                <div
                  key={key}
                  className="p-3 border border-teal-100/40 dark:border-teal-900/40 rounded-xl bg-teal-50/10 dark:bg-teal-950/10 space-y-2.5"
                >
                  <span className="text-[0.62rem] font-bold text-teal-600 dark:text-teal-500 uppercase tracking-wider block">
                    Perwakilan {key}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[0.6rem] text-teal-600/70 dark:text-teal-400/60 font-bold block mb-1">
                        Nama Sales
                      </label>
                      <input
                        type="text"
                        value={d.nama}
                        onChange={(e) => handleFieldChange(key, 'nama', e.target.value)}
                        className="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[0.6rem] text-teal-600/70 dark:text-teal-400/60 font-bold block mb-1">
                        WhatsApp (628...)
                      </label>
                      <input
                        type="text"
                        value={d.wa}
                        onChange={(e) => handleFieldChange(key, 'wa', e.target.value)}
                        className="w-full bg-white dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-950 dark:text-teal-50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-teal-50 dark:border-teal-900/50 bg-teal-50/10 dark:bg-teal-950/10 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 rounded-xl hover:bg-teal-50/50 dark:hover:bg-teal-950/50 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white rounded-xl transition-all shadow-md cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
}
