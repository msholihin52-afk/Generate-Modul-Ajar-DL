import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FormInputs } from './components/FormInputs';
import { ModulePreview } from './components/ModulePreview';
import { ModuleFormData, GeneratedModuleContent } from './types';
import { buildDeepLearningModule, calculateFase } from './utils/moduleGenerator';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const INITIAL_FORM_DATA: ModuleFormData = {
  namaPenyusun: 'M Sholihin, S.Pd',
  nipPenyusun: '200001012027281001',
  namaKepalaSekolah: 'Taufik, S.Pd',
  nipKepalaSekolah: '200001012027281001',
  namaSekolah: 'SDN Slatri 01',
  mataPelajaran: 'Matematika',
  kelas: 'Kelas 1',
  fase: 'Fase A',
  semester: 'Semester 1',
  topik: 'Penjumlahan < 20',
  alokasiWaktu: '24 JP (8 kali pertemuan @3 JP)',
  modelPembelajaran: 'Project Based Learning (PjBL)',
  lokasiTanggal: 'Larangan, 4 Juli 2026',
  tempatPembuatan: 'Larangan',
  tanggalPembuatan: '2026-07-04',
};

export default function App() {
  const [formData, setFormData] = useState<ModuleFormData>(INITIAL_FORM_DATA);
  const [moduleData, setModuleData] = useState<GeneratedModuleContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generate initial module on mount
  useEffect(() => {
    const initialModule = buildDeepLearningModule(INITIAL_FORM_DATA);
    setModuleData(initialModule);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleGenerate = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server generator.');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setModuleData(result.data);
        showToast('Modul Ajar Deep Learning berhasil dibuat!');
      } else {
        // Fallback local engine if response structure is unusual
        const localModule = buildDeepLearningModule(formData);
        setModuleData(localModule);
        showToast('Modul Ajar Deep Learning berhasil dibuat.');
      }
    } catch (error) {
      console.error('Error in handleGenerate:', error);
      // Fallback local engine if network error
      const localModule = buildDeepLearningModule(formData);
      setModuleData(localModule);
      showToast('Modul Ajar Deep Learning berhasil dibuat via modul lokal.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillExample = () => {
    setFormData(INITIAL_FORM_DATA);
    showToast('Form terisi dengan contoh data!');
  };

  const handleReset = () => {
    setFormData({
      namaPenyusun: '',
      nipPenyusun: '',
      namaKepalaSekolah: '',
      nipKepalaSekolah: '',
      namaSekolah: '',
      mataPelajaran: 'Matematika',
      kelas: 'Kelas 1',
      fase: calculateFase('Kelas 1'),
      semester: 'Semester 1',
      topik: '',
      alokasiWaktu: '24 JP (8 kali pertemuan @3 JP)',
      modelPembelajaran: 'Project Based Learning (PjBL)',
      lokasiTanggal: 'Larangan, 14 Juli 2026',
      tempatPembuatan: 'Larangan',
      tanggalPembuatan: '2026-07-14',
    });
    showToast('Form telah dibersihkan.');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-bounce bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-semibold print-force-hide">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* BANNER DEEP LEARNING BRIEF */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 print-force-hide">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-2 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Pendekatan Deep Learning: Mindful, Meaningful, & Joyful Learning</span>
            </h3>
            <p className="text-slate-500 text-xs max-w-2xl leading-relaxed">
              Modul ajar dirancang khusus untuk memfasilitasi pembelajaran mendalam yang berfokus pada kesadaran penuh (Mindful), kebermaknaan konsep (Meaningful), dan suasana belajar yang menggembirakan (Joyful) sesuai Kurikulum Merdeka.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Support Export .doc (Microsoft Word)</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT: FORM & RESULT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* FORM INPUTS (LEFT COLUMN: 5 COLS ON DESKTOP) */}
          <div className="lg:col-span-5 space-y-6 print-force-hide">
            <FormInputs
              formData={formData}
              onChange={setFormData}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              onFillExample={handleFillExample}
              onReset={handleReset}
            />
          </div>

          {/* RESULT PREVIEW (RIGHT COLUMN: 7 COLS ON DESKTOP) */}
          <div className="lg:col-span-7">
            <ModulePreview moduleData={moduleData} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-5 text-xs text-slate-500 mt-12 flex-none print-force-hide">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-bold text-slate-800 uppercase tracking-wider">
            PEMBUAT MODUL PEMBELAJARAN DEEP LEARNING — By. Admin Esstu
          </p>
          <p className="text-slate-500">
            Didesain khusus untuk Bapak/Ibu Guru SD Kurikulum Merdeka seluruh Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );

}
