import React, { useState, useEffect } from 'react';
import { GeneratedModuleContent } from '../types';
import { formatModuleToText } from '../utils/moduleGenerator';
import { downloadDocFile, copyTextToClipboard } from '../utils/docExport';
import {
  Copy,
  Download,
  Check,
  FileText,
  Printer,
  Edit3,
  Eye,
  CheckCircle2,
  BookOpen,
  RotateCcw,
} from 'lucide-react';

// Beautiful renderer that parses custom edited text into high-fidelity styled React elements
const RenderCustomText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let insideUl = false;
  let insideOl = false;
  let ulItems: React.ReactNode[] = [];
  let olItems: React.ReactNode[] = [];
  
  const flushLists = (key: string) => {
    if (insideUl && ulItems.length > 0) {
      renderedElements.push(
        <ul key={`ul-${key}`} className="list-disc pl-5 my-2 space-y-1 text-xs sm:text-sm text-slate-800">
          {...ulItems}
        </ul>
      );
      ulItems = [];
      insideUl = false;
    }
    if (insideOl && olItems.length > 0) {
      renderedElements.push(
        <ol key={`ol-${key}`} className="list-decimal pl-5 my-2 space-y-1 text-xs sm:text-sm text-slate-800">
          {...olItems}
        </ol>
      );
      olItems = [];
      insideOl = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushLists(idx.toString());
      renderedElements.push(<div key={`br-${idx}`} className="h-2"></div>);
      return;
    }

    // Header checking (A. B. C. or big sections)
    const isSectionHeader = /^[A-N]\.\s+[A-Z\s\-]+$/.test(trimmed) || 
                            trimmed.startsWith('DESAIN PEMBELAJARAN') || 
                            trimmed.includes('LEMBAR KERJA PESERTA DIDIK') ||
                            trimmed.startsWith('MODUL AJAR DEEP LEARNING');

    if (isSectionHeader) {
      flushLists(idx.toString());
      if (trimmed.startsWith('MODUL AJAR DEEP LEARNING') || trimmed.startsWith('DESAIN PEMBELAJARAN')) {
        renderedElements.push(
          <div key={idx} className="text-center border-b-2 border-slate-900 pb-4 my-6 space-y-1">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase text-slate-900">
              {trimmed}
            </h1>
          </div>
        );
      } else if (trimmed.includes('LEMBAR KERJA PESERTA DIDIK')) {
        renderedElements.push(
          <div key={idx} className="page-break-before border-2 border-slate-900 p-4 my-6 bg-slate-50 text-center rounded-lg">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wide">
              {trimmed}
            </h2>
          </div>
        );
      } else {
        renderedElements.push(
          <h3 key={idx} className="font-bold text-xs sm:text-sm bg-slate-50 px-3 py-1.5 text-slate-900 border-l-4 border-slate-800 uppercase tracking-wide mt-6 mb-3">
            {trimmed}
          </h3>
        );
      }
      return;
    }

    // Subheader checking
    if (trimmed.startsWith('PERTEMUAN') || 
        trimmed.startsWith('KEGIATAN PENDAHULUAN') || 
        trimmed.startsWith('KEGIATAN INTI') || 
        trimmed.startsWith('KEGIATAN PENUTUP') || 
        trimmed.startsWith('ASESMEN DIAGNOSTIK') || 
        trimmed.startsWith('ASESMEN FORMATIF') || 
        trimmed.startsWith('ASESMEN SUMATIF') ||
        trimmed.startsWith('LINGKUNGAN BELAJAR') ||
        trimmed.startsWith('PEMANFAATAN DIGITAL') ||
        trimmed.startsWith('Kebutuhan Belajar:') ||
        trimmed.startsWith('Praktik (Kinerja):') ||
        trimmed.startsWith('Produk (Proyek):')) {
      flushLists(idx.toString());
      const isPertemuan = trimmed.startsWith('PERTEMUAN');
      renderedElements.push(
        <h4 key={idx} className={`font-bold text-xs sm:text-sm mt-4 mb-2 uppercase pb-1 border-b border-slate-200 ${isPertemuan ? 'text-indigo-900' : 'text-slate-800'}`}>
          {trimmed}
        </h4>
      );
      return;
    }

    // Bullet items
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (insideOl) flushLists(idx.toString());
      insideUl = true;
      const content = trimmed.substring(2);
      const boldMatch = content.match(/^([^:]+):(.*)$/);
      if (boldMatch) {
        ulItems.push(
          <li key={`li-${idx}`} className="leading-relaxed mb-1">
            <span className="font-semibold text-slate-900">{boldMatch[1]}:</span>{boldMatch[2]}
          </li>
        );
      } else {
        ulItems.push(
          <li key={`li-${idx}`} className="leading-relaxed mb-1">
            {content}
          </li>
        );
      }
      return;
    }

    // Numbered items
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (insideUl) flushLists(idx.toString());
      insideOl = true;
      const content = numMatch[2];
      const boldMatch = content.match(/^([^:]+):(.*)$/);
      if (boldMatch) {
        olItems.push(
          <li key={`li-${idx}`} className="leading-relaxed mb-1">
            <span className="font-semibold text-slate-900">{boldMatch[1]}:</span>{boldMatch[2]}
          </li>
        );
      } else {
        olItems.push(
          <li key={`li-${idx}`} className="leading-relaxed mb-1">
            {content}
          </li>
        );
      }
      return;
    }

    // Default line
    flushLists(idx.toString());
    const labelMatch = trimmed.match(/^([^:]+):(.*)$/);
    if (labelMatch && (
      trimmed.startsWith('Judul') || 
      trimmed.startsWith('Tujuan') || 
      trimmed.startsWith('Alat dan Bahan') || 
      trimmed.startsWith('Langkah-langkah') || 
      trimmed.startsWith('Kegiatan Pembelajaran') || 
      trimmed.startsWith('Pertanyaan Tantangan') || 
      trimmed.startsWith('Lembar Refleksi') ||
      trimmed.startsWith('Bahan Bacaan') ||
      trimmed.startsWith('Pengayaan') ||
      trimmed.startsWith('Remedial') ||
      trimmed.startsWith('Nama Sekolah') ||
      trimmed.startsWith('Nama Penyusun') ||
      trimmed.startsWith('Mata Pelajaran') ||
      trimmed.startsWith('Kelas') ||
      trimmed.startsWith('Alokasi Waktu') ||
      trimmed.startsWith('Topik')
    )) {
      if (trimmed.startsWith('Kegiatan Pembelajaran Bermakna') || trimmed.startsWith('Lembar Refleksi Mandiri') || trimmed.startsWith('Aktivitas Bermakna')) {
        renderedElements.push(
          <div key={idx} className="my-3">
            <p className="font-bold text-xs uppercase text-indigo-950 mb-1">{labelMatch[1]}:</p>
            <div className="bg-slate-50 border-l-4 border-indigo-600 p-4 italic text-xs sm:text-sm text-slate-700 rounded-r-lg">
              {labelMatch[2]}
            </div>
          </div>
        );
      } else {
        renderedElements.push(
          <p key={idx} className="my-2 text-xs sm:text-sm text-slate-800">
            <strong className="text-slate-900">{labelMatch[1]}:</strong>{labelMatch[2]}
          </p>
        );
      }
    } else {
      renderedElements.push(
        <p key={idx} className="my-1.5 text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
          {trimmed}
        </p>
      );
    }
  });

  flushLists("end");
  return <div className="space-y-4">{renderedElements}</div>;
};

interface ModulePreviewProps {
  moduleData: GeneratedModuleContent | null;
  isLoading: boolean;
}

export const ModulePreview: React.FC<ModulePreviewProps> = ({ moduleData, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');

  // Reset customText and editing mode when a new module is generated
  useEffect(() => {
    setCustomText('');
    setIsEditing(false);
  }, [moduleData]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center space-y-4">
        <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
          <BookOpen className="w-7 h-7 text-blue-600 animate-bounce" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800">Menyusun Modul Ajar Deep Learning...</h3>
          <p className="text-blue-600 font-semibold text-xs mt-1">Tunggu sebentar, dalam proses (+_+)</p>
        </div>
        <div className="max-w-md mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-pulse w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!moduleData) {
    return (
      <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 text-center space-y-3 shadow-sm">
        <FileText className="w-10 h-10 text-slate-400 mx-auto" />
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Hasil Generate Modul Belum Ada</h3>
        <p className="text-slate-500 text-xs max-w-sm mx-auto">
          Silakan isi parameter pada form di sebelah kiri dan klik tombol <b>[Generate Modul Ajar]</b> untuk membuat Modul Ajar Deep Learning lengkap.
        </p>
      </div>
    );
  }

  const plainText = customText || formatModuleToText(moduleData);

  const handleCopy = async () => {
    const success = await copyTextToClipboard(plainText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadDoc = () => {
    downloadDocFile(moduleData, customText || undefined);
  };

  const handlePrint = () => {
    window.print();
  };



  const handleResetEdit = () => {
    setCustomText('');
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    if (!isEditing) {
      setCustomText(formatModuleToText(moduleData));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      {/* ACTION HEADER BAR */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 print-force-hide">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Hasil Modul Ajar Deep Learning
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-medium">
            {moduleData.identitas.mataPelajaran} • {moduleData.identitas.kelas} ({moduleData.identitas.fase})
          </p>
        </div>

        {/* REQUIRED ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tombol Copy Teks */}
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs transition shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Teks Tersalin!' : 'Salin Teks'}</span>
          </button>


          {/* Tombol Download .doc */}
          <button
            type="button"
            onClick={handleDownloadDoc}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download .doc</span>
          </button>

          {/* Mode Toggle */}
          <button
            type="button"
            onClick={toggleEditMode}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition"
          >
            {isEditing ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <Edit3 className="w-3.5 h-3.5 text-blue-600" />}
            <span>{isEditing ? 'Preview' : 'Edit Teks'}</span>
          </button>

          {/* Reset Edit Button */}
          {customText && (
            <button
              type="button"
              onClick={handleResetEdit}
              title="Kembalikan ke Desain Asli"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold border border-red-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-500" />
              <span>Reset Edit</span>
            </button>
          )}

          {/* Cetak / Simpan PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {copied && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 text-emerald-800 text-xs font-semibold flex items-center gap-2 print-force-hide">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Teks modul ajar berhasil disalin ke clipboard! Silakan paste ke dokumen Anda.</span>
        </div>
      )}

      {/* DOCUMENT CONTENT / EDIT AREA */}
      <div className="p-5 sm:p-8 bg-slate-50/50 min-h-[600px] max-h-[85vh] overflow-y-auto font-sans text-slate-800 printable-document">
        {/* EDITING MODE CONTAINER */}
        <div className={`space-y-2 print-force-hide ${isEditing ? 'block' : 'hidden'}`}>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Edit Langsung Teks Modul Ajar (Perubahan disimpan untuk Salin Teks):
          </label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={28}
            className="w-full p-4 font-mono text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* PREVIEW MODE / PRINTABLE DOCUMENT CONTAINER */}
        <div className={`bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-slate-200 space-y-6 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed printable-document-card ${isEditing ? 'hidden print-force-show' : 'block'}`}>
          {customText ? (
            <RenderCustomText text={customText} />
          ) : (
            <>
              {/* DOCUMENT HEADER */}
              <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase text-slate-900">
                MODUL AJAR DEEP LEARNING
              </h1>
              <p className="font-bold text-slate-800 text-xs sm:text-sm uppercase">
                MATA PELAJARAN : {moduleData.identitas.mataPelajaran.toUpperCase()}
              </p>
              <p className="font-bold text-slate-700 text-xs sm:text-sm uppercase">
                TOPIK : {moduleData.identitas.topik ? moduleData.identitas.topik : ''}
              </p>
            </div>

            {/* A. IDENTITAS MODUL */}
            <section className="space-y-2">
              <h2 className="font-bold text-xs sm:text-sm bg-slate-50 px-3 py-1.5 text-slate-900 border-l-4 border-slate-800 uppercase tracking-wide">
                A. IDENTITAS MODUL
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_10px_1fr] gap-1.5 px-2 text-slate-800">
                <span className="font-medium text-slate-600">Nama Sekolah</span>
                <span>:</span>
                <span className="font-semibold text-slate-900">{moduleData.identitas.namaSekolah}</span>

                <span className="font-medium text-slate-600">Nama Penyusun</span>
                <span>:</span>
                <span className="font-semibold text-slate-900">{moduleData.identitas.namaPenyusun}</span>

                <span className="font-medium text-slate-600">Mata Pelajaran</span>
                <span>:</span>
                <span className="font-semibold text-slate-900">{moduleData.identitas.mataPelajaran}</span>

                <span className="font-medium text-slate-600">Kelas / Fase / Semester</span>
                <span>:</span>
                <span className="font-semibold text-slate-900">
                  {moduleData.identitas.kelas} / {moduleData.identitas.fase} / {moduleData.identitas.semester}
                </span>

                <span className="font-medium text-slate-600">Alokasi Waktu</span>
                <span>:</span>
                <span className="font-semibold text-slate-900">{moduleData.identitas.alokasiWaktu}</span>

                <span className="font-medium text-slate-600">Topik / Tema</span>
                <span>:</span>
                <span className="font-semibold text-slate-900">{moduleData.identitas.topik}</span>
              </div>
            </section>

            {/* B. IDENTIFIKASI KESIAPAN PESERTA DIDIK */}
            <section className="space-y-2">
              <h2 className="font-bold text-xs sm:text-sm bg-slate-50 px-3 py-1.5 text-slate-900 border-l-4 border-slate-800 uppercase tracking-wide">
                B. IDENTIFIKASI KESIAPAN PESERTA DIDIK
              </h2>
              <div className="space-y-1.5 px-2">
                <p>
                  <b>Pengetahuan Awal:</b> {moduleData.kesiapanPesertaDidik.pengetahuanAwal}
                </p>
                <p>
                  <b>Minat:</b> {moduleData.kesiapanPesertaDidik.minat}
                </p>
                <p>
                  <b>Latar Belakang:</b> {moduleData.kesiapanPesertaDidik.latarBelakang}
                </p>
                <div>
                  <b>Kebutuhan Belajar:</b>
                  <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
                    <li>
                      <b>Visual:</b> {moduleData.kesiapanPesertaDidik.kebutuhanBelajar.visual}
                    </li>
                    <li>
                      <b>Auditori:</b> {moduleData.kesiapanPesertaDidik.kebutuhanBelajar.auditori}
                    </li>
                    <li>
                      <b>Kinestetik:</b> {moduleData.kesiapanPesertaDidik.kebutuhanBelajar.kinestetik}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* C. KARAKTERISTIK MATERI PELAJARAN */}
            <section className="space-y-2">
              <h2 className="font-bold text-xs sm:text-sm bg-slate-50 px-3 py-1.5 text-slate-900 border-l-4 border-slate-800 uppercase tracking-wide">
                C. KARAKTERISTIK MATERI PELAJARAN
              </h2>
              <div className="space-y-1.5 px-2">
                <p>
                  <b>Jenis Pengetahuan yang Akan Dicapai:</b> {moduleData.karakteristikMateri.jenisPengetahuan}
                </p>
                <p>
                  <b>Konseptual:</b> {moduleData.karakteristikMateri.konseptual}
                </p>
                <p>
                  <b>Prosedural:</b> {moduleData.karakteristikMateri.prosedural}
                </p>
                <p>
                  <b>Relevansi dengan Kehidupan Nyata Peserta Didik:</b> {moduleData.karakteristikMateri.relevansiKehidupan}
                </p>
                <p>
                  <b>Tingkat Kesulitan:</b> {moduleData.karakteristikMateri.tingkatKesulitan}
                </p>
                <p>
                  <b>Struktur Materi:</b> {moduleData.karakteristikMateri.strukturMateri}
                </p>
                <p>
                  <b>Integrasi Nilai dan Karakter:</b> {moduleData.karakteristikMateri.integrasiNilai}
                </p>
              </div>
            </section>

            {/* D. DIMENSI PROFIL LULUSAN */}
            <section className="space-y-2">
              <h2 className="font-bold text-xs sm:text-sm bg-slate-50 px-3 py-1.5 text-slate-900 border-l-4 border-slate-800 uppercase tracking-wide">
                D. DIMENSI PROFIL LULUSAN
              </h2>
              <div className="space-y-1.5 px-2">
                <p>
                  <b>Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa, dan Berakhlak Mulia:</b>{' '}
                  {moduleData.dimensiProfilLulusan.keimanan}
                </p>
                <p>
                  <b>Kewargaan:</b> {moduleData.dimensiProfilLulusan.kewargaan}
                </p>
                <p>
                  <b>Penalaran Kritis:</b> {moduleData.dimensiProfilLulusan.penalaranKritis}
                </p>
                <p>
                  <b>Kreativitas:</b> {moduleData.dimensiProfilLulusan.kreativitas}
                </p>
                <p>
                  <b>Kolaborasi:</b> {moduleData.dimensiProfilLulusan.kolaborasi}
                </p>
                <p>
                  <b>Kemandirian:</b> {moduleData.dimensiProfilLulusan.kemandirian}
                </p>
                <p>
                  <b>Kesehatan:</b> {moduleData.dimensiProfilLulusan.kesehatan}
                </p>
                <p>
                  <b>Komunikasi:</b> {moduleData.dimensiProfilLulusan.komunikasi}
                </p>
              </div>
            </section>

            {/* DESAIN PEMBELAJARAN */}
            <div className="pt-4 border-t-2 border-slate-300">
              <h1 className="text-center font-extrabold text-base tracking-wider text-slate-900 uppercase">
                DESAIN PEMBELAJARAN
              </h1>
            </div>

            {/* A. CAPAIAN PEMBELAJARAN */}
            <section className="space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">A. CAPAIAN PEMBELAJARAN (CP)</h3>
              <p className="text-xs italic text-slate-600">
                Pada akhir Fase {moduleData.capaianPembelajaran.fase}, murid memiliki kemampuan sebagai berikut.
              </p>
              <div className="space-y-2 px-2">
                <div>
                  <p className="font-bold text-slate-900">Mengalami (Experiencing)</p>
                  <p>{moduleData.capaianPembelajaran.mengalami}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Merefleksikan (Reflecting)</p>
                  <p>{moduleData.capaianPembelajaran.merefleksikan}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    Berpikir dan Bekerja Artistik (Thinking and Working Artistically)
                  </p>
                  <p>{moduleData.capaianPembelajaran.berpikirArtistik}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Menciptakan (Making/Creating)</p>
                  <p>{moduleData.capaianPembelajaran.menciptakan}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Berdampak (Impacting)</p>
                  <p>{moduleData.capaianPembelajaran.berdampak}</p>
                </div>
              </div>
            </section>

            {/* B. LINTAS DISIPLIN ILMU */}
            <section className="space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">B. LINTAS DISIPLIN ILMU</h3>
              <p className="px-2">
                <b>Mata Pelajaran {moduleData.lintasDisiplinIlmu.mataPelajaran}:</b> Isian{' '}
                {moduleData.lintasDisiplinIlmu.deskripsi}
              </p>
            </section>

            {/* C. TUJUAN PEMBELAJARAN */}
            <section className="space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">C. TUJUAN PEMBELAJARAN</h3>
              <p className="px-2">{moduleData.tujuanPembelajaran}</p>
            </section>

            {/* D. INDIKATOR KETERCAPAIAN */}
            <section className="space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN
              </h3>
              <ol className="list-decimal list-inside ml-2 space-y-1">
                {moduleData.indikatorKetercapaian.map((ind, i) => (
                  <li key={i}>{ind}</li>
                ))}
              </ol>
            </section>

            {/* E. TOPIK PEMBELAJARAN KONTEKSTUAL */}
            <section className="space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">E. TOPIK PEMBELAJARAN KONTEKSTUAL</h3>
              <p className="px-2">{moduleData.topikKontekstual}</p>
            </section>

            {/* F. KERANGKA PEMBELAJARAN */}
            <section className="space-y-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">F. KERANGKA PEMBELAJARAN</h3>

              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200 space-y-2">
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-800">PRAKTIK PEDAGOGIK</p>
                <p>
                  <b>Model Pembelajaran:</b> {moduleData.kerangkaPembelajaran.modelPembelajaran}
                </p>
                <p>
                  <b>Pendekatan:</b> {moduleData.kerangkaPembelajaran.pendekatan}
                </p>
                <p>
                  <b>Mindful Learning:</b> {moduleData.kerangkaPembelajaran.mindfulLearning}
                </p>
                <p>
                  <b>Meaningful Learning:</b> {moduleData.kerangkaPembelajaran.meaningfulLearning}
                </p>
                <p>
                  <b>Joyful Learning:</b> {moduleData.kerangkaPembelajaran.joyfulLearning}
                </p>
                <p>
                  <b>Metode Pembelajaran:</b> {moduleData.kerangkaPembelajaran.metodePembelajaran}
                </p>
                <div>
                  <b>Strategi Pembelajaran Berdiferensiasi:</b>
                  <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
                    <li>
                      <b>Diferensiasi Konten:</b> {moduleData.kerangkaPembelajaran.diferensiasi.konten}
                    </li>
                    <li>
                      <b>Diferensiasi Proses:</b> {moduleData.kerangkaPembelajaran.diferensiasi.proses}
                    </li>
                    <li>
                      <b>Diferensiasi Produk:</b> {moduleData.kerangkaPembelajaran.diferensiasi.produk}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200 space-y-2">
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-800">KEMITRAAN PEMBELAJARAN</p>
                <p>
                  <b>Lingkungan Sekolah:</b> {moduleData.kerangkaPembelajaran.kemitraan.lingkunganSekolah}
                </p>
                <p>
                  <b>Lingkungan Luar Sekolah/Masyarakat:</b>{' '}
                  {moduleData.kerangkaPembelajaran.kemitraan.lingkunganLuarSekolah}
                </p>
                <p>
                  <b>Mitra Digital:</b> {moduleData.kerangkaPembelajaran.kemitraan.mitraDigital}
                </p>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200 space-y-2">
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-800">LINGKUNGAN BELAJAR</p>
                <p>
                  <b>Ruang Fisik:</b> {moduleData.kerangkaPembelajaran.lingkunganBelajar.ruangFisik}
                </p>
                <p>
                  <b>Ruang Virtual:</b> {moduleData.kerangkaPembelajaran.lingkunganBelajar.ruangVirtual}
                </p>
                <p>
                  <b>Budaya Belajar:</b> {moduleData.kerangkaPembelajaran.lingkunganBelajar.budayaBelajar}
                </p>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200 space-y-1">
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-800">PEMANFAATAN DIGITAL</p>
                <p>{moduleData.kerangkaPembelajaran.pemanfaatanDigital}</p>
              </div>
            </section>

            {/* G. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI */}
            <section className="space-y-4">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                G. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI
              </h3>

              {moduleData.langkahPembelajaran.map((item) => (
                <div
                  key={item.pertemuanKe}
                  className="border border-slate-200 rounded-lg p-5 bg-white space-y-3"
                >
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      PERTEMUAN {item.pertemuanKe} ({item.totalJP} JP : {item.menitTotal} MENIT)
                    </h4>
                    <p className="text-xs font-semibold text-slate-600">Topik : {item.topikPertemuan}</p>
                  </div>

                  {/* PENDAHULUAN */}
                  <div className="space-y-1.5">
                    <p className="font-bold text-[11px] uppercase tracking-wider text-slate-800">
                      KEGIATAN PENDAHULUAN ({item.pendahuluan.alokasiMenit} MENIT)
                    </p>
                    <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                      <li>
                        <b>Orientasi:</b> {item.pendahuluan.orientasi}
                      </li>
                      <li>
                        <b>Apersepsi (Joyful):</b> {item.pendahuluan.apersepsi}
                      </li>
                      <li>
                        <b>Motivasi:</b> {item.pendahuluan.motivasi}
                      </li>
                      <li>
                        <b>Penyampaian Tujuan:</b> {item.pendahuluan.penyampaianTujuan}
                      </li>
                      <li>
                        <b>Asesmen Diagnostik:</b> {item.pendahuluan.asesmenDiagnostik}
                      </li>
                    </ul>
                  </div>

                  {/* INTI */}
                  <div className="space-y-1.5">
                    <p className="font-bold text-[11px] uppercase tracking-wider text-slate-800">
                      KEGIATAN INTI ({item.kegiatanInti.alokasiMenit} MENIT)
                    </p>
                    <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                      <li>
                        <b>Eksplorasi Bahan:</b> {item.kegiatanInti.eksplorasiBahan}
                      </li>
                      <li>
                        <b>Eksperimen Keseimbangan / Penyelidikan:</b>{' '}
                        {item.kegiatanInti.eksperimenPenyelidikan}
                      </li>
                      <li>
                        <b>Diskusi:</b> {item.kegiatanInti.diskusi}
                      </li>
                    </ul>
                  </div>

                  {/* PENUTUP */}
                  <div className="space-y-1.5">
                    <p className="font-bold text-[11px] uppercase tracking-wider text-slate-800">
                      KEGIATAN PENUTUP ({item.penutup.alokasiMenit} MENIT)
                    </p>
                    <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                      <li>
                        <b>Refleksi:</b> {item.penutup.refleksi}
                      </li>
                      <li>
                        <b>Tindak Lanjut:</b> {item.penutup.tindakLanjut}
                      </li>
                      <li>
                        <b>Penutup:</b> {item.penutup.penutup}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </section>

            {/* H. ASESMEN PEMBELAJARAN */}
            <section className="space-y-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">H. ASESMEN PEMBELAJARAN</h3>

              <div className="space-y-1 px-2">
                <p className="font-bold text-[11px] text-slate-800 uppercase">ASESMEN DIAGNOSTIK</p>
                <p>
                  <b>Praktik:</b> {moduleData.asesmen.diagnostik.praktik}
                </p>
                <p>
                  <b>Observasi:</b> {moduleData.asesmen.diagnostik.observasi}
                </p>
              </div>

              <div className="space-y-1 px-2">
                <p className="font-bold text-[11px] text-slate-800 uppercase">ASESMEN FORMATIF</p>
                <p>
                  <b>Produk (Proyek):</b>
                </p>
                <ul className="list-disc list-inside ml-3 text-xs space-y-0.5">
                  <li>
                    <b>Tugas:</b> {moduleData.asesmen.formatif.produkProyek.tugas}
                  </li>
                  <li>
                    <b>Penilaian:</b> {moduleData.asesmen.formatif.produkProyek.penilaian}
                  </li>
                  <li>
                    <b>Observasi:</b> {moduleData.asesmen.formatif.produkProyek.observasi}
                  </li>
                </ul>
              </div>

              <div className="space-y-1 px-2">
                <p className="font-bold text-[11px] text-slate-800 uppercase">ASESMEN SUMATIF</p>
                <p>
                  <b>Produk (Proyek):</b>
                </p>
                <ul className="list-disc list-inside ml-3 text-xs space-y-0.5">
                  <li>
                    <b>Tugas:</b> {moduleData.asesmen.sumatif.produkProyek.tugas}
                  </li>
                  <li>
                    <b>Penilaian:</b> {moduleData.asesmen.sumatif.produkProyek.penilaian}
                  </li>
                </ul>

                <p className="pt-1">
                  <b>Praktik (Kinerja):</b>
                </p>
                <ul className="list-disc list-inside ml-3 text-xs space-y-0.5">
                  <li>
                    <b>Tugas:</b> {moduleData.asesmen.sumatif.praktikKinerja.tugas}
                  </li>
                  <li>
                    <b>Penilaian:</b> {moduleData.asesmen.sumatif.praktikKinerja.penilaian}
                  </li>
                </ul>

                <p className="pt-1">
                  <b>Tes Tertulis:</b> {moduleData.asesmen.sumatif.tesTertulis}
                </p>
              </div>
            </section>

            {/* I. PERTANYAAN PEMANTIK */}
            {moduleData.pertanyaanPemantik && moduleData.pertanyaanPemantik.length > 0 && (
              <section className="space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                  I. PERTANYAAN PEMANTIK
                </h3>
                <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-amber-800 font-bold uppercase tracking-wider">Pertanyaan Pemicu Diskusi & Rasa Ingin Tahu:</p>
                  <ul className="space-y-1.5 ml-1">
                    {moduleData.pertanyaanPemantik.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                        <span className="font-bold text-amber-600 shrink-0">#{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* J. PEMAHAMAN BERMAKNA */}
            {moduleData.pemahamanBermakna && (
              <section className="space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                  J. PEMAHAMAN BERMAKNA
                </h3>
                <div className="bg-emerald-50/40 border border-emerald-200 rounded-lg p-4">
                  <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider mb-1">Manfaat Pembelajaran dalam Kehidupan Nyata:</p>
                  <p className="text-xs sm:text-sm text-slate-800 italic font-medium leading-relaxed">
                    "{moduleData.pemahamanBermakna}"
                  </p>
                </div>
              </section>
            )}

            {/* K. PENGAYAAN DAN REMEDIAL */}
            {moduleData.pengayaanRemedial && (
              <section className="space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                  K. PENGAYAAN DAN REMEDIAL
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50/30 border border-blue-100 rounded-lg p-4 space-y-1">
                    <p className="font-bold text-[11px] text-blue-800 uppercase tracking-wider">Aktivitas Pengayaan (Pencapaian Tinggi)</p>
                    <p className="text-xs leading-relaxed text-slate-700">{moduleData.pengayaanRemedial.pengayaan}</p>
                  </div>
                  <div className="bg-rose-50/30 border border-rose-100 rounded-lg p-4 space-y-1">
                    <p className="font-bold text-[11px] text-rose-800 uppercase tracking-wider">Aktivitas Remedial (Pendampingan)</p>
                    <p className="text-xs leading-relaxed text-slate-700">{moduleData.pengayaanRemedial.remedial}</p>
                  </div>
                </div>
              </section>
            )}

            {/* L. BAHAN BACAAN GURU DAN SISWA */}
            {moduleData.bahanBacaan && (
              <section className="space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                  L. BAHAN BACAAN GURU DAN SISWA
                </h3>
                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden bg-slate-50/30">
                  <div className="p-4 space-y-1">
                    <p className="font-bold text-xs text-slate-800">Bahan Bacaan Guru:</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{moduleData.bahanBacaan.guru}</p>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="font-bold text-xs text-slate-800">Bahan Bacaan Siswa:</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{moduleData.bahanBacaan.siswa}</p>
                  </div>
                </div>
              </section>
            )}

            {/* LEMBAR KERJA PESERTA DIDIK (LKPD) */}
            {moduleData.lkpd && (
              <section className="border-2 border-indigo-200 bg-indigo-50/10 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white font-extrabold text-[10px] px-3 py-1 uppercase rounded-bl-lg tracking-widest">
                  LKPD Kurikulum Merdeka (CP 046)
                </div>
                
                <div className="space-y-1 pb-2 border-b border-indigo-100">
                  <h3 className="font-bold text-sm sm:text-base text-indigo-900 uppercase tracking-wide">
                    LEMBAR KERJA PESERTA DIDIK (LKPD)
                  </h3>
                  <p className="text-xs font-bold text-slate-700 uppercase">{moduleData.lkpd.judul}</p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-indigo-950 block">🎯 Tujuan Aktivitas:</span>
                    <p className="text-slate-700 leading-relaxed">{moduleData.lkpd.tujuan}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="bg-white/80 p-3.5 rounded-lg border border-indigo-100 space-y-1.5">
                      <span className="font-bold text-indigo-950 text-xs block">🛠️ Alat dan Bahan:</span>
                      <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                        {moduleData.lkpd.alatBahan.map((tool, i) => (
                          <li key={i}>{tool}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-indigo-50/30 p-3.5 rounded-lg border border-indigo-100 space-y-1.5">
                      <span className="font-bold text-indigo-950 text-xs block">🌱 Aktivitas Pembelajaran Bermakna:</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{moduleData.lkpd.aktivitasBermakna}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-indigo-950 block mb-1">📝 Langkah-langkah Kerja (Pendekatan Deep Learning - Mindful & Joyful):</span>
                    <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 pl-1">
                      {moduleData.lkpd.langkahKerja.map((step, i) => (
                        <li key={i} className="leading-relaxed">
                          <span className="font-medium text-slate-800">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-2 bg-white/70 p-4 rounded-lg border border-indigo-100 space-y-1.5">
                    <span className="font-bold text-indigo-950 block">🧠 Tantangan Berpikir Kritis (Pertanyaan HOTS):</span>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                      {moduleData.lkpd.pertanyaanHOTS.map((q, i) => (
                        <li key={i} className="leading-relaxed">
                          <b>{q}</b>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-indigo-950 block">💬 Lembar Refleksi Mandiri Siswa (Mindful Reflection):</span>
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                      "{moduleData.lkpd.refleksiSiswa}"
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* M. GLOSARIUM */}
            {moduleData.glosarium && (
              <section className="space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                  M. GLOSARIUM
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <pre className="text-xs text-slate-600 font-sans whitespace-pre-wrap leading-relaxed">
                    {moduleData.glosarium}
                  </pre>
                </div>
              </section>
            )}

            {/* N. DAFTAR PUSTAKA */}
            {moduleData.daftarPustaka && (
              <section className="space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                  N. DAFTAR PUSTAKA
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <pre className="text-xs text-slate-600 font-sans whitespace-pre-wrap leading-relaxed">
                    {moduleData.daftarPustaka}
                  </pre>
                </div>
              </section>
            )}

            {/* BAGIAN TANDA TANGAN */}
            <div className="pt-12 grid grid-cols-2 text-center text-xs sm:text-sm gap-8 font-sans">
              <div>
                <p>Mengetahui,</p>
                <p className="font-bold">Kepala Sekolah,</p>
                <div className="h-20"></div>
                <p className="font-bold underline">{moduleData.tandaTangan.namaKepalaSekolah}</p>
                <p>NIP. {moduleData.tandaTangan.nipKepalaSekolah}</p>
              </div>

              <div>
                <p>{moduleData.tandaTangan.lokasiTanggal}</p>
                <p className="font-bold">Guru Mata Pelajaran,</p>
                <div className="h-20"></div>
                <p className="font-bold underline">{moduleData.tandaTangan.namaGuru}</p>
                <p>NIP. {moduleData.tandaTangan.nipGuru}</p>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

