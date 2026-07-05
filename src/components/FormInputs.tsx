import React from 'react';
import {
  ModuleFormData,
  MataPelajaranOption,
  KelasOption,
  SemesterOption,
  ModelPembelajaranOption,
} from '../types';
import { calculateFase } from '../utils/moduleGenerator';
import { Sparkles, RefreshCw, UserCheck, School, BookOpen, Clock, Layers, Wand2 } from 'lucide-react';

interface FormInputsProps {
  formData: ModuleFormData;
  onChange: (data: ModuleFormData) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onFillExample: () => void;
  onReset: () => void;
}

const MATA_PELAJARAN_LIST: MataPelajaranOption[] = [
  'Pendidikan Agama Islam',
  'Pendidikan Pancasila dan Kewarganegaraan',
  'Bahasa Indonesia',
  'Matematika',
  'Ilmu Pengetahuan Alam',
  'Ilmu Pengetahuan Sosial',
  'Seni Budaya dan Prakarya',
  'Pendidikan Jasmani, Olahraga, dan Kesehatan',
  'Bahasa Inggris',
  'Pendidikan Kewirausahaan',
  'Coding dan AI',
  'Bahasa Jawa',
];

const KELAS_LIST: KelasOption[] = [
  'Kelas 1',
  'Kelas 2',
  'Kelas 3',
  'Kelas 4',
  'Kelas 5',
  'Kelas 6',
];

const SEMESTER_LIST: SemesterOption[] = ['Semester 1', 'Semester 2'];

const MODEL_PEMBELAJARAN_LIST: ModelPembelajaranOption[] = [
  'Project Based Learning (PjBL)',
  'Problem Based Learning (PBL)',
  'Discovery Learning',
  'Cooperative Learning',
];

export const FormInputs: React.FC<FormInputsProps> = ({
  formData,
  onChange,
  onGenerate,
  isLoading,
  onFillExample,
  onReset,
}) => {
  const handleInputChange = (field: keyof ModuleFormData, value: string) => {
    const updatedData = { ...formData, [field]: value };

    // Auto-update Fase if Kelas changes
    if (field === 'kelas') {
      updatedData.fase = calculateFase(value as KelasOption);
    }

    onChange(updatedData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Konfigurasi Parameter Modul</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFillExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition border border-blue-200"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Isi Contoh Data</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition border border-slate-200"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
        className="p-5 sm:p-6 space-y-6"
      >
        {/* BAGIAN 1: IDENTITAS PENGAJAR & SEKOLAH */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>Identitas Pengajar & Sekolah (Kolom 1 - 5)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kolom 1 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 1: Nama Penyusun <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaPenyusun}
                onChange={(e) => handleInputChange('namaPenyusun', e.target.value)}
                placeholder="Contoh: M Sholihin, S.Pd"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Kolom 2 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 2: NIP Penyusun <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nipPenyusun}
                onChange={(e) => handleInputChange('nipPenyusun', e.target.value)}
                placeholder="Contoh: 200001012027281001"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-mono"
              />
            </div>

            {/* Kolom 3 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 3: Nama Kepala Sekolah <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaKepalaSekolah}
                onChange={(e) => handleInputChange('namaKepalaSekolah', e.target.value)}
                placeholder="Contoh: Taufik, S.Pd"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Kolom 4 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 4: NIP Kepala Sekolah <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nipKepalaSekolah}
                onChange={(e) => handleInputChange('nipKepalaSekolah', e.target.value)}
                placeholder="Contoh: 200001012027281001"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-mono"
              />
            </div>

            {/* Kolom 5 */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 5: Nama Sekolah <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.namaSekolah}
                  onChange={(e) => handleInputChange('namaSekolah', e.target.value)}
                  placeholder="Contoh: SDN Slatri 01"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: KURIKULUM & KELAS */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Data Kurikulum & Kelas (Kolom 6 - 9)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Kolom 6 */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 6: Mata Pelajaran <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.mataPelajaran}
                onChange={(e) => handleInputChange('mataPelajaran', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {MATA_PELAJARAN_LIST.map((mapel) => (
                  <option key={mapel} value={mapel}>
                    {mapel}
                  </option>
                ))}
              </select>
            </div>

            {/* Kolom 7 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 7: Kelas <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.kelas}
                onChange={(e) => handleInputChange('kelas', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {KELAS_LIST.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            {/* Kolom 8 (Terisi Otomatis) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 8: Fase <span className="text-blue-600 font-normal border-b border-blue-200">(Otomatis)</span>
              </label>
              <input
                type="text"
                readOnly
                value={formData.fase}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 font-bold focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Kolom 9 */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 9: Semester <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.semester}
                onChange={(e) => handleInputChange('semester', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {SEMESTER_LIST.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* BAGIAN 3: DETAIL PEMBELAJARAN */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Detail Pembelajaran & Model (Kolom 10 - 12)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Kolom 10 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 10: Topik <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.topik}
                onChange={(e) => handleInputChange('topik', e.target.value)}
                placeholder="Contoh: Penjumlahan < 20"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Kolom 11 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 11: Alokasi Waktu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.alokasiWaktu}
                onChange={(e) => handleInputChange('alokasiWaktu', e.target.value)}
                placeholder="Contoh: 24 JP (8 kali pertemuan @3 JP)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Kolom 12 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Kolom 12: Model Pembelajaran <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.modelPembelajaran}
                onChange={(e) => handleInputChange('modelPembelajaran', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {MODEL_PEMBELAJARAN_LIST.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* STATUS PROSES LOADING */}
        {isLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-center gap-3 animate-pulse text-blue-900 font-semibold text-xs">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>Tunggu sebentar, dalam proses (+_+)</span>
          </div>
        )}

        {/* TOMBOL GENERATE */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm shadow-sm hover:shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Tunggu sebentar, dalam proses (+_+)' : 'Generate Modul Ajar'}</span>
          </button>
        </div>
      </form>
    </div>
  );

};
