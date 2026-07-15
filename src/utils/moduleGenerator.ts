import { ModuleFormData, GeneratedModuleContent, PertemuanDetail, FaseOption } from '../types';
import { getSubjectDatabase } from '../data/subjectDatabase';

export function calculateFase(kelas: string): FaseOption {
  if (kelas === 'Kelas 1' || kelas === 'Kelas 2') {
    return 'Fase A';
  } else if (kelas === 'Kelas 3' || kelas === 'Kelas 4') {
    return 'Fase B';
  } else {
    return 'Fase C';
  }
}

export function parseAlokasiWaktu(alokasiStr: string): { totalJP: number; jumlahPertemuan: number; jpPerPertemuan: number } {
  // Example: "24 JP (8 kali pertemuan @3 JP)"
  let totalJP = 24;
  let jumlahPertemuan = 8;
  let jpPerPertemuan = 3;

  const jpMatch = alokasiStr.match(/(\d+)\s*JP/i);
  if (jpMatch) {
    totalJP = parseInt(jpMatch[1], 10);
  }

  const pertMatch = alokasiStr.match(/(\d+)\s*(kali\s*)?pertemuan/i);
  if (pertMatch) {
    jumlahPertemuan = parseInt(pertMatch[1], 10);
  } else {
    jumlahPertemuan = Math.max(1, Math.round(totalJP / 3));
  }

  const subJpMatch = alokasiStr.match(/@(\d+)\s*JP/i);
  if (subJpMatch) {
    jpPerPertemuan = parseInt(subJpMatch[1], 10);
  } else if (jumlahPertemuan > 0) {
    jpPerPertemuan = Math.max(1, Math.round(totalJP / jumlahPertemuan));
  }

  return { totalJP, jumlahPertemuan, jpPerPertemuan };
}

export function buildDeepLearningModule(formData: ModuleFormData): GeneratedModuleContent {
  const fase = calculateFase(formData.kelas);
  const { totalJP, jumlahPertemuan, jpPerPertemuan } = parseAlokasiWaktu(formData.alokasiWaktu);
  const subjectDb = getSubjectDatabase(formData.mataPelajaran);

  const menitTotalPerPertemuan = jpPerPertemuan * 35; // 35 menit per JP SD
  const pendahuluanMenit = 15;
  const penutupMenit = 15;
  const intiMenit = Math.max(30, menitTotalPerPertemuan - pendahuluanMenit - penutupMenit);

  // Generate meetings
  const langkahPembelajaran: PertemuanDetail[] = [];

  for (let i = 1; i <= jumlahPertemuan; i++) {
    langkahPembelajaran.push({
      pertemuanKe: i,
      totalJP: jpPerPertemuan,
      menitTotal: menitTotalPerPertemuan,
      topikPertemuan: `${formData.topik} - Bagian ${i}: Eksplorasi & Praktik Pendalaman`,
      pendahuluan: {
        alokasiMenit: pendahuluanMenit,
        orientasi: 'Guru membuka pelajaran dengan salam hangat, berdoa bersama dipimpin salah satu siswa, serta melakukan presensi kehadiran.',
        apersepsi: `(Joyful) Guru mengajak siswa menyanyikan lagu gembira / melakukan game edukatif singkat yang menghubungkan pengalaman harian dengan topik ${formData.topik}.`,
        motivasi: `(Meaningful) Guru menunjukkan gambar/benda nyata dan memberikan tebakan pemantik: "Mengapa kita perlu mempelajari ${formData.topik} dalam kehidupan sehari-hari?"`,
        penyampaianTujuan: `Guru menyampaikan tujuan pembelajaran pertemuan ke-${i} dan kriteria keberhasilan yang akan dicapai bersama.`,
        asesmenDiagnostik: 'Guru mengajukan 2 pertanyaan pemantik lisan singkat untuk mengukur kesiapan dan pengetahuan awal siswa sebelum masuk materi inti.'
      },
      kegiatanInti: {
        alokasiMenit: intiMenit,
        eksplorasiBahan: `(Mindful & Diterensiasi Konten) Siswa secara cermat mengamati media pembelajaran (benda konkret/gambar/video/alat peraga) terkait ${formData.topik}.`,
        eksperimenPenyelidikan: `(Meaningful, Model ${formData.modelPembelajaran}) Siswa bekerja dalam kelompok heterogen untuk mempraktikkan, meneliti, dan memecahkan tantangan ${formData.topik}.`,
        diskusi: `(Joyful & Diterensiasi Proses) Siswa mendiskusikan hasil eksperimen kelompok, saling bertukar gagasan, dan mempersiapkan bahan pameran/presentasi.`
      },
      penutup: {
        alokasiMenit: penutupMenit,
        refleksi: `(Mindful Reflection) Guru merangkum pembelajaran bersama siswa dan meminta siswa menyampaikan emosi/pemahaman hari ini: "Apa hal paling berkesan yang kalian temukan hari ini?"`,
        tindakLanjut: `Guru memberikan arahan tugas mandiri ringan / tantangan apresiasi di rumah bersama keluarga terkait topik ${formData.topik}.`,
        penutup: 'Pelajaran ditutup dengan doa bersama penuh rasa syukur dan salam perpisahan yang ramah.'
      }
    });
  }

  const hariIni = formData.lokasiTanggal || `Larangan, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;

  return {
    identitas: {
      namaSekolah: formData.namaSekolah,
      namaPenyusun: formData.namaPenyusun,
      mataPelajaran: formData.mataPelajaran,
      kelas: formData.kelas,
      fase: fase,
      semester: formData.semester,
      alokasiWaktu: formData.alokasiWaktu,
      topik: formData.topik
    },
    kesiapanPesertaDidik: {
      pengetahuanAwal: subjectDb.pengetahuanAwal,
      minat: 'Peserta didik memiliki minat yang tinggi dalam kegiatan membangun, merakit, dan berkreasi menggunakan berbagai media, termasuk barang-barang bekas.',
      latarBelakang: 'Peserta didik memiliki pengalaman bermain dengan balok susun, lego, atau membuat hasta karya sederhana, sehingga memiliki pemahaman intuitif tentang keseimbangan dan konstruksi.',
      kebutuhanBelajar: {
        visual: `Membutuhkan contoh-contoh visual yang inspiratif dan demonstrasi langsung mengenai materi ${formData.topik}.`,
        auditori: `Membutuhkan diskusi kelompok untuk merancang ide dan instruksi lisan yang jelas dari guru mengenai konsep ${formData.topik}.`,
        kinestetik: `Membutuhkan pengalaman praktik langsung dalam memilih, menyusun, merekatkan, dan membangun karya dari berbagai benda.`
      }
    },
    karakteristikMateri: {
      jenisPengetahuan: subjectDb.jenisPengetahuan,
      konseptual: subjectDb.konseptual,
      prosedural: subjectDb.prosedural,
      relevansiKehidupan: subjectDb.relevansiKehidupan,
      tingkatKesulitan: subjectDb.tingkatKesulitan,
      strukturMateri: subjectDb.strukturMateri,
      integrasiNilai: subjectDb.integrasiNilai
    },
    dimensiProfilLulusan: subjectDb.dimensiProfil,
    capaianPembelajaran: {
      fase: fase,
      mengalami: subjectDb.capaianPembelajaran.mengalami,
      merefleksikan: subjectDb.capaianPembelajaran.merefleksikan,
      berpikirArtistik: subjectDb.capaianPembelajaran.berpikirArtistik,
      menciptakan: subjectDb.capaianPembelajaran.menciptakan,
      berdampak: subjectDb.capaianPembelajaran.berdampak
    },
    lintasDisiplinIlmu: {
      mataPelajaran: formData.mataPelajaran,
      deskripsi: subjectDb.lintasDisiplinIlmu
    },
    tujuanPembelajaran: `Pertemuan 1 - ${jumlahPertemuan} (${formData.alokasiWaktu}): Melalui model ${formData.modelPembelajaran} dan pendekatan Deep Learning (Mindful, Meaningful, Joyful Learning), peserta didik mampu memahami, mengaplikasikan, serta memecahkan tantangan kontekstual terkait topik ${formData.topik} secara kolaboratif dan kreatif.`,
    indikatorKetercapaian: subjectDb.indikatorDefault,
    topikKontekstual: subjectDb.topikKontekstual,
    kerangkaPembelajaran: {
      modelPembelajaran: formData.modelPembelajaran,
      pendekatan: 'Deep Learning (Mindful, Meaningful, Joyful Learning)',
      mindfulLearning: subjectDb.mindfulLearning,
      meaningfulLearning: subjectDb.meaningfulLearning,
      joyfulLearning: subjectDb.joyfulLearning,
      metodePembelajaran: `Diskusi kelompok, Eksperimen langsung, Simulasi/Permainan Edukatif, dan Presentasi unjuk kerja (Sesuai model ${formData.modelPembelajaran}).`,
      diferensiasi: subjectDb.diferensiasi,
      kemitraan: subjectDb.kemitraan,
      lingkunganBelajar: subjectDb.lingkunganBelajar,
      pemanfaatanDigital: subjectDb.pemanfaatanDigital
    },
    langkahPembelajaran: langkahPembelajaran,
    asesmen: {
      diagnostik: {
        praktik: subjectDb.asesmenDefault.diagnostikPraktik,
        observasi: subjectDb.asesmenDefault.diagnostikObservasi
      },
      formatif: {
        produkProyek: {
          tugas: subjectDb.asesmenDefault.formatifTugas,
          penilaian: subjectDb.asesmenDefault.formatifPenilaian,
          observasi: subjectDb.asesmenDefault.formatifObservasi
        }
      },
      sumatif: {
        produkProyek: {
          tugas: subjectDb.asesmenDefault.sumatifProyekTugas,
          penilaian: subjectDb.asesmenDefault.sumatifProyekPenilaian
        },
        praktikKinerja: {
          tugas: subjectDb.asesmenDefault.sumatifKinerjaTugas,
          penilaian: subjectDb.asesmenDefault.sumatifKinerjaPenilaian
        },
        tesTertulis: subjectDb.asesmenDefault.sumatifTesTertulis
      }
    },
    pertanyaanPemantik: [
      `Bagaimana kita bisa menerapkan konsep ${formData.topik} dalam kehidupan kita sehari-hari?`,
      `Mengapa penting bagi kita untuk benar-benar memahami konsep ${formData.topik}?`,
      `Apa tantangan atau masalah nyata di sekitar kita yang bisa diselesaikan dengan pemahaman ${formData.topik}?`
    ],
    pemahamanBermakna: `Setelah mempelajari topik ini, peserta didik menyadari pentingnya konsep ${formData.topik} dalam memecahkan masalah nyata secara kreatif, logis, dan penuh kesadaran (mindful), serta mampu berkolaborasi untuk menciptakan solusi yang berdampak bagi lingkungan sekitar.`,
    pengayaanRemedial: {
      pengayaan: `Peserta didik yang telah mencapai kriteria ketercapaian diberikan tantangan lebih tinggi berupa analisis studi kasus nyata mandiri berkaitan dengan ${formData.topik} atau menjadi tutor sebaya bagi temannya.`,
      remedial: `Guru membimbing kembali peserta didik yang belum mencapai kriteria ketercapaian secara individual atau kelompok kecil dengan menggunakan media visual atau benda konkret yang disederhanakan.`
    },
    bahanBacaan: {
      guru: `Buku Panduan Guru Kurikulum Merdeka Kemendikbudristek RI sesuai BSKAP CP 046, artikel pedagogi tentang model ${formData.modelPembelajaran}, serta jurnal pendekatan pembelajaran mendalam (Deep Learning).`,
      siswa: `Buku Siswa Mata Pelajaran ${formData.mataPelajaran} Kurikulum Merdeka, lembar rangkuman materi ringkas buatan guru mengenai ${formData.topik}, serta infografis pendukung.`
    },
    glosarium: `${formData.topik} : Konsep atau tema utama yang dipelajari pada kegiatan pembelajaran ini.\nDeep Learning : Pendekatan pembelajaran mendalam yang memadukan kesadaran penuh (Mindful), kebermaknaan konsep (Meaningful), dan suasana belajar gembira (Joyful).\nKurikulum Merdeka : Kurikulum nasional Indonesia dengan pembelajaran intrakurikuler yang beragam agar murid memiliki cukup waktu untuk mendalami konsep.`,
    daftarPustaka: `Badan Standar, Kurikulum, dan Asesmen Pendidikan. (2023). Keputusan Kepala BSKAP No 046/H/KR/2023 tentang Capaian Pembelajaran Kurikulum Merdeka. Jakarta: Kemendikbudristek.\nAdmin Esstu. (2026). Panduan Praktis Implementasi Pendekatan Deep Learning Berbasis Proyek di Sekolah Dasar.`,
    lkpd: {
      judul: `LKPD Kreatif & Bermakna: Menyelidiki ${formData.topik}`,
      tujuan: `Peserta didik mampu berkolaborasi aktif dalam kelompok untuk menyelidiki, menganalisis, merancang, dan menyajikan solusi karya nyata yang berkaitan dengan konsep ${formData.topik} secara gembira dan bermakna.`,
      alatBahan: [
        "Lembar pencatatan aktivitas / buku tugas",
        "Alat tulis berwarna (spidol/krayon)",
        "Media konkret pendukung atau barang bekas sekitar yang ramah lingkungan sesuai kreativitas kelompok"
      ],
      langkahKerja: [
        "Berkumpullah bersama kelompok heterogen Anda dengan tertib dan penuh kesadaran (Mindful).",
        `Amati masalah atau tantangan konkret berkaitan dengan ${formData.topik} yang disajikan oleh guru di depan kelas.`,
        `Diskusikan ide-ide kreatif pemecahan masalah bersama seluruh anggota kelompok secara setara dan saling menghargai (Meaningful).`,
        "Tuliskan rancangan solusi kelompok pada bagan atau lembar aktivitas LKPD ini.",
        `Realisasikan rancangan tersebut menjadi karya nyata/miniatur/gambar kolaboratif dengan penuh semangat dan tawa gembira (Joyful).`,
        "Sajikan hasil karya kelompok Anda di depan kelas, dan ajaklah kelompok lain memberikan umpan balik positif."
      ],
      aktivitasBermakna: `Eksperimen terbimbing secara berkelompok untuk mendesain prototipe/karya nyata pemecahan masalah bertema ${formData.topik}, diikuti dengan sesi diskusi interaktif menghubungkan temuan eksperimen dengan kehidupan sehari-hari siswa.`,
      pertanyaanHOTS: [
        `Jika situasi atau kondisi di sekitar lingkungan diubah, apakah solusi yang kelompok Anda rancang tentang ${formData.topik} masih dapat berfungsi dengan baik? Mengapa?`,
        `Bagaimana cara kelompok Anda menyempurnakan karya/solusi tersebut agar lebih berkelanjutan dan membawa manfaat yang lebih besar bagi masyarakat luas?`
      ],
      refleksiSiswa: `Bagian aktivitas mana yang paling menyenangkan dan menantang bagi kelompok Anda hari ini? Apa satu hal terpenting yang baru Anda pahami tentang konsep ${formData.topik}?`
    },
    tandaTangan: {
      namaKepalaSekolah: formData.namaKepalaSekolah,
      nipKepalaSekolah: formData.nipKepalaSekolah,
      namaGuru: formData.namaPenyusun,
      nipGuru: formData.nipPenyusun,
      lokasiTanggal: hariIni
    }
  };
}

export function formatModuleToText(moduleData: GeneratedModuleContent): string {
  let text = `MODUL AJAR DEEP LEARNING\n`;
  text += `MATA PELAJARAN : ${moduleData.identitas.mataPelajaran.toUpperCase()}\n`;
  text += `TOPIK : ${moduleData.identitas.alokasiWaktu ? moduleData.identitas.alokasiWaktu : ''}\n\n`;

  text += `A. IDENTITAS MODUL\n`;
  text += `Nama Sekolah\t: ${moduleData.identitas.namaSekolah}\n`;
  text += `Nama Penyusun\t: ${moduleData.identitas.namaPenyusun}\n`;
  text += `Mata Pelajaran\t: ${moduleData.identitas.mataPelajaran}\n`;
  text += `Kelas / Fase / Semester\t: ${moduleData.identitas.kelas} / ${moduleData.identitas.fase} / ${moduleData.identitas.semester}\n`;
  text += `Alokasi Waktu\t: ${moduleData.identitas.alokasiWaktu}\n\n`;

  text += `B. IDENTIFIKASI KESIAPAN PESERTA DIDIK\n`;
  text += `Pengetahuan Awal: ${moduleData.kesiapanPesertaDidik.pengetahuanAwal}\n`;
  text += `Minat: ${moduleData.kesiapanPesertaDidik.minat}\n`;
  text += `Latar Belakang: ${moduleData.kesiapanPesertaDidik.latarBelakang}\n`;
  text += `Kebutuhan Belajar:\n`;
  text += `Visual: ${moduleData.kesiapanPesertaDidik.kebutuhanBelajar.visual}\n`;
  text += `Auditori: ${moduleData.kesiapanPesertaDidik.kebutuhanBelajar.auditori}\n`;
  text += `Kinestetik: ${moduleData.kesiapanPesertaDidik.kebutuhanBelajar.kinestetik}\n\n`;

  text += `C. KARAKTERISTIK MATERI PELAJARAN\n`;
  text += `Jenis Pengetahuan yang Akan Dicapai: ${moduleData.karakteristikMateri.jenisPengetahuan}\n`;
  text += `Konseptual: ${moduleData.karakteristikMateri.konseptual}\n`;
  text += `Prosedural: ${moduleData.karakteristikMateri.prosedural}\n`;
  text += `Relevansi dengan Kehidupan Nyata Peserta Didik: ${moduleData.karakteristikMateri.relevansiKehidupan}\n`;
  text += `Tingkat Kesulitan: ${moduleData.karakteristikMateri.tingkatKesulitan}\n`;
  text += `Struktur Materi: ${moduleData.karakteristikMateri.strukturMateri}\n`;
  text += `Integrasi Nilai dan Karakter: ${moduleData.karakteristikMateri.integrasiNilai}\n\n`;

  text += `D. DIMENSI PROFIL LULUSAN\n`;
  text += `Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa, dan Berakhlak Mulia: ${moduleData.dimensiProfilLulusan.keimanan}\n`;
  text += `Kewargaan: ${moduleData.dimensiProfilLulusan.kewargaan}\n`;
  text += `Penalaran Kritis: ${moduleData.dimensiProfilLulusan.penalaranKritis}\n`;
  text += `Kreativitas: ${moduleData.dimensiProfilLulusan.kreativitas}\n`;
  text += `Kolaborasi: ${moduleData.dimensiProfilLulusan.kolaborasi}\n`;
  text += `Kemandirian: ${moduleData.dimensiProfilLulusan.kemandirian}\n`;
  text += `Kesehatan: ${moduleData.dimensiProfilLulusan.kesehatan}\n`;
  text += `Komunikasi: ${moduleData.dimensiProfilLulusan.komunikasi}\n\n`;

  text += `DESAIN PEMBELAJARAN\n`;
  text += `A. CAPAIAN PEMBELAJARAN (CP)\n`;
  text += `Pada akhir Fase ${moduleData.capaianPembelajaran.fase}, murid memiliki kemampuan sebagai berikut.\n`;
  text += `Mengalami (Experiencing)\n${moduleData.capaianPembelajaran.mengalami}\n`;
  text += `Merefleksikan (Reflecting)\n${moduleData.capaianPembelajaran.merefleksikan}\n`;
  text += `Berpikir dan Bekerja Artistik (Thinking and Working Artistically)\n${moduleData.capaianPembelajaran.berpikirArtistik}\n`;
  text += `Menciptakan (Making/Creating)\n${moduleData.capaianPembelajaran.menciptakan}\n`;
  text += `Berdampak (Impacting)\n${moduleData.capaianPembelajaran.berdampak}\n\n`;

  text += `B. LINTAS DISIPLIN ILMU\n`;
  text += `Mata Pelajaran ${moduleData.lintasDisiplinIlmu.mataPelajaran}: Isian ${moduleData.lintasDisiplinIlmu.deskripsi}\n\n`;

  text += `C. TUJUAN PEMBELAJARAN\n`;
  text += `${moduleData.tujuanPembelajaran}\n\n`;

  text += `D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN\n`;
  moduleData.indikatorKetercapaian.forEach((ind, idx) => {
    text += `${idx + 1}. ${ind}\n`;
  });
  text += `\n`;

  text += `E. TOPIK PEMBELAJARAN KONTEKSTUAL\n`;
  text += `${moduleData.topikKontekstual}\n\n`;

  text += `F. KERANGKA PEMBELAJARAN\n`;
  text += `PRAKTIK PEDAGOGIK\n`;
  text += `Model Pembelajaran: ${moduleData.kerangkaPembelajaran.modelPembelajaran}\n`;
  text += `Pendekatan: ${moduleData.kerangkaPembelajaran.pendekatan}\n`;
  text += `Mindful Learning: ${moduleData.kerangkaPembelajaran.mindfulLearning}\n`;
  text += `Meaningful Learning: ${moduleData.kerangkaPembelajaran.meaningfulLearning}\n`;
  text += `Joyful Learning: ${moduleData.kerangkaPembelajaran.joyfulLearning}\n`;
  text += `Metode Pembelajaran: ${moduleData.kerangkaPembelajaran.metodePembelajaran}\n`;
  text += `Strategi Pembelajaran Berdiferensiasi:\n`;
  text += `Diferensiasi Konten: ${moduleData.kerangkaPembelajaran.diferensiasi.konten}\n`;
  text += `Diferensiasi Proses: ${moduleData.kerangkaPembelajaran.diferensiasi.proses}\n`;
  text += `Diferensiasi Produk: ${moduleData.kerangkaPembelajaran.diferensiasi.produk}\n\n`;

  text += `KEMITRAAN PEMBELAJARAN\n`;
  text += `Lingkungan Sekolah: ${moduleData.kerangkaPembelajaran.kemitraan.lingkunganSekolah}\n`;
  text += `Lingkungan Luar Sekolah/Masyarakat: ${moduleData.kerangkaPembelajaran.kemitraan.lingkunganLuarSekolah}\n`;
  text += `Mitra Digital: ${moduleData.kerangkaPembelajaran.kemitraan.mitraDigital}\n\n`;

  text += `LINGKUNGAN BELAJAR\n`;
  text += `Ruang Fisik: ${moduleData.kerangkaPembelajaran.lingkunganBelajar.ruangFisik}\n`;
  text += `Ruang Virtual: ${moduleData.kerangkaPembelajaran.lingkunganBelajar.ruangVirtual}\n`;
  text += `Budaya Belajar: ${moduleData.kerangkaPembelajaran.lingkunganBelajar.budayaBelajar}\n\n`;

  text += `PEMANFAATAN DIGITAL\n`;
  text += `${moduleData.kerangkaPembelajaran.pemanfaatanDigital}\n\n`;

  text += `G. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI\n\n`;
  moduleData.langkahPembelajaran.forEach((p) => {
    text += `PERTEMUAN ${p.pertemuanKe} (${p.totalJP} JP : ${p.menitTotal} MENIT)\n`;
    text += `Topik : ${p.topikPertemuan}\n`;
    text += `KEGIATAN PENDAHULUAN (${p.pendahuluan.alokasiMenit} MENIT)\n`;
    text += `Orientasi: ${p.pendahuluan.orientasi}\n`;
    text += `Apersepsi (Joyful): ${p.pendahuluan.apersepsi}\n`;
    text += `Motivasi: ${p.pendahuluan.motivasi}\n`;
    text += `Penyampaian Tujuan: ${p.pendahuluan.penyampaianTujuan}\n`;
    text += `Asesmen Diagnostik: ${p.pendahuluan.asesmenDiagnostik}\n`;
    text += `KEGIATAN INTI (${p.kegiatanInti.alokasiMenit} MENIT)\n`;
    text += `Eksplorasi Bahan: ${p.kegiatanInti.eksplorasiBahan}\n`;
    text += `Eksperimen / Penyelidikan: ${p.kegiatanInti.eksperimenPenyelidikan}\n`;
    text += `Diskusi: ${p.kegiatanInti.diskusi}\n`;
    text += `KEGIATAN PENUTUP (${p.penutup.alokasiMenit} MENIT)\n`;
    text += `Refleksi: ${p.penutup.refleksi}\n`;
    text += `Tindak Lanjut: ${p.penutup.tindakLanjut}\n`;
    text += `Penutup: ${p.penutup.penutup}\n\n`;
  });

  text += `H. ASESMEN PEMBELAJARAN\n`;
  text += `ASESMEN DIAGNOSTIK\n`;
  text += `Praktik: ${moduleData.asesmen.diagnostik.praktik}\n`;
  text += `Observasi: ${moduleData.asesmen.diagnostik.observasi}\n`;
  text += `ASESMEN FORMATIF\n`;
  text += `Produk (Proyek):\n`;
  text += `Tugas: ${moduleData.asesmen.formatif.produkProyek.tugas}\n`;
  text += `Penilaian: ${moduleData.asesmen.formatif.produkProyek.penilaian}\n`;
  text += `Observasi: ${moduleData.asesmen.formatif.produkProyek.observasi}\n`;
  text += `ASESMEN SUMATIF\n`;
  text += `Produk (Proyek):\n`;
  text += `Tugas: ${moduleData.asesmen.sumatif.produkProyek.tugas}\n`;
  text += `Penilaian: ${moduleData.asesmen.sumatif.produkProyek.penilaian}\n`;
  text += `Praktik (Kinerja):\n`;
  text += `Tugas: ${moduleData.asesmen.sumatif.praktikKinerja.tugas}\n`;
  text += `Penilaian: ${moduleData.asesmen.sumatif.praktikKinerja.penilaian}\n`;
  text += `Tes Tertulis: ${moduleData.asesmen.sumatif.tesTertulis}\n\n`;

  if (moduleData.pertanyaanPemantik && moduleData.pertanyaanPemantik.length > 0) {
    text += `I. PERTANYAAN PEMANTIK\n`;
    moduleData.pertanyaanPemantik.forEach((q, idx) => {
      text += `${idx + 1}. ${q}\n`;
    });
    text += `\n`;
  }

  if (moduleData.pemahamanBermakna) {
    text += `J. PEMAHAMAN BERMAKNA\n`;
    text += `${moduleData.pemahamanBermakna}\n\n`;
  }

  if (moduleData.pengayaanRemedial) {
    text += `K. PENGAYAAN DAN REMEDIAL\n`;
    text += `Pengayaan: ${moduleData.pengayaanRemedial.pengayaan}\n`;
    text += `Remedial: ${moduleData.pengayaanRemedial.remedial}\n\n`;
  }

  if (moduleData.bahanBacaan) {
    text += `L. BAHAN BACAAN GURU DAN SISWA\n`;
    text += `Bahan Bacaan Guru: ${moduleData.bahanBacaan.guru}\n`;
    text += `Bahan Bacaan Siswa: ${moduleData.bahanBacaan.siswa}\n\n`;
  }

  if (moduleData.lkpd) {
    text += `LEMBAR KERJA PESERTA DIDIK (LKPD) - MENARIK, AKTIF & BERMAKNA\n`;
    text += `Judul LKPD: ${moduleData.lkpd.judul}\n`;
    text += `Tujuan LKPD: ${moduleData.lkpd.tujuan}\n\n`;
    text += `Alat dan Bahan:\n`;
    moduleData.lkpd.alatBahan.forEach((tool) => {
      text += `- ${tool}\n`;
    });
    text += `\nLangkah-langkah Kerja (Mindful & Joyful):\n`;
    moduleData.lkpd.langkahKerja.forEach((step, idx) => {
      text += `${idx + 1}. ${step}\n`;
    });
    text += `\nKegiatan Pembelajaran Bermakna (Meaningful Activity):\n${moduleData.lkpd.aktivitasBermakna}\n\n`;
    text += `Pertanyaan Tantangan HOTS (Berpikir Kritis):\n`;
    moduleData.lkpd.pertanyaanHOTS.forEach((q) => {
      text += `- ${q}\n`;
    });
    text += `\nLembar Refleksi Mandiri Siswa:\n${moduleData.lkpd.refleksiSiswa}\n\n`;
  }

  if (moduleData.glosarium) {
    text += `M. GLOSARIUM\n`;
    text += `${moduleData.glosarium}\n\n`;
  }

  if (moduleData.daftarPustaka) {
    text += `N. DAFTAR PUSTAKA\n`;
    text += `${moduleData.daftarPustaka}\n\n`;
  }

  text += `Mengetahui,\n`;
  text += `Kepala Sekolah,\t\t\t\t${moduleData.tandaTangan.lokasiTanggal}\n`;
  text += `\t\t\t\t\t\tGuru Mata Pelajaran,\n\n\n\n`;
  text += `${moduleData.tandaTangan.namaKepalaSekolah}\t\t\t\t${moduleData.tandaTangan.namaGuru}\n`;
  text += `NIP. ${moduleData.tandaTangan.nipKepalaSekolah}\t\t\tNIP. ${moduleData.tandaTangan.nipGuru}\n`;

  return text;
}
