import { GeneratedModuleContent } from '../types';
import { formatModuleToText } from './moduleGenerator';

export function generateDocHtml(moduleData: GeneratedModuleContent): string {
  const p = moduleData.langkahPembelajaran;

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>MODUL AJAR DEEP LEARNING - ${moduleData.identitas.mataPelajaran}</title>
<style>
  @page {
    size: A4;
    margin: 2.5cm 2cm 2.5cm 2cm;
  }
  body {
    font-family: 'Calibri', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.4;
    color: #000000;
  }
  h1 {
    font-size: 14pt;
    font-weight: bold;
    text-align: center;
    margin-top: 0;
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  .sub-header {
    font-size: 11pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 18px;
  }
  .section-title {
    font-size: 11pt;
    font-weight: bold;
    margin-top: 14px;
    margin-bottom: 6px;
    background-color: #f2f2f2;
    padding: 3px 6px;
    border-left: 4px solid #1a365d;
  }
  .sub-section-title {
    font-size: 11pt;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 4px;
  }
  table.info-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  table.info-table td {
    padding: 3px 6px;
    vertical-align: top;
    font-size: 11pt;
  }
  .label-col {
    width: 32%;
    font-weight: normal;
  }
  .sep-col {
    width: 2%;
  }
  .val-col {
    width: 66%;
  }
  ol, ul {
    margin-top: 2px;
    margin-bottom: 6px;
    padding-left: 20px;
  }
  li {
    margin-bottom: 3px;
  }
  p {
    margin-top: 2px;
    margin-bottom: 6px;
    text-align: justify;
  }
  .meeting-card {
    border: 1px solid #cccccc;
    padding: 10px;
    margin-bottom: 12px;
    background-color: #fafafa;
  }
  .signature-table {
    width: 100%;
    margin-top: 40px;
    border-collapse: collapse;
  }
  .signature-table td {
    width: 50%;
    text-align: center;
    vertical-align: top;
    font-size: 11pt;
    padding: 0;
  }
  .signature-space {
    height: 70px;
  }
</style>
</head>
<body>

  <h1>MODUL AJAR DEEP LEARNING</h1>
  <div class="sub-header">
    MATA PELAJARAN : ${moduleData.identitas.mataPelajaran.toUpperCase()}<br>
    TOPIK : ${moduleData.identitas.alokasiWaktu ? moduleData.identitas.alokasiWaktu : ''}
  </div>

  <div class="section-title">A. IDENTITAS MODUL</div>
  <table class="info-table">
    <tr><td class="label-col">Nama Sekolah</td><td class="sep-col">:</td><td class="val-col">${moduleData.identitas.namaSekolah}</td></tr>
    <tr><td class="label-col">Nama Penyusun</td><td class="sep-col">:</td><td class="val-col">${moduleData.identitas.namaPenyusun}</td></tr>
    <tr><td class="label-col">Mata Pelajaran</td><td class="sep-col">:</td><td class="val-col">${moduleData.identitas.mataPelajaran}</td></tr>
    <tr><td class="label-col">Kelas / Fase / Semester</td><td class="sep-col">:</td><td class="val-col">${moduleData.identitas.kelas} / ${moduleData.identitas.fase} / ${moduleData.identitas.semester}</td></tr>
    <tr><td class="label-col">Alokasi Waktu</td><td class="sep-col">:</td><td class="val-col">${moduleData.identitas.alokasiWaktu}</td></tr>
  </table>

  <div class="section-title">B. IDENTIFIKASI KESIAPAN PESERTA DIDIK</div>
  <p><b>Pengetahuan Awal:</b> ${moduleData.kesiapanPesertaDidik.pengetahuanAwal}</p>
  <p><b>Minat:</b> ${moduleData.kesiapanPesertaDidik.minat}</p>
  <p><b>Latar Belakang:</b> ${moduleData.kesiapanPesertaDidik.latarBelakang}</p>
  <p><b>Kebutuhan Belajar:</b></p>
  <ul>
    <li><b>Visual:</b> ${moduleData.kesiapanPesertaDidik.kebutuhanBelajar.visual}</li>
    <li><b>Auditori:</b> ${moduleData.kesiapanPesertaDidik.kebutuhanBelajar.auditori}</li>
    <li><b>Kinestetik:</b> ${moduleData.kesiapanPesertaDidik.kebutuhanBelajar.kinestetik}</li>
  </ul>

  <div class="section-title">C. KARAKTERISTIK MATERI PELAJARAN</div>
  <p><b>Jenis Pengetahuan yang Akan Dicapai:</b> ${moduleData.karakteristikMateri.jenisPengetahuan}</p>
  <p><b>Konseptual:</b> ${moduleData.karakteristikMateri.konseptual}</p>
  <p><b>Prosedural:</b> ${moduleData.karakteristikMateri.prosedural}</p>
  <p><b>Relevansi dengan Kehidupan Nyata Peserta Didik:</b> ${moduleData.karakteristikMateri.relevansiKehidupan}</p>
  <p><b>Tingkat Kesulitan:</b> ${moduleData.karakteristikMateri.tingkatKesulitan}</p>
  <p><b>Struktur Materi:</b> ${moduleData.karakteristikMateri.strukturMateri}</p>
  <p><b>Integrasi Nilai dan Karakter:</b> ${moduleData.karakteristikMateri.integrasiNilai}</p>

  <div class="section-title">D. DIMENSI PROFIL LULUSAN</div>
  <p><b>Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa, dan Berakhlak Mulia:</b> ${moduleData.dimensiProfilLulusan.keimanan}</p>
  <p><b>Kewargaan:</b> ${moduleData.dimensiProfilLulusan.kewargaan}</p>
  <p><b>Penalaran Kritis:</b> ${moduleData.dimensiProfilLulusan.penalaranKritis}</p>
  <p><b>Kreativitas:</b> ${moduleData.dimensiProfilLulusan.kreativitas}</p>
  <p><b>Kolaborasi:</b> ${moduleData.dimensiProfilLulusan.kolaborasi}</p>
  <p><b>Kemandirian:</b> ${moduleData.dimensiProfilLulusan.kemandirian}</p>
  <p><b>Kesehatan:</b> ${moduleData.dimensiProfilLulusan.kesehatan}</p>
  <p><b>Komunikasi:</b> ${moduleData.dimensiProfilLulusan.komunikasi}</p>

  <div class="section-title">DESAIN PEMBELAJARAN</div>

  <div class="sub-section-title">A. CAPAIAN PEMBELAJARAN (CP)</div>
  <p>Pada akhir Fase ${moduleData.capaianPembelajaran.fase}, murid memiliki kemampuan sebagai berikut.</p>
  <p><b>Mengalami (Experiencing)</b><br>${moduleData.capaianPembelajaran.mengalami}</p>
  <p><b>Merefleksikan (Reflecting)</b><br>${moduleData.capaianPembelajaran.merefleksikan}</p>
  <p><b>Berpikir dan Bekerja Artistik (Thinking and Working Artistically)</b><br>${moduleData.capaianPembelajaran.berpikirArtistik}</p>
  <p><b>Menciptakan (Making/Creating)</b><br>${moduleData.capaianPembelajaran.menciptakan}</p>
  <p><b>Berdampak (Impacting)</b><br>${moduleData.capaianPembelajaran.berdampak}</p>

  <div class="sub-section-title">B. LINTAS DISIPLIN ILMU</div>
  <p><b>Mata Pelajaran ${moduleData.lintasDisiplinIlmu.mataPelajaran}:</b> Isian ${moduleData.lintasDisiplinIlmu.deskripsi}</p>

  <div class="sub-section-title">C. TUJUAN PEMBELAJARAN</div>
  <p>${moduleData.tujuanPembelajaran}</p>

  <div class="sub-section-title">D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN</div>
  <ol>
    ${moduleData.indikatorKetercapaian.map(ind => `<li>${ind}</li>`).join('')}
  </ol>

  <div class="sub-section-title">E. TOPIK PEMBELAJARAN KONTEKSTUAL</div>
  <p>${moduleData.topikKontekstual}</p>

  <div class="sub-section-title">F. KERANGKA PEMBELAJARAN</div>
  <p><b>PRAKTIK PEDAGOGIK</b></p>
  <p><b>Model Pembelajaran:</b> ${moduleData.kerangkaPembelajaran.modelPembelajaran}</p>
  <p><b>Pendekatan:</b> ${moduleData.kerangkaPembelajaran.pendekatan}</p>
  <p><b>Mindful Learning:</b> ${moduleData.kerangkaPembelajaran.mindfulLearning}</p>
  <p><b>Meaningful Learning:</b> ${moduleData.kerangkaPembelajaran.meaningfulLearning}</p>
  <p><b>Joyful Learning:</b> ${moduleData.kerangkaPembelajaran.joyfulLearning}</p>
  <p><b>Metode Pembelajaran:</b> ${moduleData.kerangkaPembelajaran.metodePembelajaran}</p>
  <p><b>Strategi Pembelajaran Berdiferensiasi:</b></p>
  <ul>
    <li><b>Diferensiasi Konten:</b> ${moduleData.kerangkaPembelajaran.diferensiasi.konten}</li>
    <li><b>Diferensiasi Proses:</b> ${moduleData.kerangkaPembelajaran.diferensiasi.proses}</li>
    <li><b>Diferensiasi Produk:</b> ${moduleData.kerangkaPembelajaran.diferensiasi.produk}</li>
  </ul>

  <p><b>KEMITRAAN PEMBELAJARAN</b></p>
  <ul>
    <li><b>Lingkungan Sekolah:</b> ${moduleData.kerangkaPembelajaran.kemitraan.lingkunganSekolah}</li>
    <li><b>Lingkungan Luar Sekolah/Masyarakat:</b> ${moduleData.kerangkaPembelajaran.kemitraan.lingkunganLuarSekolah}</li>
    <li><b>Mitra Digital:</b> ${moduleData.kerangkaPembelajaran.kemitraan.mitraDigital}</li>
  </ul>

  <p><b>LINGKUNGAN BELAJAR</b></p>
  <ul>
    <li><b>Ruang Fisik:</b> ${moduleData.kerangkaPembelajaran.lingkunganBelajar.ruangFisik}</li>
    <li><b>Ruang Virtual:</b> ${moduleData.kerangkaPembelajaran.lingkunganBelajar.ruangVirtual}</li>
    <li><b>Budaya Belajar:</b> ${moduleData.kerangkaPembelajaran.lingkunganBelajar.budayaBelajar}</li>
  </ul>

  <p><b>PEMANFAATAN DIGITAL</b></p>
  <p>${moduleData.kerangkaPembelajaran.pemanfaatanDigital}</p>

  <div class="sub-section-title">G. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI</div>

  ${p.map(item => `
    <div class="meeting-card">
      <p><b>PERTEMUAN ${item.pertemuanKe} (${item.totalJP} JP : ${item.menitTotal} MENIT)</b></p>
      <p><b>Topik :</b> ${item.topikPertemuan}</p>
      
      <p><b>KEGIATAN PENDAHULUAN (${item.pendahuluan.alokasiMenit} MENIT)</b></p>
      <ul>
        <li><b>Orientasi:</b> ${item.pendahuluan.orientasi}</li>
        <li><b>Apersepsi (Joyful):</b> ${item.pendahuluan.apersepsi}</li>
        <li><b>Motivasi:</b> ${item.pendahuluan.motivasi}</li>
        <li><b>Penyampaian Tujuan:</b> ${item.pendahuluan.penyampaianTujuan}</li>
        <li><b>Asesmen Diagnostik:</b> ${item.pendahuluan.asesmenDiagnostik}</li>
      </ul>

      <p><b>KEGIATAN INTI (${item.kegiatanInti.alokasiMenit} MENIT)</b></p>
      <ul>
        <li><b>Eksplorasi Bahan:</b> ${item.kegiatanInti.eksplorasiBahan}</li>
        <li><b>Eksperimen Keseimbangan / Penyelidikan:</b> ${item.kegiatanInti.eksperimenPenyelidikan}</li>
        <li><b>Diskusi:</b> ${item.kegiatanInti.diskusi}</li>
      </ul>

      <p><b>KEGIATAN PENUTUP (${item.penutup.alokasiMenit} MENIT)</b></p>
      <ul>
        <li><b>Refleksi:</b> ${item.penutup.refleksi}</li>
        <li><b>Tindak Lanjut:</b> ${item.penutup.tindakLanjut}</li>
        <li><b>Penutup:</b> ${item.penutup.penutup}</li>
      </ul>
    </div>
  `).join('')}

  <div class="sub-section-title">H. ASESMEN PEMBELAJARAN</div>
  <p><b>ASESMEN DIAGNOSTIK</b></p>
  <ul>
    <li><b>Praktik:</b> ${moduleData.asesmen.diagnostik.praktik}</li>
    <li><b>Observasi:</b> ${moduleData.asesmen.diagnostik.observasi}</li>
  </ul>

  <p><b>ASESMEN FORMATIF</b></p>
  <p><b>Produk (Proyek):</b></p>
  <ul>
    <li><b>Tugas:</b> ${moduleData.asesmen.formatif.produkProyek.tugas}</li>
    <li><b>Penilaian:</b> ${moduleData.asesmen.formatif.produkProyek.penilaian}</li>
    <li><b>Observasi:</b> ${moduleData.asesmen.formatif.produkProyek.observasi}</li>
  </ul>

  <p><b>ASESMEN SUMATIF</b></p>
  <p><b>Produk (Proyek):</b></p>
  <ul>
    <li><b>Tugas:</b> ${moduleData.asesmen.sumatif.produkProyek.tugas}</li>
    <li><b>Penilaian:</b> ${moduleData.asesmen.sumatif.produkProyek.penilaian}</li>
  </ul>
  <p><b>Praktik (Kinerja):</b></p>
  <ul>
    <li><b>Tugas:</b> ${moduleData.asesmen.sumatif.praktikKinerja.tugas}</li>
    <li><b>Penilaian:</b> ${moduleData.asesmen.sumatif.praktikKinerja.penilaian}</li>
  </ul>
  <p><b>Tes Tertulis:</b> ${moduleData.asesmen.sumatif.tesTertulis}</p>

  ${moduleData.pertanyaanPemantik && moduleData.pertanyaanPemantik.length > 0 ? `
    <div class="section-title">I. PERTANYAAN PEMANTIK</div>
    <ol>
      ${moduleData.pertanyaanPemantik.map(q => `<li>${q}</li>`).join('')}
    </ol>
  ` : ''}

  ${moduleData.pemahamanBermakna ? `
    <div class="section-title">J. PEMAHAMAN BERMAKNA</div>
    <p>${moduleData.pemahamanBermakna}</p>
  ` : ''}

  ${moduleData.pengayaanRemedial ? `
    <div class="section-title">K. PENGAYAAN DAN REMEDIAL</div>
    <p><b>Pengayaan:</b> ${moduleData.pengayaanRemedial.pengayaan}</p>
    <p><b>Remedial:</b> ${moduleData.pengayaanRemedial.remedial}</p>
  ` : ''}

  ${moduleData.bahanBacaan ? `
    <div class="section-title">L. BAHAN BACAAN GURU DAN SISWA</div>
    <p><b>Bahan Bacaan Guru:</b> ${moduleData.bahanBacaan.guru}</p>
    <p><b>Bahan Bacaan Siswa:</b> ${moduleData.bahanBacaan.siswa}</p>
  ` : ''}

  ${moduleData.lkpd ? `
    <div style="page-break-before: always; border: 2px solid #1a365d; padding: 15px; margin-top: 20px; background-color: #fafbfd;">
      <h2 style="font-size: 13pt; font-weight: bold; text-align: center; color: #1a365d; margin-top: 0;">LEMBAR KERJA PESERTA DIDIK (LKPD)</h2>
      <p style="text-align: center; font-weight: bold; font-size: 11pt; margin-bottom: 12px; text-transform: uppercase;">${moduleData.lkpd.judul}</p>
      
      <p><b>Tujuan Aktivitas:</b> ${moduleData.lkpd.tujuan}</p>
      
      <p><b>Alat dan Bahan:</b></p>
      <ul>
        ${moduleData.lkpd.alatBahan.map(tool => `<li>${tool}</li>`).join('')}
      </ul>
      
      <p><b>Langkah-langkah Kerja (Pendekatan Deep Learning - Mindful & Joyful):</b></p>
      <ol>
        ${moduleData.lkpd.langkahKerja.map(step => `<li>${step}</li>`).join('')}
      </ol>
      
      <p><b>Aktivitas Bermakna (Meaningful Learning):</b></p>
      <p style="background-color: #f0f4f8; padding: 6px; border-left: 3px solid #1a365d; margin-left: 10px;">${moduleData.lkpd.aktivitasBermakna}</p>
      
      <p><b>Pertanyaan Tantangan HOTS (Berpikir Kritis):</b></p>
      <ul>
        ${moduleData.lkpd.pertanyaanHOTS.map(q => `<li><b>${q}</b></li>`).join('')}
      </ul>
      
      <p><b>Lembar Refleksi Mandiri Siswa (Mindful Reflection):</b></p>
      <p style="font-style: italic; color: #555555;">${moduleData.lkpd.refleksiSiswa}</p>
    </div>
  ` : ''}

  ${moduleData.glosarium ? `
    <div class="section-title">M. GLOSARIUM</div>
    <p style="white-space: pre-line;">${moduleData.glosarium}</p>
  ` : ''}

  ${moduleData.daftarPustaka ? `
    <div class="section-title">N. DAFTAR PUSTAKA</div>
    <p style="white-space: pre-line;">${moduleData.daftarPustaka}</p>
  ` : ''}

  <br>

  <table class="signature-table">
    <tr>
      <td>
        Mengetahui,<br>
        Kepala Sekolah,<br>
        <div class="signature-space"></div>
        <b><u>${moduleData.tandaTangan.namaKepalaSekolah}</u></b><br>
        NIP. ${moduleData.tandaTangan.nipKepalaSekolah}
      </td>
      <td>
        ${moduleData.tandaTangan.lokasiTanggal}<br>
        Guru Mata Pelajaran,<br>
        <div class="signature-space"></div>
        <b><u>${moduleData.tandaTangan.namaGuru}</u></b><br>
        NIP. ${moduleData.tandaTangan.nipGuru}
      </td>
    </tr>
  </table>

</body>
</html>`;
}

export function downloadDocFile(moduleData: GeneratedModuleContent): void {
  const htmlContent = generateDocHtml(moduleData);
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const sanitizedSubject = moduleData.identitas.mataPelajaran.replace(/[^a-zA-Z0-0]/g, '_');
  const filename = `Modul_Ajar_Deep_Learning_${sanitizedSubject}.doc`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}
