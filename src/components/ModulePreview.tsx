import React, { useState } from 'react';
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
} from 'lucide-react';

interface ModulePreviewProps {
  moduleData: GeneratedModuleContent | null;
  isLoading: boolean;
}

export const ModulePreview: React.FC<ModulePreviewProps> = ({ moduleData, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');

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
    downloadDocFile(moduleData);
  };

  const handlePrint = () => {
    window.print();
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
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
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

          {/* Mode Toggle & Print */}
          <button
            type="button"
            onClick={toggleEditMode}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition"
          >
            {isEditing ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <Edit3 className="w-3.5 h-3.5 text-blue-600" />}
            <span>{isEditing ? 'Preview' : 'Edit Teks'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak</span>
          </button>
        </div>
      </div>

      {copied && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Teks modul ajar berhasil disalin ke clipboard! Silakan paste ke dokumen Anda.</span>
        </div>
      )}

      {/* DOCUMENT CONTENT / EDIT AREA */}
      <div className="p-5 sm:p-8 bg-slate-50/50 min-h-[600px] max-h-[85vh] overflow-y-auto font-sans text-slate-800 printable-document">
        {isEditing ? (
          <div className="space-y-2">
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
        ) : (
          <div className="bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-slate-200 space-y-6 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
            {/* DOCUMENT HEADER */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase text-slate-900">
                MODUL AJAR DEEP LEARNING
              </h1>
              <p className="font-bold text-slate-800 text-xs sm:text-sm uppercase">
                MATA PELAJARAN : {moduleData.identitas.mataPelajaran.toUpperCase()}
              </p>
              <p className="font-bold text-slate-700 text-xs sm:text-sm uppercase">
                TOPIK : {moduleData.identitas.alokasiWaktu ? moduleData.identitas.alokasiWaktu : ''}
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
          </div>
        )}
      </div>
    </div>
  );
};

