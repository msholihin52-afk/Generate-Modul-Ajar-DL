import { MataPelajaranOption, FaseOption, ModelPembelajaranOption } from '../types';

export interface SubjectKnowledgeBank {
  pengetahuanAwal: string;
  jenisPengetahuan: string;
  konseptual: string;
  prosedural: string;
  relevansiKehidupan: string;
  tingkatKesulitan: string;
  strukturMateri: string;
  integrasiNilai: string;
  dimensiProfil: {
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
    mengalami: string;
    merefleksikan: string;
    berpikirArtistik: string;
    menciptakan: string;
    berdampak: string;
  };
  lintasDisiplinIlmu: string;
  indikatorDefault: string[];
  topikKontekstual: string;
  mindfulLearning: string;
  meaningfulLearning: string;
  joyfulLearning: string;
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
  asesmenDefault: {
    diagnostikPraktik: string;
    diagnostikObservasi: string;
    formatifTugas: string;
    formatifPenilaian: string;
    formatifObservasi: string;
    sumatifProyekTugas: string;
    sumatifProyekPenilaian: string;
    sumatifKinerjaTugas: string;
    sumatifKinerjaPenilaian: string;
    sumatifTesTertulis: string;
  };
}

export const SUBJECT_DATABASE: Record<string, SubjectKnowledgeBank> = {
  'Matematika': {
    pengetahuanAwal: 'Peserta didik telah mengenal angka dasar, simbol bilangan, serta konsep pengelompokan benda konkret dalam kehidupan sehari-hari.',
    jenisPengetahuan: 'Konseptual, Prosedural, dan Penalaran Logis Matematis.',
    konseptual: 'Memahami prinsip nilai tempat, operasi hitung, dan hubungan antar representasi matematika dalam kehidupan.',
    prosedural: 'Mengikuti alur penyelesaian masalah matematika langkah demi langkah dengan teknik visual dan manipulatif.',
    relevansiKehidupan: 'Menghitung belanjaan, membagi makanan/mainan dengan adil, mengukur durasi waktu, serta menghitung jarak dalam aktivitas keseharian.',
    tingkatKesulitan: 'Sedang - Membutuhkan pemahaman bertahap dari konkret, gambar (ikonik), hingga lambang abstrak (konkret-gambar-abstrak).',
    strukturMateri: 'Aritmetika Dasar -> Pengoperasian Bilangan -> Masalah Kontekstual -> Evaluasi Strategi Penyelesaian.',
    integrasiNilai: 'Ketelitian, kejujuran dalam berhitung, daya juang (resiliensi) memecahkan masalah, dan keadilan.',
    dimensiProfil: {
      keimanan: 'Mengagumi keteraturan ciptaan Tuhan melalui pola angka dan simetri alam.',
      kewargaan: 'Menghargai kesepakatan kelompok dalam membuat strategi hitung cepat.',
      penalaranKritis: 'Menganalisis soal cerita dan menentukan operasi matematika yang paling tepat.',
      kreativitas: 'Menemukan lebih dari satu cara/strategi untuk menyelesaikan permasalahan matematika.',
      kolaborasi: 'Bekerja sama dalam kelompok kecil memecahkan puzzle dan permainan matematika.',
      kemandirian: 'Menyelesaikan tugas latihan berhitung dengan percaya diri tanpa bergantung pada orang lain.',
      kesehatan: 'Menjaga kesehatan fisik saat aktivitas permainan edukatif matematika luar ruangan.',
      komunikasi: 'Menjelaskan gagasan dan alur pemikiran matematis secara lisan maupun tertulis dengan sopan.'
    },
    capaianPembelajaran: {
      mengalami: 'Eksplorasi media konkret (konter, balok, kartu angka) untuk menemukan pola hitung.',
      merefleksikan: 'Menganalisis kesalahan berhitung dan mendiskusikan strategi penyelesaian alternatif.',
      berpikirArtistik: 'Menyusun visual pola bilangan dan geometri secara estetis menggunakan media berwarna.',
      menciptakan: 'Merancang proyek poster logika berhitung atau miniatur konsep matematika berbasis benda nyata.',
      berdampak: 'Menerapkan kemampuan berhitung dalam transaksi kejujuran di kantin sekolah.'
    },
    lintasDisiplinIlmu: 'Seni Budaya (Pola dan Bentuk Geometri) & IPA (Pengukuran Data Hasil Penyelidikan Alam).',
    indikatorDefault: [
      'Menjelaskan konsep dasar topik pembelajaran melalui benda konkret/gambar.',
      'Menyelesaikan operasi matematika sesuai topik dengan akurat.',
      'Menganalisis dan memecahkan soal cerita matematika kehidupan sehari-hari.',
      'Mewujudkan hasil proyek aplikasi matematika dalam kelompok secara kolaboratif.'
    ],
    topikKontekstual: 'Penerapan matematika dalam pengelolaan uang saku harian dan pembagian barang secara adil.',
    mindfulLearning: 'Siswa diajak memusatkan perhatian secara penuh (mindful) saat mengamati benda nyata dan menghitung jumlahnya tanpa tergesa-gesa.',
    meaningfulLearning: 'Siswa menghubungkan rumus/konsep matematika langsung dengan pengalaman belanja di kantin atau membagi kue di rumah.',
    joyfulLearning: 'Siswa belajar matematika melalui permainan kartu bilangan, estafet angka, dan tebak puzzle interaktif.',
    diferensiasi: {
      konten: 'Menyediakan benda konkret untuk tingkat awal, gambar/diagram untuk sedang, dan kartu soal tantangan untuk tingkat lanjut.',
      proses: 'Pendampingan langsung (scaffolding) bagi yang butuh bantuan, diskusi sekelompok untuk sedang, dan peran tutor sebaya untuk yang mahir.',
      produk: 'Pilihan laporan berupa karya gambar pola, cerita matematika tertulis, atau rekaman penjelasan lisan.'
    },
    kemitraan: {
      lingkunganSekolah: 'Petugas kantin sekolah dan perpustakaan sebagai sarana simulasi berhitung nyata.',
      lingkunganLuarSekolah: 'Orang tua siswa mendampingi latihan berhitung saat berbelanja di pasar/supermarket.',
      mitraDigital: 'Platform Edukasi Matematika Interaktif (PhET Interactive Simulations / Quizizz / Mathigon).'
    },
    lingkunganBelajar: {
      ruangFisik: 'Ruang kelas yang fleksibel untuk permainan lantai (karpet angka) dan meja kelompok.',
      ruangVirtual: 'Google Classroom / WhatsApp Group Orang Tua untuk berbagi panduan belajar interaktif.',
      budayaBelajar: 'Budaya tidak takut salah, saling menghargai pendapat, dan merayakan proses memecahkan masalah.'
    },
    pemanfaatanDigital: 'Visualisasi animasi konsep angka, game matematika edukatif berbasis aplikasi web, dan LKPD interaktif.',
    asesmenDefault: {
      diagnostikPraktik: 'Menghitung kumpulan benda konkret yang diberikan guru di awal bab.',
      diagnostikObservasi: 'Pengamatan kesiapan siswa saat merespons pertanyaan angka sederhana secara lisan.',
      formatifTugas: 'Menyelesaikan lembar kerja eksplorasi kelompok berbasis masalah nyata.',
      formatifPenilaian: 'Rubrik unjuk kerja ketepatan proses hitung dan kolaborasi kelompok.',
      formatifObservasi: 'Catatan anekdot keaktifan dan ketelitian siswa selama proses eksperimen.',
      sumatifProyekTugas: 'Membuat proyek miniatur "Toko Kejujuran" lengkap dengan daftar harga dan transaksi.',
      sumatifProyekPenilaian: 'Rubrik proyek (kreativitas, akurasi perhitungan, dan kerapian karya).',
      sumatifKinerjaTugas: 'Simulasi mendemonstrasikan cara memecahkan masalah matematika di depan kelas.',
      sumatifKinerjaPenilaian: 'Rubrik presentasi lisan (kejelasan penjelasan dan kelancaran logis).',
      sumatifTesTertulis: 'Soal pilihan ganda dan uraian bernalar tinggi (HOTS) terkait topik.'
    }
  },

  'Bahasa Indonesia': {
    pengetahuanAwal: 'Peserta didik telah memiliki kosa kata dasar, mampu menyimak cerita pendek, dan mengekspresikan pendapat secara lisan sederhana.',
    jenisPengetahuan: 'Konseptual, Prosedural, dan Kebahasaan (Literasi).',
    konseptual: 'Memahami gagasan pokok, struktur teks, unsur intrinsik cerita, serta tata bahasa Indonesia yang baik.',
    prosedural: 'Langkah-langkah membaca pemahaman, menulis kalimat/paragraf berurutan, dan menyajikan presentasi lisan.',
    relevansiKehidupan: 'Berkomunikasi dengan santun, membaca petunjuk arah/makanan, serta menulis surat atau cerita pengalaman.',
    tingkatKesulitan: 'Sedang - Bertahap dari kemampuan menyimak, membaca nyaring, hingga menulis kreatif narasi/deskripsi.',
    strukturMateri: 'Menyimak Teks -> Membaca & Memahami -> Menulis Kreatif -> Mempresentasikan Hasil Karya.',
    integrasiNilai: 'Kecintaan pada bahasa nasional, kesantunan bertutur kata, kejujuran narasi, dan empati sosial.',
    dimensiProfil: {
      keimanan: 'Bersyukur atas karunia bahasa sebagai sarana silaturahmi dan menyampaikan kebaikan.',
      kewargaan: 'Bangga menggunakan Bahasa Indonesia sebagai bahasa persatuan keberagaman suku.',
      penalaranKritis: 'Menganalisis isi bacaan, membedakan fakta dan opini dalam teks cerita.',
      kreativitas: 'Menulis puisi, cerita pendek, atau komik sederhana berbasis pengalaman pribadi.',
      kolaborasi: 'Bermain peran (role play) teks drama atau diskusi cerita bersama teman sekelompok.',
      kemandirian: 'Membaca buku bacaan mandiri dan merangkum isinya dengan kata-kata sendiri.',
      kesehatan: 'Menerapkan posisi duduk dan jarak baca yang sehat untuk menjaga kesehatan mata.',
      komunikasi: 'Menyampaikan pendapat lisan dan tulisan dengan santun, sistematis, serta percaya diri.'
    },
    capaianPembelajaran: {
      mengalami: 'Menyimak pembacaan cerita naratif dan mengidentifikasi karakter utama serta latar.',
      merefleksikan: 'Menghubungkan pesan moral dalam cerita dengan tindakan sehari-hari di sekolah/rumah.',
      berpikirArtistik: 'Mengekspresikan keindahan bahasa melalui pembacaan puisi berartikulasi dan intonasi tepat.',
      menciptakan: 'Membuat buku cerita bergambar (pop-up book) buatan sendiri berdasarkan topik.',
      berdampak: 'Membagikan cerita inspiratif kepada teman kelas lain untuk menumbuhkan budaya literasi.'
    },
    lintasDisiplinIlmu: 'Seni Budaya (Ilustrasi Gambar Cerita) & Pendidikan Pancasila (Pesan Moral dan Kebangsaan).',
    indikatorDefault: [
      'Menjelaskan informasi kunci dan gagasan pokok dari teks yang dibaca/disimak.',
      'Menyusun paragraf/kalimat rumpang menjadi teks yang utuh dan runtut.',
      'Memperagakan / membacakan hasil karya kebahasaan dengan lafal dan intonasi yang tepat.',
      'Membuat karya tulis/bergambar sederhana sesuai dengan aturan ejaan yang benar.'
    ],
    topikKontekstual: 'Literasi membaca dan menulis cerita pengalaman tentang menjaga lingkungan sekitar.',
    mindfulLearning: 'Siswa menyimak cerita dengan tenang dan penuh penghayatan (mindful listening), merasakan emosi tokoh.',
    meaningfulLearning: 'Siswa menuliskan kisah nyata yang paling berkesan dalam hidup mereka sehingga pesan tulisan terasa sangat personal.',
    joyfulLearning: 'Siswa belajar membaca dan bercerita melalui panggung boneka jari, permainan roda kata, dan dongeng interaktif.',
    diferensiasi: {
      konten: 'Teks bergambar pendek untuk kelompok pemula, teks naskah utuh untuk menengah, dan teks majemuk untuk yang mahir.',
      proses: 'Latihan membaca terbimbing (guided reading) untuk yang perlu bantuan, dan menulis mandiri untuk yang mahir.',
      produk: 'Produk tulisan berupa komik strip, karangan narasi, atau rekaman audio pembacaan cerita.'
    },
    kemitraan: {
      lingkunganSekolah: 'Petugas perpustakaan sekolah untuk kegiatan pojok baca dan kuis buku.',
      lingkunganLuarSekolah: 'Penulis lokal atau komunitas pegiat literasi daerah setempat.',
      mitraDigital: 'Platform Buku Digital Kemdikbud (Buku Kemitraan Literasi / Let’s Read / StoryWeaver).'
    },
    lingkunganBelajar: {
      ruangFisik: 'Pojok karpet baca (reading corner) dengan bantal empuk yang nyaman di sudut kelas.',
      ruangVirtual: 'Padlet / Google Drive untuk memajang hasil pameran tulisan digital siswa.',
      budayaBelajar: 'Budaya apresiasi positif, tidak mengejek kesalahan lafal, dan gemar saling memberi masukan santun.'
    },
    pemanfaatanDigital: 'Aplikasi cerita interaktif bergambar, media presentasi audio-visual, dan papan pamer digital Padlet.',
    asesmenDefault: {
      diagnostikPraktik: 'Membaca satu paragraf pendek untuk memetakan kelancaran membaca siswa.',
      diagnostikObservasi: 'Pengamatan antusiasme dan fokus siswa saat guru membacakan nyaring buku cerita.',
      formatifTugas: 'Menjawab pertanyaan pemahaman isi teks narasi dan menyusun peta konsep tokoh.',
      formatifPenilaian: 'Rubrik pemahaman bacaan dan struktur kalimat.',
      formatifObservasi: 'Catatan keaktifan berpendapat dalam diskusi kelompok literasi.',
      sumatifProyekTugas: 'Membuat "Buku Cerita Pertamaku" bergambar lengkap dengan sampul dan pesan moral.',
      sumatifProyekPenilaian: 'Rubrik penulisan narasi (kesesuaian ejaan, kerapian gambar, dan keutuhan alur cerita).',
      sumatifKinerjaTugas: 'Menceritakan ulang isi buku di depan kelas menggunakan media peraga.',
      sumatifKinerjaPenilaian: 'Rubrik bercerita (artikulasi, intonasi, ekspresi wajah, dan kejelas ucapan).',
      sumatifTesTertulis: 'Soal esai dan pilihan ganda menganalisis unsur intrinsik teks cerita.'
    }
  },

  'Ilmu Pengetahuan Alam': {
    pengetahuanAwal: 'Peserta didik telah mengamati fenomena alam sekitar seperti perubahan cuaca, jenis hewan/tumbuhan, dan penggunaan energi sederhana.',
    jenisPengetahuan: 'Konseptual, Faktual, Prosedural (Metode Ilmiah).',
    konseptual: 'Memahami hubungan sebab-akibat fenomena alam, wujud zat, rantai makanan, serta prinsip kerja gaya dan energi.',
    prosedural: 'Mengikuti langkah pengamatan ilmiah: merumuskan pertanyaan, mengamati, mencatat data eksperimen, dan menyimpulkan.',
    relevansiKehidupan: 'Menjaga kebersihan lingkungan, menghemat air/listrik, merawat tanaman/hewan, dan menerapkan pola hidup sehat.',
    tingkatKesulitan: 'Sedang - Membutuhkan eksperimen langsung (hands-on) untuk membuktikan teori ilmiah abstrak.',
    strukturMateri: 'Pengamatan Terbimbing -> Eksperimen Sederhana -> Analisis Data -> Kesimpulan & Aplikasi Nyata.',
    integrasiNilai: 'Kekaguman atas kebesaran Pencipta, kepedulian lingkungan (eco-friendly), kejujuran data eksperimen.',
    dimensiProfil: {
      keimanan: 'Menyadari keagungan Tuhan melalui keteraturan ekosistem dan hukum-hukum alam.',
      kewargaan: 'Ikut serta dalam gerakan kelestarian lingkungan dan pengolahan sampah sekolah.',
      penalaranKritis: 'Menguji hipotesis melalui percobaan dan menganalisis sebab terjadinya perubahan fenomena.',
      kreativitas: 'Merancang alat peraga sederhana dari bahan bekas untuk menjelaskan prinsip sains.',
      kolaborasi: 'Bekerja sama dalam tim sains untuk membagi peran pengamat, pencatat, dan perakit eksperimen.',
      kemandirian: 'Melakukan pengamatan ilmiah dengan teliti dan menjaga keselamatan kerja laboratorium/kelas.',
      kesehatan: 'Memahami tubuh manusia dan pentingnya gizi seimbang untuk kesehatan fisik.',
      komunikasi: 'Menyajikan laporan hasil eksperimen sains dalam bentuk lisan dan grafik sederhana.'
    },
    capaianPembelajaran: {
      mengalami: 'Melakukan observasi langsung terhadap benda, hewan, tumbuhan, atau eksperimen energi.',
      merefleksikan: 'Menjelaskan dampak aktivitas manusia terhadap kelestarian lingkungan dan ekosistem.',
      berpikirArtistik: 'Membuat diagram visual atau poster edukasi ekologi yang menarik dan informatif.',
      menciptakan: 'Merancang proyek alat peraga sains sederhana (misal: maket daur air, rangkaian listrik).',
      berdampak: 'Menerapkan perilaku hemat energi dan pengurangan sampah plastik di lingkungan sekolah.'
    },
    lintasDisiplinIlmu: 'Matematika (Pengukuran dan Grafik Data) & Seni Budaya (Desain Poster Sains).',
    indikatorDefault: [
      'Mengidentifikasi karakteristik dan komponen fenomena sains yang dipelajari.',
      'Melakukan langkah percobaan sains sederhana secara cermat dan aman.',
      'Menganalisis hasil percobaan dan menarik kesimpulan berdasarkan bukti ilmiah.',
      'Membuat produk/karya nyata yang memanfaatkan konsep sains topik pembelajaran.'
    ],
    topikKontekstual: 'Penyelidikan sifat-sifat benda dan pemanfaatan energi ramah lingkungan di sekitar rumah.',
    mindfulLearning: 'Siswa diajak mengamati alam dengan panca indra secara penuh (mindful observation) tanpa terdistraksi.',
    meaningfulLearning: 'Siswa membuktikan sendiri konsep sains melalui eksperimen langsung, bukan sekadar menghafal buku.',
    joyfulLearning: 'Siswa belajar sains melalui eksperimen seru (praktek meletup, warna air, magnet) layaknya ilmuwan muda.',
    diferensiasi: {
      konten: 'Media objek langsung untuk kelompok visual-kinestetik, video animasi sains untuk pemula, dan artikel jurnal ilmiah anak untuk mahir.',
      proses: 'Panduan langkah bergambar untuk yang butuh bantuan, dan proyek penyelidikan terbuka untuk yang mandiri.',
      produk: 'Laporan berbentuk bagan bergambar, video rekaman eksperimen, atau laporan tertulis.'
    },
    kemitraan: {
      lingkunganSekolah: 'Kebun sekolah, tempat pengelolaan sampah organik/anorganik, dan kantin sehat.',
      lingkunganLuarSekolah: 'Petani lokal, komunitas pecinta lingkungan, atau stasiun cuaca daerah.',
      mitraDigital: 'Simulation PhET Interactive Science / YouTube Kids Edukasi Sains.'
    },
    lingkunganBelajar: {
      ruangFisik: 'Laboratorium mini kelas atau kebun sekolah (outdoor learning).',
      ruangVirtual: 'Google Drive untuk menyimpan dokumentasi foto/video eksperimen siswa.',
      budayaBelajar: 'Budaya rasa ingin tahu yang tinggi, rasa aman bertanya, dan mengutamakan bukti ilmiah.'
    },
    pemanfaatanDigital: 'Video animasi fenomena alam, aplikasi peta cuaca interaktif, dan jurnal eksperimen digital.',
    asesmenDefault: {
      diagnostikPraktik: 'Mengklasifikasikan benda-benda sekitar berdasarkan wujud atau sifatnya.',
      diagnostikObservasi: 'Pengamatan keaktifan siswa bertanya saat apersepsi fenomena sains unik.',
      formatifTugas: 'Lembar kerja pengamatan eksperimen (data pengamatan dan jawaban pertanyaan kaji).',
      formatifPenilaian: 'Rubrik keterampilan proses sains (observasi, pencatatan data, dan analisis).',
      formatifObservasi: 'Catatan anekdot keselamatan kerja dan kerjasama kelompok selama percobaan.',
      sumatifProyekTugas: 'Membuat peraga sains sederhana (misal: filter air bersih dari barang bekas).',
      sumatifProyekPenilaian: 'Rubrik penilaian proyek (keberhasilan fungsi alat, kreativitas, dan kerapian).',
      sumatifKinerjaTugas: 'Mendemonstrasikan cara kerja alat buatan di depan kelas.',
      sumatifKinerjaPenilaian: 'Rubrik presentasi ilmiah (kelancaran, penguasaan konsep, dan pengisian data).',
      sumatifTesTertulis: 'Soal pilihan ganda kompleks dan uraian penalaran fenomena alam.'
    }
  },

  'Pendidikan Pancasila dan Kewarganegaraan': {
    pengetahuanAwal: 'Peserta didik telah mengetahui simbol negara Pancasila, tata tertib kelas, serta perbedaan suku/agama secara sederhana.',
    jenisPengetahuan: 'Konseptual, Sikap (Afektif), dan Tindakan Nyata Kewarganegaraan.',
    konseptual: 'Memahami nilai-nilai 5 sila Pancasila, hak dan kewajiban anak, serta keberagaman Bhinneka Tunggal Ika.',
    prosedural: 'Mengikuti prosedur musyawarah mufakat, pelaksanaan aturan bersama, dan gotong royong.',
    relevansiKehidupan: 'Mematuhi aturan rumah dan sekolah, menghargai perbedaan teman, serta melaksanakan kewajiban piket.',
    tingkatKesulitan: 'Sedang - Berfokus pada pembiasaan karakter dan penerapan nilai-nilai dalam perilaku nyata.',
    strukturMateri: 'Pemahaman Nilai -> Analisis Kasus Sikap -> Simulasi Musyawarah -> Pembiasaan Karakter Sehari-hari.',
    integrasiNilai: 'Cinta tanah air, toleransi keberagaman, keadilan sosial, tenggang rasa, dan kepemimpinan.',
    dimensiProfil: {
      keimanan: 'Mengamalkan sila pertama dengan menghormati peribadatan teman beragama lain.',
      kewargaan: 'Menjunjung tinggi kebhinekaan dan bangga sebagai warga negara Indonesia.',
      penalaranKritis: 'Membedakan perilaku yang sesuai dan bertentangan dengan aturan Pancasila.',
      kreativitas: 'Membuat pameran budaya daerah atau poster ajakan gotong royong yang menarik.',
      kolaborasi: 'Melaksanakan aktivitas gotong royong membersihkan kelas atau membuat karya bersama.',
      kemandirian: 'Disiplin melaksanakan kewajiban pribadi seperti menjaga kerapian perlengkapan.',
      kesehatan: 'Menjaga keharmonisan hubungan sosial antar teman yang mendukung kesehatan mental.',
      komunikasi: 'Menyampaikan pendapat dalam musyawarah kelas secara sopan dan mau mendengarkan orang lain.'
    },
    capaianPembelajaran: {
      mengalami: 'Mengamati penerapan nilai Pancasila dan aturan kehidupan sehari-hari di rumah dan sekolah.',
      merefleksikan: 'Menilai diri sendiri apakah sudah melaksanakan kewajiban sebagai anak dan siswa yang baik.',
      berpikirArtistik: 'Mengekspresikan simbol-simbol Pancasila dan keberagaman nusantara melalui karya seni.',
      menciptakan: 'Merancang "Kesepakatan Kelas" bersama atau proyek kampanye kebaikan Pancasila.',
      berdampak: 'Menjadi teladan teman dalam mengamalkan toleransi dan kesantunan berteman.'
    },
    lintasDisiplinIlmu: 'IPS (Keragaman Suku & Budaya) & Bahasa Indonesia (Penyampaian Pendapat Musyawarah).',
    indikatorDefault: [
      'Menjelaskan simbol, makna, dan nilai-nilai sila Pancasila/aturan sekolah.',
      'Mengidentifikasi contoh sikap terpuji yang sesuai dengan nilai kewarganegaraan.',
      'Simulasi melaksanakan musyawarah atau gotong royong dalam kelompok.',
      'Membuat karya/peta pikiran komitmen melaksanakan kewajiban harian.'
    ],
    topikKontekstual: 'Penerapan musyawarah mufakat dan kebiasaan bergotong royong di sekolah dan lingkungan.',
    mindfulLearning: 'Siswa diajak mengheningkan cipta dan merenungkan nilai-nilai kebaikan sila Pancasila secara mendalam.',
    meaningfulLearning: 'Siswa langsung menyusun aturan kelas mereka sendiri sehingga merasa memiliki tanggung jawab moral.',
    joyfulLearning: 'Siswa belajar Pancasila melalui permainan peran (role play) situasi sosial, lagu kebangsaan, dan kuis keberagaman.',
    diferensiasi: {
      konten: 'Kartu gambar perilaku untuk pemula, komik situasi moral untuk menengah, dan narasi analisis kasus untuk mahir.',
      proses: 'Simulasi kelompok kecil terbimbing untuk siswa pemula, dan role play mandiri untuk mahir.',
      produk: 'Pilihan produk berupa karya poster nilai, buku harian kebaikan, atau penampilan drama pendek.'
    },
    kemitraan: {
      lingkunganSekolah: 'Kepala sekolah, pengurus OSIS/Pramuka, dan penjaga sekolah.',
      lingkunganLuarSekolah: 'Tokoh masyarakat, RT/RW setempat, atau pengurus karang taruna.',
      mitraDigital: 'Video Edukasi Kebangsaan Kemdikbud / Rumah Belajar Pancasila.'
    },
    lingkunganBelajar: {
      ruangFisik: 'Dinding kelas sebagai pameran hasil karya dan kesepakatan norma bersama.',
      ruangVirtual: 'Grup komunikasi kelas untuk berbagi jurnal kebaikan harian siswa.',
      budayaBelajar: 'Budaya saling menghormati perbedaan, anti-bullying, dan mengutamakan musyawarah.'
    },
    pemanfaatanDigital: 'Video animasi lagu daerah & kebangsaan, game kuis interaktif kebhinekaan, dan media kesepakatan digital.',
    asesmenDefault: {
      diagnostikPraktik: 'Mencocokkan gambar simbol Pancasila dengan sila yang sesuai.',
      diagnostikObservasi: 'Pengamatan perilaku antre dan kesantunan siswa di luar kelas.',
      formatifTugas: 'Menganalisis gambar situasi dan menentukan apakah sesuai nilai Pancasila.',
      formatifPenilaian: 'Rubrik penilaian sikap afektif dan penalaran nilai moral.',
      formatifObservasi: 'Jurnal pengamatan sikap gotong royong dan toleransi siswa saat kerja kelompok.',
      sumatifProyekTugas: 'Membuat proyek "Pohon Kebaikan Pancasila" memuat tindakan nyata harian.',
      sumatifProyekPenilaian: 'Rubrik proyek (partisipasi aktif, keaslian jurnal kebaikan, dan estetika).',
      sumatifKinerjaTugas: 'Simulasi peragaan musyawarah mufakat memilih ketua kelompok/piket.',
      sumatifKinerjaPenilaian: 'Rubrik musyawarah (penerimaan pendapat, kesantunan bicaranya, dan kepatuhan hasil).',
      sumatifTesTertulis: 'Soal studi kasus penerapan aturan dan hak-kewajiban siswa.'
    }
  }
};

// Fallback helper to provide database entry for any subject
export function getSubjectDatabase(mataPelajaran: string): SubjectKnowledgeBank {
  if (SUBJECT_DATABASE[mataPelajaran]) {
    return SUBJECT_DATABASE[mataPelajaran];
  }
  // Generic educational baseline for subjects like Coding & AI, Bahasa Inggris, Bahasa Jawa, etc.
  return {
    pengetahuanAwal: `Peserta didik telah memiliki pengetahuan dasar awal dan minat eksplorasi terkait materi ${mataPelajaran}.`,
    jenisPengetahuan: 'Konseptual, Prosedural, dan Praktik Terapan.',
    konseptual: `Memahami konsep-konsep kunci, prinsip dasar, dan istilah esensial dalam mata pelajaran ${mataPelajaran}.`,
    prosedural: `Langkah-langkah praktis dan runtut dalam menyelesaikan tugas atau mempraktikkan keterampilan ${mataPelajaran}.`,
    relevansiKehidupan: `Dapat diterapkan langsung oleh peserta didik dalam aktivitas sehari-hari, komunikasi, dan pemecahan masalah nyata.`,
    tingkatKesulitan: 'Disesuaikan bertahap dari pemahaman konsep konkret hingga praktik mandiri yang kreatif.',
    strukturMateri: 'Pengenalan Konsep -> Eksplorasi Terbimbing -> Praktik Mandiri/Kelompok -> Refleksi & Evaluasi.',
    integrasiNilai: 'Kedisiplinan, ketelitian, kreativitas, tanggung jawab, dan saling menghargai.',
    dimensiProfil: {
      keimanan: 'Bersyukur atas karunia akal dan kesempatan mempelajari ilmu pengetahuan yang bermanfaat.',
      kewargaan: 'Menghargai aturan bersama dan memberikan kontribusi positif dalam lingkungan sekitar.',
      penalaranKritis: 'Mampu menganalisis masalah, mencari solusi logis, dan mengambil keputusan tepat.',
      kreativitas: 'Mengembangkan gagasan baru dan karya unik sesuai dengan topik pembelajaran.',
      kolaborasi: 'Aktif berpartisipasi dan bekerja sama dalam kelompok secara inklusif.',
      kemandirian: 'Menyelesaikan tugas mandiri dengan ketekunan dan tanggung jawab pribadi.',
      kesehatan: 'Menjaga keseimbangan kesehatan fisik dan mental selama proses pembelajaran.',
      komunikasi: 'Menyampaikan ide dan gagasan secara efektif, santun, dan percaya diri.'
    },
    capaianPembelajaran: {
      mengalami: `Eksplorasi langsung konsep ${mataPelajaran} melalui pengalaman belajar yang mendalam.`,
      merefleksikan: `Mengevaluasi pemahaman diri serta manfaat pembelajaran ${mataPelajaran} bagi kehidupan.`,
      berpikirArtistik: `Mengembangkan kreativitas pemikiran dan bentuk penyajian materi yang estetik dan inovatif.`,
      menciptakan: `Menghasilkan karya, produk, atau proyek konkret terkait materi ${mataPelajaran}.`,
      berdampak: `Memberikan manfaat nyata bagi teman sekelas, sekolah, dan lingkungan sekitar.`
    },
    lintasDisiplinIlmu: `Integrasi lintas disiplin dengan Bahasa Indonesia, Matematika, dan Teknologi Digital.`,
    indikatorDefault: [
      `Menjelaskan konsep utama mata pelajaran ${mataPelajaran} dengan benar.`,
      `Menerapkan langkah-langkah prosedural materi dalam latihan terbimbing.`,
      `Menganalisis soal atau studi kasus kontekstual terkait topik.`,
      `Membuat produk / mempresentasikan hasil karya kelompok dengan percaya diri.`
    ],
    topikKontekstual: `Pemanfaatan pengetahuan ${mataPelajaran} dalam memecahkan tantangan kehidupan sehari-hari anak.`,
    mindfulLearning: `Siswa diajak fokus dan sadar penuh (mindful) pada setiap langkah kegiatan belajar tanpa tergesa-gesa.`,
    meaningfulLearning: `Siswa menemukan makna langsung (meaningful) dari materi yang dipelajari terhadap kehidupan nyata mereka.`,
    joyfulLearning: `Siswa mengikuti alur pembelajaran yang menyenangkan (joyful) melalui permainan edukatif dan apresiasi positif.`,
    diferensiasi: {
      konten: 'Menyediakan beragam pilihan media belajar (visual, audio, dan benda konkret/praktik).',
      proses: 'Memberikan tingkat pendampingan yang disesuaikan dengan kesiapan belajar masing-masing siswa.',
      produk: 'Siswa bebas memilih bentuk laporan/karya sesuai dengan minat dan gaya belajar mereka.'
    },
    kemitraan: {
      lingkunganSekolah: 'Melibatkan teman sejawat, guru kelas lain, dan sarana perpustakaan/laboratorium sekolah.',
      lingkunganLuarSekolah: 'Dukungan orang tua siswa di rumah dan lingkungan masyarakat sekitar.',
      mitraDigital: 'Penggunaan aplikasi dan platform edukasi digital yang relevan dan aman bagi siswa SD.'
    },
    lingkunganBelajar: {
      ruangFisik: 'Penyusunan meja kelas yang fleksibel untuk kerja individu maupun kelompok.',
      ruangVirtual: 'Grup komunikasi belajar dan folder portofolio digital siswa.',
      budayaBelajar: 'Suasana kelas yang aman, inklusif, ramah anak, dan saling mendukung.'
    },
    pemanfaatanDigital: 'Media presentasi interaktif, video pembelajaran edukatif, dan kuis digital interaktif.',
    asesmenDefault: {
      diagnostikPraktik: 'Tanya jawab singkat dan tes diagnostik kognitif awal.',
      diagnostikObservasi: 'Pengamatan minat dan sikap siswa saat pengenalan topik baru.',
      formatifTugas: 'Tugas eksplorasi lembar kerja peserta didik (LKPD) secara kelompok.',
      formatifPenilaian: 'Rubrik penilaian proses dan keaktifan siswa.',
      formatifObservasi: 'Jurnal pengamatan perilaku dan keterampilan sosial selama kegiatan.',
      sumatifProyekTugas: 'Pembuatan proyek kreatif akhir bab secara berkelompok.',
      sumatifProyekPenilaian: 'Rubrik hasil karya proyek dan kriteria keberhasilan.',
      sumatifKinerjaTugas: 'Presentasi atau unjuk kerja praktik mendemonstrasikan hasil belajar.',
      sumatifKinerjaPenilaian: 'Rubrik penilaian unjuk kerja dan penyampaian lisan.',
      sumatifTesTertulis: 'Tes tertulis evaluasi pemahaman konsep akhir bab.'
    }
  };
}
