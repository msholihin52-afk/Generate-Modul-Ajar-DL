import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { buildDeepLearningModule } from './src/utils/moduleGenerator';
import { ModuleFormData, GeneratedModuleContent } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK lazily / safely
function getGeminiAi() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint to generate module
app.post('/api/generate-module', async (req, res) => {
  const formData: ModuleFormData = req.body;

  try {
    const ai = getGeminiAi();

    // Fallback module structure constructed locally first
    const fallbackModule = buildDeepLearningModule(formData);

    if (!ai) {
      console.log('Gemini API key not found in server env, using intelligent fallback module');
      return res.json({ success: true, data: fallbackModule, source: 'local_engine' });
    }

    const prompt = `Anda adalah pakar pengembang kurikulum Sekolah Dasar dan pakar metode Deep Learning (Mindful, Meaningful, Joyful Learning) Kurikulum Merdeka Indonesia.
Buatkan Modul Ajar Deep Learning yang sangat lengkap, kontekstual, dan inspiratif berdasarkan Keputusan Kepala BSKAP No 046/H/KR/2023 (CP 046) dan memenuhi Komponen 8.3.4 standar Permendikbud terbaru berdasarkan data berikut:
- Nama Penyusun: ${formData.namaPenyusun}
- NIP Penyusun: ${formData.nipPenyusun}
- Nama Kepala Sekolah: ${formData.namaKepalaSekolah}
- NIP Kepala Sekolah: ${formData.nipKepalaSekolah}
- Nama Sekolah: ${formData.namaSekolah}
- Mata Pelajaran: ${formData.mataPelajaran}
- Kelas: ${formData.kelas}
- Fase: ${formData.fase}
- Semester: ${formData.semester}
- Topik: ${formData.topik}
- Alokasi Waktu: ${formData.alokasiWaktu}
- Model Pembelajaran: ${formData.modelPembelajaran}

Pastikan isi Modul Ajar mencakup 8 bagian lengkap (A s.d. H) yang diselaraskan dengan CP 046, serta menyertakan Lembar Kerja Peserta Didik (LKPD) yang sangat menarik, kontekstual, dan bermakna bagi siswa, lengkap dengan Glosarium, Daftar Pustaka, Pertanyaan Pemantik, Pemahaman Bermakna, Pengayaan & Remedial, dan Bahan Bacaan.

Kembalikan jawaban dalam format JSON persis sesuai struktur schema berikut:
{
  "identitas": {
    "namaSekolah": "${formData.namaSekolah}",
    "namaPenyusun": "${formData.namaPenyusun}",
    "mataPelajaran": "${formData.mataPelajaran}",
    "kelas": "${formData.kelas}",
    "fase": "${formData.fase}",
    "semester": "${formData.semester}",
    "alokasiWaktu": "${formData.alokasiWaktu}"
  },
  "kesiapanPesertaDidik": {
    "pengetahuanAwal": "...",
    "minat": "Peserta didik memiliki minat yang tinggi dalam kegiatan eksplorasi, membangun, merakit, dan berkreasi secara aktif berkaitan dengan topik ${formData.topik}.",
    "latarBelakang": "Peserta didik memiliki pengalaman empiris relevan dengan kehidupan sehari-hari terkait dengan ${formData.topik}.",
    "kebutuhanBelajar": {
      "visual": "Membutuhkan media visual yang kaya, gambar ilustratif, atau video demonstrasi tentang ${formData.topik}.",
      "auditori": "Membutuhkan diskusi interaktif kelompok, penjelasan naratif terstruktur, dan instruksi lisan terarah dari guru.",
      "kinestetik": "Membutuhkan kegiatan manipulatif fisik, eksperimen langsung, atau simulasi gerak/permainan terkait ${formData.topik}."
    }
  },
  "karakteristikMateri": {
    "jenisPengetahuan": "...",
    "konseptual": "...",
    "prosedural": "...",
    "relevansiKehidupan": "...",
    "tingkatKesulitan": "...",
    "strukturMateri": "...",
    "integrasiNilai": "..."
  },
  "dimensiProfilLulusan": {
    "keimanan": "...",
    "kewargaan": "...",
    "penalaranKritis": "...",
    "kreativitas": "...",
    "kolaborasi": "...",
    "kemandirian": "...",
    "kesehatan": "...",
    "komunikasi": "..."
  },
  "capaianPembelajaran": {
    "fase": "${formData.fase}",
    "mengalami": "...",
    "merefleksikan": "...",
    "berpikirArtistik": "...",
    "menciptakan": "...",
    "berdampak": "..."
  },
  "lintasDisiplinIlmu": {
    "mataPelajaran": "${formData.mataPelajaran}",
    "deskripsi": "..."
  },
  "tujuanPembelajaran": "...",
  "indikatorKetercapaian": ["poin 1", "poin 2", "poin 3", "poin 4"],
  "topikKontekstual": "...",
  "kerangkaPembelajaran": {
    "modelPembelajaran": "${formData.modelPembelajaran}",
    "pendekatan": "Deep Learning (Mindful, Meaningful, Joyful Learning)",
    "mindfulLearning": "...",
    "meaningfulLearning": "...",
    "joyfulLearning": "...",
    "metodePembelajaran": "...",
    "diferensiasi": {
      "konten": "...",
      "proses": "...",
      "produk": "..."
    },
    "kemitraan": {
      "lingkunganSekolah": "...",
      "lingkunganLuarSekolah": "...",
      "mitraDigital": "..."
    },
    "lingkunganBelajar": {
      "ruangFisik": "...",
      "ruangVirtual": "...",
      "budayaBelajar": "..."
    },
    "pemanfaatanDigital": "..."
  },
  "langkahPembelajaran": [
    {
      "pertemuanKe": 1,
      "totalJP": 3,
      "menitTotal": 105,
      "topikPertemuan": "...",
      "pendahuluan": {
        "alokasiMenit": 15,
        "orientasi": "...",
        "apersepsi": "...",
        "motivasi": "...",
        "penyampaianTujuan": "...",
        "asesmenDiagnostik": "..."
      },
      "kegiatanInti": {
        "alokasiMenit": 75,
        "eksplorasiBahan": "...",
        "eksperimenPenyelidikan": "...",
        "diskusi": "..."
      },
      "penutup": {
        "alokasiMenit": 15,
        "refleksi": "...",
        "tindakLanjut": "...",
        "penutup": "..."
      }
    }
  ],
  "asesmen": {
    "diagnostik": {
      "praktik": "...",
      "observasi": "..."
    },
    "formatif": {
      "produkProyek": {
        "tugas": "...",
        "penilaian": "...",
        "observasi": "..."
      }
    },
    "sumatif": {
      "produkProyek": {
        "tugas": "...",
        "penilaian": "..."
      },
      "praktikKinerja": {
        "tugas": "...",
        "penilaian": "..."
      },
      "tesTertulis": "..."
    }
  },
  "pertanyaanPemantik": ["pertanyaan 1", "pertanyaan 2", "pertanyaan 3"],
  "pemahamanBermakna": "...",
  "pengayaanRemedial": {
    "pengayaan": "...",
    "remedial": "..."
  },
  "bahanBacaan": {
    "guru": "...",
    "siswa": "..."
  },
  "glosarium": "...",
  "daftarPustaka": "...",
  "lkpd": {
    "judul": "...",
    "tujuan": "...",
    "alatBahan": ["item 1", "item 2"],
    "langkahKerja": ["langkah 1", "langkah 2", "langkah 3"],
    "aktivitasBermakna": "...",
    "pertanyaanHOTS": ["pertanyaan HOTS 1", "pertanyaan HOTS 2"],
    "refleksiSiswa": "..."
  },
  "tandaTangan": {
    "namaKepalaSekolah": "${formData.namaKepalaSekolah}",
    "nipKepalaSekolah": "${formData.nipKepalaSekolah}",
    "namaGuru": "${formData.namaPenyusun}",
    "nipGuru": "${formData.nipPenyusun}",
    "lokasiTanggal": "${formData.lokasiTanggal || 'Larangan, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (text) {
      try {
        const parsedData = JSON.parse(text) as GeneratedModuleContent;
        // Merge or validate fields if any are missing
        if (!parsedData.langkahPembelajaran || parsedData.langkahPembelajaran.length === 0) {
          parsedData.langkahPembelajaran = fallbackModule.langkahPembelajaran;
        }
        return res.json({ success: true, data: parsedData, source: 'gemini_ai' });
      } catch (e) {
        console.error('Failed to parse Gemini JSON output, falling back to local engine:', e);
        return res.json({ success: true, data: fallbackModule, source: 'local_engine_fallback' });
      }
    } else {
      return res.json({ success: true, data: fallbackModule, source: 'local_engine_fallback' });
    }
  } catch (error: any) {
    console.error('Error generating module via Gemini:', error?.message || error);
    const fallbackModule = buildDeepLearningModule(formData);
    return res.json({ success: true, data: fallbackModule, source: 'local_engine_fallback', error: error?.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server PEMBUAT MODUL PEMBELAJARAN DEEP LEARNING running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
