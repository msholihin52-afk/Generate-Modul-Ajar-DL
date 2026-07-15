export type MataPelajaranOption =
  | 'Pendidikan Agama Islam'
  | 'Pendidikan Pancasila dan Kewarganegaraan'
  | 'Bahasa Indonesia'
  | 'Matematika'
  | 'Ilmu Pengetahuan Alam'
  | 'Ilmu Pengetahuan Sosial'
  | 'Seni Budaya dan Prakarya'
  | 'Pendidikan Jasmani, Olahraga, dan Kesehatan'
  | 'Bahasa Inggris'
  | 'Pendidikan Kewirausahaan'
  | 'Coding dan AI'
  | 'Bahasa Jawa';

export type KelasOption =
  | 'Kelas 1'
  | 'Kelas 2'
  | 'Kelas 3'
  | 'Kelas 4'
  | 'Kelas 5'
  | 'Kelas 6';

export type FaseOption = 'Fase A' | 'Fase B' | 'Fase C';

export type SemesterOption = 'Semester 1' | 'Semester 2';

export type ModelPembelajaranOption =
  | 'Project Based Learning (PjBL)'
  | 'Problem Based Learning (PBL)'
  | 'Discovery Learning'
  | 'Cooperative Learning';

export interface ModuleFormData {
  namaPenyusun: string; // Kolom 1
  nipPenyusun: string; // Kolom 2
  namaKepalaSekolah: string; // Kolom 3
  nipKepalaSekolah: string; // Kolom 4
  namaSekolah: string; // Kolom 5
  mataPelajaran: MataPelajaranOption; // Kolom 6
  kelas: KelasOption; // Kolom 7
  fase: FaseOption; // Kolom 8 (Auto)
  semester: SemesterOption; // Kolom 9
  topik: string; // Kolom 10
  alokasiWaktu: string; // Kolom 11
  modelPembelajaran: ModelPembelajaranOption; // Kolom 12
  lokasiTanggal?: string; // e.g., "Larangan, 4 Juli 2026"
}

export interface PertemuanDetail {
  pertemuanKe: number;
  totalJP: number;
  menitTotal: number;
  topikPertemuan: string;
  pendahuluan: {
    alokasiMenit: number;
    orientasi: string;
    apersepsi: string;
    motivasi: string;
    penyampaianTujuan: string;
    asesmenDiagnostik: string;
  };
  kegiatanInti: {
    alokasiMenit: number;
    eksplorasiBahan: string;
    eksperimenPenyelidikan: string;
    diskusi: string;
  };
  penutup: {
    alokasiMenit: number;
    refleksi: string;
    tindakLanjut: string;
    penutup: string;
  };
}

export interface GeneratedModuleContent {
  identitas: {
    namaSekolah: string;
    namaPenyusun: string;
    mataPelajaran: string;
    kelas: string;
    fase: string;
    semester: string;
    alokasiWaktu: string;
    topik: string;
  };
  kesiapanPesertaDidik: {
    pengetahuanAwal: string;
    minat: string;
    latarBelakang: string;
    kebutuhanBelajar: {
      visual: string;
      auditori: string;
      kinestetik: string;
    };
  };
  karakteristikMateri: {
    jenisPengetahuan: string;
    konseptual: string;
    prosedural: string;
    relevansiKehidupan: string;
    tingkatKesulitan: string;
    strukturMateri: string;
    integrasiNilai: string;
  };
  dimensiProfilLulusan: {
    keimanan: string;
    kewargaan: string;
    penalaranKritis: string;
    kreativitas: string;
    kolaborasi: string;
    kemandirian: string;
    kesehatan: string;
    komunikasi: string;
  };
  capaianPembelajaran: {
    fase: string;
    mengalami: string;
    merefleksikan: string;
    berpikirArtistik: string;
    menciptakan: string;
    berdampak: string;
  };
  lintasDisiplinIlmu: {
    mataPelajaran: string;
    deskripsi: string;
  };
  tujuanPembelajaran: string;
  indikatorKetercapaian: string[];
  topikKontekstual: string;
  kerangkaPembelajaran: {
    modelPembelajaran: string;
    pendekatan: string; // Deep Learning (Mindful, Meaningful, Joyful Learning)
    mindfulLearning: string;
    meaningfulLearning: string;
    joyfulLearning: string;
    metodePembelajaran: string;
    diferensiasi: {
      konten: string;
      proses: string;
      produk: string;
    };
    kemitraan: {
      lingkunganSekolah: string;
      lingkunganLuarSekolah: string;
      mitraDigital: string;
    };
    lingkunganBelajar: {
      ruangFisik: string;
      ruangVirtual: string;
      budayaBelajar: string;
    };
    pemanfaatanDigital: string;
  };
  langkahPembelajaran: PertemuanDetail[];
  asesmen: {
    diagnostik: {
      praktik: string;
      observasi: string;
    };
    formatif: {
      produkProyek: {
        tugas: string;
        penilaian: string;
        observasi: string;
      };
    };
    sumatif: {
      produkProyek: {
        tugas: string;
        penilaian: string;
      };
      praktikKinerja: {
        tugas: string;
        penilaian: string;
      };
      tesTertulis: string;
    };
  };
  pertanyaanPemantik?: string[];
  pemahamanBermakna?: string;
  pengayaanRemedial?: {
    pengayaan: string;
    remedial: string;
  };
  bahanBacaan?: {
    guru: string;
    siswa: string;
  };
  glosarium?: string;
  daftarPustaka?: string;
  lkpd?: {
    judul: string;
    tujuan: string;
    alatBahan: string[];
    langkahKerja: string[];
    aktivitasBermakna: string;
    pertanyaanHOTS: string[];
    refleksiSiswa: string;
  };
  tandaTangan: {
    namaKepalaSekolah: string;
    nipKepalaSekolah: string;
    namaGuru: string;
    nipGuru: string;
    lokasiTanggal: string;
  };
  rawMarkdownText?: string;
}
